"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateMessageDto {
}
exports.CreateMessageDto = CreateMessageDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], CreateMessageDto.prototype, "conversationId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateMessageDto.prototype, "content", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", String)
], CreateMessageDto.prototype, "mediaUrl", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", String)
], CreateMessageDto.prototype, "mediaType", void 0);
//# sourceMappingURL=create-message.dto.js.map