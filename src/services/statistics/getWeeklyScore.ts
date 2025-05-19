import { axiosInstance } from '@/services/axiosInstance';
import { GetWeeklyScoreReq, GetWeeklyScoreRes } from '@/types/apis/statisticsApi';

export const getWeeklyScore = async ({ channelId, targetDate }: GetWeeklyScoreReq) => {
  const response = await axiosInstance.get<GetWeeklyScoreRes>(
    `/api/v1/channels/${channelId}/statistics/weekly/score`,
    { params: { targetDate } }
  );
  console.log('주간 통계 랭킹 데이터 조회 성공', response.data);
  return response.data;
};
