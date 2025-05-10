import { SearchIcon } from '@/components/common/icon';
import InputBox from '@/components/common/input/InputBox';
import { useState } from 'react';

export interface SearchInputProps {}

const SearchInput = ({}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  console.log('value', value);

  const handleChange = (val: string) => {
    setValue(val);
  };

  const handleCancel = () => {
    setValue('');
  };

  return (
    <div className='flex items-center gap-2 rounded-lg bg-white px-5'>
      <InputBox
        disabled={false}
        handleChange={handleChange}
        leftIcon={<SearchIcon className={isFocused ? 'text-main' : 'text-gray3'} />}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button className='whitespace-nowrap text-black font-label' onClick={handleCancel}>
        취소
      </button>
    </div>
  );
};

export default SearchInput;
