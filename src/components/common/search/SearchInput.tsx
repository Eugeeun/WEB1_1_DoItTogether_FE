import { SearchIcon } from '@/components/common/icon';
import InputBox from '@/components/common/input/InputBox';
import { useState } from 'react';

export interface SearchInputProps {
  handleChange?: (val: string) => void;
}

const SearchInput = ({ handleChange }: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  console.log('value', value);

  const handleInputChange = (val: string) => {
    setValue(val);
    handleChange?.(val);
  };

  const handleCancel = () => {
    setValue('');
    handleChange?.('');
  };

  return (
    <div className='flex items-center gap-2 rounded-lg bg-white px-5'>
      <InputBox
        value={value}
        disabled={false}
        handleChange={handleInputChange}
        leftIcon={<SearchIcon className={isFocused ? 'text-main' : 'text-gray3'} />}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button className='whitespace-nowrap px-2 text-black font-label' onClick={handleCancel}>
        취소
      </button>
    </div>
  );
};

export default SearchInput;
