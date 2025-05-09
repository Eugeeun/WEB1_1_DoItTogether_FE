import { QueryOptions, useQuery } from '@tanstack/react-query';
import { getMyGroup } from './getMyGroup';
import { GetGroupUserReq, GetGroupUserRes, GetMyGroupRes } from '@/types/apis/groupApi';
import { getGroupUser } from './getGroupUser';

export const useGetGroupQuery = (
  options?: Omit<QueryOptions<GetMyGroupRes, Error>, 'queryKey'>
) => {
  return useQuery({
    queryKey: ['group'],
    queryFn: () => getMyGroup(),
    select: data => data.result.channelList,
    ...options,
  });
};

export const useGetGroupUserQuery = (
  params: GetGroupUserReq,
  options?: Omit<QueryOptions<GetGroupUserRes, Error>, 'queryKey'>
) => {
  return useQuery({
    queryKey: ['groupUser', params],
    queryFn: () => getGroupUser(params),
    select: data => {
      return [
        { name: '전체' },
        ...Array.from(new Set(data.result.userList.map(user => user.nickName))).map(charger => ({
          name: charger,
        })),
      ];
    },
    ...options,
  });
};
