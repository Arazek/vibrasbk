"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Academia = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Academia = class Academia {
};
exports.Academia = Academia;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Academia.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Academia.prototype, "nombre", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Academia.prototype, "ciudad", void 0);
exports.Academia = Academia = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Academia);
//# sourceMappingURL=academia.entity.js.map