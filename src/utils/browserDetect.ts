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

  // URL에 타임스탬프 추가하여 동일 URL 문제 해결
  const timestamp = new Date().getTime();
  const modifiedUrl = targetUrl + (targetUrl.includes('?') ? '&' : '?') + `t=${timestamp}`;

  if (isIOS) {
    // iOS: 사용자 클릭 이벤트에서 window.open 시도 (더 효과적)
    const newWindow = window.open(modifiedUrl, '_blank');

    // 백업: location.href 사용
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = modifiedUrl;
    }
  } else {
    // 안드로이드: Chrome 인텐트로 시도
    window.location.href = `intent://${modifiedUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;

    // 백업: 일반 URL로 리다이렉트
    setTimeout(() => {
      window.location.href = modifiedUrl;
    }, 100);
  }
}
