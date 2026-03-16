"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDanceStyleDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateDanceStyleDto {
}
exports.CreateDanceStyleDto = CreateDanceStyleDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'salsa_cubana' }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateDanceStyleDto.prototype, "slug", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Salsa Cubana' }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateDanceStyleDto.prototype, "nombre", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateDanceStyleDto.prototype, "activo", void 0);
//# sourceMappingURL=create-dance-style.dto.js.map