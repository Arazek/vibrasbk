"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAcademiaDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateAcademiaDto {
}
exports.CreateAcademiaDto = CreateAcademiaDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Academia de Salsa Cartagena' }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAcademiaDto.prototype, "nombre", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Cartagena' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAcademiaDto.prototype, "ciudad", void 0);
//# sourceMappingURL=create-academia.dto.js.map