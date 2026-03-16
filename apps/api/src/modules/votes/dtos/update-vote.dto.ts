import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VoteEstado } from '../entities/intention-vote.entity';

export class UpdateVoteDto {
  @ApiProperty({ enum: VoteEstado })
  @IsEnum(VoteEstado)
  estado: VoteEstado;
}
