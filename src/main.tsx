import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './reset.css';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';

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

  // serviceWorker 지원 여부 체크
  const hasServiceWorker = 'serviceWorker' in navigator && !!navigator.serviceWorker;

  // 디버깅을 위한 로그
  if (process.env.NODE_ENV === 'development') {
    console.log('Browser Environment:', {
      userAgent,
      isIOS,
      isSafari,
      isInApp,
      hasServiceWorker,
    });
  }

  return {
    isIOS,
    isSafari,
    isInApp,
    isIOSInApp: isIOS && isInApp,
    hasServiceWorker,
  };
};

// PWA 초기화 함수
const initializePWA = async () => {
  const env = checkBrowserEnvironment();

  // serviceWorker를 지원하고 iOS 인앱브라우저가 아닐 때만 PWA 초기화
  if (env.hasServiceWorker && !env.isIOSInApp) {
    try {
      const { registerSW } = await import('virtual:pwa-register');
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
  } else if (process.env.NODE_ENV === 'development') {
    console.log('ServiceWorker is not supported in this environment');
  }
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
  useEffect(() => {
    // 앱이 마운트된 후에 PWA 초기화 시도
    initializePWA().catch(error => {
      console.error('Failed to initialize PWA:', error);
    });
  }, []);

  return (
    <StrictMode>
      <HelmetProvider>
        <ErudaDebugger />
        <App />
      </HelmetProvider>
    </StrictMode>
  );
};

// 전역 에러 핸들러 추가
window.onerror = function (message, source, lineno, colno, error) {
  console.error('Global error:', { message, source, lineno, colno, error });
  return false;
};

createRoot(document.getElementById('root')!).render(<AppWrapper />);
