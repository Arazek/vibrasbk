import { CalendarService } from './calendar.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
export declare class CalendarController {
    private calendarService;
    constructor(calendarService: CalendarService);
    createEvent(req: any, createEventDto: CreateEventDto): Promise<import("./entities/calendar-event.entity").CalendarEvent>;
    getEvents(req: any, startDate?: string, endDate?: string): Promise<import("./entities/calendar-event.entity").CalendarEvent[]>;
    getEvent(eventId: string): Promise<import("./entities/calendar-event.entity").CalendarEvent | null>;
    updateEvent(eventId: string, updateEventDto: UpdateEventDto): Promise<import("./entities/calendar-event.entity").CalendarEvent>;
    deleteEvent(eventId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=calendar.controller.d.ts.map