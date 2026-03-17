import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Academia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nombre' })
  name: string;

  @Column({ name: 'ciudad', nullable: true })
  city?: string;
}
