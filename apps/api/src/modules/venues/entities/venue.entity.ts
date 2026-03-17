import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nombre' })
  name: string;

  @Column({ name: 'ciudad', default: 'Cartagena' })
  city: string;

  @Column({ type: 'decimal', nullable: true })
  lat: number;

  @Column({ type: 'decimal', nullable: true })
  lng: number;

  @Column({ name: 'aforo_maximo', type: 'int', nullable: true })
  maxCapacity: number;

  @Column({ name: 'estilos', type: 'simple-array' })
  styles: string[];
}
