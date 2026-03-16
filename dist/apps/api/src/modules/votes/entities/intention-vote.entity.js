"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentionVote = exports.VoteEstado = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
var VoteEstado;
(function (VoteEstado) {
    VoteEstado["VOY"] = "voy";
    VoteEstado["TAL_VEZ"] = "tal_vez";
    VoteEstado["NO_VOY"] = "no_voy";
})(VoteEstado || (exports.VoteEstado = VoteEstado = {}));
let IntentionVote = class IntentionVote {
};
exports.IntentionVote = IntentionVote;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], IntentionVote.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", String)
], IntentionVote.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'event_id' }),
    tslib_1.__metadata("design:type", String)
], IntentionVote.prototype, "eventId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'semana_iso' }),
    tslib_1.__metadata("design:type", String)
], IntentionVote.prototype, "semanaIso", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: VoteEstado }),
    tslib_1.__metadata("design:type", String)
], IntentionVote.prototype, "estado", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], IntentionVote.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], IntentionVote.prototype, "updatedAt", void 0);
exports.IntentionVote = IntentionVote = tslib_1.__decorate([
    (0, typeorm_1.Entity)('intention_votes'),
    (0, typeorm_1.Unique)(['userId', 'eventId', 'semanaIso'])
], IntentionVote);
//# sourceMappingURL=intention-vote.entity.js.map