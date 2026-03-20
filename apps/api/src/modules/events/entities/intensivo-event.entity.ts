import { ChildEntity, Column } from 'typeorm';
import { RecurringEvent } from './recurring-event.entity';

@ChildEntity('intensive')
export class IntensivoEvent extends RecurringEvent {
  @Column({ name: 'title', nullable: true })
  title?: string;

  @Column({ name: 'level', nullable: true })
  level?: string;

  @Column({ type: 'decimal', nullable: true })
  price?: number;

  @Column({ name: 'instructors', type: 'simple-array', nullable: true })
  instructors?: string[];

  // End date of the intensive (YYYY-MM-DD)
  @Column({ name: 'end_date', nullable: true })
  endDate?: string;
}
