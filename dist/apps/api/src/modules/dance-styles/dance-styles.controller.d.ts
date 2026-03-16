import { DanceStylesService } from './dance-styles.service';
import { CreateDanceStyleDto } from './dtos/create-dance-style.dto';
export declare class DanceStylesController {
    private service;
    constructor(service: DanceStylesService);
    findAll(): Promise<import("./entities/dance-style.entity").DanceStyle[]>;
    create(dto: CreateDanceStyleDto): Promise<import("./entities/dance-style.entity").DanceStyle>;
    update(id: string, dto: Partial<CreateDanceStyleDto>): Promise<import("./entities/dance-style.entity").DanceStyle>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=dance-styles.controller.d.ts.map