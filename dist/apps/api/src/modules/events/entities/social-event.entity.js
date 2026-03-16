"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialEvent = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const recurring_event_entity_1 = require("./recurring-event.entity");
let SocialEvent = class SocialEvent extends recurring_event_entity_1.RecurringEvent {
};
exports.SocialEvent = SocialEvent;
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], SocialEvent.prototype, "tallerIncluido", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], SocialEvent.prototype, "precioEntrada", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    tslib_1.__metadata("design:type", Array)
], SocialEvent.prototype, "instructores", void 0);
exports.SocialEvent = SocialEvent = tslib_1.__decorate([
    (0, typeorm_1.ChildEntity)('social')
], SocialEvent);
//# sourceMappingURL=social-event.entity.js.map