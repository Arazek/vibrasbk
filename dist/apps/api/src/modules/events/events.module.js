"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const recurring_event_entity_1 = require("./entities/recurring-event.entity");
const social_event_entity_1 = require("./entities/social-event.entity");
const intensivo_event_entity_1 = require("./entities/intensivo-event.entity");
const congreso_event_entity_1 = require("./entities/congreso-event.entity");
const events_service_1 = require("./events.service");
const events_controller_1 = require("./events.controller");
const venues_module_1 = require("../venues/venues.module");
const votes_module_1 = require("../votes/votes.module");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([recurring_event_entity_1.RecurringEvent, social_event_entity_1.SocialEvent, intensivo_event_entity_1.IntensivoEvent, congreso_event_entity_1.CongresoEvent]),
            venues_module_1.VenuesModule,
            votes_module_1.VotesModule,
        ],
        controllers: [events_controller_1.EventsController],
        providers: [events_service_1.EventsService],
        exports: [events_service_1.EventsService],
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map