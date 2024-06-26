import { bus } from './bus';
import mockjs from 'mockjs';

const queryWarn = () => {
  // return fetch('/api/alarmList').then((response) => {
  //   const data = response.json();
  //   return data;
  // });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        mockjs.mock({
          data: {
            isBeAttackTargetName: '@csentence(3, 5)',
            infosecurityName: '@csentence(3, 5)',
            time: '@time("HH:mm")',
            teamName: '@cname',
            content: '@cparagraph(1, 5)',
          },
        }),
      );
    });
  });
};

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
              assetName: '服务器共享靶标001',
              identifyByTimestamp: 17098844343731,
              'targetId|1-2': 100,
              targetType: 3001,
            },
            {
              assetName: '服务器-专用-2',
              identifyByTimestamp: 17098851280537,
              'targetId|1-2': 100,
              targetType: 3001,
            },
            {
              assetName: '服务器共享靶标003',
              identifyByTimestamp: 17098844434731,
              'targetId|1-2': 100,
              targetType: 3001,
            },
            {
              assetName: '服务器-专用-默认004',
              identifyByTimestamp: 17098856180537,
              'targetId|1-2': 100,
              targetType: 3001,
            },
            {
              assetName: '服务器共享靶标005',
              identifyByTimestamp: 17098844333434731,
              'targetId|1-2': 100,
              targetType: 3001,
            },
            {
              assetName: '服务器-专用-默认006',
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
              assetName: '服务器-专用-默认008',
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

const queryResult = () => {
  return new Promise((resolve, reject) => {
    const data = mockData();
    resolve(data);
  });
};

export const start = () => {
  // setTimeout(() => {
  //   queryResult().then((data: any) => {
  //     bus.emit('ws:refresh:report', data.data);
  //   });
  // }, 2000);
  setInterval(() => {
    queryWarn().then((data: any) => {
      bus.emit('ws:refresh:warn', data.data);
    });
  }, 3000);
  // setInterval(() => {
  //   queryResult().then((data: any) => {
  //     bus.emit('ws:refresh:report', data.data);
  //   });
  // }, 60000);
};
