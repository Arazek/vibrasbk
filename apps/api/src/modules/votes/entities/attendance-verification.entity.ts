import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity('attendance_verifications')
@Unique(['userId', 'eventId', 'isoWeek'])
export class AttendanceVerification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'event_id' })
  eventId: string;

  @Column({ name: 'iso_week' })
  isoWeek: string;

  // null = pending response, true = attended, false = did not attend (or timed out)
  @Column({ name: 'attended', type: 'boolean', nullable: true })
  attended: boolean | null;

  @Column({ name: 'response_timestamp', nullable: true })
  responseTimestamp: Date;

  @CreateDateColumn()
  createdAt: Date;
}
