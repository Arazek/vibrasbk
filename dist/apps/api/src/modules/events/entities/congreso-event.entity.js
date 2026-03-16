"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CongresoEvent = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const recurring_event_entity_1 = require("./recurring-event.entity");
let CongresoEvent = class CongresoEvent extends recurring_event_entity_1.RecurringEvent {
};
exports.CongresoEvent = CongresoEvent;
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CongresoEvent.prototype, "titulo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CongresoEvent.prototype, "localidad", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], CongresoEvent.prototype, "duracionDias", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], CongresoEvent.prototype, "precios", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CongresoEvent.prototype, "enlaceWeb", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CongresoEvent.prototype, "fechaFin", void 0);
exports.CongresoEvent = CongresoEvent = tslib_1.__decorate([
    (0, typeorm_1.ChildEntity)('congreso')
], CongresoEvent);
//# sourceMappingURL=congreso-event.entity.js.map