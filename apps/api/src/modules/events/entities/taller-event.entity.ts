import { ChildEntity, Column } from 'typeorm';
import { RecurringEvent } from './recurring-event.entity';

@ChildEntity('taller')
export class TallerEvent extends RecurringEvent {
  @Column({ type: 'decimal', nullable: true })
  price: number;

  @Column({ nullable: true })
  instructor: string;
}
