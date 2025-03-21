import { deleteFcmToken } from '@/services/fcm/deleteFcmToken';
import { postFcmToken } from '@/services/fcm/postFcmToken';
import { setupPushNotifications } from '@/utils/fcm';
import { useEffect, useState } from 'react';

export const useNotification = () => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | 'unsupported'>(
    'default'
  );
  const [fcmEnabled, setFcmEnabled] = useState(false);

  useEffect(() => {
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = () => {
    if ('Notification' in window) {
      const status = Notification.permission;
      setPermissionStatus(status);
      setFcmEnabled(status === 'granted');
    } else {
      setPermissionStatus('unsupported');
      setFcmEnabled(false);
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      return permission === 'granted';
    } catch (error) {
      console.error('알림 권한 요청 오류:', error);
      return false;
    }
  };

  const setupFCM = async (): Promise<boolean> => {
    try {
      const notificationResult = await setupPushNotifications();
      if (notificationResult) {
        const { token, platformType } = notificationResult;
        await postFcmToken({ token, platformType });
        setFcmEnabled(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('FCM 설정 오류:', error);
      return false;
    }
  };

  const deleteFCM = async (): Promise<boolean> => {
    try {
      await deleteFcmToken();
      setFcmEnabled(false);
      return true;
    } catch (error) {
      console.error('FCM 토큰 삭제 오류:', error);
      return false;
    }
  };

  const initNotification = async (): Promise<boolean> => {
    if (permissionStatus === 'granted') {
      return await setupFCM();
    } else if (permissionStatus === 'default') {
      const granted = await requestPermission();
      if (granted) {
        return await setupFCM();
      }
    } else {
      try {
        const notificationResult = await setupPushNotifications();
        if (notificationResult) {
          const { token, platformType } = notificationResult;
          await postFcmToken({ token, platformType });
          return true;
        }
      } catch (error) {
        console.error('FCM 토큰 얻기 실패:', error);
      }
    }

    return false;
  };

  const toggleFCM = async (enable: boolean): Promise<boolean> => {
    if (enable) {
      if (permissionStatus !== 'granted') {
        const granted = await requestPermission();
        if (!granted) {
          return false;
        }
      }
      return await setupFCM();
    } else {
      return await deleteFCM();
    }
  };

  return {
    permissionStatus,
    fcmEnabled,
    toggleFCM,
    initNotification,
    setupFCM,
  };
};
