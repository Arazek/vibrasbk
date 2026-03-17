import { Injectable, OnApplicationBootstrap, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from './entities/venue.entity';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { UpdateVenueDto } from './dtos/update-venue.dto';

const SEED_VENUES = [
  { name: 'Alma',           city: 'Cartagena', lat: 10.391, lng: -75.479, maxCapacity: 80,  styles: ['salsa_cubana', 'bachata_sensual'] },
  { name: 'El Almacén',    city: 'Cartagena', lat: 10.4,   lng: -75.497, maxCapacity: 120, styles: ['salsa_linea', 'salsa_cubana'] },
  { name: 'El Musical',    city: 'Cartagena', lat: 10.396, lng: -75.484, maxCapacity: 100, styles: ['bachata_tradicional', 'salsa_cubana'] },
  { name: 'Bondi',         city: 'Cartagena', lat: 10.388, lng: -75.475, maxCapacity: 60,  styles: ['bachata_sensual', 'bachata_tradicional'] },
  { name: 'Cabaña',        city: 'Cartagena', lat: 10.402, lng: -75.502, maxCapacity: 90,  styles: ['salsa_linea', 'bachata_sensual'] },
  { name: 'Blanco y Negro',city: 'Cartagena', lat: 10.393, lng: -75.481, maxCapacity: 150, styles: ['salsa_cubana', 'salsa_linea'] },
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
      name: dto.name,
      city: dto.city ?? 'Cartagena',
      lat: dto.lat,
      lng: dto.lng,
      maxCapacity: dto.maxCapacity,
      styles: dto.styles ?? [],
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
