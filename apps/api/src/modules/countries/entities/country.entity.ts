import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'code', length: 2, unique: true })
  code: string;

  @Column({ name: 'capital' })
  capital: string;

  @Column({ name: 'lat', type: 'decimal', precision: 8, scale: 4, nullable: true })
  lat: number | null;

  @Column({ name: 'lng', type: 'decimal', precision: 8, scale: 4, nullable: true })
  lng: number | null;
}
