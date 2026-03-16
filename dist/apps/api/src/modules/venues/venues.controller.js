"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenuesController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
const venues_service_1 = require("./venues.service");
const create_venue_dto_1 = require("./dtos/create-venue.dto");
const update_venue_dto_1 = require("./dtos/update-venue.dto");
let VenuesController = class VenuesController {
    constructor(venuesService) {
        this.venuesService = venuesService;
    }
    findAll() {
        return this.venuesService.findAll();
    }
    findOne(id) {
        return this.venuesService.findOne(id);
    }
    create(dto) {
        return this.venuesService.create(dto);
    }
    update(id, dto) {
        return this.venuesService.update(id, dto);
    }
    remove(id) {
        return this.venuesService.remove(id);
    }
};
exports.VenuesController = VenuesController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all venues' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], VenuesController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single venue' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], VenuesController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Create a venue' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [create_venue_dto_1.CreateVenueDto]),
    tslib_1.__metadata("design:returntype", void 0)
], VenuesController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Update a venue' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, update_venue_dto_1.UpdateVenueDto]),
    tslib_1.__metadata("design:returntype", void 0)
], VenuesController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Delete a venue' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], VenuesController.prototype, "remove", null);
exports.VenuesController = VenuesController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Venues'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/venues'),
    tslib_1.__metadata("design:paramtypes", [venues_service_1.VenuesService])
], VenuesController);
//# sourceMappingURL=venues.controller.js.map