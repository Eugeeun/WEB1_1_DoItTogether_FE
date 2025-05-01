import { getMonthlyMVP } from '@/services/statistics/getMonthlyMVP';
import { MonthlyDateScore } from '@/types/apis/statisticsApi';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const useMonthlyStatistics = () => {
  const [currentMonth, setCurrentMonth] = useState<string>('');
  const { channelId } = useParams();
  const [monthlyData, setMonthlyData] = useState<MonthlyDateScore[]>([]);
  const [mvpData, setMvpData] = useState<any>(null);

  const fetchMonthlyMVP = useCallback(async () => {
    if (!channelId || isNaN(Number(channelId)) || !currentMonth) return;

    try {
      console.log(currentMonth, 'mvpData');
      const response = await getMonthlyMVP({
        channelId: Number(channelId),
        targetMonth: currentMonth,
      });
      setMvpData(response.result);
    } catch (error) {
      console.error('MVP 데이터 조회 실패:', error);
      setMvpData(null);
    }
  }, [channelId, currentMonth]);

  useEffect(() => {
    fetchMonthlyMVP();
  }, [fetchMonthlyMVP]);

  const handleMonthChange = useCallback((monthKey: string) => {
    setCurrentMonth(monthKey);
    setMvpData(null);
  }, []);

  const handleDataChange = useCallback((data: MonthlyDateScore[]) => {
    setMonthlyData(data);
  }, []);

  return {
    currentMonth,
    monthlyData,
    mvpData,
    handleMonthChange,
    handleDataChange,
  };
};

export default useMonthlyStatistics;
