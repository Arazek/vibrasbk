import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { VotesService } from '../votes/votes.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class SchedulerService {
    private usersRepo;
    private votesService;
    private notificationsService;
    private readonly logger;
    constructor(usersRepo: Repository<User>, votesService: VotesService, notificationsService: NotificationsService);
    /**
     * Runs every day at 11:00 AM.
     * 1. Creates pending verification records for yesterday's voy voters.
     * 2. Sends a push notification to each of those users asking "¿Fuiste?"
     */
    sendVerificationPushes(): Promise<void>;
    /**
     * Runs every day at 11:05 AM (5 min after push window).
     * Auto-closes verification records older than 24 h with no response (asistio = false).
     * Then updates reliability metrics for those users.
     */
    autoCloseExpiredVerifications(): Promise<void>;
}
//# sourceMappingURL=scheduler.service.d.ts.map