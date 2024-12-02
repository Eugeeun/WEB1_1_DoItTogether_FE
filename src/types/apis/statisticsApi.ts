import { BaseRes } from '@/types/apis/baseResponse';
import { Common } from '@/types/apis/commonApi';

export interface WeeklyMemberScore {
  /** 닉네임 */
  nickname: string;
  /** 완료 개수 */
  completeCount: number;
}
export interface GetWeeklyScoreReq extends Pick<Common, 'channelId'> {
  /** 선택 날짜 (YYYY-MM-DD) */
  targetDate: string;
}
export interface GetWeeklyScoreRes extends BaseRes {
  result: {
    completeScoreSortedResponse: Array<WeeklyMemberScore>;
  };
}

export interface GetWeeklyTotalCountReq extends Pick<Common, 'channelId'> {
  /** 선택 날짜 (YYYY-MM-DD) */
  targetDate: string;
}
export interface GetWeeklyTotalCountRes extends BaseRes {
  result: {
    /** 완료 개수 */
    completeCount: number;
    /** 미완료 개수 */
    notCompleteCount: number;
    /** 칭찬 개수 */
    complimentCount: number;
    /** 찌르기 개수 */
    pokeCount: number;
  };
}

export interface MonthlyDateScore {
  /** 날짜 (YYYY-MM-DD) */
  date: string;
  /** 전체 할 일 개수 */
  totalTasks: number;
  /** 완료한 일의 개수 */
  completedTasks: number;
  /** 상태 */
  status: string;
}

export interface GetMonthlyScoreReq extends Pick<Common, 'channelId'> {
  /** 선택 월 (YYYY-MM) */
  targetMonth: string;
}
export interface GetMonthlyScoreRes extends BaseRes {
  result: {
    monthlyStatistics: Array<MonthlyDateScore>;
  };
}

export interface GetMonthlyMVPReq extends Pick<Common, 'channelId'> {
  /** 선택 월 (YYYY-MM) */
  targetMonth: string;
}
export interface GetMonthlyMVPRes extends BaseRes {
  result: {
    /** 칭찬 MVP */
    complimentMVPNickName: string;
    /** 찌르기 MVP */
    pokeMVPNickName: string;
  };
}