import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DanceStyle } from './entities/dance-style.entity';
import { CreateDanceStyleDto } from './dtos/create-dance-style.dto';
export declare class DanceStylesService implements OnApplicationBootstrap {
    private repo;
    constructor(repo: Repository<DanceStyle>);
    onApplicationBootstrap(): Promise<void>;
    findAll(): Promise<DanceStyle[]>;
    findOne(id: string): Promise<DanceStyle | null>;
    create(dto: CreateDanceStyleDto): Promise<DanceStyle>;
    update(id: string, dto: Partial<CreateDanceStyleDto>): Promise<DanceStyle>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=dance-styles.service.d.ts.map