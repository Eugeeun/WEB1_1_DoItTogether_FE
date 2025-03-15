// 인앱브라우저인지 감지하는 함수
export function isInAppBrowser() {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // 카카오톡
  if (/KAKAOTALK/i.test(userAgent)) return true;

  // 페이스북
  if (/FBAN|FBAV/i.test(userAgent)) return true;

  // 인스타그램
  if (/Instagram/i.test(userAgent)) return true;

  // 라인
  if (/Line/i.test(userAgent)) return true;

  // iOS 웹뷰
  if (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent)) return true;

  // 안드로이드 웹뷰
  if (/Android.*wv/i.test(userAgent)) return true;

  return false;
}

export function redirectToExternalBrowser() {
  const targetUrl = window.location.origin + window.location.pathname + window.location.search;
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const baseUrl = targetUrl.split('#')[0];
  const hash = targetUrl.includes('#') ? '#' + targetUrl.split('#')[1] : '';
  const timestamp = new Date().getTime();
  const separator = baseUrl.includes('?') ? '&' : '?';
  const modifiedUrl = baseUrl + separator + `t=${timestamp}` + hash;

  if (isIOS) {
    // 1. Chrome으로 먼저 시도
    const chromeUrl = modifiedUrl.replace(/^https?:\/\//, '');
    window.location.href = `googlechrome://${chromeUrl}`;

    // 2. 백업: Safari로 시도 (약간의 지연 후)
    setTimeout(() => {
      window.location.href = modifiedUrl;
    }, 100);

    // 3. 추가 백업: window.open 시도
    setTimeout(() => {
      window.open(modifiedUrl, '_system');
    }, 200);
  } else {
    // 안드로이드: Chrome
    window.location.href = `intent://${modifiedUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;

    // 백업: 일반
    setTimeout(() => {
      window.location.href = modifiedUrl;
    }, 100);
  }
}
