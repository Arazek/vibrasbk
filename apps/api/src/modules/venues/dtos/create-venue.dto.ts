import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVenueDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ default: 'Cartagena' })
  @IsString()
  @IsOptional()
  city?: string;

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
  maxCapacity?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsOptional()
  styles?: string[];
}
