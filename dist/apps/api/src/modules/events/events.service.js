"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = exports.projectToCurrentWeek = exports.toIsoWeek = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recurring_event_entity_1 = require("./entities/recurring-event.entity");
const social_event_entity_1 = require("./entities/social-event.entity");
const intensivo_event_entity_1 = require("./entities/intensivo-event.entity");
const congreso_event_entity_1 = require("./entities/congreso-event.entity");
const venues_service_1 = require("../venues/venues.service");
const votes_service_1 = require("../votes/votes.service");
/**
 * Returns the ISO week string for a given date, e.g. "2025-W22"
 */
function toIsoWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '00')}`;
}
exports.toIsoWeek = toIsoWeek;
/**
 * Returns the Monday of the ISO week that contains `date`.
 */
function getMondayOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay(); // 0 = Sun
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}
/**
 * Given a recurring event's diaSemana (0=Mon..6=Sun) and horaInicio ("HH:MM"),
 * returns the concrete Date for the current ISO week.
 */
function projectToCurrentWeek(diaSemana, horaInicio) {
    const monday = getMondayOfWeek(new Date());
    const eventDate = new Date(monday);
    eventDate.setDate(monday.getDate() + diaSemana);
    const [hours, minutes] = horaInicio.split(':').map(Number);
    eventDate.setHours(hours, minutes, 0, 0);
    return eventDate;
}
exports.projectToCurrentWeek = projectToCurrentWeek;
let EventsService = class EventsService {
    constructor(eventsRepository, venuesService, votesService) {
        this.eventsRepository = eventsRepository;
        this.venuesService = venuesService;
        this.votesService = votesService;
    }
    async onApplicationBootstrap() {
        const count = await this.eventsRepository.count();
        if (count === 0) {
            await this.seedDefaults();
        }
        await this.backfillNullTipo();
        await this.refreshProximaFecha();
    }
    /**
     * Events seeded before STI was introduced have tipo = NULL.
     * All default seeded events are social events, so backfill them.
     */
    async backfillNullTipo() {
        await this.eventsRepository.query(`UPDATE recurring_events SET tipo = 'social' WHERE tipo IS NULL`);
        // Rename legacy 'taller' discriminator to 'intensivo'
        await this.eventsRepository.query(`UPDATE recurring_events SET tipo = 'intensivo' WHERE tipo = 'taller'`);
    }
    async seedDefaults() {
        const venues = await this.venuesService.findAll();
        if (venues.length === 0)
            return;
        const defaults = [
            { nombreVenue: 'Alma', diaSemana: 4, horaInicio: '21:00' },
            { nombreVenue: 'El Almacén', diaSemana: 5, horaInicio: '22:00' },
            { nombreVenue: 'El Musical', diaSemana: 5, horaInicio: '21:30' },
            { nombreVenue: 'Bondi', diaSemana: 3, horaInicio: '22:00' },
            { nombreVenue: 'Cabaña', diaSemana: 4, horaInicio: '22:30' },
            { nombreVenue: 'Blanco y Negro', diaSemana: 6, horaInicio: '21:00' },
        ];
        for (const def of defaults) {
            const venue = venues.find((v) => v.nombre === def.nombreVenue);
            if (!venue)
                continue;
            const ev = new social_event_entity_1.SocialEvent();
            ev.venueId = venue.id;
            ev.diaSemana = def.diaSemana;
            ev.horaInicio = def.horaInicio;
            ev.estilos = venue.estilos;
            ev.activo = true;
            await this.eventsRepository.save(ev);
        }
    }
    /**
     * Calcula y persiste la fecha real de la semana actual para cada evento recurrente.
     * Se llama al arrancar el API y puede llamarse también desde un cron semanal.
     */
    async refreshProximaFecha() {
        const events = await this.eventsRepository.find();
        for (const ev of events) {
            // Only project recurring events (sociales) — puntuales use fechaInicio directly
            if (ev.diaSemana != null && ev.horaInicio) {
                const projected = projectToCurrentWeek(ev.diaSemana, ev.horaInicio);
                ev.proximaFecha = projected.toISOString().split('T')[0];
            }
            else if (ev.fechaInicio) {
                ev.proximaFecha = ev.fechaInicio;
            }
        }
        await this.eventsRepository.save(events);
    }
    async findAllActive(tipo) {
        const where = { activo: true };
        if (tipo)
            where['tipo'] = tipo;
        return this.eventsRepository.find({ where });
    }
    async findOne(id) {
        return this.eventsRepository.findOne({ where: { id, activo: true } });
    }
    /**
     * Returns a single event projected to the current week and enriched with vote data.
     */
    async getEventDetail(id, userId) {
        const ev = await this.findOne(id);
        if (!ev)
            return null;
        const semanaIso = toIsoWeek(new Date());
        const eventStart = ev.diaSemana != null && ev.horaInicio
            ? projectToCurrentWeek(ev.diaSemana, ev.horaInicio)
            : new Date(ev.fechaInicio ?? new Date().toISOString().split('T')[0]);
        const projected = { ...ev, eventDate: eventStart.toISOString().split('T')[0], eventStart, semanaIso };
        const aforoMap = new Map([[ev.id, ev.venue?.aforoMaximo ?? 0]]);
        const aggregates = await this.votesService.getAggregatesForEvents([ev.id], semanaIso, userId, aforoMap);
        return {
            ...projected,
            ...(aggregates.get(ev.id) ?? {
                totalInteresados: 0,
                voyCount: 0,
                talVezCount: 0,
                userVote: null,
                userVoteId: null,
                ambienteColor: 'flojo',
                roleBalance: { leadersPercent: 0, followersPercent: 0, switchesPercent: 0, balance: 'equilibrado' },
            }),
        };
    }
    /**
     * Projects all active recurring events to the current ISO week,
     * enriched with vote aggregates and ambiente color.
     */
    // ─── Admin CRUD ────────────────────────────────────────────────────────────
    async createEvent(dto) {
        let ev;
        if (dto.tipo === 'intensivo') {
            const t = new intensivo_event_entity_1.IntensivoEvent();
            t.titulo = dto.titulo;
            t.nivel = dto.nivel;
            t.precio = dto.precio;
            t.profesores = dto.profesores;
            t.fechaFin = dto.fechaFin;
            ev = t;
        }
        else if (dto.tipo === 'congreso') {
            const c = new congreso_event_entity_1.CongresoEvent();
            c.titulo = dto.titulo;
            c.localidad = dto.localidad;
            c.duracionDias = dto.duracionDias;
            c.precios = dto.precios;
            c.enlaceWeb = dto.enlaceWeb;
            c.fechaFin = dto.fechaFin;
            ev = c;
        }
        else {
            const s = new social_event_entity_1.SocialEvent();
            s.tallerIncluido = dto.tallerIncluido;
            s.precioEntrada = dto.precioEntrada;
            s.instructores = dto.instructores;
            ev = s;
        }
        ev.venueId = dto.venueId;
        ev.diaSemana = dto.diaSemana ?? null;
        ev.horaInicio = dto.horaInicio ?? '';
        ev.fechaInicio = dto.fechaInicio;
        ev.nombre = dto.nombre ?? '';
        ev.estilos = dto.estilos ?? [];
        ev.activo = true;
        return this.eventsRepository.save(ev);
    }
    async updateEvent(id, dto) {
        const ev = await this.eventsRepository.findOne({ where: { id } });
        if (!ev)
            throw new common_1.NotFoundException(`Evento ${id} no encontrado.`);
        Object.assign(ev, dto);
        return this.eventsRepository.save(ev);
    }
    async removeEvent(id) {
        const ev = await this.eventsRepository.findOne({ where: { id } });
        if (!ev)
            throw new common_1.NotFoundException(`Evento ${id} no encontrado.`);
        ev.activo = false;
        await this.eventsRepository.save(ev);
    }
    async updateFoto(id, fotoUrl) {
        const ev = await this.eventsRepository.findOne({ where: { id } });
        if (!ev)
            throw new common_1.NotFoundException(`Evento ${id} no encontrado.`);
        ev.fotoUrl = fotoUrl;
        return this.eventsRepository.save(ev);
    }
    // ─── Weekly agenda ─────────────────────────────────────────────────────────
    async getWeeklyEvents(userId, tipo) {
        const events = await this.findAllActive(tipo);
        const semanaIso = toIsoWeek(new Date());
        const projected = events.map((ev) => {
            const eventStart = ev.diaSemana != null && ev.horaInicio
                ? projectToCurrentWeek(ev.diaSemana, ev.horaInicio)
                : new Date(ev.fechaInicio ?? new Date().toISOString().split('T')[0]);
            return { ...ev, eventDate: eventStart.toISOString().split('T')[0], eventStart, semanaIso };
        });
        const aforoMap = new Map(events.map((ev) => [ev.id, ev.venue?.aforoMaximo ?? 0]));
        const aggregates = await this.votesService.getAggregatesForEvents(events.map((e) => e.id), semanaIso, userId, aforoMap);
        return projected.map((ev) => ({
            ...ev,
            ...(aggregates.get(ev.id) ?? {
                totalInteresados: 0,
                voyCount: 0,
                talVezCount: 0,
                userVote: null,
                userVoteId: null,
                ambienteColor: 'flojo',
                roleBalance: { leadersPercent: 0, followersPercent: 0, switchesPercent: 0, balance: 'equilibrado' },
            }),
        }));
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(recurring_event_entity_1.RecurringEvent)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        venues_service_1.VenuesService,
        votes_service_1.VotesService])
], EventsService);
//# sourceMappingURL=events.service.js.map