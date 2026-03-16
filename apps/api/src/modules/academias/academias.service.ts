import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Academia } from './entities/academia.entity';
import { CreateAcademiaDto } from './dtos/create-academia.dto';

@Injectable()
export class AcademiasService {
  constructor(
    @InjectRepository(Academia)
    private repo: Repository<Academia>,
  ) {}

  findAll(): Promise<Academia[]> {
    return this.repo.find({ order: { nombre: 'ASC' } });
  }

  findOne(id: string): Promise<Academia | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(dto: CreateAcademiaDto): Promise<Academia> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: Partial<CreateAcademiaDto>): Promise<Academia> {
    const academia = await this.repo.findOne({ where: { id } });
    if (!academia) throw new NotFoundException(`Academia ${id} no encontrada`);
    Object.assign(academia, dto);
    return this.repo.save(academia);
  }

  async remove(id: string): Promise<void> {
    const academia = await this.repo.findOne({ where: { id } });
    if (!academia) throw new NotFoundException(`Academia ${id} no encontrada`);
    await this.repo.remove(academia);
  }
}
