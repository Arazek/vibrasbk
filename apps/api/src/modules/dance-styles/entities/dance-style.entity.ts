import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DanceStyle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column({ name: 'nombre' })
  name: string;

  @Column({ name: 'activo', default: true })
  active: boolean;
}
