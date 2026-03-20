import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'city', default: 'Cartagena' })
  city: string;

  @Column({ type: 'decimal', nullable: true })
  lat: number;

  @Column({ type: 'decimal', nullable: true })
  lng: number;

  @Column({ name: 'max_capacity', type: 'int', nullable: true })
  maxCapacity: number;

  @Column({ name: 'styles', type: 'simple-array' })
  styles: string[];
}
