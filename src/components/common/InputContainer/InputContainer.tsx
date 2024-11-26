import InputBox from '@/components/common/InputContainer/InputBox/InputBox';
import React from 'react';

interface InputContainerProps {
  label: string;
  value?: string;
  placeholder?: string;
  disabled: boolean;
  handleChange?: (value: string) => void;
}

const InputContainer: React.FC<InputContainerProps> = ({
  label,
  value,
  placeholder,
  disabled,
  handleChange,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-14'>{label}</p>
      <InputBox
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        handleChange={handleChange}
      />
    </div>
  );
};

export default InputContainer;
