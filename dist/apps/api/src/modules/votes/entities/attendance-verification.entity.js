"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceVerification = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let AttendanceVerification = class AttendanceVerification {
};
exports.AttendanceVerification = AttendanceVerification;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], AttendanceVerification.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", String)
], AttendanceVerification.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'event_id' }),
    tslib_1.__metadata("design:type", String)
], AttendanceVerification.prototype, "eventId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'semana_iso' }),
    tslib_1.__metadata("design:type", String)
], AttendanceVerification.prototype, "semanaIso", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], AttendanceVerification.prototype, "asistio", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'timestamp_respuesta', nullable: true }),
    tslib_1.__metadata("design:type", Date)
], AttendanceVerification.prototype, "timestampRespuesta", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], AttendanceVerification.prototype, "createdAt", void 0);
exports.AttendanceVerification = AttendanceVerification = tslib_1.__decorate([
    (0, typeorm_1.Entity)('attendance_verifications'),
    (0, typeorm_1.Unique)(['userId', 'eventId', 'semanaIso'])
], AttendanceVerification);
//# sourceMappingURL=attendance-verification.entity.js.map