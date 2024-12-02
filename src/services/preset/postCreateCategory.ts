import { axiosInstance } from '@/services/axiosInstance';
import { CreatePresetCategoryReq, CreatePresetCategoryRes } from '@/types/apis/presetApi';

// 현재 호출부 없음
export const postCreateCategory = async ({ channelId, category }: CreatePresetCategoryReq) => {
  try {
    const response = await axiosInstance.post<CreatePresetCategoryRes>(
      `/api/v1/channels/${channelId}/presets/categories`,
      { category }
    );
    return response.data;
  } catch (error) {
    console.error('프리셋 카테고리 생성 실패:', error);
    throw error;
  }
};