import { Input } from '@/components/common/ui/input';
import type { ReactNode } from 'react';

interface InputBoxProps {
  value?: string;
  placeholder?: string;
  disabled: boolean;
  handleChange?: (value: string) => void;
  leftIcon?: ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  value,
  placeholder,
  disabled,
  handleChange,
  leftIcon,
  onFocus,
  onBlur,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange?.(e.target.value);
  };

  return (
    <div className='relative w-full'>
      {leftIcon && (
        <span className='pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center'>
          {leftIcon}
        </span>
      )}
      <Input
        placeholder={placeholder}
        className={`h-12 rounded-lg font-label ${leftIcon ? 'pl-10' : ''}`}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputBox;
