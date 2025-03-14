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

export function redirectToExternalBrowser(setShowLoading: (show: boolean) => void) {
  if (!isInAppBrowser()) return;

  setShowLoading(true);
  const targetUrl = window.location.origin + window.location.pathname + window.location.search;

  // 모든 기기에서 동일하게 처리 (iOS도 크롬으로 시도)
  // URL에 타임스탬프 추가하여 동일 URL 문제 해결
  const timestamp = new Date().getTime();
  const modifiedUrl = targetUrl + (targetUrl.includes('?') ? '&' : '?') + `t=${timestamp}`;

  // 크롬 인텐트 또는 URL 스킴 사용
  window.location.href = `intent://${modifiedUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;

  // 백업: 일반 URL로 리다이렉트
  setTimeout(() => {
    window.location.href = modifiedUrl;
  }, 100);
}
