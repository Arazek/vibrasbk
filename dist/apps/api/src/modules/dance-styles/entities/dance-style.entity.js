"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanceStyle = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let DanceStyle = class DanceStyle {
};
exports.DanceStyle = DanceStyle;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], DanceStyle.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], DanceStyle.prototype, "slug", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DanceStyle.prototype, "nombre", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], DanceStyle.prototype, "activo", void 0);
exports.DanceStyle = DanceStyle = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], DanceStyle);
//# sourceMappingURL=dance-style.entity.js.map