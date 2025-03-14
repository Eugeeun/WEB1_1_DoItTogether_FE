import { useState } from 'react';
import { redirectToExternalBrowser } from '@/utils/browserDetect';

interface LoadingRedirectProps {
  onClose: () => void;
}

export default function LoadingRedirect({ onClose }: LoadingRedirectProps) {
  const [copyStatus, setCopyStatus] = useState('');
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleRedirect = () => {
    redirectToExternalBrowser();
  };

  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopyStatus('URL이 복사되었습니다');
        setTimeout(() => setCopyStatus(''), 2000);
      })
      .catch(() => {
        setCopyStatus('복사 실패. 직접 주소를 복사해주세요.');
      });
  };

  return (
    <div className='fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white p-5 text-center'>
      <h2 className='text-xl text-gray-800 mb-5 font-semibold'>외부 브라우저로 이동하세요</h2>
      <p className='text-gray-600 mb-8 leading-relaxed'>
        더 나은 서비스 이용을 위해
        <br />
        외부 브라우저로 이동하세요.
      </p>

      <button
        onClick={handleRedirect}
        className='mb-4 w-full rounded-lg bg-main px-6 py-3 font-semibold text-white shadow-md transition-colors'
      >
        외부 브라우저 바로가기
      </button>

      {isIOS && (
        <>
          <p className='mb-2 text-12 text-gray2'>
            iOS에서는 바로가기가 작동하지 않을 수 있습니다.
            <br />
            아래 버튼으로 URL을 복사한 후 사파리에 붙여넣으세요.
          </p>

          <button
            onClick={handleCopyUrl}
            className='mb-2 w-full rounded-lg bg-gray2 px-6 py-3 font-semibold text-white shadow-md transition-colors'
          >
            URL 복사하기
          </button>

          {copyStatus && <p className='text-green-500 text-sm mb-4'>{copyStatus}</p>}
        </>
      )}

      <button onClick={onClose} className='text-gray-500 text-sm mt-2 underline'>
        닫기
      </button>
    </div>
  );
}
