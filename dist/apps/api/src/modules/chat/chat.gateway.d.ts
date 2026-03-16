import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dtos/create-message.dto';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    server: Server;
    private userSockets;
    constructor(chatService: ChatService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSendMessage(client: Socket, createMessageDto: CreateMessageDto): Promise<{
        success: boolean;
        message: import("./entities/message.entity").Message;
    }>;
    handleJoinConversation(client: Socket, conversationId: string): void;
    handleLeaveConversation(client: Socket, conversationId: string): void;
}
//# sourceMappingURL=chat.gateway.d.ts.map