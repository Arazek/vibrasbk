import { IsString, IsNumber, IsOptional, IsArray, IsIn, IsBoolean, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  venueId: string;

  @ApiProperty({ enum: ['social', 'intensive', 'congress'] })
  @IsIn(['social', 'intensive', 'congress'])
  type: 'social' | 'intensive' | 'congress';

  @ApiPropertyOptional({ description: '0=Monday … 6=Sunday (for recurring socials only)', minimum: 0, maximum: 6 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(6)
  dayOfWeek?: number;

  @ApiPropertyOptional({ example: '21:00', description: 'For recurring socials only' })
  @IsString()
  @IsOptional()
  startTime?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsOptional()
  styles?: string[];

  // Start date — for intensives and congresses (YYYY-MM-DD)
  @ApiPropertyOptional({ description: 'Start date YYYY-MM-DD (intensive and congress)' })
  @IsString()
  @IsOptional()
  startDate?: string;

  // ─── Social ────────────────────────────────────────────────────────────────
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  workshopIncluded?: boolean;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  entryPrice?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsOptional()
  instructors?: string[];

  // ─── Intensive ─────────────────────────────────────────────────────────────
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  level?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ description: 'End date YYYY-MM-DD' })
  @IsString()
  @IsOptional()
  endDate?: string;

  // ─── Congress ──────────────────────────────────────────────────────────────
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  locality?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  durationDays?: number;

  @ApiPropertyOptional({ description: 'JSON: [{label, price}]' })
  @IsString()
  @IsOptional()
  prices?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  websiteUrl?: string;
}
