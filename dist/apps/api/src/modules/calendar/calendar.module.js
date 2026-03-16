"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const calendar_service_1 = require("./calendar.service");
const calendar_controller_1 = require("./calendar.controller");
const calendar_event_entity_1 = require("./entities/calendar-event.entity");
let CalendarModule = class CalendarModule {
};
exports.CalendarModule = CalendarModule;
exports.CalendarModule = CalendarModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([calendar_event_entity_1.CalendarEvent])],
        providers: [calendar_service_1.CalendarService],
        controllers: [calendar_controller_1.CalendarController],
        exports: [calendar_service_1.CalendarService],
    })
], CalendarModule);
//# sourceMappingURL=calendar.module.js.map