import { ChildEntity, Column } from 'typeorm';
import { RecurringEvent } from './recurring-event.entity';

@ChildEntity('taller')
export class TallerEvent extends RecurringEvent {
  @Column({ type: 'decimal', nullable: true })
  precio: number;

  @Column({ nullable: true })
  instructor: string;
}
