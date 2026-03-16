"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringEvent = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const venue_entity_1 = require("../../venues/entities/venue.entity");
let RecurringEvent = class RecurringEvent {
};
exports.RecurringEvent = RecurringEvent;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], RecurringEvent.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'tipo', type: 'varchar', nullable: true, update: false }),
    tslib_1.__metadata("design:type", String)
], RecurringEvent.prototype, "tipo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => venue_entity_1.Venue, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'venue_id' }),
    tslib_1.__metadata("design:type", venue_entity_1.Venue)
], RecurringEvent.prototype, "venue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'venue_id' }),
    tslib_1.__metadata("design:type", String)
], RecurringEvent.prototype, "venueId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], RecurringEvent.prototype, "nombre", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], RecurringEvent.prototype, "fotoUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], RecurringEvent.prototype, "diaSemana", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], RecurringEvent.prototype, "proximaFecha", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], RecurringEvent.prototype, "fechaInicio", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    tslib_1.__metadata("design:type", String)
], RecurringEvent.prototype, "horaInicio", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    tslib_1.__metadata("design:type", String)
], RecurringEvent.prototype, "horaPicoEstimado", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    tslib_1.__metadata("design:type", Array)
], RecurringEvent.prototype, "estilos", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], RecurringEvent.prototype, "activo", void 0);
exports.RecurringEvent = RecurringEvent = tslib_1.__decorate([
    (0, typeorm_1.Entity)('recurring_events'),
    (0, typeorm_1.TableInheritance)({ column: { type: 'varchar', name: 'tipo' } })
], RecurringEvent);
//# sourceMappingURL=recurring-event.entity.js.map