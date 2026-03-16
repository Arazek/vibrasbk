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
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export class RecurringEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tipo', type: 'varchar', nullable: true, update: false })
  tipo: string;

  @ManyToOne(() => Venue, { eager: true })
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @Column({ name: 'venue_id' })
  venueId: string;

  @Column({ nullable: true })
  nombre: string;

  @Column({ nullable: true })
  fotoUrl: string;

  // 0 = Monday … 6 = Sunday. Null for puntuales (intensivos, congresos)
  @Column({ type: 'smallint', nullable: true })
  diaSemana: number | null;

  // Fecha real proyectada de la próxima ocurrencia (YYYY-MM-DD)
  @Column({ type: 'date', nullable: true })
  proximaFecha: string | null;

  // Fecha de inicio para eventos puntuales (intensivos, congresos) — YYYY-MM-DD
  @Column({ nullable: true })
  fechaInicio?: string;

  // stored as HH:MM string, e.g. "21:00"
  @Column({ type: 'time', nullable: true })
  horaInicio: string;

  @Column({ type: 'time', nullable: true })
  horaPicoEstimado: string;

  @Column({ type: 'simple-array' })
  estilos: string[];

  @Column({ default: true })
  activo: boolean;
}
