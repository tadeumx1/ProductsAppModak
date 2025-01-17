import { useCallback } from 'react';
import notifee, { Notification } from '@notifee/react-native';

interface NotificationParams extends Notification {
  android?: {
    channelId?: string;
    smallIcon?: string;
    pressAction?: {
      id: string;
    };
  };
}

interface UseSendNotificationsResult {
  sendNotification: (notificationParams: NotificationParams) => Promise<void>;
}

export const useSendNotifications = (): UseSendNotificationsResult => {
  const sendNotification = useCallback(
    async (notificationParams: NotificationParams) => {
      try {
        // Required for IOS
        await notifee.requestPermission();

        // Required for Android
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });

        const android = {
          ...notificationParams.android,
          channelId: notificationParams.android?.channelId || channelId,
        };

        await notifee.displayNotification({
          ...notificationParams,
          android,
        });
      } catch (error) {
        console.error('Failed to display notification ', error);
      }
    },
    []
  );

  return { sendNotification };
};
