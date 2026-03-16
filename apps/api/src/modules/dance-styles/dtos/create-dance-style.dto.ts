import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDanceStyleDto {
  @ApiProperty({ example: 'salsa_cubana' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'Salsa Cubana' })
  @IsString()
  nombre: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
