import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVenueDto {
  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiPropertyOptional({ default: 'Cartagena' })
  @IsString()
  @IsOptional()
  ciudad?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  lat?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  lng?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  aforoMaximo?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsOptional()
  estilos?: string[];
}
