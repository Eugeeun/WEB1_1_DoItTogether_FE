import { redirectToExternalBrowser } from '@/utils/browserDetect';
import { useToast } from '@/hooks/use-toast';

interface LoadingRedirectProps {
  onClose: () => void;
}

export default function LoadingRedirect({ onClose }: LoadingRedirectProps) {
  const { toast } = useToast();
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleRedirect = () => {
    redirectToExternalBrowser();
  };

  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          title: 'URL 복사 완료',
          description: 'URL이 클립보드에 복사되었습니다.',
          variant: 'default',
        });
      })
      .catch(() => {
        toast({
          title: '복사 실패',
          description: 'URL을 복사하지 못했습니다. 직접 주소를 복사해주세요.',
          variant: 'destructive',
        });
      });
  };

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

      {isIOS && (
        <>
          <p className='mb-2 text-gray2 font-caption'>
            iOS에서는 바로가기가 작동하지 않을 수 있습니다.
            <br />
            아래 버튼으로 URL을 복사한 후 사파리에 붙여넣으세요.
          </p>

          <button
            onClick={handleCopyUrl}
            className='mb-2 w-full rounded-lg bg-gray2 px-6 py-3 text-white shadow-md font-subhead'
          >
            URL 복사하기
          </button>
        </>
      )}

      <button onClick={onClose} className='mt-2 text-gray6 underline font-label'>
        닫기
      </button>
    </div>
  );
}
