import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyInitState } from '@/services/user/getMyInitState';
import { useNotification } from '@/hooks/useNotification';

export const useLanding = () => {
  const navigate = useNavigate();
  const { initNotification } = useNotification();

  useEffect(() => {
    const checkInitialState = async () => {
      const accessToken = new URLSearchParams(location.search).get('access_token');
      if (accessToken) {
        localStorage.setItem('access_token', accessToken);

        await initNotification();

        try {
          const initState = await getMyInitState();
          initState.result ? navigate('/group-select') : navigate('/register');
        } catch (error) {
          console.error('초기 상태 확인 실패:', error);
        }
      }
    };

    if (localStorage.getItem('access_token')) {
      navigate('/group-select');
      return;
    }
    checkInitialState();
  }, [navigate, initNotification]);

  const handleLogin = (provider: 'kakao' | 'google' | 'naver') => {
    window.location.href = `${
      import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_PROD_SERVER_URL
        : import.meta.env.VITE_DEV_SERVER_URL
    }/oauth2/authorization/${provider}`;
  };

  return { handleLogin };
};
