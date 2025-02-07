interface BathRoomIconProps {
  fillOneClass?: string;
  fillTwoClass?: string;
  width?: string | number;
  height?: string | number;
}

const BathRoomIcon: React.FC<BathRoomIconProps> = ({
  fillOneClass = 'fill-main',
  fillTwoClass = 'fill-sub',
  width = 24,
  height = 24,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='6.7793' y='20.7412' width='0.999785' height='0.759379' className={fillTwoClass} />
      <rect x='16.2129' y='20.7412' width='0.999785' height='0.759379' className={fillTwoClass} />
      <rect
        x='2.41992'
        y='12.7607'
        width='19.1606'
        height='1.27381'
        rx='0.636904'
        className={fillTwoClass}
      />
      <path
        d='M3.58984 14.0342H20.415V16.1199C20.415 18.8813 18.1765 21.1199 15.415 21.1199H8.58984C5.82842 21.1199 3.58984 18.8813 3.58984 16.1199V14.0342Z'
        className={fillTwoClass}
      />
      <rect
        x='4.63086'
        y='6.03223'
        width='1.31475'
        height='7.64971'
        rx='0.657377'
        className={fillTwoClass}
      />
      <path
        d='M11.324 5.94411C11.6366 5.84188 11.8461 5.51852 11.7249 5.21515C11.6455 5.01636 11.5374 4.83439 11.3879 4.61246C11.1164 4.20949 10.7581 3.86804 10.3358 3.60984C9.91342 3.35164 9.4363 3.18233 8.93476 3.11271C8.43322 3.04309 7.91826 3.07466 7.42263 3.20543C6.92701 3.3362 6.46158 3.5633 6.05598 3.87227C5.65038 4.18125 5.31349 4.56533 5.06674 5.00007C4.81999 5.43481 4.75987 5.78908 4.65659 6.44533C4.61801 6.85611 4.6273 7.12018 4.66299 7.33297C4.71254 7.62836 5.01221 7.79751 5.30871 7.7561C5.6249 7.71195 5.86635 7.43726 5.89854 7.11786C5.92285 6.87668 5.95309 6.63779 5.96724 6.46339C6.01978 6.1218 6.07139 5.85209 6.2289 5.57459C6.3864 5.29709 6.60145 5.05193 6.86035 4.85471C7.11925 4.65748 7.41633 4.51252 7.7327 4.42905C8.04906 4.34558 8.37777 4.32542 8.69791 4.36986C9.01805 4.41431 9.3226 4.52237 9.59219 4.68719C9.86178 4.852 10.0905 5.06996 10.2638 5.32717C10.2948 5.3733 10.324 5.42051 10.3512 5.46869C10.5475 5.81602 10.9412 6.06922 11.324 5.94411Z'
        className={fillTwoClass}
      />
      <ellipse cx='13.3302' cy='10.1652' rx='1.3302' ry='1.3302' className={fillOneClass} />
      <ellipse cx='16.5119' cy='9.27947' rx='0.88494' ry='0.88494' className={fillOneClass} />
      <ellipse cx='11.5483' cy='7.6704' rx='0.452626' ry='0.452626' className={fillOneClass} />
      <circle cx='9.82845' cy='10.2611' r='0.78158' className={fillOneClass} />
    </svg>
  );
};

export default BathRoomIcon;
