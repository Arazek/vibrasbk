"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntensivoEvent = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const recurring_event_entity_1 = require("./recurring-event.entity");
let IntensivoEvent = class IntensivoEvent extends recurring_event_entity_1.RecurringEvent {
};
exports.IntensivoEvent = IntensivoEvent;
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], IntensivoEvent.prototype, "titulo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], IntensivoEvent.prototype, "nivel", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], IntensivoEvent.prototype, "precio", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    tslib_1.__metadata("design:type", Array)
], IntensivoEvent.prototype, "profesores", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], IntensivoEvent.prototype, "fechaFin", void 0);
exports.IntensivoEvent = IntensivoEvent = tslib_1.__decorate([
    (0, typeorm_1.ChildEntity)('intensivo')
], IntensivoEvent);
//# sourceMappingURL=intensivo-event.entity.js.map