import { Injectable, OnApplicationBootstrap, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecurringEvent } from './entities/recurring-event.entity';
import { SocialEvent } from './entities/social-event.entity';
import { IntensivoEvent } from './entities/intensivo-event.entity';
import { CongresoEvent } from './entities/congreso-event.entity';
import { VenuesService } from '../venues/venues.service';
import { VotesService, EventAggregate } from '../votes/votes.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';

/**
 * Returns the ISO week string for a given date, e.g. "2025-W22"
 */
export function toIsoWeek(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '00')}`;
}

/**
 * Returns the Monday of the ISO week that contains `date`.
 */
function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Given a recurring event's dayOfWeek (0=Mon..6=Sun) and startTime ("HH:MM"),
 * returns the concrete Date for the current ISO week.
 */
export function projectToCurrentWeek(dayOfWeek: number, startTime: string): Date {
  const monday = getMondayOfWeek(new Date());
  const eventDate = new Date(monday);
  eventDate.setDate(monday.getDate() + dayOfWeek);
  const [hours, minutes] = startTime.split(':').map(Number);
  eventDate.setHours(hours, minutes, 0, 0);
  return eventDate;
}

export type EnrichedEvent = RecurringEvent & {
  eventDate: string;
  eventStart: Date;
  isoWeek: string;
} & EventAggregate;

@Injectable()
export class EventsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(RecurringEvent)
    private eventsRepository: Repository<RecurringEvent>,
    private venuesService: VenuesService,
    private votesService: VotesService
  ) {}

  async onApplicationBootstrap() {
    const count = await this.eventsRepository.count();
    if (count === 0) {
      await this.seedDefaults();
    }
    await this.backfillNullType();
    await this.refreshNextDate();
  }

  /**
   * Events seeded before STI was introduced have type = NULL.
   * All default seeded events are social events, so backfill them.
   */
  private async backfillNullType() {
    await this.eventsRepository.query(
      `UPDATE recurring_events SET tipo = 'social' WHERE tipo IS NULL`
    );
    // Rename legacy 'taller' discriminator to 'intensive'
    await this.eventsRepository.query(
      `UPDATE recurring_events SET tipo = 'intensive' WHERE tipo = 'taller'`
    );
    // Rename legacy 'intensivo' discriminator to 'intensive'
    await this.eventsRepository.query(
      `UPDATE recurring_events SET tipo = 'intensive' WHERE tipo = 'intensivo'`
    );
    // Rename legacy 'congreso' discriminator to 'congress'
    await this.eventsRepository.query(
      `UPDATE recurring_events SET tipo = 'congress' WHERE tipo = 'congreso'`
    );
  }

  private async seedDefaults() {
    const venues = await this.venuesService.findAll();
    if (venues.length === 0) return;

    const defaults: Array<{ venueName: string; dayOfWeek: number; startTime: string }> = [
      { venueName: 'Alma',           dayOfWeek: 4, startTime: '21:00' },
      { venueName: 'El Almacén',     dayOfWeek: 5, startTime: '22:00' },
      { venueName: 'El Musical',     dayOfWeek: 5, startTime: '21:30' },
      { venueName: 'Bondi',          dayOfWeek: 3, startTime: '22:00' },
      { venueName: 'Cabaña',         dayOfWeek: 4, startTime: '22:30' },
      { venueName: 'Blanco y Negro', dayOfWeek: 6, startTime: '21:00' },
    ];

    for (const def of defaults) {
      const venue = venues.find((v) => v.name === def.venueName);
      if (!venue) continue;
      const ev = new SocialEvent();
      ev.venueId = venue.id;
      ev.dayOfWeek = def.dayOfWeek;
      ev.startTime = def.startTime;
      ev.styles = venue.styles;
      ev.active = true;
      await this.eventsRepository.save(ev);
    }
  }

  /**
   * Calculates and persists the real date of the current week for each recurring event.
   * Called at API startup and can also be called from a weekly cron.
   */
  async refreshNextDate() {
    const events = await this.eventsRepository.find();
    for (const ev of events) {
      // Only project recurring events (socials) — one-offs use startDate directly
      if (ev.dayOfWeek != null && ev.startTime) {
        const projected = projectToCurrentWeek(ev.dayOfWeek, ev.startTime);
        ev.nextDate = projected.toISOString().split('T')[0];
      } else if (ev.startDate) {
        ev.nextDate = ev.startDate;
      }
    }
    await this.eventsRepository.save(events);
  }

  async findAllActive(type?: string): Promise<RecurringEvent[]> {
    const events = await this.eventsRepository.find({ where: { active: true } });
    if (!type) return events;
    const classMap: Record<string, Function> = {
      social:    SocialEvent,
      intensive: IntensivoEvent,
      congress:  CongresoEvent,
    };
    const EntityClass = classMap[type];
    return EntityClass ? events.filter(ev => ev instanceof EntityClass) : [];
  }

  async findOne(id: string): Promise<RecurringEvent | null> {
    return this.eventsRepository.findOne({ where: { id, active: true } });
  }

  /**
   * Returns a single event projected to the current week and enriched with vote data.
   */
  async getEventDetail(id: string, userId: string): Promise<EnrichedEvent | null> {
    const ev = await this.findOne(id);
    if (!ev) return null;

    const isoWeek = toIsoWeek(new Date());
    const eventStart = ev.dayOfWeek != null && ev.startTime
      ? projectToCurrentWeek(ev.dayOfWeek, ev.startTime)
      : new Date(ev.startDate ?? new Date().toISOString().split('T')[0]);
    const projected = { ...ev, eventDate: eventStart.toISOString().split('T')[0], eventStart, isoWeek };

    const capacityMap = new Map([[ev.id, ev.venue?.maxCapacity ?? 0]]);
    const aggregates = await this.votesService.getAggregatesForEvents([ev.id], isoWeek, userId, capacityMap);
    return {
      ...projected,
      ...(aggregates.get(ev.id) ?? {
        totalInterested: 0,
        goingCount: 0,
        maybeCount: 0,
        userVote: null,
        userVoteId: null,
        vibeColor: 'quiet' as const,
        roleBalance: { leadersPercent: 0, followersPercent: 0, switchesPercent: 0, balance: 'balanced' as const },
      }),
    };
  }

  /**
   * Projects all active recurring events to the current ISO week,
   * enriched with vote aggregates and vibe color.
   */
  // ─── Admin CRUD ────────────────────────────────────────────────────────────

  async createEvent(dto: CreateEventDto): Promise<RecurringEvent> {
    let ev: RecurringEvent;
    if (dto.type === 'intensive') {
      const t = new IntensivoEvent();
      t.title = dto.title;
      t.level = dto.level;
      t.price = dto.price;
      t.instructors = dto.instructors;
      t.endDate = dto.endDate;
      ev = t;
    } else if (dto.type === 'congress') {
      const c = new CongresoEvent();
      c.title = dto.title;
      c.locality = dto.locality;
      c.durationDays = dto.durationDays;
      c.prices = dto.prices;
      c.websiteUrl = dto.websiteUrl;
      c.endDate = dto.endDate;
      ev = c;
    } else {
      const s = new SocialEvent();
      s.workshopIncluded = dto.workshopIncluded;
      s.entryPrice = dto.entryPrice;
      s.instructors = dto.instructors;
      ev = s;
    }
    ev.venueId = dto.venueId;
    ev.dayOfWeek = dto.dayOfWeek ?? null;
    ev.startTime = dto.startTime ?? '';
    ev.startDate = dto.startDate;
    ev.name = dto.name ?? '';
    ev.styles = dto.styles ?? [];
    ev.active = true;
    return this.eventsRepository.save(ev);
  }

  async updateEvent(id: string, dto: UpdateEventDto): Promise<RecurringEvent> {
    const ev = await this.eventsRepository.findOne({ where: { id } });
    if (!ev) throw new NotFoundException(`Evento ${id} no encontrado.`);
    Object.assign(ev, dto);
    return this.eventsRepository.save(ev);
  }

  async removeEvent(id: string): Promise<void> {
    const ev = await this.eventsRepository.findOne({ where: { id } });
    if (!ev) throw new NotFoundException(`Evento ${id} no encontrado.`);
    ev.active = false;
    await this.eventsRepository.save(ev);
  }

  async updatePhoto(id: string, photoUrl: string): Promise<RecurringEvent> {
    const ev = await this.eventsRepository.findOne({ where: { id } });
    if (!ev) throw new NotFoundException(`Evento ${id} no encontrado.`);
    ev.photoUrl = photoUrl;
    return this.eventsRepository.save(ev);
  }

  // ─── Weekly agenda ─────────────────────────────────────────────────────────

  async getWeeklyEvents(userId: string, type?: string): Promise<EnrichedEvent[]> {
    const events = await this.findAllActive(type);
    const isoWeek = toIsoWeek(new Date());

    const projected = events.map((ev) => {
      const eventStart = ev.dayOfWeek != null && ev.startTime
        ? projectToCurrentWeek(ev.dayOfWeek, ev.startTime)
        : new Date(ev.startDate ?? new Date().toISOString().split('T')[0]);
      return { ...ev, eventDate: eventStart.toISOString().split('T')[0], eventStart, isoWeek };
    });

    const capacityMap = new Map(events.map((ev) => [ev.id, ev.venue?.maxCapacity ?? 0]));
    const aggregates = await this.votesService.getAggregatesForEvents(
      events.map((e) => e.id),
      isoWeek,
      userId,
      capacityMap
    );

    return projected.map((ev) => ({
      ...ev,
      ...(aggregates.get(ev.id) ?? {
        totalInterested: 0,
        goingCount: 0,
        maybeCount: 0,
        userVote: null,
        userVoteId: null,
        vibeColor: 'quiet' as const,
        roleBalance: { leadersPercent: 0, followersPercent: 0, switchesPercent: 0, balance: 'balanced' as const },
      }),
    }));
  }
}
