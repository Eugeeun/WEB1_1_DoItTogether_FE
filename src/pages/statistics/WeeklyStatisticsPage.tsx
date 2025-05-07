import {
  WeeklyCompletion,
  WeeklyRanking,
  WeeklyStatActions,
  WeeklyStatDate,
} from '@/components/statistics/weekly';
import useWeeklyStateStore from '@/store/useWeeklyStatisticsStore';
import useWeeklyStatistics from '@/hooks/useWeeklyStatistics';
import MetaTags from '@/components/common/metaTags/MetaTags';
import { useParams } from 'react-router-dom';

const WeeklyStatisticsPage = () => {
  const { currentDate, totalCountData, scoreCountData } = useWeeklyStateStore();
  const { handlePrevWeek, handleNextWeek } = useWeeklyStatistics();
  const { channelId } = useParams();

  return (
    <>
      <MetaTags
        title={'두잇투게더 - 주간 통계'}
        description={'그룹의 주간 통계를 확인해보세요.'}
        url={`https://doit-together.vercel.app/main/${channelId}/statistics/weekly/`}
      />
      <WeeklyStatDate
        currentDate={currentDate}
        handlePrevWeek={handlePrevWeek}
        handleNextWeek={handleNextWeek}
      />
      <WeeklyCompletion
        channelName={totalCountData.channelName}
        completeCount={totalCountData.completeCount}
        unCompletedCount={totalCountData.unCompletedCount}
      />
      <WeeklyStatActions
        channelName={totalCountData.channelName}
        complimentCount={totalCountData.complimentCount}
        pokeCount={totalCountData.pokeCount}
      />
      <WeeklyRanking rankings={scoreCountData} />
    </>
  );
};

export default WeeklyStatisticsPage;
