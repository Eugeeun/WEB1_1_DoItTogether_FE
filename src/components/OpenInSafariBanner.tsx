import { useState } from 'react';

export const OpenInSafariBanner = () => {
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
