"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVoteDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const intention_vote_entity_1 = require("../entities/intention-vote.entity");
class UpdateVoteDto {
}
exports.UpdateVoteDto = UpdateVoteDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: intention_vote_entity_1.VoteEstado }),
    (0, class_validator_1.IsEnum)(intention_vote_entity_1.VoteEstado),
    tslib_1.__metadata("design:type", String)
], UpdateVoteDto.prototype, "estado", void 0);
//# sourceMappingURL=update-vote.dto.js.map