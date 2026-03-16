import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationsService {
  constructor() {
    // Initialize Firebase Admin if credentials are set
    if (process.env.FIREBASE_PROJECT_ID) {
      try {
        admin.initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        });
      } catch (error) {
        console.log('Firebase already initialized');
      }
    }
  }

  async sendPushNotification(
    deviceToken: string,
    title: string,
    body: string,
    data?: Record<string, string>
  ): Promise<string> {
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
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  async sendMulticastNotification(
    deviceTokens: string[],
    title: string,
    body: string,
    data?: Record<string, string>
  ): Promise<any> {
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
    } catch (error) {
      console.error('Error sending multicast notification:', error);
      throw error;
    }
  }
}
