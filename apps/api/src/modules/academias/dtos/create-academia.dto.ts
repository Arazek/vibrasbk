import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAcademiaDto {
  @ApiProperty({ example: 'Academia de Salsa Cartagena' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Cartagena' })
  @IsOptional()
  @IsString()
  city?: string;
}
