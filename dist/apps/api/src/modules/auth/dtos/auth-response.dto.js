"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseDto = exports.UserProfileDto = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class UserProfileDto {
}
exports.UserProfileDto = UserProfileDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], UserProfileDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], UserProfileDto.prototype, "alias", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], UserProfileDto.prototype, "ciudad", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], UserProfileDto.prototype, "rol", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], UserProfileDto.prototype, "nivel", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    tslib_1.__metadata("design:type", Array)
], UserProfileDto.prototype, "estilos", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", String)
], UserProfileDto.prototype, "academia", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Date)
], UserProfileDto.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Date)
], UserProfileDto.prototype, "updatedAt", void 0);
class AuthResponseDto {
}
exports.AuthResponseDto = AuthResponseDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JWT access token' }),
    tslib_1.__metadata("design:type", String)
], AuthResponseDto.prototype, "accessToken", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User profile data' }),
    tslib_1.__metadata("design:type", UserProfileDto)
], AuthResponseDto.prototype, "user", void 0);
//# sourceMappingURL=auth-response.dto.js.map