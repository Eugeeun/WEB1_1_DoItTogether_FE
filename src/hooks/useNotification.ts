import { postFcmToken } from '@/services/fcm/postFcmToken';
import { setupPushNotifications } from '@/utils/fcm';
import { useEffect, useState } from 'react';

export const useNotification = () => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | 'unsupported'>(
    'default'
  );
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = () => {
    if ('Notification' in window) {
      const status = Notification.permission;
      setPermissionStatus(status);
      setIsEnabled(status === 'granted');
    } else {
      setPermissionStatus('unsupported');
      setIsEnabled(false);
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      setIsEnabled(permission === 'granted');
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
        setIsEnabled(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('FCM 설정 오류:', error);
      return false;
    }
  };

  const initNotification = async (): Promise<boolean> => {
    if (permissionStatus === 'default') {
      const granted = await requestPermission();
      if (granted) {
        return await setupFCM();
      }
    } else if (permissionStatus === 'granted') {
      return await setupFCM();
    }
    return false;
  };

  const toggleNotification = async (enable: boolean): Promise<boolean> => {
    if (enable) {
      return await initNotification();
    } else {
      // FCM 토큰 삭제 로직 추가 필요
      setIsEnabled(false);
      return true;
    }
  };

  return {
    permissionStatus,
    isEnabled,
    requestPermission,
    setupFCM,
    initNotification,
    toggleNotification,
  };
};
