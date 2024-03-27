import mockjs from 'mockjs';

export default {
  'GET /api/targetRangeBigScreen/attackerRanks': mockjs.mock({
    'data|20': [
      {
        'rankNum|+1': 1,
        teamName: '@cname',
        'score|18-50': 1,
        'teamMemberNum|1-20': 1,
      },
    ],
  }),
  'GET /api/targetRangeBigScreen/defenderRanks': mockjs.mock({
    'data|20': [
      {
        'rankNum|+1': 1,
        teamName: '@cname',
        'score|18-50': 1,
        'teamMemberNum|1-20': 1,
      },
    ],
  }),
  'GET /api/targetRangeBigScreen/basicInformation': mockjs.mock({
    data: {
      'rankNum|+1': 1,
      targetRangeName: '@cname',
      'openRankStatus|0-1': 0,
      'attackerTeamNum|1-20': 1,
      'defenderTeamNum|1-20': 1,
      'attackerTeamMemberNum|1-20': 1,
      'defenderTeamMemberNum|1-20': 1,
    },
  }),
  'GET /api/targetRangeBigScreen/getTargetAndAttackAndDefenseCount':
    mockjs.mock({
      data: {
        'targetHostCount|1-20': 1,
        'defenseReportCount|1-20': 1,
        'attackReportCount|1-20': 1,
      },
    }),
  'GET /api/targetRangeBigScreen/getAlarmDetailStatistic': mockjs.mock({
    'data|4': {
      infoSecurity: '@cname',
      infoSecurityName: '@cname',
      'countStatistic|1-20': 1,
      'statisticRate|1-20': 1,
    },
  }),
};
