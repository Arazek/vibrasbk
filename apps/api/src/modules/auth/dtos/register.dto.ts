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
  rol: string;

  @ApiProperty({ example: 'social_comodo' })
  @IsString()
  nivel: string;

  @ApiProperty({ type: [String], example: ['salsa_cubana'] })
  @IsArray()
  @ArrayMinSize(1)
  estilos: string[];

  @ApiPropertyOptional({ description: 'UUID of the Academia entity' })
  @IsOptional()
  @IsString()
  academiaId?: string;
}
