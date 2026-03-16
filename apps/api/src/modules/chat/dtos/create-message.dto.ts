import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  @IsUUID()
  conversationId: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ required: false })
  mediaUrl?: string;

  @ApiProperty({ required: false })
  mediaType?: string;
}
