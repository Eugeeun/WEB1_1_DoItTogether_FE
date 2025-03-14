import { redirectToExternalBrowser } from '@/utils/browserDetect';
import { useState } from 'react';

interface LoadingRedirectProps {
  handleClose: () => void;
}

export default function LoadingRedirect({ handleClose }: LoadingRedirectProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleRedirect = () => {
    redirectToExternalBrowser();
  };

  const handleCopyUrl = () => {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopyStatus('success');
        // 3초 후 상태 초기화
        setTimeout(() => setCopyStatus('idle'), 3000);
      })
      .catch(() => {
        setCopyStatus('error');
        // 3초 후 상태 초기화
        setTimeout(() => setCopyStatus('idle'), 3000);
      });
  };

  const buttonBaseClass =
    'mb-2 w-full rounded-lg px-6 py-3 text-white shadow-md font-subhead transition-colors duration-300';
  const buttonClass =
    copyStatus === 'success'
      ? `${buttonBaseClass} bg-blue1`
      : copyStatus === 'error'
        ? `${buttonBaseClass} bg-pink1`
        : `${buttonBaseClass} bg-gray2`;

  const buttonText =
    copyStatus === 'success' ? '복사 완료!' : copyStatus === 'error' ? '복사 실패' : 'URL 복사하기';

  return (
    <div className='fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white p-5 text-center'>
      <p className='mb-5 leading-relaxed text-gray2 font-subhead'>
        더 나은 서비스 이용을 위해
        <br />
        외부 브라우저로 이동하세요
      </p>

      <button
        onClick={handleRedirect}
        className='mb-4 w-full rounded-lg bg-main px-6 py-3 text-white shadow-md font-subhead'
      >
        외부 브라우저 바로가기
      </button>

      <>
        <p className='mb-2 text-gray2 font-caption'>
          바로가기가 작동하지 않을 수 있습니다.
          <br />
          아래 버튼으로 URL을 복사한 후 붙여넣으세요.
        </p>

        <button onClick={handleCopyUrl} className={buttonClass}>
          {buttonText}
        </button>
      </>

      <button onClick={handleClose} className='mt-2 text-gray6 underline font-label'>
        닫기
      </button>
    </div>
  );
}
