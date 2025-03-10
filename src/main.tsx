import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './reset.css';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';

// iOS 인앱브라우저 체크
const isIOSInApp = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isInApp =
    /kakao/.test(userAgent) ||
    /line/.test(userAgent) ||
    /facebook/.test(userAgent) ||
    /instagram/.test(userAgent) ||
    /fban|fbav|twitter|wechat|weibo|instagram|line|kakaotalk|naver|band/.test(userAgent);

  return isIOS && isInApp;
};

// PWA 등록 함수
const registerPWA = async () => {
  try {
    if (!isIOSInApp()) {
      const { registerSW } = await import('virtual:pwa-register');
      registerSW();
    }
  } catch (error) {
    console.error('PWA registration failed:', error);
  }
};

// PWA 등록 시도
registerPWA();

// 기본 앱 렌더링
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
