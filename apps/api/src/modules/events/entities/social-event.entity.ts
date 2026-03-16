import { ChildEntity, Column } from 'typeorm';
import { RecurringEvent } from './recurring-event.entity';

@ChildEntity('social')
export class SocialEvent extends RecurringEvent {
  @Column({ nullable: true })
  tallerIncluido?: boolean;

  @Column({ type: 'decimal', nullable: true })
  precioEntrada?: number;

  @Column({ type: 'simple-array', nullable: true })
  instructores?: string[];
}
