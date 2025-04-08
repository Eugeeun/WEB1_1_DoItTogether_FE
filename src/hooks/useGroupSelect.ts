import { useNavigate } from 'react-router-dom';
import useHomePageStore from '@/store/useHomePageStore';
import { Group } from '@/types/apis/groupApi';

export const useGroupSelect = () => {
  const navigate = useNavigate();
  const { setActiveTab } = useHomePageStore();

  const handleMakeGroupBtnClick = () => {
    navigate('/group/create');
  };

  const handleInvitedBtnClick = () => {
    navigate('/group/invite-receive');
  };

  const handleClick = (group: Group) => {
    setActiveTab('전체');
    navigate(`/main/${group.channelId}`);
  };

  return {
    handleMakeGroupBtnClick,
    handleInvitedBtnClick,
    handleClick,
  };
};
