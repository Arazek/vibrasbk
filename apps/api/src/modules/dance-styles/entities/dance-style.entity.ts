import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DanceStyle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  nombre: string;

  @Column({ default: true })
  activo: boolean;
}
