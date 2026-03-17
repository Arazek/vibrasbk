import { ChildEntity, Column } from 'typeorm';
import { RecurringEvent } from './recurring-event.entity';

@ChildEntity('intensive')
export class IntensivoEvent extends RecurringEvent {
  @Column({ name: 'titulo', nullable: true })
  title?: string;

  @Column({ name: 'nivel', nullable: true })
  level?: string;

  @Column({ type: 'decimal', nullable: true })
  price?: number;

  @Column({ name: 'profesores', type: 'simple-array', nullable: true })
  instructors?: string[];

  // Fecha fin del intensivo (YYYY-MM-DD)
  @Column({ name: 'fecha_fin', nullable: true })
  endDate?: string;
}
