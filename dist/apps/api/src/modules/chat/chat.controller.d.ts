import { ChatService } from './chat.service';
import { CreateMessageDto } from './dtos/create-message.dto';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    sendMessage(req: any, createMessageDto: CreateMessageDto): Promise<import("./entities/message.entity").Message>;
    getConversation(conversationId: string): Promise<import("./entities/message.entity").Message[]>;
    getConversations(req: any): Promise<import("./entities/conversation.entity").Conversation[]>;
}
//# sourceMappingURL=chat.controller.d.ts.map