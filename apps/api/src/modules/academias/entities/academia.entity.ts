import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Academia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'city', nullable: true })
  city?: string;
}
