import { useQuery, QueryOptions } from '@tanstack/react-query';
import { getHouseworkById } from './getHouseworkById';
import {
  GetHouseworkByIdReq,
  GetHouseworkByIdRes,
  GetHouseworkReq,
  GetHouseworkRes,
  GetTargetUserIdReq,
  GetTargetUserIdRes,
  GetWeeklyIncompleteReq,
  GetWeeklyIncompleteRes,
} from '@/types/apis/houseworkApi';
import { getWeeklyIncomplete } from '@/services/housework/getWeeklyIncomplete';
import { getTargetUserId } from '@/services/housework/getTargetUserId';
import { getHouseworks } from '@/services/housework/getHouseworks';
import useHomePageStore from '@/store/useHomePageStore';

// queryKey는 useQuery 내부에서 설정하고 있으므로 중복되지 않도록 Omit을 이용해서 제외
export const useGetHouseworkByIdQuery = (
  params: GetHouseworkByIdReq,
  options?: Omit<QueryOptions<GetHouseworkByIdRes, Error>, 'queryKey'>
) =>
  useQuery({
    queryKey: ['houseworkById', params],
    queryFn: () => getHouseworkById(params),
    ...options,
  });

export const useGetWeeklyIncompleteQuery = (
  params: GetWeeklyIncompleteReq,
  options?: Omit<QueryOptions<GetWeeklyIncompleteRes, Error>, 'queryKey'>
) =>
  useQuery({
    queryKey: ['weeklyIncomplete', params],
    queryFn: () => getWeeklyIncomplete(params),
    ...options,
  });

export const useGetTargetUserIdQuery = (
  params: GetTargetUserIdReq,
  options?: Omit<QueryOptions<GetTargetUserIdRes, Error>, 'queryKey'>
) =>
  useQuery({
    queryKey: ['targetUserId', params],
    queryFn: () => getTargetUserId(params),
    ...options,
  });

// todo
// activeTab을 가져오지 말고 파라미터로 받아오는 것으로 변경
export const useGetHouseworksQuery = (
  params: GetHouseworkReq,
  options?: Omit<QueryOptions<GetHouseworkRes, Error>, 'queryKey'>
) => {
  const { activeTab } = useHomePageStore();

  return useQuery({
    queryKey: ['houseworks', params],
    queryFn: () => getHouseworks(params),
    select: data =>
      data.result.responses.filter(
        housework => housework.assignee === activeTab || activeTab === '전체'
      ),
    ...options,
  });
};
