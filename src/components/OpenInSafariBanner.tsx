import { useState } from 'react';

export const OpenInSafariBanner = () => {
  const [show, setShow] = useState(true);

  const openInSafari = () => {
    const currentURL = window.location.href;

    // 여러 가지 방법 시도
    const urls = [
      `googlechrome://navigate?url=${encodeURIComponent(currentURL)}`,
      `x-web-search://?${encodeURIComponent(currentURL)}`,
      currentURL.replace(/^https?:\/\//, 'safari-https://'),
      currentURL,
    ];

    // 순차적으로 시도
    const tryNextUrl = (index = 0) => {
      if (index >= urls.length) return;

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      try {
        iframe.src = urls[index];
      } catch (e) {
        tryNextUrl(index + 1);
      } finally {
        setTimeout(() => {
          document.body.removeChild(iframe);
          if (index === urls.length - 1) {
            // 마지막 시도는 직접 이동
            window.location.href = currentURL;
          }
        }, 100);
      }
    };

    tryNextUrl();
  };

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
        <a
          href={window.location.href}
          target='_blank'
          rel='noopener noreferrer'
          onClick={e => {
            e.preventDefault();
            openInSafari();
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007AFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Safari에서 열기
        </a>
      </div>
    </div>
  );
};
