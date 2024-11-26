import BottomSheetContainer from '@/components/common/BottomSheetContainer/BottomSheetContainer';
import ButtonContainer from '@/components/common/ButtonContainer/ButtonContainer';
import TabContainer from '@/components/common/TabContainer/TabContainer';
import PresetTabContainer from '@/components/PresetTabContainer/PresetTabContainer';
import { useState } from 'react';

interface HouseWorkSheetContainerProps {}

const HouseWorkSheetContainer: React.FC<HouseWorkSheetContainerProps> = ({}) => {
  const [isOpen, setOpen] = useState(true);

  const mockData = {
    userData: [
      {
        category: '거실',
        items: [{ id: 1, description: '매일 아침 화장실 청소하기' }],
      },
      {
        category: '부엌',
        items: [{ id: 2, description: '아침 식사 후 설거지하기' }],
      },
      {
        category: '1번 방',
        items: [{ id: 3, description: '1번 방 바닥 청소' }],
      },
      {
        category: '2번 방',
        items: [{ id: 4, description: '2번 방 옷장 정리' }],
      },
      {
        category: '3번 방',
        items: [{ id: 5, description: '3번 방 나가기' }],
      },
    ],
    presetData: [
      {
        category: '거실',
        items: [
          { id: 1, description: '매일 아침 화장실 청소하기' },
          { id: 2, description: '거실 바닥 청소하기' },
          { id: 3, description: '거실 청소기 돌리기' },
        ],
      },
      {
        category: '부엌',
        items: [
          { id: 4, description: '아침 식사 후 설거지하기' },
          { id: 5, description: '저녁 식사 후 설거지하기' },
          { id: 6, description: '오븐 청소' },
        ],
      },
      {
        category: '1번 방',
        items: [{ id: 7, description: '1번 방 청소' }],
      },
      {
        category: '2번 방',
        items: [{ id: 8, description: '2번 방 청소' }],
      },
      {
        category: '3번 방',
        items: [{ id: 9, description: '3번 방 청소' }],
      },
    ],
  };

  const [activeTab, setActiveTab] = useState<string>('사용자 정의');
  const chargers = Object.keys(mockData).map(key => ({
    name: key === 'userData' ? '사용자 정의' : '프리셋',
  }));

  return (
    <BottomSheetContainer isOpen={isOpen} setOpen={setOpen} title='집안일 선택'>
      <div className='mt-4 flex min-h-96 flex-col gap-y-6 pb-6'>
        <section aria-label='집안일 할당 바텀 시트' className='flex flex-1 flex-col gap-6'>
          <TabContainer
            activeTab={activeTab}
            handleSetActiveTab={setActiveTab}
            chargers={chargers}
          />
          <PresetTabContainer
            data={activeTab === '사용자 정의' ? mockData.userData : mockData.presetData}
          />
        </section>
        <div className='px-5'>
          <ButtonContainer
            buttonLeft={{
              label: '설정',
              variant: 'outline',
              size: 'small',
            }}
            buttonRight={{
              label: '선택',
              variant: 'full',
              size: 'large',
            }}
          />
        </div>
      </div>
    </BottomSheetContainer>
  );
};

export default HouseWorkSheetContainer;
