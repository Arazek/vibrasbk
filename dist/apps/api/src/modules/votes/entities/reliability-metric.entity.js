"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReliabilityMetric = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let ReliabilityMetric = class ReliabilityMetric {
};
exports.ReliabilityMetric = ReliabilityMetric;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], ReliabilityMetric.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", String)
], ReliabilityMetric.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'votos_voy_total', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ReliabilityMetric.prototype, "votosVoyTotal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'asistencias_confirmadas', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ReliabilityMetric.prototype, "asistenciasConfirmadas", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 4, scale: 3, default: 1.0 }),
    tslib_1.__metadata("design:type", Number)
], ReliabilityMetric.prototype, "fiabilidad", void 0);
exports.ReliabilityMetric = ReliabilityMetric = tslib_1.__decorate([
    (0, typeorm_1.Entity)('reliability_metrics'),
    (0, typeorm_1.Unique)(['userId'])
], ReliabilityMetric);
//# sourceMappingURL=reliability-metric.entity.js.map