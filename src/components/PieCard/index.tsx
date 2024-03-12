import React, { useMemo } from 'react';
import cls from 'classnames';
import Panel from '../Panel';
import EmptyData from '../EmptyData';
import PieChart from './PieChart';

import style from './style.less';

interface IProps {}

const classList = [
  style.itemGreen,
  style.itemBlue,
  style.itemPurple,
  style.itemYellow,
];

const PieCard: React.FC<IProps> = () => {
  const data = [
    {
      title: 'ITO设备漏洞利用攻击',
      percent: 25,
    },
    {
      title: '系统命令注入',
      percent: 25,
    },
    {
      title: 'Web组件信息泄露',
      percent: 75,
    },
    {
      title: '系统命令注入',
      percent: 25,
    },
  ];

  const pieData = useMemo(
    () => [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其它',
        value: 5,
      },
    ],
    [],
  );
  const hasData = false;
  return (
    <Panel title="威胁分析" collapse={false} size="large">
      <div className={style.pieCard}>
        <div className={style.pieContent}>
          <PieChart data={pieData} />
        </div>
        <div className={style.dataContent}>
          {hasData ? (
            <EmptyData />
          ) : (
            <div className={style.list}>
              {data.map((item, index) => (
                <div className={style.listItem} key={index}>
                  <div className={style.listItemTitle}>
                    <div className={style.title}>{item.title}</div>
                    <div className={style.percent}>{`${item.percent}%`}</div>
                  </div>
                  <div
                    className={cls(style.itemProgress, classList[index % 4])}
                    style={{ width: `${item.percent}%` }}
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
