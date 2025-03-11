import { router } from '@/router';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useDevice from '@/hooks/useDevice';
import { useEffect, useState } from 'react';
import { redirectToExternalBrowser } from '@/utils/browserDetect';
import { LoadingRedirect } from '@/components/landing';

const queryClient = new QueryClient();

function App() {
  useDevice();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    redirectToExternalBrowser(setShowLoading);
  }, []);

  return (
    <>
      {showLoading && <LoadingRedirect />}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
