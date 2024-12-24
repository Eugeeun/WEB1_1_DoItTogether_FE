import React from 'react';
import InputWithLabel from '@/components/common/input/InputWithLabel';
import ErrorMessage from '@/components/common/errorMessage/ErrorMessage';
import RegisterNotice from '@/components/register/RegisterNotice';
import { INPUT_VALIDATION } from '@/constants/validation';
import { useRegister } from '@/hooks/useRegister';

const RegisterForm: React.FC = () => {
  const { name, error, handleNameChange } = useRegister();

  return (
    <div className='flex w-full flex-1 flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <InputWithLabel
          label='이름'
          value={name}
          handleChange={handleNameChange}
          placeholder='이름을 입력해주세요'
          disabled={false}
        />
        {error && <ErrorMessage message={INPUT_VALIDATION.nickname.errorMessage} />}
      </div>
      <RegisterNotice />
    </div>
  );
};

export default RegisterForm;
