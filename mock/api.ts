import mockjs from 'mockjs';

const mockData = () => {
  return mockjs.mock({
    data: {
      teamName: '测试大屏接口防守1',
      reportId: 177,
      id: '@id',
      reportName: '测试目标靶标测试发送socket哈',
      teamId: 112896,
      time: '10:03:47',
      isMatchAreaTargets: [
        {
          id: 10,
          isMatch: 1,
          keyOnly: 1709884455747,
          nodeId: 'node1709884456552',
          subTargets: [
            {
              assetName: '服务器共享靶标007',
              identifyByTimestamp: 17098844343731,
              'targetId|1-2': 100,
              targetType: 3001,
            },
            {
              assetName: '服务器-专用-默认0041',
              identifyByTimestamp: 17098851280537,
              'targetId|1-2': 100,
              targetType: 3001,
            },
            {
              assetName: '服务器共享靶标007',
              identifyByTimestamp: 17098844434731,
              'targetId|1-2': 100,
              targetType: 3001,
            },
            {
              assetName: '服务器-专用-默认0041',
              identifyByTimestamp: 17098856180537,
              'targetId|1-2': 100,
              targetType: 3001,
            },
            {
              assetName: '服务器共享靶标007',
              identifyByTimestamp: 17098844434731,
              'targetId|1-2': 100,
              targetType: 3001,
            },
            {
              assetName: '服务器-专用-默认0041',
              identifyByTimestamp: 17098851820537,
              'targetId|1-2': 100,
              targetType: 3001,
            },
            {
              assetName: '服务器共享靶标007',
              identifyByTimestamp: 17098844334731,
              'targetId|1-2': 100,
              targetType: 3001,
            },
            {
              assetName: '服务器-专用-默认0041',
              identifyByTimestamp: 17098854180537,
              'targetId|1-2': 100,
              targetType: 3001,
            },
          ],
          targetId: '@integer(101,102)',
        },
        {
          id: 11,
          isMatch: 1,
          keyOnly: 1709885228092,
          nodeId: 'node1709885228109',
          subTargets: [
            {
              assetName: '快照靶标',
              identifyByTimestamp: 1709885404713,
              'targetId|3-5': 100,
              targetType: 3001,
            },
          ],
          targetId: '@integer(103,105)',
        },
      ],
      roleType: 2,
      type: 1,
      content: '测试大屏接口防守1 提交了 测试目标靶标测试发送socket哈 测试大',
    },
  });
};

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
      targetRangeAssetAreas: [
        {
          areaId: 10,
          areaName: '银行',
          targetId: 101,
        },
        {
          areaId: 10,
          areaName: '学校',
          targetId: 102,
        },
        {
          areaId: 10,
          areaName: '医院',
          targetId: 103,
        },
        {
          areaId: 11,
          areaName: '民政局',
          targetId: 104,
        },
        {
          areaId: 11,
          areaName: '公安局',
          targetId: 105,
        },
        {
          areaId: 11,
          areaName: '住建局',
          targetId: 106,
        },
      ],
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
  'GET /api/alarmList': mockjs.mock({
    data: {
      isBeAttackTargetName: '@csentence(3, 5)',
      infosecurityName: '@csentence(3, 5)',
      time: '@time("HH:mm")',
      teamName: '@cname',
      content: '@cparagraph(1, 5)',
    },
  }),
  'GET /api/resultList': mockData(),
};
