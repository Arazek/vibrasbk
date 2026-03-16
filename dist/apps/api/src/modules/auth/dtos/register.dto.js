"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'salsa_king' }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "alias", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'leader' }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "rol", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'social_comodo' }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "nivel", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], example: ['salsa_cubana'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], RegisterDto.prototype, "estilos", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'UUID of the Academia entity' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "academiaId", void 0);
//# sourceMappingURL=register.dto.js.map