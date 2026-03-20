import { ChildEntity, Column } from 'typeorm';
import { RecurringEvent } from './recurring-event.entity';

@ChildEntity('congress')
export class CongresoEvent extends RecurringEvent {
  @Column({ name: 'title', nullable: true })
  title?: string;

  @Column({ name: 'locality', nullable: true })
  locality?: string;

  @Column({ name: 'duration_days', nullable: true })
  durationDays?: number;

  // JSON string: [{label: string, price: number}]
  @Column({ name: 'prices', type: 'text', nullable: true })
  prices?: string;

  @Column({ name: 'website_url', nullable: true })
  websiteUrl?: string;

  // End date of the congress (YYYY-MM-DD)
  @Column({ name: 'end_date', nullable: true })
  endDate?: string;
}
