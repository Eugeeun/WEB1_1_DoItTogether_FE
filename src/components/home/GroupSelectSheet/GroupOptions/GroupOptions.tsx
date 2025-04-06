import React from 'react';
import GroupOption from '@/components/home/GroupSelectSheet/GroupOptions/GroupOption';
import { useParams } from 'react-router-dom';
import { useGetGroupQuery } from '@/services/group/groupQuery';

const GroupOptions: React.FC = ({}) => {
  const { data: groups } = useGetGroupQuery();
  const { channelId } = useParams();

  return (
    <ul className='flex flex-col px-5 pt-8 gap-y-6 pb-14'>
      {groups?.map(group => (
        <GroupOption
          key={group.channelId}
          group={group}
          isSelected={group.channelId === Number(channelId)}
        />
      ))}
    </ul>
  );
};

export default GroupOptions;
