import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ default: 'Cartagena' })
  ciudad: string;

  @Column({ type: 'decimal', nullable: true })
  lat: number;

  @Column({ type: 'decimal', nullable: true })
  lng: number;

  @Column({ type: 'int', nullable: true })
  aforoMaximo: number;

  @Column({ type: 'simple-array' })
  estilos: string[];
}
