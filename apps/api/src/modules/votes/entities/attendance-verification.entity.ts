import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity('attendance_verifications')
@Unique(['userId', 'eventId', 'semanaIso'])
export class AttendanceVerification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'event_id' })
  eventId: string;

  @Column({ name: 'semana_iso' })
  semanaIso: string;

  // null = pending response, true = attended, false = did not attend (or timed out)
  @Column({ type: 'boolean', nullable: true })
  asistio: boolean | null;

  @Column({ name: 'timestamp_respuesta', nullable: true })
  timestampRespuesta: Date;

  @CreateDateColumn()
  createdAt: Date;
}
