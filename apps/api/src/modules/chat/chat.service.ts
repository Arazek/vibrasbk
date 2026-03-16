import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { Conversation } from './entities/conversation.entity';
import { CreateMessageDto } from './dtos/create-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private conversationsRepository: Repository<Conversation>
  ) {}

  async sendMessage(userId: string, createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messagesRepository.create({
      ...createMessageDto,
      senderId: userId,
    });
    return this.messagesRepository.save(message);
  }

  async getConversation(conversationId: string, limit: number = 50): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { conversationId },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    return this.conversationsRepository
      .createQueryBuilder('conv')
      .where(':userId IN (conv.participantIds)', { userId })
      .orderBy('conv.lastMessageAt', 'DESC')
      .getMany();
  }
}
