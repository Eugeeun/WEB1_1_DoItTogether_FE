import LoginButton from '@/components/landing/LoginButton';

interface LoginButtonsProps {
  handleLogin: (provider: 'kakao' | 'naver' | 'google') => void;
}

const LoginButtons = ({ handleLogin }: LoginButtonsProps) => {
  return (
    <div className='flex flex-col gap-4 pb-12 pt-3'>
      <div className='text-gray3 font-label'>—— SNS 간편 로그인 ——</div>
      <div className='flex justify-center gap-6'>
        <LoginButton provider='kakao' handleLoginButton={() => handleLogin('kakao')} />
        <LoginButton provider='naver' handleLoginButton={() => handleLogin('naver')} />
        <LoginButton provider='google' handleLoginButton={() => handleLogin('google')} />
      </div>
    </div>
  );
};

export default LoginButtons;
