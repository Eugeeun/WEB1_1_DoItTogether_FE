import { redirectToExternalBrowser } from '@/utils/browserDetect';

interface LoadingRedirectProps {
  onClose: () => void;
}

export default function LoadingRedirect({ onClose }: LoadingRedirectProps) {
  const handleRedirect = () => {
    redirectToExternalBrowser();
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
        className='max-w-xs mb-4 w-full rounded-lg bg-main px-6 py-3 font-semibold text-white shadow-md transition-colors'
      >
        외부 브라우저 바로가기
      </button>

      <button onClick={onClose} className='text-gray-500 text-sm underline'>
        닫기
      </button>
    </div>
  );
}
