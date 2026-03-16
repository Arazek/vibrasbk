"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Estilo = exports.Nivel = exports.Rol = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
var Rol;
(function (Rol) {
    Rol["LEADER"] = "leader";
    Rol["FOLLOWER"] = "follower";
    Rol["SWITCH"] = "switch";
    Rol["ADMIN"] = "admin";
})(Rol || (exports.Rol = Rol = {}));
var Nivel;
(function (Nivel) {
    Nivel["NUEVO"] = "nuevo";
    Nivel["INICIACION"] = "iniciacion";
    Nivel["SOCIAL_COMODO"] = "social_comodo";
    Nivel["INTERMEDIO"] = "intermedio";
    Nivel["AVANZADO"] = "avanzado";
})(Nivel || (exports.Nivel = Nivel = {}));
var Estilo;
(function (Estilo) {
    Estilo["BACHATA_SENSUAL"] = "bachata_sensual";
    Estilo["BACHATA_TRADICIONAL"] = "bachata_tradicional";
    Estilo["SALSA_LINEA"] = "salsa_linea";
    Estilo["SALSA_CUBANA"] = "salsa_cubana";
})(Estilo || (exports.Estilo = Estilo = {}));
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "alias", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: 'Cartagena' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "ciudad", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Rol }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "rol", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Nivel }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "nivel", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "estilos", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "academiaId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "fcmToken", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = tslib_1.__decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map