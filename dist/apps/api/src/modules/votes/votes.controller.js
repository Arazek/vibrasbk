"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotesController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const votes_service_1 = require("./votes.service");
const create_vote_dto_1 = require("./dtos/create-vote.dto");
const update_vote_dto_1 = require("./dtos/update-vote.dto");
const verify_attendance_dto_1 = require("./dtos/verify-attendance.dto");
let VotesController = class VotesController {
    constructor(votesService) {
        this.votesService = votesService;
    }
    castVote(req, dto) {
        return this.votesService.castVote(req.user.id, dto);
    }
    updateVote(req, id, dto) {
        return this.votesService.updateVote(req.user.id, id, dto);
    }
    verifyAttendance(req, dto) {
        return this.votesService.verifyAttendance(req.user.id, dto);
    }
};
exports.VotesController = VotesController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cast a vote for an event this week' }),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, create_vote_dto_1.CreateVoteDto]),
    tslib_1.__metadata("design:returntype", void 0)
], VotesController.prototype, "castVote", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Change your vote (blocked < 2h before event start)' }),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, update_vote_dto_1.UpdateVoteDto]),
    tslib_1.__metadata("design:returntype", void 0)
], VotesController.prototype, "updateVote", null);
tslib_1.__decorate([
    (0, common_1.Post)('verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit post-event attendance verification' }),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, verify_attendance_dto_1.VerifyAttendanceDto]),
    tslib_1.__metadata("design:returntype", void 0)
], VotesController.prototype, "verifyAttendance", null);
exports.VotesController = VotesController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Votes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/votes'),
    tslib_1.__metadata("design:paramtypes", [votes_service_1.VotesService])
], VotesController);
//# sourceMappingURL=votes.controller.js.map