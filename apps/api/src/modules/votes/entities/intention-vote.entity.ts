import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

export enum VoteStatus {
  GOING = 'going',
  MAYBE = 'maybe',
  NOT_GOING = 'not_going',
}

@Entity('intention_votes')
@Unique(['userId', 'eventId', 'isoWeek'])
export class IntentionVote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'event_id' })
  eventId: string;

  @Column({ name: 'semana_iso' })
  isoWeek: string;

  @Column({ type: 'enum', enum: VoteStatus, name: 'estado' })
  status: VoteStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
