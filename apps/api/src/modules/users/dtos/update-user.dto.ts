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

  @ApiPropertyOptional({ description: 'Free-text name of the dancer\'s academy' })
  @IsOptional()
  @IsString()
  academyName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fcmToken?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiPropertyOptional({ description: 'UUID of the Country entity' })
  @IsOptional()
  @IsString()
  countryId?: string;

  @ApiPropertyOptional({ description: 'UUID of the City entity' })
  @IsOptional()
  @IsString()
  cityId?: string;
}
