import { useEffect, useState } from 'react';
import { setupPushNotifications } from '@/utils/fcm';
import { postFcmTokenMutation, deleteFcmTokenMutation } from '@/services/fcm/useFcmMutation';

export const useNotification = () => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | 'unsupported'>(
    'default'
  );
  const [fcmEnabled, setFcmEnabled] = useState(false);

  const postFcmToken = postFcmTokenMutation({
    onSuccess: () => setFcmEnabled(true),
    onError: error => console.error('FCM 설정 오류:', error),
  });

  const deleteFcmToken = deleteFcmTokenMutation({
    onSuccess: () => setFcmEnabled(false),
    onError: error => console.error('FCM 토큰 삭제 오류:', error),
  });

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
    if (!('Notification' in window)) return false;

    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
    return permission === 'granted';
  };

  const setupFCM = async (): Promise<boolean> => {
    const notificationResult = await setupPushNotifications();
    if (notificationResult) {
      postFcmToken.mutate(notificationResult);
      return true;
    }
    return false;
  };

  const deleteFCM = async (): Promise<boolean> => {
    const notificationResult = await setupPushNotifications();
    if (notificationResult) {
      deleteFcmToken.mutate({ token: notificationResult.token });
      return true;
    }
    return false;
  };

  const initNotification = async (): Promise<boolean> => {
    if (permissionStatus === 'granted') return await setupFCM();
    if (permissionStatus === 'default') {
      if (await requestPermission()) return await setupFCM();
    }
    return false;
  };

  const toggleFCM = async (enable: boolean): Promise<boolean> => {
    if (enable) {
      if (permissionStatus !== 'granted' && !(await requestPermission())) return false;
      return setupFCM(); // FCM 설정
    }

    return deleteFCM(); // FCM 삭제
  };

  return {
    permissionStatus,
    fcmEnabled,
    toggleFCM,
    initNotification,
    setupFCM,
  };
};
