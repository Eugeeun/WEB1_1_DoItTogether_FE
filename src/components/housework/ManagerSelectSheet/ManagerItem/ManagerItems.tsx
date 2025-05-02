import ManagerItem from '@/components/housework/ManagerSelectSheet/ManagerItem/ManagerItem';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { User } from '@/types/apis/groupApi';
import useAddHouseWorkStore from '@/store/useAddHouseWorkStore';

interface ManagerItemsProps {
  setSelectedValue: Dispatch<SetStateAction<number | null>>;
  selectedValue: number | null;
  members: User[];
  isAiCardOpen: boolean;
  setIsAiCardOpen: Dispatch<SetStateAction<boolean>>;
  selectedRef?: React.RefObject<HTMLLIElement>;
}

const ManagerItems: React.FC<ManagerItemsProps> = ({
  setSelectedValue,
  selectedValue,
  members,
  isAiCardOpen,
  setIsAiCardOpen,
  selectedRef,
}) => {
  const { setNickName, setStatus } = useAddHouseWorkStore();

  const createHandleClick = useCallback(
    (id: number, nickname: string) => () => {
      if (selectedValue === id) {
        setSelectedValue(null);
        setNickName('');

        if (isAiCardOpen) {
          setIsAiCardOpen(false);
        }
      } else {
        setSelectedValue(id);
        setNickName(nickname);

        if (isAiCardOpen) {
          setIsAiCardOpen(false);
        }
      }

      setStatus('SELECT');
    },
    [selectedValue, setSelectedValue, setNickName, isAiCardOpen, setIsAiCardOpen, setStatus]
  );

  return (
    <ul className='my-4 flex h-[220px] flex-col overflow-y-auto pt-2 no-scrollbar'>
      {members.map(member => (
        <ManagerItem
          key={member.userId}
          ref={selectedValue === member.userId ? selectedRef : null}
          name={member.nickName}
          handleClick={createHandleClick(member.userId, member.nickName)}
          selectState={selectedValue === member.userId ? 'selected' : 'default'}
        />
      ))}
    </ul>
  );
};

export default ManagerItems;
