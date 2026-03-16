import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { IntentionVote, VoteEstado } from './entities/intention-vote.entity';
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
  totalInteresados: number;
  voyCount: number;
  talVezCount: number;
  userVote: VoteEstado | null;
  userVoteId: string | null;
  ambienteColor: import('./prediction.service').Ambiente;
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
    const semanaIso = toIsoWeek(new Date());
    const existing = await this.votesRepo.findOne({
      where: { userId, eventId: dto.eventId, semanaIso },
    });
    if (existing) {
      throw new ConflictException('Ya has votado para este evento esta semana. Usa PATCH para cambiar.');
    }
    const vote = this.votesRepo.create({
      userId,
      eventId: dto.eventId,
      semanaIso,
      estado: dto.estado,
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

    vote.estado = dto.estado;
    return this.votesRepo.save(vote);
  }

  private async canEditVote(eventId: string): Promise<boolean> {
    const event = await this.eventsRepo.findOne({ where: { id: eventId } });
    if (!event) return false;
    if (event.diaSemana == null || !event.horaInicio) return true;
    const eventStart = projectToCurrentWeek(event.diaSemana, event.horaInicio);
    const twoHoursBefore = new Date(eventStart.getTime() - 2 * 60 * 60 * 1000);
    return new Date() < twoHoursBefore;
  }

  // ─── Aggregates for weekly event list ─────────────────────────────────────

  async getAggregatesForEvents(
    eventIds: string[],
    semanaIso: string,
    userId: string,
    aforoMap?: Map<string, number>
  ): Promise<Map<string, EventAggregate>> {
    if (eventIds.length === 0) return new Map();

    const votes = await this.votesRepo.find({
      where: { eventId: In(eventIds), semanaIso },
    });

    const voterIds = [...new Set(votes.map((v) => v.userId))];
    const [users, metrics] = await Promise.all([
      voterIds.length > 0 ? this.usersRepo.find({ where: { id: In(voterIds) } }) : [],
      voterIds.length > 0 ? this.reliabilityRepo.find({ where: { userId: In(voterIds) } }) : [],
    ]);

    const userMap = new Map(users.map((u) => [u.id, u]));
    const reliabilityMap = new Map(metrics.map((m) => [m.userId, Number(m.fiabilidad)]));

    const result = new Map<string, EventAggregate>();

    for (const eventId of eventIds) {
      const eventVotes = votes.filter((v) => v.eventId === eventId);
      const interested = eventVotes.filter(
        (v) => v.estado === VoteEstado.VOY || v.estado === VoteEstado.TAL_VEZ
      );
      const userVoteRecord = eventVotes.find((v) => v.userId === userId) ?? null;
      const userVote = userVoteRecord?.estado ?? null;
      const userVoteId = userVoteRecord?.id ?? null;

      const voterData: VoterData[] = eventVotes
        .map((v) => {
          const user = userMap.get(v.userId);
          if (!user) return null;
          return {
            userId: v.userId,
            estado: v.estado,
            rol: user.rol,
            nivel: user.nivel,
            fiabilidad: reliabilityMap.get(v.userId) ?? 1.0,
          } as VoterData;
        })
        .filter((v): v is VoterData => v !== null);

      const aforo = aforoMap?.get(eventId);
      const score = this.predictionService.estimateAttendance(voterData);
      const ambienteColor = this.predictionService.classifyAmbiente(score, interested.length > 0, aforo);
      const roleBalance = this.predictionService.getRoleBalance(voterData);

      result.set(eventId, {
        totalInteresados: interested.length,
        voyCount: eventVotes.filter((v) => v.estado === VoteEstado.VOY).length,
        talVezCount: eventVotes.filter((v) => v.estado === VoteEstado.TAL_VEZ).length,
        userVote,
        userVoteId,
        ambienteColor,
        roleBalance,
      });
    }

    return result;
  }

  // ─── Full analytics (gated: user must have voted voy/tal_vez) ─────────────

  async getAnalytics(eventId: string, userId: string): Promise<PredictionResult> {
    const semanaIso = toIsoWeek(new Date());

    const userVote = await this.votesRepo.findOne({
      where: { userId, eventId, semanaIso },
    });
    if (!userVote || userVote.estado === VoteEstado.NO_VOY) {
      throw new UnauthorizedException('Debes votar "Voy" o "Tal vez" para ver la analítica.');
    }

    // Load event to get venue aforo
    const event = await this.eventsRepo.findOne({ where: { id: eventId } });
    const aforoMaximo = event?.venue?.aforoMaximo ?? undefined;

    const votes = await this.votesRepo.find({ where: { eventId, semanaIso } });
    const voterIds = [...new Set(votes.map((v) => v.userId))];

    const [users, metrics] = await Promise.all([
      voterIds.length > 0 ? this.usersRepo.find({ where: { id: In(voterIds) } }) : [],
      voterIds.length > 0 ? this.reliabilityRepo.find({ where: { userId: In(voterIds) } }) : [],
    ]);

    const userMap = new Map(users.map((u) => [u.id, u]));
    const reliabilityMap = new Map(metrics.map((m) => [m.userId, Number(m.fiabilidad)]));

    const voterData: VoterData[] = votes
      .map((v) => {
        const user = userMap.get(v.userId);
        if (!user) return null;
        return {
          userId: v.userId,
          estado: v.estado,
          rol: user.rol,
          nivel: user.nivel,
          fiabilidad: reliabilityMap.get(v.userId) ?? 1.0,
        } as VoterData;
      })
      .filter((v): v is VoterData => v !== null);

    return this.predictionService.predict(voterData, aforoMaximo);
  }

  // ─── Attendance verification ───────────────────────────────────────────────

  async verifyAttendance(userId: string, dto: VerifyAttendanceDto): Promise<AttendanceVerification> {
    const existing = await this.verificationsRepo.findOne({
      where: { userId, eventId: dto.eventId, semanaIso: dto.semanaIso },
    });
    if (existing) {
      existing.asistio = dto.asistio;
      existing.timestampRespuesta = new Date();
      const saved = await this.verificationsRepo.save(existing);
      await this.updateReliability(userId, dto.asistio);
      return saved;
    }
    const verification = this.verificationsRepo.create({
      userId,
      eventId: dto.eventId,
      semanaIso: dto.semanaIso,
      asistio: dto.asistio,
      timestampRespuesta: new Date(),
    });
    const saved = await this.verificationsRepo.save(verification);
    await this.updateReliability(userId, dto.asistio);
    return saved;
  }

  // ─── Reliability update (called after verification) ───────────────────────

  async updateReliability(userId: string, asistio: boolean): Promise<void> {
    let metric = await this.reliabilityRepo.findOne({ where: { userId } });
    if (!metric) {
      metric = this.reliabilityRepo.create({ userId, votosVoyTotal: 0, asistenciasConfirmadas: 0, fiabilidad: 1.0 });
    }
    metric.votosVoyTotal += 1;
    if (asistio) metric.asistenciasConfirmadas += 1;
    metric.fiabilidad = metric.asistenciasConfirmadas / Math.max(1, metric.votosVoyTotal);
    await this.reliabilityRepo.save(metric);
  }

  // ─── Used by scheduler ────────────────────────────────────────────────────

  async getPendingVerifications(cutoffDate: Date): Promise<AttendanceVerification[]> {
    return this.verificationsRepo
      .createQueryBuilder('v')
      .where('v.asistio IS NULL')
      .andWhere('v.createdAt < :cutoff', { cutoff: cutoffDate })
      .getMany();
  }

  async closeVerification(verificationId: string): Promise<void> {
    await this.verificationsRepo.update(verificationId, {
      asistio: false,
      timestampRespuesta: new Date(),
    });
  }

  async createPendingVerificationsForYesterday(): Promise<void> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const semanaIso = toIsoWeek(yesterday);
    const dayOfWeek = yesterday.getDay() === 0 ? 6 : yesterday.getDay() - 1; // 0=Mon

    const events = await this.eventsRepo.find({
      where: { diaSemana: dayOfWeek, activo: true },
    });

    for (const event of events) {
      const voyVotes = await this.votesRepo.find({
        where: { eventId: event.id, semanaIso, estado: VoteEstado.VOY },
      });
      for (const vote of voyVotes) {
        const exists = await this.verificationsRepo.findOne({
          where: { userId: vote.userId, eventId: event.id, semanaIso },
        });
        if (!exists) {
          await this.verificationsRepo.save(
            this.verificationsRepo.create({
              userId: vote.userId,
              eventId: event.id,
              semanaIso,
              asistio: null,
            })
          );
        }
      }
    }
  }

  async getVoyVotersForYesterday(): Promise<Array<{ userId: string; eventName: string }>> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const semanaIso = toIsoWeek(yesterday);
    const dayOfWeek = yesterday.getDay() === 0 ? 6 : yesterday.getDay() - 1;

    const events = await this.eventsRepo.find({
      where: { diaSemana: dayOfWeek, activo: true },
    });

    const result: Array<{ userId: string; eventName: string }> = [];
    for (const event of events) {
      const voyVotes = await this.votesRepo.find({
        where: { eventId: event.id, semanaIso, estado: VoteEstado.VOY },
      });
      for (const vote of voyVotes) {
        result.push({ userId: vote.userId, eventName: event.venue?.nombre ?? event.id });
      }
    }
    return result;
  }
}
