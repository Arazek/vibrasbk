"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenuesModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const venue_entity_1 = require("./entities/venue.entity");
const venues_service_1 = require("./venues.service");
const venues_controller_1 = require("./venues.controller");
let VenuesModule = class VenuesModule {
};
exports.VenuesModule = VenuesModule;
exports.VenuesModule = VenuesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([venue_entity_1.Venue])],
        controllers: [venues_controller_1.VenuesController],
        providers: [venues_service_1.VenuesService],
        exports: [venues_service_1.VenuesService],
    })
], VenuesModule);
//# sourceMappingURL=venues.module.js.map