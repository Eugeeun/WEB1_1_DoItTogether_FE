import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './reset.css';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';

// iOS 인앱브라우저 체크 함수
function isIOSInAppBrowser() {
  const ua = window.navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isInApp = /(NAVER|KAKAOTALK|Instagram|FB|Line)/i.test(ua);
  return isIOS && isInApp;
}

// 조건부로 서비스워커 등록
if (!isIOSInAppBrowser()) {
  import('virtual:pwa-register')
    .then(({ registerSW }) => {
      registerSW({
        immediate: true,
        onNeedRefresh() {},
        onOfflineReady() {},
      });
    })
    .catch(console.error);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
