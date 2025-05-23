interface ArrowRightIconProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ className, width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.6248 20.1004C8.2798 20.1004 7.9348 19.9654 7.6648 19.7104C7.41291 19.4574 7.27148 19.1149 7.27148 18.7579C7.27148 18.4009 7.41291 18.0584 7.6648 17.8054L13.4698 12.0004L7.6648 6.21043C7.41291 5.95742 7.27148 5.61494 7.27148 5.25793C7.27148 4.90091 7.41291 4.55843 7.6648 4.30543C7.9178 4.05353 8.26028 3.91211 8.6173 3.91211C8.97432 3.91211 9.3168 4.05353 9.5698 4.30543L16.3198 11.0554C16.5717 11.3084 16.7131 11.6509 16.7131 12.0079C16.7131 12.3649 16.5717 12.7074 16.3198 12.9604L9.5698 19.7104C9.3148 19.9654 8.9698 20.1004 8.6248 20.1004Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ArrowRightIcon;
