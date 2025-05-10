import Header from '@/components/common/header/Header';
import PresetTab from '@/components/common/tab/PresetTab/PresetTab';
import Tab from '@/components/common/tab/Tab/Tab';
import PresetAddInput from '@/components/setting/presetSetting/PresetAddInput';
import { PresetTabName } from '@/constants';
import { convertTabNameToChargers } from '@/utils/convertUtils';
import usePresetSetting from '@/hooks/usePresetSetting';
import usePresetSettingStore from '@/store/usePresetSettingStore';
import MetaTags from '@/components/common/metaTags/MetaTags';
import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import SearchInput from '@/components/common/search/SearchInput';

const PresetSettingPage = () => {
  const { categoryList, activeTab, cateActiveTab, deleteButtonStates, presetData } =
    usePresetSettingStore();
  const { handleSelectClick, handleDeleteClick, handleBack, handleTabChange, handleCateTabChange } =
    usePresetSetting();
  const { channelId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

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
        <Tab
          activeTab={activeTab}
          handleSetActiveTab={handleTabChange}
          chargers={useMemo(() => convertTabNameToChargers(PresetTabName), [])}
        />
      </div>
      {activeTab === PresetTabName.USER_DATA ? (
        <>
          <div className='mt-5 flex-1'>
            <PresetTab
              searchQuery={searchQuery}
              presetData={presetData}
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
