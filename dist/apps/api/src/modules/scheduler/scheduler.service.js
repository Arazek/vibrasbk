"use strict";
var SchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const votes_service_1 = require("../votes/votes.service");
const notifications_service_1 = require("../notifications/notifications.service");
let SchedulerService = SchedulerService_1 = class SchedulerService {
    constructor(usersRepo, votesService, notificationsService) {
        this.usersRepo = usersRepo;
        this.votesService = votesService;
        this.notificationsService = notificationsService;
        this.logger = new common_1.Logger(SchedulerService_1.name);
    }
    /**
     * Runs every day at 11:00 AM.
     * 1. Creates pending verification records for yesterday's voy voters.
     * 2. Sends a push notification to each of those users asking "¿Fuiste?"
     */
    async sendVerificationPushes() {
        this.logger.log('Running verification push cron...');
        try {
            // Create pending AttendanceVerification rows for yesterday's events
            await this.votesService.createPendingVerificationsForYesterday();
            // Get the list of users who voted "voy" yesterday
            const targets = await this.votesService.getVoyVotersForYesterday();
            if (targets.length === 0) {
                this.logger.log('No voy voters found for yesterday.');
                return;
            }
            const userIds = [...new Set(targets.map((t) => t.userId))];
            const users = await this.usersRepo.find({ where: { id: (0, typeorm_2.In)(userIds) } });
            const tokenMap = new Map(users.filter((u) => u.fcmToken).map((u) => [u.id, u.fcmToken]));
            for (const target of targets) {
                const token = tokenMap.get(target.userId);
                if (!token)
                    continue;
                try {
                    await this.notificationsService.sendPushNotification(token, '¿Cómo estuvo el social?', `¿Fuiste al social de ${target.eventName} anoche?`, { type: 'verification' });
                }
                catch {
                    this.logger.warn(`Could not send push to user ${target.userId}`);
                }
            }
            this.logger.log(`Verification pushes sent to ${targets.length} voters.`);
        }
        catch (err) {
            this.logger.error('Error in sendVerificationPushes', err);
        }
    }
    /**
     * Runs every day at 11:05 AM (5 min after push window).
     * Auto-closes verification records older than 24 h with no response (asistio = false).
     * Then updates reliability metrics for those users.
     */
    async autoCloseExpiredVerifications() {
        this.logger.log('Running auto-close verifications cron...');
        try {
            const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const pending = await this.votesService.getPendingVerifications(cutoff);
            for (const v of pending) {
                await this.votesService.closeVerification(v.id);
                // Closing counts as a "did not attend" for reliability purposes
                await this.votesService.updateReliability(v.userId, false);
            }
            if (pending.length > 0) {
                this.logger.log(`Auto-closed ${pending.length} expired verifications.`);
            }
        }
        catch (err) {
            this.logger.error('Error in autoCloseExpiredVerifications', err);
        }
    }
};
exports.SchedulerService = SchedulerService;
tslib_1.__decorate([
    (0, schedule_1.Cron)('0 11 * * *'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SchedulerService.prototype, "sendVerificationPushes", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)('5 11 * * *'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SchedulerService.prototype, "autoCloseExpiredVerifications", null);
exports.SchedulerService = SchedulerService = SchedulerService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        votes_service_1.VotesService,
        notifications_service_1.NotificationsService])
], SchedulerService);
//# sourceMappingURL=scheduler.service.js.map