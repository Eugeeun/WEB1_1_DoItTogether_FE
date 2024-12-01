import { BaseRes } from '@/types/apis/baseResposne';

/** 그룹 생성 */
export interface CreateGroupReq {
  /** 그룹명 */
  name: string;
}

export interface CreateGroupRes extends BaseRes {
  result: {
    /** 그룹 아이디 */
    channelId: number;
    /** 그룹명 */
    name: string;
  };
}

/** 집안일 */
interface Housework {
  /** 집안일 아이디 */
  houseworkId: number;
  /** 집안일 시작 시간 */
  startDateTime: string;
  /** 집안일 상태 */
  status: string;
  /** 집안일 배정 사용자 아이디 */
  userId: number;
}

/** 집안일 목록 조회 */
export interface GetHouseworkListRes extends BaseRes {
  result: {
    /** 그룹 아이디 */
    channelId: number;
    /** 그룹 내의 집안일 리스트 */
    houseworkLIst: Array<Housework>;
  };
}

/** 초대 링크(코드) 생성 */
export interface CreateViteCodeReq {
  /** 그룹 아이디 */
  channelId: number;
}

export interface CreateInviteCodeRes extends BaseRes {
  result: {
    /** 그룹 아이디 */
    channelId: number;
    /** 초대 코드 */
    inviteCode: string;
  };
}

/** 특정 유저 추방 */
export interface BanUserReq {
  /** 유저 이메일 */
  email: string;
}

export interface BanUserRes extends BaseRes {
  result: {
    /** 추방된 유저 이메일 */
    email: string;
  };
}

/** 그룹명 변경 */
export interface ChangeGroupNameReq {
  /** 변경될 그룹명 */
  name: string;
}

export interface ChangeGroupNameRes extends BaseRes {
  result: {
    /** 그룹 아이디 */
    channelId: number;
  };
}

/** 유저 */
interface User {
  /** 유저 아이디 */
  userId: number;
  /** 유저 이메일 */
  email: string;
  /** 닉네임 */
  nickname: string;
}

/** 그룹 사용자 조회 */
export interface GetGroupUserRes extends BaseRes {
  result: {
    /** 그룹 아이디 */
    channelId: number;
    /** 그룹 내의 모든 회원 리스트 */
    userList: Array<User>;
  };
}

/** 초대 링크(코드)로 방 입장 */
export interface JoinGroupReq {
  /** 초대 코드 */
  inviteCode: string;
}

export interface JoinGroupRes extends BaseRes {
  result: {
    /** 그룹 아이디 */
    channelId: number;
    /** 그룹명 */
    name: string;
    /** 사용자가 성공적으로 입장했는지 여부 */
    joinedSuccessfully: boolean;
  };
}
