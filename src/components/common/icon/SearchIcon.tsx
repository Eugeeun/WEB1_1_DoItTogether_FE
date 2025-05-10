interface SearchIconProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

const SearchIcon = ({ className = 'text-gray3', width = 24, height = 24 }: SearchIconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.75 18.25C14.8921 18.25 18.25 14.8921 18.25 10.75C18.25 6.60786 14.8921 3.25 10.75 3.25C6.60786 3.25 3.25 6.60786 3.25 10.75C3.25 14.8921 6.60786 18.25 10.75 18.25Z'
        stroke='currentColor'
        strokeWidth='2.4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.7484 20.7504L16.3984 16.4004'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default SearchIcon;
