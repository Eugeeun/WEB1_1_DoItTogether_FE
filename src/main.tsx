import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './reset.css';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';

// 브라우저 환경 체크 (PWA 관련 코드와 완전히 분리)
const checkBrowserEnvironment = () => {
  try {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isInApp =
      /kakao/.test(userAgent) ||
      /line/.test(userAgent) ||
      /facebook/.test(userAgent) ||
      /instagram/.test(userAgent) ||
      /fban|fbav|twitter|wechat|weibo|instagram|line|kakaotalk|naver|band/.test(userAgent);

    return {
      isIOS,
      isInApp,
      isIOSInApp: isIOS && isInApp,
    };
  } catch (error) {
    console.error('Error checking browser environment:', error);
    return {
      isIOS: false,
      isInApp: false,
      isIOSInApp: false,
    };
  }
};

// Eruda 디버거 컴포넌트
const ErudaDebugger = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      try {
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
      } catch (error) {
        console.error('Error initializing Eruda:', error);
      }
    }
  }, []);
  return null;
};

// 앱 래퍼 컴포넌트
const AppWrapper = () => {
  useEffect(() => {
    const env = checkBrowserEnvironment();

    // iOS 인앱브라우저가 아닐 때만 PWA 초기화
    if (!env.isIOSInApp) {
      import('virtual:pwa-register')
        .then(({ registerSW }) => {
          registerSW({
            onNeedRefresh() {},
            onOfflineReady() {},
          })();
        })
        .catch(error => {
          console.error('PWA registration failed:', error);
        });
    }
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

// 앱 초기화 전에 환경 체크
const env = checkBrowserEnvironment();
if (!env.isIOSInApp) {
  // iOS 인앱브라우저가 아닐 때만 앱 렌더링
  createRoot(document.getElementById('root')!).render(<AppWrapper />);
} else {
  // iOS 인앱브라우저일 때는 PWA 관련 코드를 완전히 제외하고 렌더링
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  );
}
