import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FriendsService } from './friends.service';
import { SendFriendRequestDto } from './dtos/send-request.dto';
import { RespondFriendRequestDto } from './dtos/respond-request.dto';

@ApiTags('Friends')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post('request')
  @ApiOperation({ summary: 'Send a friend request by exact alias or email' })
  sendRequest(@Request() req: any, @Body() dto: SendFriendRequestDto) {
    return this.friendsService.sendRequest(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get accepted friends list' })
  getFriends(@Request() req: any) {
    return this.friendsService.getFriends(req.user.id);
  }

  @Get('requests/received')
  @ApiOperation({ summary: 'Get incoming pending friend requests' })
  getPendingReceived(@Request() req: any) {
    return this.friendsService.getPendingReceived(req.user.id);
  }

  @Get('requests/sent')
  @ApiOperation({ summary: 'Get outgoing pending friend requests' })
  getSentPending(@Request() req: any) {
    return this.friendsService.getSentPending(req.user.id);
  }

  @Get('requests/count')
  @ApiOperation({ summary: 'Get count of incoming pending requests (for badge)' })
  getPendingCount(@Request() req: any) {
    return this.friendsService.getPendingCount(req.user.id);
  }

  @Patch(':id/respond')
  @ApiOperation({ summary: 'Accept or reject a received friend request' })
  respondToRequest(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: RespondFriendRequestDto,
  ) {
    return this.friendsService.respondToRequest(req.user.id, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a friend or cancel a pending request' })
  removeFriend(@Request() req: any, @Param('id') id: string) {
    return this.friendsService.removeFriend(req.user.id, id);
  }
}
