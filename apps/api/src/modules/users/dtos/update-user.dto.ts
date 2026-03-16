import { IsEnum, IsArray, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Nivel } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiPropertyOptional({ enum: Nivel })
  @IsOptional()
  @IsEnum(Nivel)
  nivel?: Nivel;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  estilos?: string[];

  @ApiPropertyOptional({ description: 'UUID of the Academia entity' })
  @IsOptional()
  @IsString()
  academiaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fcmToken?: string;
}
