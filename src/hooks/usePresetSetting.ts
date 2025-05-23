import { useEffect, useCallback, useState, useMemo } from 'react';
import {
  deletePresetItem,
  getAllCategoryName,
  postCreatePresetItem,
  getAllCategoryList,
} from '@/services/preset';
import usePresetSettingStore from '@/store/usePresetSettingStore';
import { useNavigate, useParams } from 'react-router-dom';
import { Category, PresetDefault, PresetTabName, INPUT_VALIDATION } from '@/constants';
import { convertTabNameToChargers } from '@/utils/convertUtils';

const usePresetSetting = () => {
  const navigate = useNavigate();
  const {
    setCategoryList,
    setDeleteButtonStates,
    activeTab,
    setActiveTab,
    setPresetData,
    selectedItem,
    setSelectedItem,
    setCateActiveTab,
    inputVal,
    setInputVal,
    setActiveInputCate,
    activeInputCateId,
    setActiveInputCateId,
    cateActiveTab,
    presetData,
    deleteButtonStates,
    categoryList,
  } = usePresetSettingStore();

  const { channelId: strChannelId } = useParams();
  const channelId = Number(strChannelId);
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(presetData);
  const [presetDefaultData] = useState(PresetDefault);

  useEffect(() => {
    initCategoryList();
    setDeleteButtonStates(null);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllCategoryList({ channelId });
        setUserData(response.result.presetCategoryList);
      } catch (error) {
        console.error('프리셋 리스트 조회 오류: ', error);
      }
    };
    fetchUserData();
  }, [channelId]);

  const initCategoryList = async () => {
    try {
      const response = await getAllCategoryName({ channelId });
      const categoryListData = response.result.categoryList;
      setCategoryList(categoryListData);
    } catch (error) {
      console.error('카테고리명 조회 실패: ', error);
    }
  };

  useEffect(() => {
    getPresetData();
    setCateActiveTab(Category.ALL);
  }, [activeTab]);

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

  const handleAddInput = useCallback(
    async (name: string, presetCategoryId: number) => {
      try {
        await postCreatePresetItem({
          channelId,
          presetCategoryId,
          name,
        });
        // 업데이트된 아이템 리스트 조회
        await getPresetData();
        setCateActiveTab(Category.ALL);
      } catch (error) {
        console.error('프리셋 아이템 추가 실패: ', error);
      }
    },
    [postCreatePresetItem, getPresetData]
  );

  const handleSelectClick = useCallback(
    (presetItemId: number) => {
      const isDeselecting = selectedItem === presetItemId;
      setSelectedItem(isDeselecting ? null : presetItemId);
      setDeleteButtonStates(isDeselecting ? null : presetItemId);
    },
    [selectedItem]
  );

  const handleDeleteClick = useCallback(
    async (presetCategoryId: number, presetItemId: number) => {
      setDeleteButtonStates(null);

      try {
        await deletePresetItem({ channelId, presetCategoryId, presetItemId });
        // 업데이트된 아이템 리스트 조회
        await getPresetData();
      } catch (error) {
        console.error('프리셋 아이템 삭제 실패: ', error);
      }
    },
    [setDeleteButtonStates, deletePresetItem, getPresetData]
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value);
      window.scrollTo({
        top: 0,
      });
    },
    [setActiveTab]
  );

  const handleCateTabChange = useCallback(
    (value: string) => {
      setCateActiveTab(value);
      window.scrollTo({
        top: 0,
      });
    },
    [setCateActiveTab]
  );

  const handleInputCateClick = useCallback((cate: string, cateId: number) => {
    setActiveInputCate(cate);
    setActiveInputCateId(cateId);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= INPUT_VALIDATION.preset.maxLength) {
      setInputVal(value);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputVal.trim()) {
        handleAddInput(inputVal, activeInputCateId);
        setInputVal('');
      }
    },
    [handleAddInput]
  );

  const handleIconClick = useCallback(() => {
    if (inputVal.trim()) {
      handleAddInput(inputVal, activeInputCateId);
      setInputVal('');
    }
  }, [inputVal]);

  return {
    handleAddInput,
    handleSelectClick,
    handleDeleteClick,
    handleBack,
    handleTabChange,
    handleCateTabChange,
    handleInputCateClick,
    handleInputChange,
    handleKeyDown,
    handleIconClick,
    searchQuery,
    setSearchQuery,
    chargers,
    userData,
    presetDefaultData,
    cateActiveTab,
    deleteButtonStates,
    categoryList,
    activeTab,
    presetData,
  };
};

export default usePresetSetting;
