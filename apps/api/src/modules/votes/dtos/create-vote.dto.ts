import { IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VoteStatus } from '../entities/intention-vote.entity';

export class CreateVoteDto {
  @ApiProperty()
  @IsUUID()
  eventId: string;

  @ApiProperty({ enum: VoteStatus })
  @IsEnum(VoteStatus)
  status: VoteStatus;
}
