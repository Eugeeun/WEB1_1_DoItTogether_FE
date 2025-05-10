import Header from '@/components/common/header/Header';
import PresetTab from '@/components/common/tab/PresetTab/PresetTab';
import Tab from '@/components/common/tab/Tab/Tab';
import PresetAddInput from '@/components/setting/presetSetting/PresetAddInput';
import { PresetDefault, PresetTabName } from '@/constants';
import { convertTabNameToChargers } from '@/utils/convertUtils';
import usePresetSetting from '@/hooks/usePresetSetting';
import usePresetSettingStore from '@/store/usePresetSettingStore';
import MetaTags from '@/components/common/metaTags/MetaTags';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import SearchInput from '@/components/common/search/SearchInput';
import { getAllCategoryList } from '@/services/preset';

const PresetSettingPage = () => {
  const { categoryList, activeTab, cateActiveTab, deleteButtonStates, presetData } =
    usePresetSettingStore();
  const { handleSelectClick, handleDeleteClick, handleBack, handleTabChange, handleCateTabChange } =
    usePresetSetting();
  const { channelId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(presetData);
  const [presetDefaultData] = useState(PresetDefault);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllCategoryList({ channelId: Number(channelId) });
        setUserData(response.result.presetCategoryList);
      } catch (error) {
        console.error('프리셋 리스트 조회 오류: ', error);
      }
    };
    fetchUserData();
  }, [channelId]);

  // 검색 결과 개수 계산
  const getFilteredCount = (data: typeof presetData) => {
    return data.flatMap(category =>
      category.presetItemList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ).length;
  };

  // 탭에 표시할 개수
  const chargers = useMemo(() => {
    return convertTabNameToChargers(PresetTabName).map(tab => ({
      ...tab,
      count:
        tab.name === PresetTabName.PRESET_DATA
          ? getFilteredCount(presetDefaultData)
          : getFilteredCount(userData),
    }));
  }, [presetDefaultData, userData, searchQuery]);

  return (
    <div className={`flex h-screen flex-col`}>
      <MetaTags
        title={'두잇투게더 - 프리셋 설정'}
        description={'사용자정의 프리셋을 추가하고 삭제할 수 있습니다.'}
        url={`https://doit-together.vercel.app/group-setting/${channelId}/preset-setting/`}
      />
      <div className='sticky top-0 z-10 bg-[#fff]'>
        <Header title='프리셋 관리' isNeededDoneBtn={false} handleBack={handleBack} />
        <SearchInput handleChange={setSearchQuery} />
        <Tab activeTab={activeTab} handleSetActiveTab={handleTabChange} chargers={chargers} />
      </div>
      {activeTab === PresetTabName.USER_DATA ? (
        <>
          <div className='mt-5 flex-1'>
            <PresetTab
              searchQuery={searchQuery}
              presetData={userData}
              cateActiveTab={cateActiveTab}
              setCateActiveTab={handleCateTabChange}
              isPresetSettingCustom={true}
              deleteButtonStates={deleteButtonStates}
              handleDeleteClick={handleDeleteClick}
              handleClick={handleSelectClick}
            />
          </div>
          <div className='sticky bottom-0 bg-[#fff]'>
            <PresetAddInput categoryList={categoryList} />
          </div>
        </>
      ) : (
        <div className='mt-5 flex-1'>
          <PresetTab
            searchQuery={searchQuery}
            presetData={presetData}
            isPresetSettingCustom={false}
          />
        </div>
      )}
    </div>
  );
};

export default PresetSettingPage;
