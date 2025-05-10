import { useCallback, useEffect, useMemo, useState } from 'react';
import BottomSheet from '@/components/common/bottomSheet/BottomSheet';
import Button from '@/components/common/button/Button/Button';
import PresetTab from '@/components/common/tab/PresetTab/PresetTab';
import Tab from '@/components/common/tab/Tab/Tab';
import useAddHouseWorkStore from '@/store/useAddHouseWorkStore';
import { Category, PresetDefault, PresetTabName } from '@/constants';
import { convertTabNameToChargers } from '@/utils/convertUtils';
import { getAllCategoryList } from '@/services/preset';
import { useParams } from 'react-router-dom';
import SearchInput from '@/components/common/search/SearchInput';

interface HouseWorkSheetProps {
  /** 바텀시트 오픈 여부 */
  isOpen: boolean;
  /** isOpen 바꾸는 set함수 */
  setOpen: (isOpen: boolean) => void;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

interface PresetItem {
  // 프리셋 아이템 아이디
  presetItemId: number;
  // 프리셋 아이템 이름
  name: string;
}
interface PresetList {
  // 프리셋 카테고리 아이디
  presetCategoryId: number;
  // 프리셋 카테고리 이름
  category: string;
  // 프리셋 아이템 리스트
  presetItemList: Array<PresetItem>;
}

const HouseWorkSheet: React.FC<HouseWorkSheetProps> = ({
  isOpen,
  setOpen,
  setTask,
  setCategory,
}) => {
  const { selectedItem, setSelectedItem } = useAddHouseWorkStore();
  const [activeTab, setActiveTab] = useState<string>(PresetTabName.PRESET_DATA);
  const [cateActiveTab, setCateActiveTab] = useState<string>(Category.ALL);
  const [presetData, setPresetData] = useState<PresetList[]>([]);
  const [selectedHouseWork, setSelectedHouseWork] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const memoizedPresetData = useMemo(() => presetData, [presetData]);

  // 현재 입장한 채널
  const { channelId: strChannelId } = useParams();
  const channelId = Number(strChannelId);

  useEffect(() => {
    const getPresetData = async () => {
      setPresetData([]);
      if (activeTab === PresetTabName.USER_DATA) {
        try {
          const response = await getAllCategoryList({ channelId });
          setPresetData(response.result.presetCategoryList);
        } catch (error) {
          console.error('프리셋 리스트 조회 오류: ', error);
        }
      } else {
        setPresetData(PresetDefault);
      }
    };
    getPresetData();
    setCateActiveTab(Category.ALL);
  }, [activeTab]);

  const handleClick = (id: number, description: string, category: string) => {
    const isDeselecting = selectedItem === id;
    setSelectedItem(isDeselecting ? null : id);

    if (isDeselecting) {
      setSelectedHouseWork(null);
      setSelectedCategory(null);
    } else {
      setSelectedHouseWork(description);
      setSelectedCategory(category);
    }
  };

  const handleDoneClick = useCallback(() => {
    setTask(selectedHouseWork ?? '');
    setCategory(selectedCategory ?? '');
    setOpen(false);
  }, [selectedHouseWork, selectedCategory]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.scrollTo({
      top: 0,
    });
  };

  const handleCateTabChange = (value: string) => {
    setCateActiveTab(value);
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <BottomSheet isOpen={isOpen} setOpen={setOpen} title='집안일 선택'>
      <div className='flex min-h-96 flex-col gap-y-6 pb-6'>
        <section aria-label='집안일 할당 바텀 시트' className='flex flex-1 flex-col gap-6'>
          <SearchInput />
          <div>
            <Tab
              activeTab={activeTab}
              // handleSetActiveTab={setActiveTab}
              handleSetActiveTab={handleTabChange}
              chargers={convertTabNameToChargers(PresetTabName)}
            />
          </div>
          <PresetTab
            presetData={memoizedPresetData}
            cateActiveTab={cateActiveTab}
            setCateActiveTab={handleCateTabChange}
            isBottomSheet={true}
            handleClick={handleClick}
            selectedItem={selectedItem}
          />
        </section>
        <div className='px-5'>
          <Button label='확인' variant='full' size='large' handleClick={handleDoneClick} />
        </div>
      </div>
    </BottomSheet>
  );
};

export default HouseWorkSheet;
