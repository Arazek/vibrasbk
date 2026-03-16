import { Injectable, OnApplicationBootstrap, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DanceStyle } from './entities/dance-style.entity';
import { CreateDanceStyleDto } from './dtos/create-dance-style.dto';

const SEED_STYLES = [
  { slug: 'bachata_sensual',     nombre: 'Bachata Sensual' },
  { slug: 'bachata_tradicional', nombre: 'Bachata Tradicional' },
  { slug: 'salsa_linea',         nombre: 'Salsa en Línea' },
  { slug: 'salsa_cubana',        nombre: 'Salsa Cubana' },
];

@Injectable()
export class DanceStylesService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(DanceStyle)
    private repo: Repository<DanceStyle>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.repo.count();
    if (count === 0) {
      await this.repo.save(SEED_STYLES.map((s) => this.repo.create(s)));
    }
  }

  findAll(): Promise<DanceStyle[]> {
    return this.repo.find({ where: { activo: true }, order: { nombre: 'ASC' } });
  }

  findOne(id: string): Promise<DanceStyle | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(dto: CreateDanceStyleDto): Promise<DanceStyle> {
    return this.repo.save(this.repo.create({ ...dto, activo: dto.activo ?? true }));
  }

  async update(id: string, dto: Partial<CreateDanceStyleDto>): Promise<DanceStyle> {
    const style = await this.repo.findOne({ where: { id } });
    if (!style) throw new NotFoundException(`Estilo ${id} no encontrado`);
    Object.assign(style, dto);
    return this.repo.save(style);
  }

  async remove(id: string): Promise<void> {
    const style = await this.repo.findOne({ where: { id } });
    if (!style) throw new NotFoundException(`Estilo ${id} no encontrado`);
    await this.repo.remove(style);
  }
}
