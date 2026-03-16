import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Venue } from './entities/venue.entity';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { UpdateVenueDto } from './dtos/update-venue.dto';
export declare class VenuesService implements OnApplicationBootstrap {
    private venuesRepository;
    constructor(venuesRepository: Repository<Venue>);
    onApplicationBootstrap(): Promise<void>;
    findAll(): Promise<Venue[]>;
    findOne(id: string): Promise<Venue | null>;
    create(dto: CreateVenueDto): Promise<Venue>;
    update(id: string, dto: UpdateVenueDto): Promise<Venue>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=venues.service.d.ts.map