import Calendar from 'react-calendar';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/common/icon';
import React, { useEffect, useState } from 'react';
import { getMonthlyScore } from '@/services/statistics/getMonthlyScore';
import { CompletionStatus, MonthlyDateScore } from '@/types/apis/statisticsApi';
import { useNavigate, useParams } from 'react-router-dom';
import useHomePageStore from './../../../../store/useHomePageStore';
import { getFormattedDate, getWeekText } from '@/utils/dateUtils';

interface MonthlyGrassProps {
  onMonthChange: (monthKey: string) => void;
  onDataChange: (data: MonthlyDateScore[]) => void;
}

const MonthlyGrass = React.memo(({ onMonthChange, onDataChange }: MonthlyGrassProps) => {
  const today = new Date();
  const navigate = useNavigate();
  const lastDayCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [currentDate, setCurrentDate] = useState(lastDayCurrentMonth);
  const maxDate = lastDayCurrentMonth;
  const [monthlyData, setMonthlyData] = useState<MonthlyDateScore[]>([]);

  const { channelId: strChannelId } = useParams();
  const { setActiveDate, setActiveTab, setActiveWeek, setWeekText } = useHomePageStore();
  const channelId = Number(strChannelId);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const year = lastDayCurrentMonth.getFullYear();
        const month = String(lastDayCurrentMonth.getMonth() + 1).padStart(2, '0');
        const monthKey = `${year}-${month}`;

        const response = await getMonthlyScore({
          channelId,
          targetMonth: monthKey,
        });

        setMonthlyData(response.result.monthlyStatistics);
        onDataChange(response.result.monthlyStatistics);
      } catch (error) {
        console.error('초기 데이터 로드 실패:', error);
      }
    };

    fetchInitialData();
  }, []);

  const getStatus = (date: Date): CompletionStatus => {
    const dateString = date.toLocaleDateString('en-CA');
    const dayData = monthlyData.find(data => data.date === dateString);
    if (!dayData?.status) return CompletionStatus.NO_HOUSEWORK;
    return dayData.status as CompletionStatus;
  };

  const getTileClassName = ({ date }: { date: Date }): string => {
    const status = getStatus(date);
    switch (status) {
      case CompletionStatus.ALL_DONE:
        return 'bg-main text-white rounded-lg font-body';
      case CompletionStatus.INCOMPLETE_REMAINING:
        return 'bg-sub text-white rounded-full font-body';
      default:
        return 'text-gray3 font-body';
    }
  };

  const handleMonthChange = async ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      const year = activeStartDate.getFullYear();
      const month = String(activeStartDate.getMonth() + 1).padStart(2, '0');
      const monthKey = `${year}-${month}`;
      console.log('monthKey', monthKey);

      try {
        const response = await getMonthlyScore({
          channelId,
          targetMonth: monthKey,
        });

        setMonthlyData(response.result.monthlyStatistics);
        onMonthChange(monthKey);
        onDataChange(response.result.monthlyStatistics);
      } catch (error) {
        console.error('월간 데이터 로드 실패:', error);
      }
    }
  };

  const handleClickDay = (value: Date) => {
    setActiveDate(getFormattedDate(value));
    setActiveWeek(value);
    setActiveTab('전체');
    setWeekText(getWeekText(value));
    navigate(`/main/${channelId}`);
  };

  return (
    <Calendar
      defaultActiveStartDate={lastDayCurrentMonth}
      maxDate={lastDayCurrentMonth}
      tileClassName={getTileClassName}
      calendarType='gregory'
      view='month'
      locale='ko'
      minDetail='month'
      maxDetail='month'
      onClickDay={handleClickDay}
      onActiveStartDateChange={props => {
        if (props.activeStartDate) {
          setCurrentDate(props.activeStartDate);
          handleMonthChange(props);
        }
      }}
      navigationLabel={({ date }) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`}
      formatDay={(_locale, date) => date.getDate().toString()}
      prevLabel={<ArrowLeftIcon className='text-gray2' />}
      nextLabel={
        <ArrowRightIcon
          className={`text-gray2 transition-colors ${
            currentDate.getFullYear() === maxDate.getFullYear() &&
            currentDate.getMonth() >= maxDate.getMonth()
              ? 'opacity-30'
              : ''
          }`}
        />
      }
    />
  );
});
export default MonthlyGrass;
