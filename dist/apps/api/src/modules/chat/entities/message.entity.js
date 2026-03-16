"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Message = class Message {
};
exports.Message = Message;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "conversationId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "senderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text'),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "content", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "mediaUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "mediaType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Message.prototype, "isRead", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
exports.Message = Message = tslib_1.__decorate([
    (0, typeorm_1.Entity)('messages'),
    (0, typeorm_1.Index)(['conversationId']),
    (0, typeorm_1.Index)(['senderId'])
], Message);
//# sourceMappingURL=message.entity.js.map