import { Controller, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dtos/create-vote.dto';
import { UpdateVoteDto } from './dtos/update-vote.dto';
import { VerifyAttendanceDto } from './dtos/verify-attendance.dto';

@ApiTags('Votes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/votes')
export class VotesController {
  constructor(private votesService: VotesService) {}

  @Post()
  @ApiOperation({ summary: 'Cast a vote for an event this week' })
  castVote(@Request() req: any, @Body() dto: CreateVoteDto) {
    return this.votesService.castVote(req.user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Change your vote (blocked < 2h before event start)' })
  updateVote(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateVoteDto) {
    return this.votesService.updateVote(req.user.id, id, dto);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Submit post-event attendance verification' })
  verifyAttendance(@Request() req: any, @Body() dto: VerifyAttendanceDto) {
    return this.votesService.verifyAttendance(req.user.id, dto);
  }
}
