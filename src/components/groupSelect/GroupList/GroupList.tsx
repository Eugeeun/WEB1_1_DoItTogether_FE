import React from 'react';
import { Group } from '@/types/apis/groupApi';
import OpenSheetBtn from '@/components/common/button/OpenSheetBtn/OpenSheetBtn';
import { NoGroupIcon } from '@/components/common/icon';
import { useGetGroupQuery } from '@/services/group/groupQuery';

interface GroupListProps {
  handleClick: (group: Group) => void;
}

const GroupList: React.FC<GroupListProps> = React.memo(({ handleClick }) => {
  const { data: groups } = useGetGroupQuery();

  if (groups && groups.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center flex-1 gap-4 text-center whitespace-pre-line text-gray3'>
        <NoGroupIcon />
        <p className='font-subhead'>{'현재 방이 없어요\n새로운 방을 만들어보세요'}</p>
      </div>
    );
  }

  return (
    <>
      {groups?.map(group => (
        <OpenSheetBtn
          key={group.channelId}
          text={group.name}
          handleClick={() => handleClick(group)}
          type='groupSelect'
        />
      ))}
    </>
  );
});

export default GroupList;
