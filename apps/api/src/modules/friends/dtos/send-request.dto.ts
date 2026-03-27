import { IsEnum, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendFriendRequestDto {
  @ApiProperty({ description: 'Exact alias or email of the user to invite' })
  @IsString()
  @MinLength(1)
  identifier: string;

  @ApiProperty({ enum: ['alias', 'email'] })
  @IsEnum(['alias', 'email'])
  identifierType: 'alias' | 'email';
}
