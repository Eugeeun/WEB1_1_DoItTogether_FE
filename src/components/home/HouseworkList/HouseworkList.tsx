import React from 'react';
import HouseworkListItem from '@/components/home/HouseworkList/HouseworkListItem/HouseworkListItem';
import { PAGE_SIZE } from '@/constants/common';
import { useGetHouseworksQuery } from '@/services/housework/houseworkQuery';
import { useParams } from 'react-router-dom';
import useHomePageStore from '@/store/useHomePageStore';

export interface HouseworkListProps {
  handleAction: (houseworkId: number) => void;
  handleEdit: (houseworkId: number) => void;
  handleDelete: (houseworkId: number) => void;
}

const HouseworkList: React.FC<HouseworkListProps> = ({
  handleAction,
  handleEdit,
  handleDelete,
}) => {
  const { activeDate, homePageNumber } = useHomePageStore();
  const { channelId } = useParams();
  const { data: houseworks } = useGetHouseworksQuery({
    channelId: Number(channelId),
    targetDate: activeDate,
    pageNumber: homePageNumber,
    pageSize: PAGE_SIZE,
  });

  return (
    <div className='flex flex-col gap-2 p-5 max-w'>
      {houseworks?.map(item => (
        <HouseworkListItem
          key={item.houseworkId}
          {...item}
          handleAction={handleAction}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default HouseworkList;
