import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { Conversation } from './entities/conversation.entity';
import { CreateMessageDto } from './dtos/create-message.dto';
export declare class ChatService {
    private messagesRepository;
    private conversationsRepository;
    constructor(messagesRepository: Repository<Message>, conversationsRepository: Repository<Conversation>);
    sendMessage(userId: string, createMessageDto: CreateMessageDto): Promise<Message>;
    getConversation(conversationId: string, limit?: number): Promise<Message[]>;
    getConversations(userId: string): Promise<Conversation[]>;
}
//# sourceMappingURL=chat.service.d.ts.map