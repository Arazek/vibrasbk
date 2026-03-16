import { ChildEntity, Column } from 'typeorm';
import { RecurringEvent } from './recurring-event.entity';

@ChildEntity('intensivo')
export class IntensivoEvent extends RecurringEvent {
  @Column({ nullable: true })
  titulo?: string;

  @Column({ nullable: true })
  nivel?: string;

  @Column({ type: 'decimal', nullable: true })
  precio?: number;

  @Column({ type: 'simple-array', nullable: true })
  profesores?: string[];

  // Fecha fin del intensivo (YYYY-MM-DD)
  @Column({ nullable: true })
  fechaFin?: string;
}
