import { IsString, IsNumber, IsOptional, IsArray, IsIn, IsBoolean, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  venueId: string;

  @ApiProperty({ enum: ['social', 'intensivo', 'congreso'] })
  @IsIn(['social', 'intensivo', 'congreso'])
  tipo: 'social' | 'intensivo' | 'congreso';

  @ApiPropertyOptional({ description: '0=Lunes … 6=Domingo (solo para sociales recurrentes)', minimum: 0, maximum: 6 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(6)
  diaSemana?: number;

  @ApiPropertyOptional({ example: '21:00', description: 'Solo para sociales recurrentes' })
  @IsString()
  @IsOptional()
  horaInicio?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsOptional()
  estilos?: string[];

  // Fecha de inicio — para intensivos y congresos (YYYY-MM-DD)
  @ApiPropertyOptional({ description: 'Fecha inicio YYYY-MM-DD (intensivos y congresos)' })
  @IsString()
  @IsOptional()
  fechaInicio?: string;

  // ─── Social ────────────────────────────────────────────────────────────────
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  tallerIncluido?: boolean;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  precioEntrada?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsOptional()
  instructores?: string[];

  // ─── Intensivo ─────────────────────────────────────────────────────────────
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nivel?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  precio?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsOptional()
  profesores?: string[];

  @ApiPropertyOptional({ description: 'Fecha fin YYYY-MM-DD' })
  @IsString()
  @IsOptional()
  fechaFin?: string;

  // ─── Congreso ──────────────────────────────────────────────────────────────
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  localidad?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  duracionDias?: number;

  @ApiPropertyOptional({ description: 'JSON: [{label, precio}]' })
  @IsString()
  @IsOptional()
  precios?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  enlaceWeb?: string;
}
