import { useNavigate } from 'react-router-dom';
import AddHouseWorkBtn from './AddHouseWorkBtn/AddHouseWorkBtn';
import BottomNavBtn from './BottomNavBtn/BottomNavBtn';
import { useParams } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const { channelId } = useParams();

  const navItems = [
    { name: '홈', icon: null },
    { name: '통계', icon: null },
    { name: '설정', icon: null },
    { name: '마이', icon: null },
  ];

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className='flex w-full max-w justify-between bg-white02 px-5 py-2'>
      <BottomNavBtn
        icon={navItems[0].icon}
        name={navItems[0].name}
        handleClick={() => handleClick(`/main/${channelId}`)}
      />
      <BottomNavBtn
        icon={navItems[1].icon}
        name={navItems[1].name}
        handleClick={() => handleClick(`/main/${channelId}/statistics/weekly`)}
      />
      <AddHouseWorkBtn handleClick={() => handleClick('/add-housework/step1')} />
      <BottomNavBtn
        icon={navItems[2].icon}
        name={navItems[2].name}
        handleClick={() => handleClick(`/main/${channelId}/group-setting`)}
      />
      <BottomNavBtn
        icon={navItems[3].icon}
        name={navItems[3].name}
        handleClick={() => handleClick(`/main/${channelId}/my-page`)}
      />
    </div>
  );
};

export default BottomNav;
