import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringEvent } from './entities/recurring-event.entity';
import { SocialEvent } from './entities/social-event.entity';
import { IntensivoEvent } from './entities/intensivo-event.entity';
import { CongresoEvent } from './entities/congreso-event.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { VenuesModule } from '../venues/venues.module';
import { VotesModule } from '../votes/votes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecurringEvent, SocialEvent, IntensivoEvent, CongresoEvent]),
    VenuesModule,
    VotesModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
