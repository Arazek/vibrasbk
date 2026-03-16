import { Repository } from 'typeorm';
import { CalendarEvent } from './entities/calendar-event.entity';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
export declare class CalendarService {
    private eventsRepository;
    constructor(eventsRepository: Repository<CalendarEvent>);
    createEvent(userId: string, createEventDto: CreateEventDto): Promise<CalendarEvent>;
    getEvents(userId: string, startDate?: Date, endDate?: Date): Promise<CalendarEvent[]>;
    getEvent(eventId: string): Promise<CalendarEvent | null>;
    updateEvent(eventId: string, updateEventDto: UpdateEventDto): Promise<CalendarEvent>;
    deleteEvent(eventId: string): Promise<void>;
}
//# sourceMappingURL=calendar.service.d.ts.map