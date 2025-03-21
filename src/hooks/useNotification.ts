import { useState, useEffect } from 'react';
import { setupPushNotifications } from '@/utils/fcm';
import { postFcmToken } from '@/services/fcm/postFcmToken';

export const useNotification = () => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | 'unsupported'>(
    'default'
  );

  // 컴포넌트 마운트 시 현재 알림 권한 상태 확인
  useEffect(() => {
    checkPermissionStatus();
  }, []);

  // 알림 권한 상태 확인
  const checkPermissionStatus = () => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    } else {
      setPermissionStatus('unsupported');
    }
  };

  // 알림 권한 요청
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

  // FCM 설정 및 토큰 서버 전송
  const setupFCM = async (): Promise<boolean> => {
    try {
      const notificationResult = await setupPushNotifications();
      if (notificationResult) {
        const { token, platformType } = notificationResult;
        await postFcmToken({ token, platformType });
        return true;
      }
      return false;
    } catch (error) {
      console.error('FCM 설정 오류:', error);
      return false;
    }
  };

  // 알림 초기화 (권한 요청 및 FCM 설정)
  const initNotification = async (): Promise<boolean> => {
    // 권한이 아직 요청되지 않은 경우에만 요청
    if (permissionStatus === 'default') {
      const granted = await requestPermission();
      if (granted) {
        return await setupFCM();
      }
      return false;
    }
    // 이미 권한이 허용된 경우 FCM 설정만 진행
    else if (permissionStatus === 'granted') {
      return await setupFCM();
    }

    return false;
  };

  return {
    permissionStatus,
    isEnabled: permissionStatus === 'granted',
    requestPermission,
    setupFCM,
    initNotification,
  };
};
