import { ChildEntity, Column } from 'typeorm';
import { RecurringEvent } from './recurring-event.entity';

@ChildEntity('social')
export class SocialEvent extends RecurringEvent {
  @Column({ name: 'taller_incluido', nullable: true })
  workshopIncluded?: boolean;

  @Column({ name: 'precio_entrada', type: 'decimal', nullable: true })
  entryPrice?: number;

  @Column({ name: 'instructores', type: 'simple-array', nullable: true })
  instructors?: string[];
}
