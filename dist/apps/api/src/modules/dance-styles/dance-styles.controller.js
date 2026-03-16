"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanceStylesController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
const dance_styles_service_1 = require("./dance-styles.service");
const create_dance_style_dto_1 = require("./dtos/create-dance-style.dto");
let DanceStylesController = class DanceStylesController {
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return this.service.findAll();
    }
    create(dto) {
        return this.service.create(dto);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.DanceStylesController = DanceStylesController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all active dance styles' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DanceStylesController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Create a dance style' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [create_dance_style_dto_1.CreateDanceStyleDto]),
    tslib_1.__metadata("design:returntype", void 0)
], DanceStylesController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Update a dance style' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DanceStylesController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Delete a dance style' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], DanceStylesController.prototype, "remove", null);
exports.DanceStylesController = DanceStylesController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Dance Styles'),
    (0, common_1.Controller)('api/dance-styles'),
    tslib_1.__metadata("design:paramtypes", [dance_styles_service_1.DanceStylesService])
], DanceStylesController);
//# sourceMappingURL=dance-styles.controller.js.map