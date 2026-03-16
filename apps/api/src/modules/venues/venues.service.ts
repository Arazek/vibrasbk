import { Injectable, OnApplicationBootstrap, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from './entities/venue.entity';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { UpdateVenueDto } from './dtos/update-venue.dto';

const SEED_VENUES = [
  { nombre: 'Alma',           ciudad: 'Cartagena', lat: 10.391, lng: -75.479, aforoMaximo: 80,  estilos: ['salsa_cubana', 'bachata_sensual'] },
  { nombre: 'El Almacén',    ciudad: 'Cartagena', lat: 10.4,   lng: -75.497, aforoMaximo: 120, estilos: ['salsa_linea', 'salsa_cubana'] },
  { nombre: 'El Musical',    ciudad: 'Cartagena', lat: 10.396, lng: -75.484, aforoMaximo: 100, estilos: ['bachata_tradicional', 'salsa_cubana'] },
  { nombre: 'Bondi',         ciudad: 'Cartagena', lat: 10.388, lng: -75.475, aforoMaximo: 60,  estilos: ['bachata_sensual', 'bachata_tradicional'] },
  { nombre: 'Cabaña',        ciudad: 'Cartagena', lat: 10.402, lng: -75.502, aforoMaximo: 90,  estilos: ['salsa_linea', 'bachata_sensual'] },
  { nombre: 'Blanco y Negro',ciudad: 'Cartagena', lat: 10.393, lng: -75.481, aforoMaximo: 150, estilos: ['salsa_cubana', 'salsa_linea'] },
];

@Injectable()
export class VenuesService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Venue)
    private venuesRepository: Repository<Venue>
  ) {}

  async onApplicationBootstrap() {
    const count = await this.venuesRepository.count();
    if (count === 0) {
      await this.venuesRepository.save(
        SEED_VENUES.map((v) => this.venuesRepository.create(v))
      );
    }
  }

  findAll(): Promise<Venue[]> {
    return this.venuesRepository.find();
  }

  findOne(id: string): Promise<Venue | null> {
    return this.venuesRepository.findOne({ where: { id } });
  }

  async create(dto: CreateVenueDto): Promise<Venue> {
    const venue = this.venuesRepository.create({
      nombre: dto.nombre,
      ciudad: dto.ciudad ?? 'Cartagena',
      lat: dto.lat,
      lng: dto.lng,
      aforoMaximo: dto.aforoMaximo,
      estilos: dto.estilos ?? [],
    });
    return this.venuesRepository.save(venue);
  }

  async update(id: string, dto: UpdateVenueDto): Promise<Venue> {
    const venue = await this.venuesRepository.findOne({ where: { id } });
    if (!venue) throw new NotFoundException(`Venue ${id} no encontrado.`);
    Object.assign(venue, dto);
    return this.venuesRepository.save(venue);
  }

  async remove(id: string): Promise<void> {
    const venue = await this.venuesRepository.findOne({ where: { id } });
    if (!venue) throw new NotFoundException(`Venue ${id} no encontrado.`);
    await this.venuesRepository.remove(venue);
  }
}
