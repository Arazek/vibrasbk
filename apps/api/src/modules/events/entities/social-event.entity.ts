import { ChildEntity, Column } from 'typeorm';
import { RecurringEvent } from './recurring-event.entity';

@ChildEntity('social')
export class SocialEvent extends RecurringEvent {
  @Column({ name: 'workshop_included', nullable: true })
  workshopIncluded?: boolean;

  @Column({ name: 'entry_price', type: 'decimal', nullable: true })
  entryPrice?: number;

  @Column({ name: 'instructors', type: 'simple-array', nullable: true })
  instructors?: string[];
}
