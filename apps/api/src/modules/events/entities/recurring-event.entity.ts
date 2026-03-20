import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  TableInheritance,
} from 'typeorm';
import { Venue } from '../../venues/entities/venue.entity';

@Entity('recurring_events')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class RecurringEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Venue, { eager: true })
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @Column({ name: 'venue_id' })
  venueId: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'photo_url', nullable: true })
  photoUrl: string;

  // 0 = Monday … 6 = Sunday. Null for one-off events (intensives, congresses)
  @Column({ name: 'day_of_week', type: 'smallint', nullable: true })
  dayOfWeek: number | null;

  // Projected real date of the next occurrence (YYYY-MM-DD)
  @Column({ name: 'next_date', type: 'date', nullable: true })
  nextDate: string | null;

  // Start date for one-off events (intensives, congresses) — YYYY-MM-DD
  @Column({ name: 'start_date', nullable: true })
  startDate?: string;

  // stored as HH:MM string, e.g. "21:00"
  @Column({ name: 'start_time', type: 'time', nullable: true })
  startTime: string;

  @Column({ name: 'estimated_peak_time', type: 'time', nullable: true })
  estimatedPeakTime: string;

  @Column({ name: 'styles', type: 'simple-array' })
  styles: string[];

  @Column({ name: 'active', default: true })
  active: boolean;
}
