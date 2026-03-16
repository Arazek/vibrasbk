import { Repository } from 'typeorm';
import { IntentionVote, VoteEstado } from './entities/intention-vote.entity';
import { AttendanceVerification } from './entities/attendance-verification.entity';
import { ReliabilityMetric } from './entities/reliability-metric.entity';
import { RecurringEvent } from '../events/entities/recurring-event.entity';
import { User } from '../users/entities/user.entity';
import { CreateVoteDto } from './dtos/create-vote.dto';
import { UpdateVoteDto } from './dtos/update-vote.dto';
import { VerifyAttendanceDto } from './dtos/verify-attendance.dto';
import { PredictionService, PredictionResult } from './prediction.service';
export interface EventAggregate {
    totalInteresados: number;
    voyCount: number;
    talVezCount: number;
    userVote: VoteEstado | null;
    userVoteId: string | null;
    ambienteColor: import('./prediction.service').Ambiente;
    roleBalance: import('./prediction.service').RoleBalanceDetail;
}
export declare class VotesService {
    private votesRepo;
    private verificationsRepo;
    private reliabilityRepo;
    private eventsRepo;
    private usersRepo;
    private predictionService;
    constructor(votesRepo: Repository<IntentionVote>, verificationsRepo: Repository<AttendanceVerification>, reliabilityRepo: Repository<ReliabilityMetric>, eventsRepo: Repository<RecurringEvent>, usersRepo: Repository<User>, predictionService: PredictionService);
    castVote(userId: string, dto: CreateVoteDto): Promise<IntentionVote>;
    updateVote(userId: string, voteId: string, dto: UpdateVoteDto): Promise<IntentionVote>;
    private canEditVote;
    getAggregatesForEvents(eventIds: string[], semanaIso: string, userId: string, aforoMap?: Map<string, number>): Promise<Map<string, EventAggregate>>;
    getAnalytics(eventId: string, userId: string): Promise<PredictionResult>;
    verifyAttendance(userId: string, dto: VerifyAttendanceDto): Promise<AttendanceVerification>;
    updateReliability(userId: string, asistio: boolean): Promise<void>;
    getPendingVerifications(cutoffDate: Date): Promise<AttendanceVerification[]>;
    closeVerification(verificationId: string): Promise<void>;
    createPendingVerificationsForYesterday(): Promise<void>;
    getVoyVotersForYesterday(): Promise<Array<{
        userId: string;
        eventName: string;
    }>>;
}
//# sourceMappingURL=votes.service.d.ts.map