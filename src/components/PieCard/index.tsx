import React, { useMemo, useCallback, useEffect, useState } from 'react';
import cls from 'classnames';
import { slice } from 'lodash';
import { RequestUrl, bus } from '@/utils';
import { AlarmStatic } from '@/types';
import Panel from '../Panel';
import EmptyData from '../EmptyData';
import PieChart from './PieChart';
import { useRequest } from '@/hooks';

import style from './style.less';

interface IProps {}

const classList = [
  style.itemGreen,
  style.itemBlue,
  style.itemPurple,
  style.itemYellow,
];

const PieCard: React.FC<IProps> = () => {
  const { get } = useRequest();
  const [data, setData] = useState<AlarmStatic[]>([]);

  const queryData = useCallback(() => {
    get<AlarmStatic[]>(RequestUrl.alarmDetail).then((res) => {
      setData(res.data);
      // setTimeout(() => {
      //   setData([
      //     {
      //       infoSecurityName: 'ITO设备漏洞利用攻击',
      //       infoSecurity: '',
      //       exerciseId: 1,
      //       countStatistic: 10,
      //       statisticRate: 25,
      //     },
      //     {
      //       infoSecurityName: '系统命令注入',
      //       infoSecurity: '',
      //       exerciseId: 1,
      //       countStatistic: 10,
      //       statisticRate: 25,
      //     },
      //     {
      //       infoSecurityName: 'Web组件信息泄露',
      //       infoSecurity: '',
      //       exerciseId: 1,
      //       countStatistic: 14,
      //       statisticRate: 75,
      //     },
      //     {
      //       infoSecurityName: '系统命令注入',
      //       infoSecurity: '',
      //       exerciseId: 1,
      //       countStatistic: 15,
      //       statisticRate: 25,
      //     },
      //   ]);
      // }, 1000);
    });
  }, []);

  useEffect(() => {
    queryData();
    bus.addListener('ws:refresh:rank', (data: any) => {
      setData(data);
    });
    return () => {
      bus.removeListener('ws:refresh:rank');
    };
  }, []);

  const emptyData = useMemo(() => !data.length, [data]);

  const big4List = useMemo(() => {
    return slice(data, 0, 4);
  }, [data]);
  return (
    <Panel title="威胁分析" collapse={false} size="medium">
      <div className={style.pieCard}>
        <div className={style.pieContent}>
          <PieChart data={data} />
        </div>
        <div className={style.dataContent}>
          {emptyData ? (
            <EmptyData />
          ) : (
            <div className={style.list}>
              {big4List.map((item, index) => (
                <div className={style.listItem} key={index}>
                  <div className={style.listItemTitle}>
                    <div className={style.title}>{item.infoSecurityName}</div>
                    <div
                      className={style.percent}
                    >{`${item.statisticRate}%`}</div>
                  </div>
                  <div
                    className={cls(style.itemProgress, classList[index % 4])}
                    style={{ width: `${item.statisticRate}%` }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
};

export default PieCard;
