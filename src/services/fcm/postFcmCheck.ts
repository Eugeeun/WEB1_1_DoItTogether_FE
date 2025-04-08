import { axiosInstance } from '@/services/axiosInstance';
import { PostTokenCheckReq, PostTokenCheckRes } from '@/types/apis/fcmApi';

export const postFcmCheck = async ({ token }: PostTokenCheckReq) => {
  const response = await axiosInstance.post<PostTokenCheckRes>(`/api/v1/fcms/token/check`, {
    token,
  });
  return response.data;
};
