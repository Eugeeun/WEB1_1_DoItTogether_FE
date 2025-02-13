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
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/${provider}`;
  };

  const initNotification = async () => {
    const notificationResult = await setupPushNotifications();
    if (notificationResult) {
      const FCM_TOKEN = 'fcm_token';
      const { token, platformType } = notificationResult;
      console.log(token, platformType);
      const storedToken = sessionStorage.getItem(FCM_TOKEN);
      if (!storedToken || storedToken !== token) {
        try {
          await postFcmToken({ token, platformType });
          sessionStorage.setItem(FCM_TOKEN, token);
        } catch (error) {
          console.error('Error posting FCM token:', error);
        }
      }
    }
  };

  return { handleLogin };
};
