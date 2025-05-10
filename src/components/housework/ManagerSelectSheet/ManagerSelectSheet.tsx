import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import BottomSheet from '@/components/common/bottomSheet/BottomSheet';
import ManagerItems from '@/components/housework/ManagerSelectSheet/ManagerItem/ManagerItems';
import Button from '@/components/common/button/Button/Button';
import AiChoice from '@/components/housework/AiChoice/AiChoice';
import { User } from '@/types/apis/groupApi';
import { RefreshIcon } from '@/components/common/icon';
import { useParams } from 'react-router-dom';
import { postAssignHouseworkAi } from '@/services/housework/postAssignHouseworkAi';
import useAddHouseWorkStore from '@/store/useAddHouseWorkStore';
import { getTargetUserId } from '@/services/housework/getTargetUserId';

interface ManagerSelectSheetProps {
  /**바텀시트 오픈 여부 */
  isOpen: boolean;
  /**isOpen 바꾸는 set함수 */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedValue: Dispatch<SetStateAction<number | null>>;
  selectedValue: number | null;
  members: User[];
  task: string;
}

const ManagerSelectSheet: React.FC<ManagerSelectSheetProps> = ({
  isOpen,
  setIsOpen,
  selectedValue,
  setSelectedValue,
  members,
  task,
}) => {
  const { setUserId, setStatus } = useAddHouseWorkStore();
  const { channelId: strChannelId } = useParams();
  const channelId = Number(strChannelId);

  //ai tags 보여주기위한 state
  const [isAiCardOpen, setIsAiCardOpen] = useState(false);
  //ai pick 클릭했을 경우를 check 및 버튼 이름 바꾸기위한 state
  const [isClickedAI, setIsClickedAI] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState<string[]>(['이유1', '이유2']);

  const selectedManagerRef = React.useRef<HTMLLIElement>(null);

  const postAssignAi = async () => {
    //로딩 시작
    setIsLoading(true);
    //버튼 refresh icon으로 변환
    setIsClickedAI(true);
    try {
      //##1.담당자 ID를 구한다.
      const response = await postAssignHouseworkAi({ channelId, houseworkName: task });
      //구한 담당자 id
      const userId = response.result.userId;

      //ai 값 체크하기 위해 status 전역관리
      setStatus(response.result.status);

      //##2.구한 ID로 성향을 구한다.
      const responseAI = await getTargetUserId({ targetUserId: userId });

      //ui에서 고른 담당자를 나타내주기
      setSelectedValue(userId);

      //##3.id를 통해 반환된 성향을 뿌려준다.
      setTags(responseAI.result.keywords);

      //##4.로딩을 끝내준다.
      setIsLoading(false);

      setTimeout(() => {
        selectedManagerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  //AI 픽 버튼 누를 때 호출되는 함수
  const handleClick = () => {
    setIsAiCardOpen(true);
    postAssignAi();
  };

  //담당자 선택 완료하면 시트 닫힘
  const handleDoneClick = () => {
    setIsOpen(false);
    //전역 id 관리?
    setUserId(selectedValue);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      setOpen={setIsOpen}
      title='담당자 고르기'
      setSelectedValue={setSelectedValue}
      setIsAiCardOpen={setIsAiCardOpen}
    >
      <div className='flex flex-col'>
        {isAiCardOpen && <AiChoice isLoading={isLoading} tags={tags} />}
        <ManagerItems
          isAiCardOpen={isAiCardOpen}
          setIsAiCardOpen={setIsAiCardOpen}
          setSelectedValue={setSelectedValue}
          selectedValue={selectedValue}
          members={members}
          selectedRef={selectedManagerRef}
        />
        <div className='flex gap-3 px-5 pb-6'>
          <Button
            label={isClickedAI ? <RefreshIcon /> : 'AI 픽'}
            variant='secondary'
            size='large'
            handleClick={handleClick}
          />
          <Button label='확인' variant='full' size='large' handleClick={handleDoneClick} />
        </div>
      </div>
    </BottomSheet>
  );
};

export default ManagerSelectSheet;
