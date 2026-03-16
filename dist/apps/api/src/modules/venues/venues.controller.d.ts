import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { UpdateVenueDto } from './dtos/update-venue.dto';
export declare class VenuesController {
    private venuesService;
    constructor(venuesService: VenuesService);
    findAll(): Promise<import("./entities/venue.entity").Venue[]>;
    findOne(id: string): Promise<import("./entities/venue.entity").Venue | null>;
    create(dto: CreateVenueDto): Promise<import("./entities/venue.entity").Venue>;
    update(id: string, dto: UpdateVenueDto): Promise<import("./entities/venue.entity").Venue>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=venues.controller.d.ts.map