import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './reset.css';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { registerSW } from 'virtual:pwa-register';

// iOS 인앱브라우저 체크 (Safari는 제외)
const isIOSInAppExceptSafari = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);

  // Safari 브라우저 체크
  const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);

  // 인앱브라우저 체크
  const isInApp =
    /kakao/.test(userAgent) ||
    /line/.test(userAgent) ||
    /facebook/.test(userAgent) ||
    /instagram/.test(userAgent);

  return isIOS && isInApp && !isSafari;
};

// PWA 등록 (iOS 인앱브라우저가 아닐 때만)
if (!isIOSInAppExceptSafari()) {
  registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
  });
}

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
