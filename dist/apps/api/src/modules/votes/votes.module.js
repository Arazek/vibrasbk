"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotesModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const intention_vote_entity_1 = require("./entities/intention-vote.entity");
const attendance_verification_entity_1 = require("./entities/attendance-verification.entity");
const reliability_metric_entity_1 = require("./entities/reliability-metric.entity");
const recurring_event_entity_1 = require("../events/entities/recurring-event.entity");
const user_entity_1 = require("../users/entities/user.entity");
const votes_service_1 = require("./votes.service");
const votes_controller_1 = require("./votes.controller");
const prediction_service_1 = require("./prediction.service");
let VotesModule = class VotesModule {
};
exports.VotesModule = VotesModule;
exports.VotesModule = VotesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                intention_vote_entity_1.IntentionVote,
                attendance_verification_entity_1.AttendanceVerification,
                reliability_metric_entity_1.ReliabilityMetric,
                recurring_event_entity_1.RecurringEvent,
                user_entity_1.User,
            ]),
        ],
        controllers: [votes_controller_1.VotesController],
        providers: [votes_service_1.VotesService, prediction_service_1.PredictionService],
        exports: [votes_service_1.VotesService, prediction_service_1.PredictionService],
    })
], VotesModule);
//# sourceMappingURL=votes.module.js.map