import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

export enum VoteEstado {
  VOY = 'voy',
  TAL_VEZ = 'tal_vez',
  NO_VOY = 'no_voy',
}

@Entity('intention_votes')
@Unique(['userId', 'eventId', 'semanaIso'])
export class IntentionVote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'event_id' })
  eventId: string;

  @Column({ name: 'semana_iso' })
  semanaIso: string;

  @Column({ type: 'enum', enum: VoteEstado })
  estado: VoteEstado;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
