import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
  LEADER = 'leader',
  FOLLOWER = 'follower',
  SWITCH = 'switch',
  ADMIN = 'admin',
}

export enum Level {
  BEGINNER = 'beginner',
  INITIATION = 'initiation',
  COMFORTABLE = 'comfortable',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum Estilo {
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

  @Column({ name: 'ciudad', default: 'Cartagena' })
  city: string;

  @Column({ type: 'enum', enum: Role, name: 'rol' })
  role: Role;

  @Column({ type: 'enum', enum: Level, name: 'nivel' })
  level: Level;

  @Column({ name: 'estilos', type: 'simple-array' })
  styles: string[];

  // UUID referencing the Academia entity
  @Column({ name: 'academia_id', nullable: true })
  academyId?: string;

  @Column({ name: 'fcm_token', nullable: true })
  fcmToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
