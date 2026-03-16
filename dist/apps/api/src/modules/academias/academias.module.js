"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademiasModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const academia_entity_1 = require("./entities/academia.entity");
const academias_service_1 = require("./academias.service");
const academias_controller_1 = require("./academias.controller");
let AcademiasModule = class AcademiasModule {
};
exports.AcademiasModule = AcademiasModule;
exports.AcademiasModule = AcademiasModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([academia_entity_1.Academia])],
        controllers: [academias_controller_1.AcademiasController],
        providers: [academias_service_1.AcademiasService],
        exports: [academias_service_1.AcademiasService],
    })
], AcademiasModule);
//# sourceMappingURL=academias.module.js.map