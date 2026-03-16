import { IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VoteEstado } from '../entities/intention-vote.entity';

export class CreateVoteDto {
  @ApiProperty()
  @IsUUID()
  eventId: string;

  @ApiProperty({ enum: VoteEstado })
  @IsEnum(VoteEstado)
  estado: VoteEstado;
}
