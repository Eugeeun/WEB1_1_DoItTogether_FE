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
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const targetUrl = window.location.origin + window.location.pathname + window.location.search;

  if (isIOS) {
    // URL에 타임스탬프 추가하여 동일 URL 문제 해결
    const timestamp = new Date().getTime();
    const modifiedUrl = targetUrl + (targetUrl.includes('?') ? '&' : '?') + `t=${timestamp}`;

    // 사용자에게 버튼을 클릭하도록 안내하는 UI 표시
    const openButton = document.createElement('button');
    openButton.innerText = '사파리에서 열기';
    openButton.onclick = () => {
      window.location.href = modifiedUrl;
    };
    document.body.appendChild(openButton);
    openButton.click();
  } else {
    // 안드로이드: Chrome 인텐트로 시도
    window.location.href = `intent://${targetUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
  }
}
