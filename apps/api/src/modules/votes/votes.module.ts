import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntentionVote } from './entities/intention-vote.entity';
import { AttendanceVerification } from './entities/attendance-verification.entity';
import { ReliabilityMetric } from './entities/reliability-metric.entity';
import { RecurringEvent } from '../events/entities/recurring-event.entity';
import { User } from '../users/entities/user.entity';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { PredictionService } from './prediction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IntentionVote,
      AttendanceVerification,
      ReliabilityMetric,
      RecurringEvent,
      User,
    ]),
  ],
  controllers: [VotesController],
  providers: [VotesService, PredictionService],
  exports: [VotesService, PredictionService],
})
export class VotesModule {}
