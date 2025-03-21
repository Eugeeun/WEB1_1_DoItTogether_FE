import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyInitState } from '@/services/user/getMyInitState';
import { setupPushNotifications } from '@/utils/fcm';
import { postFcmToken } from '@/services/fcm/postFcmToken';

export const useLanding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkInitialState = async () => {
      const accessToken = new URLSearchParams(location.search).get('access_token');
      if (accessToken) {
        sessionStorage.setItem('access_token', accessToken);
        initNotification();

        try {
          const initState = await getMyInitState();
          initState.result ? navigate('/group-select') : navigate('/register');
        } catch (error) {
          console.error('초기 상태 확인 실패:', error);
        }
      }
    };

    if (sessionStorage.getItem('access_token')) {
      navigate('/group-select');
      return;
    }
    checkInitialState();
  }, [navigate]);

  const handleLogin = (provider: 'kakao' | 'google' | 'naver') => {
    window.location.href = `${
      import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_PROD_SERVER_URL
        : import.meta.env.VITE_DEV_SERVER_URL
    }/oauth2/authorization/${provider}`;
  };

  const initNotification = async () => {
    // 현재 알림 권한 상태 확인
    if ('Notification' in window && Notification.permission === 'default') {
      // 권한이 아직 요청되지 않은 경우에만 요청
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          // 권한이 허용된 경우 FCM 설정
          const notificationResult = await setupPushNotifications();
          if (notificationResult) {
            const { token, platformType } = notificationResult;
            await postFcmToken({ token, platformType });
          }
        }
      } catch (error) {
        console.error('알림 권한 요청 오류:', error);
      }
    } else {
      // 이미 권한이 허용되었거나 브라우저가 알림을 지원하지 않는 경우
      // 기존 FCM 설정 로직 실행
      const notificationResult = await setupPushNotifications();
      if (notificationResult) {
        const { token, platformType } = notificationResult;
        try {
          await postFcmToken({ token, platformType });
        } catch (error) {
          console.error('Error posting FCM token:', error);
        }
      }
    }
  };
  return { handleLogin };
};
