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

  @Column({ name: 'semana_iso' })
  isoWeek: string;

  // null = pending response, true = attended, false = did not attend (or timed out)
  @Column({ name: 'asistio', type: 'boolean', nullable: true })
  attended: boolean | null;

  @Column({ name: 'timestamp_respuesta', nullable: true })
  responseTimestamp: Date;

  @CreateDateColumn()
  createdAt: Date;
}
