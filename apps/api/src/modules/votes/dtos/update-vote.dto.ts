import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VoteStatus } from '../entities/intention-vote.entity';

export class UpdateVoteDto {
  @ApiProperty({ enum: VoteStatus })
  @IsEnum(VoteStatus)
  status: VoteStatus;
}
