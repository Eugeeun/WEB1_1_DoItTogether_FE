import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import useHomePageStore from '@/store/useHomePageStore';

import { HOUSEWORK_STATUS } from '@/constants/homePage';
import { IncompleteScoreResponse } from '@/types/apis/houseworkApi';

import { changeHouseworkStatus } from '@/services/housework/changeHouseworkStatus';
import { deleteHousework } from '@/services/housework/deleteHouswork';
import { getMyInfo } from '@/services/user/getMyInfo';
import { getWeeklyIncomplete } from '@/services/housework/getWeeklyIncomplete';
import { postCompliment } from '@/services/noticeManage/postCompliment';
import { postPoke } from '@/services/noticeManage/postPoke';
import useAddHouseWorkStore from '@/store/useAddHouseWorkStore';

import { Housework } from '@/types/apis/houseworkApi';
import { UserBase } from '@/types/apis/userApi';
import { PAGE_SIZE } from '@/constants/common';
import { useGetHouseworksQuery } from '@/services/housework/houseworkQuery';

export const useHomePage = () => {
  const { activeDate, activeTab, setActiveTab, myInfo, setMyInfo, setCurrWeek, homePageNumber } =
    useHomePageStore();

  const { setTargetHousework } = useAddHouseWorkStore();

  const { channelId: channelIdStr } = useParams();
  const channelId = Number(channelIdStr);

  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: houseworks } = useGetHouseworksQuery({
    channelId: Number(channelId),
    targetDate: activeDate,
    pageNumber: homePageNumber,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [myInfoResult] = await Promise.all([getMyInfo()]);

        setMyInfo(myInfoResult.result);
      } catch (error) {
        console.error('그룹 및 내 정보 조회 중 실패:', error);
      }
    };

    fetchData();
  }, [channelId, setMyInfo]);

  const updateWeeklyIncomplete = useCallback(async () => {
    try {
      const currWeekResult = await getWeeklyIncomplete({
        channelId,
        targetDate: activeDate,
      });
      const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
      const newWeekDates = (weekData: IncompleteScoreResponse[]) => {
        return weekData.map(data => {
          const date = new Date(data.date);
          const weekdayIndex = date.getDay();
          const day = weekdays[weekdayIndex];

          return {
            ...data,
            day,
          };
        });
      };
      setCurrWeek(newWeekDates(currWeekResult.result.incompleteScoreResponses));
    } catch (error) {
      console.error('주간 미완료율 조회 실패:', error);
    }
  }, [channelId, activeDate, setCurrWeek]);

  const handleAction = useCallback(
    async (houseworkId: number) => {
      const targetHousework = houseworks?.find(housework => housework.houseworkId === houseworkId);

      if (!targetHousework || !myInfo) return;

      const isMyHousework = targetHousework.userId === myInfo.userId;
      const isComplete = targetHousework.status === HOUSEWORK_STATUS.COMPLETE;

      try {
        if (isMyHousework) {
          await handleStatusChange(targetHousework);
        } else if (isComplete) {
          await handleCompliment(targetHousework, myInfo);
        } else {
          await handlePoke(targetHousework, myInfo);
        }
      } catch (error) {
        handleError(error);
      }
    },
    [channelId, houseworks, myInfo, updateWeeklyIncomplete, toast]
  );

  const handleStatusChange = async (housework: Housework) => {
    await changeHouseworkStatus({ channelId, houseworkId: housework.houseworkId });
    queryClient.invalidateQueries({ queryKey: ['houseworks'] });
    await updateWeeklyIncomplete();
  };

  const handleCompliment = async (housework: Housework, myInfo: UserBase) => {
    await postCompliment({
      channelId,
      targetUserId: housework.userId,
      reactDate: housework.startDate,
      notificationRequest: {
        title: `${myInfo.nickName}님이 당신을 칭찬했습니다.`,
        content: `${housework.task}을(를) 완벽히 수행하셨군요.`,
      },
    });
    toast({ title: `${housework.assignee}님을 칭찬했어요.` });
  };

  const handlePoke = async (housework: Housework, myInfo: UserBase) => {
    await postPoke({
      channelId,
      targetUserId: housework.userId,
      reactDate: housework.startDate,
      notificationRequest: {
        title: `${myInfo.nickName}님이 당신을 찔렀습니다.`,
        content: `${housework.task}을(를) 완료해주세요.`,
      },
    });
    toast({ title: `${housework.assignee}님을 찔렀어요` });
  };

  const handleError = (error: unknown) => {
    console.error('작업 실패:', error);
    toast({ title: `오류가 발생했어요.` });
  };

  const handleEdit = useCallback(
    (houseworkId: number) => {
      const targetHousework = houseworks?.find(housework => housework.houseworkId === houseworkId);
      if (targetHousework?.status === HOUSEWORK_STATUS.COMPLETE) {
        toast({ title: '완료한 집안일은 수정할 수 없어요' });
      } else {
        setTargetHousework(targetHousework);
        navigate(`/add-housework/edit/${channelId}/${houseworkId}`);
      }
    },
    [houseworks, navigate, channelId, toast]
  );

  const handleDelete = useCallback(
    async (houseworkId: number) => {
      try {
        await deleteHousework({ channelId, houseworkId });
        toast({ title: '집안일이 삭제되었습니다' });
        queryClient.invalidateQueries({ queryKey: ['houseworks'] });
      } catch (error) {
        console.error('집안일 삭제 실패:', error);
      }
    },
    [channelId, toast]
  );

  return {
    activeTab,
    setActiveTab,
    handleAction,
    handleEdit,
    handleDelete,
  };
};
