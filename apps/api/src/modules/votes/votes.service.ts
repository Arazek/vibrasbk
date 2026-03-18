import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { IntentionVote, VoteStatus } from './entities/intention-vote.entity';
import { AttendanceVerification } from './entities/attendance-verification.entity';
import { ReliabilityMetric } from './entities/reliability-metric.entity';
import { RecurringEvent } from '../events/entities/recurring-event.entity';
import { User } from '../users/entities/user.entity';
import { CreateVoteDto } from './dtos/create-vote.dto';
import { UpdateVoteDto } from './dtos/update-vote.dto';
import { VerifyAttendanceDto } from './dtos/verify-attendance.dto';
import { PredictionService, VoterData, PredictionResult } from './prediction.service';
import { toIsoWeek, projectToCurrentWeek } from '../events/events.service';

export interface EventAggregate {
  totalInterested: number;
  goingCount: number;
  maybeCount: number;
  userVote: VoteStatus | null;
  userVoteId: string | null;
  vibeColor: import('./prediction.service').Vibe;
  roleBalance: import('./prediction.service').RoleBalanceDetail;
}

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(IntentionVote)
    private votesRepo: Repository<IntentionVote>,
    @InjectRepository(AttendanceVerification)
    private verificationsRepo: Repository<AttendanceVerification>,
    @InjectRepository(ReliabilityMetric)
    private reliabilityRepo: Repository<ReliabilityMetric>,
    @InjectRepository(RecurringEvent)
    private eventsRepo: Repository<RecurringEvent>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private predictionService: PredictionService
  ) {}

  // ─── Casting & updating votes ─────────────────────────────────────────────

  async castVote(userId: string, dto: CreateVoteDto): Promise<IntentionVote> {
    const isoWeek = toIsoWeek(new Date());
    const existing = await this.votesRepo.findOne({
      where: { userId, eventId: dto.eventId, isoWeek },
    });
    if (existing) {
      throw new ConflictException('Ya has votado para este evento esta semana. Usa PATCH para cambiar.');
    }
    const vote = this.votesRepo.create({
      userId,
      eventId: dto.eventId,
      isoWeek,
      status: dto.status,
    });
    return this.votesRepo.save(vote);
  }

  async updateVote(userId: string, voteId: string, dto: UpdateVoteDto): Promise<IntentionVote> {
    const vote = await this.votesRepo.findOne({ where: { id: voteId } });
    if (!vote) throw new NotFoundException('Voto no encontrado.');
    if (vote.userId !== userId) throw new ForbiddenException('No puedes modificar este voto.');

    const canEdit = await this.canEditVote(vote.eventId);
    if (!canEdit) {
      throw new ForbiddenException('No se puede cambiar el voto menos de 2 horas antes del evento.');
    }

    vote.status = dto.status;
    return this.votesRepo.save(vote);
  }

  private async canEditVote(eventId: string): Promise<boolean> {
    const event = await this.eventsRepo.findOne({ where: { id: eventId } });
    if (!event) return false;
    if (event.dayOfWeek == null || !event.startTime) return true;
    const eventStart = projectToCurrentWeek(event.dayOfWeek, event.startTime);
    const twoHoursBefore = new Date(eventStart.getTime() - 2 * 60 * 60 * 1000);
    return new Date() < twoHoursBefore;
  }

  // ─── Aggregates for weekly event list ─────────────────────────────────────

  async getAggregatesForEvents(
    eventIds: string[],
    isoWeek: string,
    userId: string,
    capacityMap?: Map<string, number>
  ): Promise<Map<string, EventAggregate>> {
    if (eventIds.length === 0) return new Map();

    const votes = await this.votesRepo.find({
      where: { eventId: In(eventIds), isoWeek },
    });

    const voterIds = [...new Set(votes.map((v) => v.userId))];
    const [users, metrics] = await Promise.all([
      voterIds.length > 0 ? this.usersRepo.find({ where: { id: In(voterIds) } }) : [],
      voterIds.length > 0 ? this.reliabilityRepo.find({ where: { userId: In(voterIds) } }) : [],
    ]);

    const userMap = new Map(users.map((u) => [u.id, u]));
    const reliabilityMap = new Map(metrics.map((m) => [m.userId, Number(m.reliability)]));

    const result = new Map<string, EventAggregate>();

    for (const eventId of eventIds) {
      const eventVotes = votes.filter((v) => v.eventId === eventId);
      const interested = eventVotes.filter(
        (v) => v.status === VoteStatus.GOING || v.status === VoteStatus.MAYBE
      );
      const userVoteRecord = eventVotes.find((v) => v.userId === userId) ?? null;
      const userVote = userVoteRecord?.status ?? null;
      const userVoteId = userVoteRecord?.id ?? null;

      const voterData: VoterData[] = eventVotes
        .map((v) => {
          const user = userMap.get(v.userId);
          if (!user) return null;
          return {
            userId: v.userId,
            status: v.status,
            role: user.dancingRole,
            level: user.level,
            reliability: reliabilityMap.get(v.userId) ?? 1.0,
          } as VoterData;
        })
        .filter((v): v is VoterData => v !== null);

      const capacity = capacityMap?.get(eventId);
      const score = this.predictionService.estimateAttendance(voterData);
      const vibeColor = this.predictionService.classifyVibe(score, interested.length > 0, capacity);
      const roleBalance = this.predictionService.getRoleBalance(voterData);

      result.set(eventId, {
        totalInterested: interested.length,
        goingCount: eventVotes.filter((v) => v.status === VoteStatus.GOING).length,
        maybeCount: eventVotes.filter((v) => v.status === VoteStatus.MAYBE).length,
        userVote,
        userVoteId,
        vibeColor,
        roleBalance,
      });
    }

    return result;
  }

  // ─── Full analytics (gated: user must have voted going/maybe) ─────────────

  async getAnalytics(eventId: string, userId: string): Promise<PredictionResult> {
    const isoWeek = toIsoWeek(new Date());

    const userVote = await this.votesRepo.findOne({
      where: { userId, eventId, isoWeek },
    });
    if (!userVote || userVote.status === VoteStatus.NOT_GOING) {
      throw new UnauthorizedException('Debes votar "Voy" o "Tal vez" para ver la analítica.');
    }

    // Load event to get venue capacity
    const event = await this.eventsRepo.findOne({ where: { id: eventId } });
    const maxCapacity = event?.venue?.maxCapacity ?? undefined;

    const votes = await this.votesRepo.find({ where: { eventId, isoWeek } });
    const voterIds = [...new Set(votes.map((v) => v.userId))];

    const [users, metrics] = await Promise.all([
      voterIds.length > 0 ? this.usersRepo.find({ where: { id: In(voterIds) } }) : [],
      voterIds.length > 0 ? this.reliabilityRepo.find({ where: { userId: In(voterIds) } }) : [],
    ]);

    const userMap = new Map(users.map((u) => [u.id, u]));
    const reliabilityMap = new Map(metrics.map((m) => [m.userId, Number(m.reliability)]));

    const voterData: VoterData[] = votes
      .map((v) => {
        const user = userMap.get(v.userId);
        if (!user) return null;
        return {
          userId: v.userId,
          status: v.status,
          role: user.dancingRole,
          level: user.level,
          reliability: reliabilityMap.get(v.userId) ?? 1.0,
        } as VoterData;
      })
      .filter((v): v is VoterData => v !== null);

    return this.predictionService.predict(voterData, maxCapacity);
  }

  // ─── Attendance verification ───────────────────────────────────────────────

  async verifyAttendance(userId: string, dto: VerifyAttendanceDto): Promise<AttendanceVerification> {
    const existing = await this.verificationsRepo.findOne({
      where: { userId, eventId: dto.eventId, isoWeek: dto.isoWeek },
    });
    if (existing) {
      existing.attended = dto.attended;
      existing.responseTimestamp = new Date();
      const saved = await this.verificationsRepo.save(existing);
      await this.updateReliability(userId, dto.attended);
      return saved;
    }
    const verification = this.verificationsRepo.create({
      userId,
      eventId: dto.eventId,
      isoWeek: dto.isoWeek,
      attended: dto.attended,
      responseTimestamp: new Date(),
    });
    const saved = await this.verificationsRepo.save(verification);
    await this.updateReliability(userId, dto.attended);
    return saved;
  }

  // ─── Reliability update (called after verification) ───────────────────────

  async updateReliability(userId: string, attended: boolean): Promise<void> {
    let metric = await this.reliabilityRepo.findOne({ where: { userId } });
    if (!metric) {
      metric = this.reliabilityRepo.create({ userId, totalGoingVotes: 0, confirmedAttendances: 0, reliability: 1.0 });
    }
    metric.totalGoingVotes += 1;
    if (attended) metric.confirmedAttendances += 1;
    metric.reliability = metric.confirmedAttendances / Math.max(1, metric.totalGoingVotes);
    await this.reliabilityRepo.save(metric);
  }

  // ─── Used by scheduler ────────────────────────────────────────────────────

  async getPendingVerifications(cutoffDate: Date): Promise<AttendanceVerification[]> {
    return this.verificationsRepo
      .createQueryBuilder('v')
      .where('v.attended IS NULL')
      .andWhere('v.createdAt < :cutoff', { cutoff: cutoffDate })
      .getMany();
  }

  async closeVerification(verificationId: string): Promise<void> {
    await this.verificationsRepo.update(verificationId, {
      attended: false,
      responseTimestamp: new Date(),
    });
  }

  async createPendingVerificationsForYesterday(): Promise<void> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isoWeek = toIsoWeek(yesterday);
    const dayOfWeek = yesterday.getDay() === 0 ? 6 : yesterday.getDay() - 1; // 0=Mon

    const events = await this.eventsRepo.find({
      where: { dayOfWeek: dayOfWeek, active: true },
    });

    for (const event of events) {
      const goingVotes = await this.votesRepo.find({
        where: { eventId: event.id, isoWeek, status: VoteStatus.GOING },
      });
      for (const vote of goingVotes) {
        const exists = await this.verificationsRepo.findOne({
          where: { userId: vote.userId, eventId: event.id, isoWeek },
        });
        if (!exists) {
          await this.verificationsRepo.save(
            this.verificationsRepo.create({
              userId: vote.userId,
              eventId: event.id,
              isoWeek,
              attended: null,
            })
          );
        }
      }
    }
  }

  async getGoingVotersForYesterday(): Promise<Array<{ userId: string; eventName: string }>> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isoWeek = toIsoWeek(yesterday);
    const dayOfWeek = yesterday.getDay() === 0 ? 6 : yesterday.getDay() - 1;

    const events = await this.eventsRepo.find({
      where: { dayOfWeek: dayOfWeek, active: true },
    });

    const result: Array<{ userId: string; eventName: string }> = [];
    for (const event of events) {
      const goingVotes = await this.votesRepo.find({
        where: { eventId: event.id, isoWeek, status: VoteStatus.GOING },
      });
      for (const vote of goingVotes) {
        result.push({ userId: vote.userId, eventName: event.venue?.name ?? event.id });
      }
    }
    return result;
  }
}
