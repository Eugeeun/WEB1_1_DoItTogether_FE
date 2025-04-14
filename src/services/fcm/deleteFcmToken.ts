import { axiosInstance } from '@/services/axiosInstance';
import { DeleteTokenFromServerReq, DeleteTokenFromServerRes } from '@/types/apis/fcmApi';

export const deleteFcmToken = async ({ token }: DeleteTokenFromServerReq) => {
  const response = await axiosInstance.delete<DeleteTokenFromServerRes>(`/api/v1/fcms/token`, {
    data: { token: token },
  });
  return response.data;
};
