import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { TargetCount } from '@/types';
import cls from 'classnames';
import { useRequest, useBasicInfo } from '@/hooks';
import { RequestUrl } from '@/utils';
import style from './style.less';

interface IProps {}
interface ItemIProps {
  type: 'resource' | 'attack' | 'defense';
  count: number;
}

const BattleItem: React.FC<ItemIProps> = ({ type, count }) => {
  const title = useMemo(() => {
    switch (type) {
      case 'resource':
        return '资产数量';
      case 'attack':
        return '攻击报告通过';
      case 'defense':
        return '防守报告通过';
      default:
        return '资产数量';
    }
  }, [type]);
  return (
    <div className={style.battleInfo}>
      <div className={style.num}>{count}</div>
      <div className={style.title}>{title}</div>
    </div>
  );
};

const BattleInfo: React.FC<IProps> = () => {
  const [battInfo, setBattleInfo] = useState<TargetCount>();
  const { get } = useRequest();
  const { collapse: globalCollapse } = useBasicInfo();
  const queryData = useCallback(() => {
    get<TargetCount>(RequestUrl.targetCount).then((data) => {
      setBattleInfo(data.data);
    });
  }, []);
  useEffect(() => {
    queryData();
  }, []);
  return (
    <div
      className={cls(style.battleContent, globalCollapse ? 'collapsed' : '')}
    >
      <BattleItem type="resource" count={battInfo?.targetHostCount || 0} />
      <BattleItem type="attack" count={battInfo?.attackReportCount || 0} />
      <BattleItem type="defense" count={battInfo?.defenseReportCount || 0} />
    </div>
  );
};

export default BattleInfo;
