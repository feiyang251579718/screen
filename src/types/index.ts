export interface TeamInfo {
  teamName: string;
  score: number;
  rankNum: number;
  teamMemberNum: number;
}

export interface TeamDetail {
  rankNum: number;
  score: number;
  reportNum: number;
  teamName: string;
}

export interface AlarmStatic {
  exerciseId: number;
  infoSecurity: string;
  infoSecurityName: string;
  countStatistic: number;
  statisticRate: number;
}

export interface BasicInformation {
  exerciseLogo: string; //演练logo
  exerciseName: string; //演练名称
  exerciseStartTime: number; //演练开始时间
  exerciseEndTime: number; //演练结束时间
  attackerTeamNum: number; //攻击队伍数量
  defenderTeamNum: number; //防守队伍数量
  attackerTeamMemberNum: number; //攻击队员总数
  defenderTeamMemberNum: number; //防守队员总数
  openRankStatus: 1 | 0; //排行榜开放关闭状态（1：开启；0：关闭）
  targetRangeName: string; //靶场名称
  targetRangeAssetAreas: Array<TargetRange>;
}

export interface TargetRange {
  areaId: number; //区域ID
  targetId: number; //靶标ID
  areaName: string; //区域名称
}

export interface TargetCount {
  targetHostCount: number; //资产数量
  attackReportCount: number; //攻击报告通过
  defenseReportCount: number; // 防守报告通过
}

export interface ResponseData<T> {
  code: number;
  msg: string;
  timestamp: number;
  data: T;
}

export interface PieData {
  infoSecurity: string;
  countStatistic: number;
  statisticRate: number;
  infoSecurityName: string;
}

export interface WarnMessage {
  isBeAttackTargetName: string; //被攻击靶标名称（或者IP）
  infosecurityName: string; //事件大类名称（威胁类型）
  time: string;
  teamName: string;
  content: string;
}
