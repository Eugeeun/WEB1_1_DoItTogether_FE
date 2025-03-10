import { StrictMode, useEffect } from 'react';
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

// PWA 초기화 함수
const initializePWA = () => {
  const env = checkBrowserEnvironment();

  // iOS 인앱브라우저가 아닐 때만 PWA 기능 활성화
  if (!env.isIOSInApp) {
    try {
      registerSW({
        onNeedRefresh() {},
        onOfflineReady() {},
        onRegistered(registration) {
          if (process.env.NODE_ENV === 'development') {
            console.log('SW Registered:', registration);
          }
        },
        onRegisterError(error) {
          console.error('SW registration error:', error);
        },
      });
    } catch (error) {
      console.error('PWA initialization error:', error);
    }
  }
};

// PWA 초기화
initializePWA();

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
        <ErudaDebugger />
        <App />
      </HelmetProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<AppWrapper />);
