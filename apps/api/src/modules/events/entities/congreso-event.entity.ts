import { ChildEntity, Column } from 'typeorm';
import { RecurringEvent } from './recurring-event.entity';

@ChildEntity('congreso')
export class CongresoEvent extends RecurringEvent {
  @Column({ nullable: true })
  titulo?: string;

  @Column({ nullable: true })
  localidad?: string;

  @Column({ nullable: true })
  duracionDias?: number;

  // JSON string: [{label: string, precio: number}]
  @Column({ type: 'text', nullable: true })
  precios?: string;

  @Column({ nullable: true })
  enlaceWeb?: string;

  // Fecha fin del congreso (YYYY-MM-DD)
  @Column({ nullable: true })
  fechaFin?: string;
}
