import { deleteFcmToken } from '@/services/fcm/deleteFcmToken';
import { postFcmCheck } from '@/services/fcm/postFcmCheck';
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
    checkFcmStatus();
  }, []);

  // 브라우저 기기 알림 권한 상태 확인
  const checkPermissionStatus = () => {
    if ('Notification' in window) {
      const status = Notification.permission;
      setPermissionStatus(status);
    } else {
      setPermissionStatus('unsupported');
    }
  };

  // 서버에서 FCM 활성화 상태 확인
  const checkFcmStatus = async () => {
    try {
      const notificationResult = await setupPushNotifications();
      if (notificationResult) {
        const { token } = notificationResult;
        const { result } = await postFcmCheck({ token });
        setFcmEnabled(result.isActive);
      }
    } catch (error) {
      console.error('FCM 상태 확인 오류:', error);
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

  // FCM 토큰 서버에 등록
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

  // FCM 토큰 서버에서 삭제
  const deleteFCM = async (): Promise<boolean> => {
    try {
      const notificationResult = await setupPushNotifications();
      if (notificationResult) {
        const { token } = notificationResult;
        await deleteFcmToken({ token });
        setFcmEnabled(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('FCM 토큰 삭제 오류:', error);
      return false;
    }
  };

  // 알림 초기화
  const initNotification = async (): Promise<boolean> => {
    if (permissionStatus === 'granted') {
      return await setupFCM();
    } else if (permissionStatus === 'default') {
      const granted = await requestPermission();
      if (granted) {
        return await setupFCM();
      }
    }
    return false;
  };

  // 알림 토글 (스위치 조작)
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

