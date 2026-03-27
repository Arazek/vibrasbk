import { IsString, IsArray, ArrayMinSize, IsOptional, IsEmail, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'salsa_king' })
  @IsString()
  alias: string;

  @ApiProperty({ example: 'salsa_king@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'secret123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'leader' })
  @IsString()
  dancingRole: string;

  @ApiProperty({ example: 'comfortable' })
  @IsString()
  level: string;

  @ApiProperty({ type: [String], example: ['salsa_cubana'] })
  @IsArray()
  @ArrayMinSize(1)
  styles: string[];

  @ApiPropertyOptional({ description: 'Free-text name of the dancer\'s academy' })
  @IsOptional()
  @IsString()
  academyName?: string;

  @ApiPropertyOptional({ description: 'UUID of the Country entity' })
  @IsOptional()
  @IsString()
  countryId?: string;

  @ApiPropertyOptional({ description: 'UUID of the City entity' })
  @IsOptional()
  @IsString()
  cityId?: string;
}
