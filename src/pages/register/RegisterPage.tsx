import Button from '@/components/common/button/Button/Button';
import ProfileImg from '@/components/common/profile/ProfileImg';
import TitleCenter from '@/components/common/title/TitleCenter';
import RegisterForm from '@/components/register/RegisterForm/RegisterForm';
import { useRegister } from '@/hooks/useRegister';

const RegisterPage = () => {
  const { error, handleSubmitButton } = useRegister();

  return (
    <div className={`flex h-screen w-full flex-col items-center justify-between px-5 pt-10`}>
      <div className='flex w-full flex-col items-center justify-between gap-4'>
        <TitleCenter title={`사용하실 닉네임과\n프로필을 설정해주세요`} />
        <ProfileImg />
        <RegisterForm />
      </div>
      <div className='sticky bottom-6 w-full'>
        <Button
          label='확인'
          variant='full'
          size='large'
          disabled={error}
          handleClick={handleSubmitButton}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
