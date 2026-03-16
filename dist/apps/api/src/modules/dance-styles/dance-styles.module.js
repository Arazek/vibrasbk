"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanceStylesModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dance_style_entity_1 = require("./entities/dance-style.entity");
const dance_styles_service_1 = require("./dance-styles.service");
const dance_styles_controller_1 = require("./dance-styles.controller");
let DanceStylesModule = class DanceStylesModule {
};
exports.DanceStylesModule = DanceStylesModule;
exports.DanceStylesModule = DanceStylesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([dance_style_entity_1.DanceStyle])],
        controllers: [dance_styles_controller_1.DanceStylesController],
        providers: [dance_styles_service_1.DanceStylesService],
        exports: [dance_styles_service_1.DanceStylesService],
    })
], DanceStylesModule);
//# sourceMappingURL=dance-styles.module.js.map