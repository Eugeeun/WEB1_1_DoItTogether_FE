import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './reset.css';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { registerSW } from 'virtual:pwa-register';

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

// Safari로 열기 배너 컴포넌트
const OpenInSafariBanner = () => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: '16px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: '14px' }}>
          더 나은 사용 경험을 위해 Safari에서 열어주세요
        </p>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setShow(false)}
          style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fff',
          }}
        >
          닫기
        </button>
        <button
          onClick={() => {
            window.location.href = 'https://doit-together.vercel.app/';
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007AFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Safari에서 열기
        </button>
      </div>
    </div>
  );
};

// PWA 등록 시도 (iOS 인앱브라우저가 아닐 때만)
if (!isIOSInApp() && 'serviceWorker' in navigator) {
  registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
    onRegistered() {},
    onRegisterError(error) {
      console.error('SW registration error:', error);
    },
  });
}

// 앱 래퍼 컴포넌트
const AppWrapper = () => {
  const isInApp = isIOSInApp();

  return (
    <StrictMode>
      <HelmetProvider>
        <App />
        {isInApp && <OpenInSafariBanner />}
      </HelmetProvider>
    </StrictMode>
  );
};

// 기본 앱 렌더링
createRoot(document.getElementById('root')!).render(<AppWrapper />);
