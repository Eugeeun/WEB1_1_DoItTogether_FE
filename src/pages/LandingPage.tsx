import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ServiceTitle, LoginButton } from '@/components/landing';
import { useLanding } from '@/hooks/useLanding';
import MetaTags from '@/components/common/metaTags/MetaTags';

const ServiceLogo = lazy(() => import('@/components/landing/ServiceLogo'));

const LandingPage = () => {
  const { handleLogin } = useLanding();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.7,
      },
    },
  };

  return (
    <>
      <MetaTags
        title={'DoItTogether 두잇투게더'}
        description={'가사 분담이 필요한 모든 이에게'}
        url={'https://doit-together.vercel.app/'}
      />

      <motion.div
        className={`mx-auto flex h-screen flex-col gap-10 px-5 text-center`}
        variants={container}
        initial='hidden'
        animate='show'
      >
        <div className='flex flex-1 flex-col'>
          <ServiceTitle />
          <Suspense fallback={<div></div>}>
            <ServiceLogo />
          </Suspense>
        </div>
        <div className='mb-6 flex flex-col gap-4'>
          <LoginButton
            provider='kakao'
            handleLoginButton={() => handleLogin('kakao')}
            label='카카오로 3초 만에 시작하기'
          />
          <LoginButton
            provider='naver'
            handleLoginButton={() => handleLogin('naver')}
            label='네이버로 시작하기'
          />
          <LoginButton
            provider='google'
            handleLoginButton={() => handleLogin('google')}
            label='Google로 시작하기'
          />
        </div>
      </motion.div>
    </>
  );
};

export default LandingPage;
