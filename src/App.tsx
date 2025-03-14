import { router } from '@/router';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useDevice from '@/hooks/useDevice';
import { useEffect, useState } from 'react';
import { isInAppBrowser } from '@/utils/browserDetect';
import { LoadingRedirect } from '@/components/landing';

const queryClient = new QueryClient();

function App() {
  useDevice();
  const [showRedirectPrompt, setShowRedirectPrompt] = useState(false);

  useEffect(() => {
    // 인앱 브라우저인 경우에만 리다이렉트 프롬프트 표시
    if (isInAppBrowser()) {
      setShowRedirectPrompt(true);
    }
  }, []);

  const handleClose = () => {
    setShowRedirectPrompt(false);
  };

  return (
    <>
      {showRedirectPrompt && <LoadingRedirect handleClose={handleClose} />}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
