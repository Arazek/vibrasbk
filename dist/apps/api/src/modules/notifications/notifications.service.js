"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const admin = tslib_1.__importStar(require("firebase-admin"));
let NotificationsService = class NotificationsService {
    constructor() {
        // Initialize Firebase Admin if credentials are set
        if (process.env.FIREBASE_PROJECT_ID) {
            try {
                admin.initializeApp({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                });
            }
            catch (error) {
                console.log('Firebase already initialized');
            }
        }
    }
    async sendPushNotification(deviceToken, title, body, data) {
        if (!process.env.FIREBASE_PROJECT_ID) {
            console.log('Firebase not configured, notification not sent');
            return 'Firebase not configured';
        }
        try {
            const message = {
                notification: { title, body },
                data: data || {},
                token: deviceToken,
            };
            const response = await admin.messaging().send(message);
            return response;
        }
        catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    }
    async sendMulticastNotification(deviceTokens, title, body, data) {
        if (!process.env.FIREBASE_PROJECT_ID) {
            console.log('Firebase not configured, notifications not sent');
            return { successCount: 0, failureCount: deviceTokens.length };
        }
        try {
            const message = {
                notification: { title, body },
                data: data || {},
            };
            const response = await admin.messaging().sendMulticast({
                ...message,
                tokens: deviceTokens,
            });
            return response;
        }
        catch (error) {
            console.error('Error sending multicast notification:', error);
            throw error;
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map