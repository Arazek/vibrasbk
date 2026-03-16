"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const calendar_event_entity_1 = require("./entities/calendar-event.entity");
let CalendarService = class CalendarService {
    constructor(eventsRepository) {
        this.eventsRepository = eventsRepository;
    }
    async createEvent(userId, createEventDto) {
        const event = this.eventsRepository.create({
            ...createEventDto,
            createdBy: userId,
        });
        return this.eventsRepository.save(event);
    }
    async getEvents(userId, startDate, endDate) {
        const query = this.eventsRepository.createQueryBuilder('event');
        query.where('event.createdBy = :userId OR :userId = ANY(event.attendeeIds)', { userId });
        if (startDate && endDate) {
            query.andWhere('event.startTime >= :startDate', { startDate });
            query.andWhere('event.endTime <= :endDate', { endDate });
        }
        return query.orderBy('event.startTime', 'ASC').getMany();
    }
    async getEvent(eventId) {
        return this.eventsRepository.findOne({ where: { id: eventId } });
    }
    async updateEvent(eventId, updateEventDto) {
        await this.eventsRepository.update(eventId, updateEventDto);
        return this.getEvent(eventId);
    }
    async deleteEvent(eventId) {
        await this.eventsRepository.delete(eventId);
    }
};
exports.CalendarService = CalendarService;
exports.CalendarService = CalendarService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(calendar_event_entity_1.CalendarEvent)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], CalendarService);
//# sourceMappingURL=calendar.service.js.map