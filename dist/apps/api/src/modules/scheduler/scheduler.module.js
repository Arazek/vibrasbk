"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const votes_module_1 = require("../votes/votes.module");
const notifications_module_1 = require("../notifications/notifications.module");
const scheduler_service_1 = require("./scheduler.service");
let SchedulerModule = class SchedulerModule {
};
exports.SchedulerModule = SchedulerModule;
exports.SchedulerModule = SchedulerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            votes_module_1.VotesModule,
            notifications_module_1.NotificationsModule,
        ],
        providers: [scheduler_service_1.SchedulerService],
    })
], SchedulerModule);
//# sourceMappingURL=scheduler.module.js.map