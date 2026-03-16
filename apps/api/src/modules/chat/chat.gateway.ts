import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dtos/create-message.dto';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string[]>();

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, []);
    }
    this.userSockets.get(userId)!.push(client.id);
    console.log(`User ${userId} connected with socket ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const sockets = this.userSockets.get(userId) || [];
    const index = sockets.indexOf(client.id);
    if (index > -1) {
      sockets.splice(index, 1);
    }
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto
  ) {
    const userId = client.handshake.query.userId as string;
    const message = await this.chatService.sendMessage(userId, createMessageDto);

    // Emit to all connected users in the conversation
    this.server.to(message.conversationId).emit('new-message', message);

    return { success: true, message };
  }

  @SubscribeMessage('join-conversation')
  handleJoinConversation(@ConnectedSocket() client: Socket, @MessageBody() conversationId: string) {
    client.join(conversationId);
    client.emit('joined-conversation', { conversationId });
  }

  @SubscribeMessage('leave-conversation')
  handleLeaveConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() conversationId: string
  ) {
    client.leave(conversationId);
  }
}
