import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { VotesService } from '../votes/votes.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private votesService: VotesService,
    private notificationsService: NotificationsService
  ) {}

  /**
   * Runs every day at 11:00 AM.
   * 1. Creates pending verification records for yesterday's going voters.
   * 2. Sends a push notification to each of those users asking "¿Fuiste?"
   */
  @Cron('0 11 * * *')
  async sendVerificationPushes() {
    this.logger.log('Running verification push cron...');
    try {
      // Create pending AttendanceVerification rows for yesterday's events
      await this.votesService.createPendingVerificationsForYesterday();

      // Get the list of users who voted "going" yesterday
      const targets = await this.votesService.getGoingVotersForYesterday();
      if (targets.length === 0) {
        this.logger.log('No going voters found for yesterday.');
        return;
      }

      const userIds = [...new Set(targets.map((t) => t.userId))];
      const users = await this.usersRepo.find({ where: { id: In(userIds) } });
      const tokenMap = new Map(
        users.filter((u) => u.fcmToken).map((u) => [u.id, u.fcmToken as string])
      );

      for (const target of targets) {
        const token = tokenMap.get(target.userId);
        if (!token) continue;
        try {
          await this.notificationsService.sendPushNotification(
            token,
            '¿Cómo estuvo el social?',
            `¿Fuiste al social de ${target.eventName} anoche?`,
            { type: 'verification' }
          );
        } catch {
          this.logger.warn(`Could not send push to user ${target.userId}`);
        }
      }
      this.logger.log(`Verification pushes sent to ${targets.length} voters.`);
    } catch (err) {
      this.logger.error('Error in sendVerificationPushes', err);
    }
  }

  /**
   * Runs every day at 11:05 AM (5 min after push window).
   * Auto-closes verification records older than 24 h with no response (attended = false).
   * Then updates reliability metrics for those users.
   */
  @Cron('5 11 * * *')
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
    } catch (err) {
      this.logger.error('Error in autoCloseExpiredVerifications', err);
    }
  }
}
