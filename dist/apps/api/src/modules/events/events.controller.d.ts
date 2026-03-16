import { EventsService } from './events.service';
import { VotesService } from '../votes/votes.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
export declare class EventsController {
    private eventsService;
    private votesService;
    constructor(eventsService: EventsService, votesService: VotesService);
    getWeeklyEvents(req: any, tipo?: string): Promise<import("./events.service").EnrichedEvent[]>;
    findOne(id: string, req: any): Promise<import("./events.service").EnrichedEvent | null>;
    getAnalytics(id: string, req: any): Promise<import("../votes/prediction.service").PredictionResult>;
    createEvent(dto: CreateEventDto): Promise<import("./entities/recurring-event.entity").RecurringEvent>;
    updateEvent(id: string, dto: UpdateEventDto): Promise<import("./entities/recurring-event.entity").RecurringEvent>;
    removeEvent(id: string): Promise<void>;
    uploadPhoto(id: string, file: Express.Multer.File): Promise<import("./entities/recurring-event.entity").RecurringEvent>;
}
//# sourceMappingURL=events.controller.d.ts.map