export declare class NotificationsService {
    constructor();
    sendPushNotification(deviceToken: string, title: string, body: string, data?: Record<string, string>): Promise<string>;
    sendMulticastNotification(deviceTokens: string[], title: string, body: string, data?: Record<string, string>): Promise<any>;
}
//# sourceMappingURL=notifications.service.d.ts.map