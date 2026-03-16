"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const calendar_service_1 = require("./calendar.service");
const create_event_dto_1 = require("./dtos/create-event.dto");
const update_event_dto_1 = require("./dtos/update-event.dto");
let CalendarController = class CalendarController {
    constructor(calendarService) {
        this.calendarService = calendarService;
    }
    async createEvent(req, createEventDto) {
        return this.calendarService.createEvent(req.user.id, createEventDto);
    }
    async getEvents(req, startDate, endDate) {
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return this.calendarService.getEvents(req.user.id, start, end);
    }
    async getEvent(eventId) {
        return this.calendarService.getEvent(eventId);
    }
    async updateEvent(eventId, updateEventDto) {
        return this.calendarService.updateEvent(eventId, updateEventDto);
    }
    async deleteEvent(eventId) {
        await this.calendarService.deleteEvent(eventId);
        return { message: 'Event deleted' };
    }
};
exports.CalendarController = CalendarController;
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('events'),
    (0, swagger_1.ApiOperation)({ summary: 'Create calendar event' }),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, create_event_dto_1.CreateEventDto]),
    tslib_1.__metadata("design:returntype", Promise)
], CalendarController.prototype, "createEvent", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('events'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user events' }),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Query)('startDate')),
    tslib_1.__param(2, (0, common_1.Query)('endDate')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], CalendarController.prototype, "getEvents", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('events/:eventId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get event details' }),
    tslib_1.__param(0, (0, common_1.Param)('eventId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CalendarController.prototype, "getEvent", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('events/:eventId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update event' }),
    tslib_1.__param(0, (0, common_1.Param)('eventId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto]),
    tslib_1.__metadata("design:returntype", Promise)
], CalendarController.prototype, "updateEvent", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('events/:eventId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete event' }),
    tslib_1.__param(0, (0, common_1.Param)('eventId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CalendarController.prototype, "deleteEvent", null);
exports.CalendarController = CalendarController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Calendar'),
    (0, common_1.Controller)('api/calendar'),
    (0, swagger_1.ApiBearerAuth)(),
    tslib_1.__metadata("design:paramtypes", [calendar_service_1.CalendarService])
], CalendarController);
//# sourceMappingURL=calendar.controller.js.map