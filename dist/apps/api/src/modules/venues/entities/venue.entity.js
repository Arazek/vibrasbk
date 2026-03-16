"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venue = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Venue = class Venue {
};
exports.Venue = Venue;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Venue.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Venue.prototype, "nombre", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: 'Cartagena' }),
    tslib_1.__metadata("design:type", String)
], Venue.prototype, "ciudad", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Venue.prototype, "lat", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Venue.prototype, "lng", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Venue.prototype, "aforoMaximo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    tslib_1.__metadata("design:type", Array)
], Venue.prototype, "estilos", void 0);
exports.Venue = Venue = tslib_1.__decorate([
    (0, typeorm_1.Entity)('venues')
], Venue);
//# sourceMappingURL=venue.entity.js.map