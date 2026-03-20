import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DanceStyle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'active', default: true })
  active: boolean;
}
