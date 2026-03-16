"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
const create_message_dto_1 = require("./dtos/create-message.dto");
let ChatGateway = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
        this.userSockets = new Map();
    }
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (!this.userSockets.has(userId)) {
            this.userSockets.set(userId, []);
        }
        this.userSockets.get(userId).push(client.id);
        console.log(`User ${userId} connected with socket ${client.id}`);
    }
    handleDisconnect(client) {
        const userId = client.handshake.query.userId;
        const sockets = this.userSockets.get(userId) || [];
        const index = sockets.indexOf(client.id);
        if (index > -1) {
            sockets.splice(index, 1);
        }
    }
    async handleSendMessage(client, createMessageDto) {
        const userId = client.handshake.query.userId;
        const message = await this.chatService.sendMessage(userId, createMessageDto);
        // Emit to all connected users in the conversation
        this.server.to(message.conversationId).emit('new-message', message);
        return { success: true, message };
    }
    handleJoinConversation(client, conversationId) {
        client.join(conversationId);
        client.emit('joined-conversation', { conversationId });
    }
    handleLeaveConversation(client, conversationId) {
        client.leave(conversationId);
    }
};
exports.ChatGateway = ChatGateway;
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('send-message'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        create_message_dto_1.CreateMessageDto]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('join-conversation'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinConversation", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('leave-conversation'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleLeaveConversation", null);
exports.ChatGateway = ChatGateway = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
        namespace: '/chat',
    }),
    tslib_1.__metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map