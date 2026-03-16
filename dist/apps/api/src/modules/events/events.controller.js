"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
const events_service_1 = require("./events.service");
const votes_service_1 = require("../votes/votes.service");
const create_event_dto_1 = require("./dtos/create-event.dto");
const update_event_dto_1 = require("./dtos/update-event.dto");
const photoStorage = (0, multer_1.diskStorage)({
    destination: (0, path_1.join)(process.cwd(), 'apps', 'api', 'uploads', 'events'),
    filename: (_req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${unique}${(0, path_1.extname)(file.originalname)}`);
    },
});
let EventsController = class EventsController {
    constructor(eventsService, votesService) {
        this.eventsService = eventsService;
        this.votesService = votesService;
    }
    getWeeklyEvents(req, tipo) {
        return this.eventsService.getWeeklyEvents(req.user.id, tipo);
    }
    findOne(id, req) {
        return this.eventsService.getEventDetail(id, req.user.id);
    }
    getAnalytics(id, req) {
        return this.votesService.getAnalytics(id, req.user.id);
    }
    // ─── Admin endpoints ──────────────────────────────────────────────────────
    createEvent(dto) {
        return this.eventsService.createEvent(dto);
    }
    updateEvent(id, dto) {
        return this.eventsService.updateEvent(id, dto);
    }
    removeEvent(id) {
        return this.eventsService.removeEvent(id);
    }
    async uploadPhoto(id, file) {
        const fotoUrl = `/uploads/events/${file.filename}`;
        return this.eventsService.updateFoto(id, fotoUrl);
    }
};
exports.EventsController = EventsController;
tslib_1.__decorate([
    (0, common_1.Get)('week'),
    (0, swagger_1.ApiOperation)({ summary: 'Weekly agenda enriched with vote counts and ambiente color' }),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Query)('tipo')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], EventsController.prototype, "getWeeklyEvents", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single event enriched with vote data for the current week' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], EventsController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Full prediction analytics (requires voy or tal_vez vote)' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], EventsController.prototype, "getAnalytics", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Create a recurring event' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [create_event_dto_1.CreateEventDto]),
    tslib_1.__metadata("design:returntype", void 0)
], EventsController.prototype, "createEvent", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Update a recurring event' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto]),
    tslib_1.__metadata("design:returntype", void 0)
], EventsController.prototype, "updateEvent", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Soft-delete (deactivate) an event' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], EventsController.prototype, "removeEvent", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/photo'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Upload event photo' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: photoStorage })),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsController.prototype, "uploadPhoto", null);
exports.EventsController = EventsController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Events'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/events'),
    tslib_1.__metadata("design:paramtypes", [events_service_1.EventsService,
        votes_service_1.VotesService])
], EventsController);
//# sourceMappingURL=events.controller.js.map