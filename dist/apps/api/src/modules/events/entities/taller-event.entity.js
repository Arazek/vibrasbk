"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TallerEvent = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const recurring_event_entity_1 = require("./recurring-event.entity");
let TallerEvent = class TallerEvent extends recurring_event_entity_1.RecurringEvent {
};
exports.TallerEvent = TallerEvent;
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], TallerEvent.prototype, "precio", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], TallerEvent.prototype, "instructor", void 0);
exports.TallerEvent = TallerEvent = tslib_1.__decorate([
    (0, typeorm_1.ChildEntity)('taller')
], TallerEvent);
//# sourceMappingURL=taller-event.entity.js.map