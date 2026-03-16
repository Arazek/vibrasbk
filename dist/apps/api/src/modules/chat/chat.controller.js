"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const chat_service_1 = require("./chat.service");
const create_message_dto_1 = require("./dtos/create-message.dto");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async sendMessage(req, createMessageDto) {
        return this.chatService.sendMessage(req.user.id, createMessageDto);
    }
    async getConversation(conversationId) {
        return this.chatService.getConversation(conversationId);
    }
    async getConversations(req) {
        return this.chatService.getConversations(req.user.id);
    }
};
exports.ChatController = ChatController;
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('messages'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a message' }),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, create_message_dto_1.CreateMessageDto]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('conversations/:conversationId/messages'),
    (0, swagger_1.ApiOperation)({ summary: 'Get conversation messages' }),
    tslib_1.__param(0, (0, common_1.Param)('conversationId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "getConversation", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('conversations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user conversations' }),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "getConversations", null);
exports.ChatController = ChatController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Chat'),
    (0, common_1.Controller)('api/chat'),
    (0, swagger_1.ApiBearerAuth)(),
    tslib_1.__metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map