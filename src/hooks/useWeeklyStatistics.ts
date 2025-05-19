import { getWeeklyScore } from '@/services/statistics/getWeeklyScore';
import { getWeeklyTotalCount } from '@/services/statistics/getWeeklyTotalCount';
import useWeeklyStateStore from '@/store/useWeeklyStatisticsStore';
import { getFormattedDate } from '@/utils/dateUtils';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useWeeklyStatistics = () => {
  const { channelId: strChannelId } = useParams();
  const channelId = Number(strChannelId);
  const { currentDate, setCurrentDate, setTotalCountData, setScoreCountData } =
    useWeeklyStateStore();

  useEffect(() => {
    setCurrentDate(prevDate => {
      if (prevDate.toDateString() !== new Date().toDateString()) {
        return new Date();
      }
      return prevDate;
    });
  }, []);

  useEffect(() => {
    const fetchCountData = async () => {
      const targetDate = getFormattedDate(currentDate);
      await Promise.allSettled([getTotalCountData(targetDate), getScoreCountData(targetDate)]);
    };

    fetchCountData();
  }, [currentDate]);

  const getTotalCountData = async (targetDate: string) => {
    try {
      const response = await getWeeklyTotalCount({ channelId, targetDate });
      setTotalCountData(response.result);
    } catch (error) {
      console.error('주간 통계 개수 데이터 조회 실패: ', error);
    }
  };

  const getScoreCountData = async (targetDate: string) => {
    try {
      const response = await getWeeklyScore({ channelId, targetDate });

      setScoreCountData(response.result.completeScoreSortedResponse);
    } catch (error) {
      console.error('주간 통계 랭킹 데이터 조회 실패', error);
    }
  };

  const handlePrevWeek = useCallback(() => {
    setCurrentDate((prevDate: Date) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
    setScoreCountData([]);
  }, [setCurrentDate]);

  const handleNextWeek = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
    setScoreCountData([]);
  }, [setCurrentDate]);

  return {
    handlePrevWeek,
    handleNextWeek,
  };
};

export default useWeeklyStatistics;
