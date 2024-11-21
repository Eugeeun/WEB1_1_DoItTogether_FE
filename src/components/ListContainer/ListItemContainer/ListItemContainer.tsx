import React from 'react';
import EditDeleteBtn, { EditDeleteBtnProps } from '../EditDeleteBtn/EditDeleteBtn';
import ListActionBtn, { ListActionBtnProps } from '../ListActionBtn/ListActionBtn';

export interface ListItemContainerProps extends ListActionBtnProps, EditDeleteBtnProps {
  /** 집안일 */
  listTitle: string;
  /** 담당자 */
  charger: string;
  /** 시작 시간 */
  time: string;
}

const ListItemContainer: React.FC<ListItemContainerProps> = ({
  actionStatus,
  handleAction,
  listTitle,
  charger,
  time,
  handleEditOrDelete,
}) => {
  return (
    <li
      className={`flex list-none items-center rounded-2xl border border-solid ${actionStatus === 'complete' ? `bg-gray03` : `bg-black02`} p-5 text-white01`}
    >
      <ListActionBtn actionStatus={actionStatus} handleAction={handleAction} />
      <div className='flex w-full justify-between'>
        <div className='flex flex-col items-start justify-center'>
          <p className={`text-18 ${actionStatus === 'complete' && 'line-through'}`}>{listTitle}</p>
          <p className='text-12'>{charger}</p>
        </div>
        <div className='flex flex-col items-end justify-center'>
          <EditDeleteBtn handleEditOrDelete={handleEditOrDelete} />
          <div className='flex items-center'>
            <div className='h-5 w-5 border border-solid'></div>
            <p className='text-12'>{time}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListItemContainer;
