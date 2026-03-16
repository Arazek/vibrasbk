import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dtos/create-message.dto';

@ApiTags('Chat')
@Controller('api/chat')
@ApiBearerAuth()
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('messages')
  @ApiOperation({ summary: 'Send a message' })
  async sendMessage(@Request() req: any, @Body() createMessageDto: CreateMessageDto) {
    return this.chatService.sendMessage(req.user.id, createMessageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('conversations/:conversationId/messages')
  @ApiOperation({ summary: 'Get conversation messages' })
  async getConversation(@Param('conversationId') conversationId: string) {
    return this.chatService.getConversation(conversationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('conversations')
  @ApiOperation({ summary: 'Get user conversations' })
  async getConversations(@Request() req: any) {
    return this.chatService.getConversations(req.user.id);
  }
}
