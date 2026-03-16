import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RecurringEvent } from './entities/recurring-event.entity';
import { VenuesService } from '../venues/venues.service';
import { VotesService, EventAggregate } from '../votes/votes.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
/**
 * Returns the ISO week string for a given date, e.g. "2025-W22"
 */
export declare function toIsoWeek(date: Date): string;
/**
 * Given a recurring event's diaSemana (0=Mon..6=Sun) and horaInicio ("HH:MM"),
 * returns the concrete Date for the current ISO week.
 */
export declare function projectToCurrentWeek(diaSemana: number, horaInicio: string): Date;
export type EnrichedEvent = RecurringEvent & {
    eventDate: string;
    eventStart: Date;
    semanaIso: string;
} & EventAggregate;
export declare class EventsService implements OnApplicationBootstrap {
    private eventsRepository;
    private venuesService;
    private votesService;
    constructor(eventsRepository: Repository<RecurringEvent>, venuesService: VenuesService, votesService: VotesService);
    onApplicationBootstrap(): Promise<void>;
    /**
     * Events seeded before STI was introduced have tipo = NULL.
     * All default seeded events are social events, so backfill them.
     */
    private backfillNullTipo;
    private seedDefaults;
    /**
     * Calcula y persiste la fecha real de la semana actual para cada evento recurrente.
     * Se llama al arrancar el API y puede llamarse también desde un cron semanal.
     */
    refreshProximaFecha(): Promise<void>;
    findAllActive(tipo?: string): Promise<RecurringEvent[]>;
    findOne(id: string): Promise<RecurringEvent | null>;
    /**
     * Returns a single event projected to the current week and enriched with vote data.
     */
    getEventDetail(id: string, userId: string): Promise<EnrichedEvent | null>;
    /**
     * Projects all active recurring events to the current ISO week,
     * enriched with vote aggregates and ambiente color.
     */
    createEvent(dto: CreateEventDto): Promise<RecurringEvent>;
    updateEvent(id: string, dto: UpdateEventDto): Promise<RecurringEvent>;
    removeEvent(id: string): Promise<void>;
    updateFoto(id: string, fotoUrl: string): Promise<RecurringEvent>;
    getWeeklyEvents(userId: string, tipo?: string): Promise<EnrichedEvent[]>;
}
//# sourceMappingURL=events.service.d.ts.map