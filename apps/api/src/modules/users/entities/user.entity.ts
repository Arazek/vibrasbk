import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DancingRole {
  LEADER = 'leader',
  FOLLOWER = 'follower',
  SWITCH = 'switch',
}

export enum ApplicationRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export enum Level {
  BEGINNER = 'beginner',
  INITIATION = 'initiation',
  COMFORTABLE = 'comfortable',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum UserDanceStyle {
  BACHATA_SENSUAL = 'bachata_sensual',
  BACHATA_TRADICIONAL = 'bachata_tradicional',
  SALSA_LINEA = 'salsa_linea',
  SALSA_CUBANA = 'salsa_cubana',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  alias: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ name: 'city', default: 'Cartagena' })
  city: string;

  @Column({ type: 'enum', enum: DancingRole, name: 'dancing_role', default: DancingRole.LEADER })
  dancingRole: DancingRole;

  @Column({ type: 'enum', enum: ApplicationRole, name: 'application_role', default: ApplicationRole.USER })
  applicationRole: ApplicationRole;

  @Column({ type: 'enum', enum: Level, name: 'level' })
  level: Level;

  @Column({ name: 'styles', type: 'simple-array' })
  styles: string[];

  // UUID referencing the Academia entity
  @Column({ name: 'academy_id', nullable: true })
  academyId?: string;

  @Column({ name: 'fcm_token', nullable: true })
  fcmToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
