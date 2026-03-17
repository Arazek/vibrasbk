import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  alias: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  level: string;

  @ApiProperty({ type: [String] })
  styles: string[];

  @ApiProperty({ required: false })
  academia?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  accessToken: string;

  @ApiProperty({ description: 'User profile data' })
  user: UserProfileDto;
}
