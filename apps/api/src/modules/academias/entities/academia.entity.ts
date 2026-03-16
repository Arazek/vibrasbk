import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Academia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  ciudad?: string;
}
