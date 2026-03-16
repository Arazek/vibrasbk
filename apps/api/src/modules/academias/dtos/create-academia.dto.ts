import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAcademiaDto {
  @ApiProperty({ example: 'Academia de Salsa Cartagena' })
  @IsString()
  nombre: string;

  @ApiPropertyOptional({ example: 'Cartagena' })
  @IsOptional()
  @IsString()
  ciudad?: string;
}
