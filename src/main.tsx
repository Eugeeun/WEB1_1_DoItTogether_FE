import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './reset.css';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { OpenInSafariBanner } from './components/OpenInSafariBanner';

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
