import { IsEnum, IsArray, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Level } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiPropertyOptional({ enum: Level })
  @IsOptional()
  @IsEnum(Level)
  level?: Level;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  styles?: string[];

  @ApiPropertyOptional({ description: 'UUID of the Academia entity' })
  @IsOptional()
  @IsString()
  academyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fcmToken?: string;
}
