import { IsBoolean, IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyAttendanceDto {
  @ApiProperty()
  @IsUUID()
  eventId: string;

  @ApiProperty()
  @IsString()
  isoWeek: string;

  @ApiProperty()
  @IsBoolean()
  attended: boolean;
}
