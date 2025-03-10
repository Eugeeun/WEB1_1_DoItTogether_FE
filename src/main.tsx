import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './reset.css';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { registerSW } from 'virtual:pwa-register';

// 브라우저 환경 체크
const checkBrowserEnvironment = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
  const isInApp =
    /kakao/.test(userAgent) ||
    /line/.test(userAgent) ||
    /facebook/.test(userAgent) ||
    /instagram/.test(userAgent) ||
    // 일반적인 인앱브라우저 탐지
    /fban|fbav|twitter|wechat|weibo|instagram|line|kakaotalk|naver|band/.test(userAgent);

  // 디버깅을 위한 로그
  if (process.env.NODE_ENV === 'development') {
    console.log('Browser Environment:', {
      userAgent,
      isIOS,
      isSafari,
      isInApp,
    });
  }

  return {
    isIOS,
    isSafari,
    isInApp,
    isIOSInApp: isIOS && isInApp,
  };
};

// 앱 초기화 컴포넌트
const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const env = checkBrowserEnvironment();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // iOS 인앱브라우저가 아닐 때만 PWA 초기화
        if (!env.isIOSInApp) {
          await registerSW({
            onNeedRefresh() {},
            onOfflineReady() {},
            onRegistered(registration) {
              if (process.env.NODE_ENV === 'development') {
                console.log('SW Registered:', registration);
              }
            },
            onRegisterError(error) {
              console.error('SW registration error:', error);
              // 에러가 발생해도 앱은 계속 실행
              setIsInitialized(true);
            },
          })();
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('App initialization error:', error);
        // 에러가 발생해도 앱은 계속 실행
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, [env.isIOSInApp]);

  // 초기화가 완료될 때까지 로딩 상태 표시
  if (!isInitialized) {
    return null; // 또는 로딩 컴포넌트를 반환
  }

  return <>{children}</>;
};

// Eruda 디버거 컴포넌트
const ErudaDebugger = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const script = document.createElement('script');
      script.src = '//cdn.jsdelivr.net/npm/eruda';
      document.body.appendChild(script);
      script.onload = () => {
        // @ts-ignore
        window.eruda.init();
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return null;
};

// 앱 래퍼 컴포넌트
const AppWrapper = () => {
  return (
    <StrictMode>
      <HelmetProvider>
        <AppInitializer>
          <ErudaDebugger />
          <App />
        </AppInitializer>
      </HelmetProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<AppWrapper />);
