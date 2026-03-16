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
  votosVoyTotal: number;

  @Column({ name: 'asistencias_confirmadas', default: 0 })
  asistenciasConfirmadas: number;

  // fiabilidad = asistenciasConfirmadas / max(1, votosVoyTotal)
  @Column({ type: 'decimal', precision: 4, scale: 3, default: 1.0 })
  fiabilidad: number;
}
