import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Rol {
  LEADER = 'leader',
  FOLLOWER = 'follower',
  SWITCH = 'switch',
  ADMIN = 'admin',
}

export enum Nivel {
  NUEVO = 'nuevo',
  INICIACION = 'iniciacion',
  SOCIAL_COMODO = 'social_comodo',
  INTERMEDIO = 'intermedio',
  AVANZADO = 'avanzado',
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

  @Column({ default: 'Cartagena' })
  ciudad: string;

  @Column({ type: 'enum', enum: Rol })
  rol: Rol;

  @Column({ type: 'enum', enum: Nivel })
  nivel: Nivel;

  @Column({ type: 'simple-array' })
  estilos: string[];

  // UUID referencing the Academia entity
  @Column({ nullable: true })
  academiaId?: string;

  @Column({ nullable: true })
  fcmToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
