import { useEffect, useState } from 'react';
import { setupPushNotifications } from '@/utils/fcm';
import {
  usePostFcmTokenMutation,
  useDeleteFcmTokenMutation,
  usePostFcmCheckMutation,
} from '@/services/fcm/fcmMutation';

export const useNotification = () => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | 'unsupported'>(
    'default'
  );
  const [fcmEnabled, setFcmEnabled] = useState(false);

  const postFcmTokenMutation = usePostFcmTokenMutation({
    onSuccess: () => setFcmEnabled(true),
    onError: error => console.error('FCM 설정 오류:', error),
  });

  const deleteFcmTokenMutation = useDeleteFcmTokenMutation({
    onSuccess: () => setFcmEnabled(false),
    onError: error => console.error('FCM 토큰 삭제 오류:', error),
  });

  const postFcmCheckMutation = usePostFcmCheckMutation({
    onSuccess: data => setFcmEnabled(data.result.isActive),
    onError: (error: Error) => {
      console.error('FCM 상태 확인 오류:', error);
      setFcmEnabled(false);
    },
  });

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
  const checkFcmStatus = async (): Promise<boolean> => {
    const notificationResult = await setupPushNotifications();
    if (notificationResult) {
      postFcmCheckMutation.mutate({ token: notificationResult.token });
      return true;
    }
    return false;
  };

  // 알림 권한 요청
  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) return false;

    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
    return permission === 'granted';
  };

  // FCM 토큰 서버에 등록
  const setupFCM = async (): Promise<boolean> => {
    const notificationResult = await setupPushNotifications();
    if (notificationResult) {
      postFcmTokenMutation.mutate(notificationResult);
      return true;
    }
    return false;
  };

  // FCM 토큰 서버에서 삭제
  const deleteFCM = async (): Promise<boolean> => {
    const notificationResult = await setupPushNotifications();
    if (notificationResult) {
      deleteFcmTokenMutation.mutate({ token: notificationResult.token });
      return true;
    }
    return false;
  };

  // 알림 초기화
  const initNotification = async (): Promise<boolean> => {
    if (permissionStatus === 'granted') return await setupFCM();
    if (permissionStatus === 'default') {
      if (await requestPermission()) return await setupFCM();
    }
    return false;
  };

  // 알림 토글 (스위치 조작)
  const toggleFCM = async (enable: boolean): Promise<boolean> => {
    // 항상 최신 권한 상태를 직접 확인
    const currentPermission = 'Notification' in window ? Notification.permission : 'unsupported';
    setPermissionStatus(currentPermission);

    if (enable) {
      if (currentPermission !== 'granted') {
        if (!(await requestPermission())) return false;
      }
      return setupFCM();
    }
    return deleteFCM();
  };

  return {
    permissionStatus,
    fcmEnabled,
    toggleFCM,
    initNotification,
    setupFCM,
    isLoading: postFcmCheckMutation.isPending,
  };
};
