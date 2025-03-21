import { axiosInstance } from '@/services/axiosInstance';
import { PostTokenToServerRes } from '@/types/apis/fcmApi';

export const deleteFcmToken = async () => {
  const response = await axiosInstance.post<PostTokenToServerRes>(`/api/v1/fcms/token`);
  return response.data;
};
