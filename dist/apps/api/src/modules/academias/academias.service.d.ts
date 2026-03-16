import { Repository } from 'typeorm';
import { Academia } from './entities/academia.entity';
import { CreateAcademiaDto } from './dtos/create-academia.dto';
export declare class AcademiasService {
    private repo;
    constructor(repo: Repository<Academia>);
    findAll(): Promise<Academia[]>;
    findOne(id: string): Promise<Academia | null>;
    create(dto: CreateAcademiaDto): Promise<Academia>;
    update(id: string, dto: Partial<CreateAcademiaDto>): Promise<Academia>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=academias.service.d.ts.map