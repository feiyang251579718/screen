export const RequestUrl = {
  // 队伍排名
  attackerRanks: '/targetRangeBigScreen/attackerRanks',
  defenderRanks: '/targetRangeBigScreen/defenderRanks',
  // 单个队伍信息
  defenderInfo: '/targetRangeBigScreen/defenderRank',
  attackerInfo: '/targetRangeBigScreen/attackerRank',
  // 攻击类型
  alarmDetail: '/targetRangeBigScreen/getAlarmDetailStatistic',
  //基础信息
  basicInformation: '/targetRangeBigScreen/basicInformation',
  //资产攻防信息-资产数量、攻击报告通过数、防守报告通过数
  targetCount: '/targetRangeBigScreen/getTargetAndAttackAndDefenseCount',
};

// export const host = 'api';
export const host =
  'https://uat-university-api.sangfor.com/college/competition';
export const prefix = host;
export const ws_prefix = `wss://uat-university-api.sangfor.com/college/socket`;
