"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyAttendanceDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class VerifyAttendanceDto {
}
exports.VerifyAttendanceDto = VerifyAttendanceDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], VerifyAttendanceDto.prototype, "eventId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VerifyAttendanceDto.prototype, "semanaIso", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], VerifyAttendanceDto.prototype, "asistio", void 0);
//# sourceMappingURL=verify-attendance.dto.js.map