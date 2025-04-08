import React from 'react';
import WeeklyDate from '@/components/home/WeeklyDate/WeeklyDate';
import Tab, { TabProps } from '@/components/common/tab/Tab/Tab';
import { useGetGroupUserQuery } from '@/services/group/groupQuery';
import { useParams } from 'react-router-dom';
interface WeeklyDateAndTabProps extends Pick<TabProps, 'activeTab' | 'handleSetActiveTab'> {}

const WeeklyDateAndTab: React.FC<WeeklyDateAndTabProps> = ({ activeTab, handleSetActiveTab }) => {
  const { channelId } = useParams();
  const { data: chargers } = useGetGroupUserQuery({ channelId: Number(channelId) });

  return (
    <div className='sticky top-0 z-10 bg-white'>
      <WeeklyDate />
      <Tab activeTab={activeTab} handleSetActiveTab={handleSetActiveTab} chargers={chargers} />
    </div>
  );
};

export default WeeklyDateAndTab;
