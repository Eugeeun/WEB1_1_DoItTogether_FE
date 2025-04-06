import React from 'react';
import useHomePageStore from '@/store/useHomePageStore';
import { HomeIcon } from '@/components/common/icon';
import { useGetGroupQuery } from '@/services/group/groupQuery';
import { useParams } from 'react-router-dom';
const GroupSelectBtn: React.FC = ({}) => {
  const { setIsGroupSelectSheetOpen } = useHomePageStore();
  const { channelId } = useParams();
  const { data: groups } = useGetGroupQuery();

  if (!groups) return null;

  const currentGroupName = groups?.find(group => group.channelId === Number(channelId))?.name;

  return (
    <>
      <button
        className='flex items-center px-3 py-2 text-white rounded-full bg-main text-12'
        onClick={() => setIsGroupSelectSheetOpen(true)}
      >
        <HomeIcon fillClass='text-white' />
        <div className='pl-2 font-caption'>{currentGroupName}</div>
      </button>
    </>
  );
};

export default GroupSelectBtn;
