import { AcademiasService } from './academias.service';
import { CreateAcademiaDto } from './dtos/create-academia.dto';
export declare class AcademiasController {
    private service;
    constructor(service: AcademiasService);
    findAll(): Promise<import("./entities/academia.entity").Academia[]>;
    create(dto: CreateAcademiaDto): Promise<import("./entities/academia.entity").Academia>;
    update(id: string, dto: Partial<CreateAcademiaDto>): Promise<import("./entities/academia.entity").Academia>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=academias.controller.d.ts.map