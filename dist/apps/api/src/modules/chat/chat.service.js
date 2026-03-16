"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
const conversation_entity_1 = require("./entities/conversation.entity");
let ChatService = class ChatService {
    constructor(messagesRepository, conversationsRepository) {
        this.messagesRepository = messagesRepository;
        this.conversationsRepository = conversationsRepository;
    }
    async sendMessage(userId, createMessageDto) {
        const message = this.messagesRepository.create({
            ...createMessageDto,
            senderId: userId,
        });
        return this.messagesRepository.save(message);
    }
    async getConversation(conversationId, limit = 50) {
        return this.messagesRepository.find({
            where: { conversationId },
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async getConversations(userId) {
        return this.conversationsRepository
            .createQueryBuilder('conv')
            .where(':userId IN (conv.participantIds)', { userId })
            .orderBy('conv.lastMessageAt', 'DESC')
            .getMany();
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(conversation_entity_1.Conversation)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
//# sourceMappingURL=chat.service.js.map