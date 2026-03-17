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
  type: string;

  @ManyToOne(() => Venue, { eager: true })
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @Column({ name: 'venue_id' })
  venueId: string;

  @Column({ name: 'nombre', nullable: true })
  name: string;

  @Column({ name: 'foto_url', nullable: true })
  photoUrl: string;

  // 0 = Monday … 6 = Sunday. Null for puntuales (intensivos, congresos)
  @Column({ name: 'dia_semana', type: 'smallint', nullable: true })
  dayOfWeek: number | null;

  // Fecha real proyectada de la próxima ocurrencia (YYYY-MM-DD)
  @Column({ name: 'proxima_fecha', type: 'date', nullable: true })
  nextDate: string | null;

  // Fecha de inicio para eventos puntuales (intensivos, congresos) — YYYY-MM-DD
  @Column({ name: 'fecha_inicio', nullable: true })
  startDate?: string;

  // stored as HH:MM string, e.g. "21:00"
  @Column({ name: 'hora_inicio', type: 'time', nullable: true })
  startTime: string;

  @Column({ name: 'hora_pico_estimado', type: 'time', nullable: true })
  estimatedPeakTime: string;

  @Column({ name: 'estilos', type: 'simple-array' })
  styles: string[];

  @Column({ name: 'activo', default: true })
  active: boolean;
}
