import { ChildEntity, Column } from 'typeorm';
import { RecurringEvent } from './recurring-event.entity';

@ChildEntity('congress')
export class CongresoEvent extends RecurringEvent {
  @Column({ name: 'titulo', nullable: true })
  title?: string;

  @Column({ name: 'localidad', nullable: true })
  locality?: string;

  @Column({ name: 'duracion_dias', nullable: true })
  durationDays?: number;

  // JSON string: [{label: string, precio: number}]
  @Column({ name: 'precios', type: 'text', nullable: true })
  prices?: string;

  @Column({ name: 'enlace_web', nullable: true })
  websiteUrl?: string;

  // Fecha fin del congreso (YYYY-MM-DD)
  @Column({ name: 'fecha_fin', nullable: true })
  endDate?: string;
}
