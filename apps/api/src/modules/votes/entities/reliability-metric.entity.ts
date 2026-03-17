import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

@Entity('reliability_metrics')
@Unique(['userId'])
export class ReliabilityMetric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'votos_voy_total', default: 0 })
  totalGoingVotes: number;

  @Column({ name: 'asistencias_confirmadas', default: 0 })
  confirmedAttendances: number;

  // reliability = confirmedAttendances / max(1, totalGoingVotes)
  @Column({ name: 'fiabilidad', type: 'decimal', precision: 4, scale: 3, default: 1.0 })
  reliability: number;
}
