import React, { useMemo, useCallback, useEffect } from 'react';
import {
  Header,
  List,
  TeamInfo,
  BattleInfo,
  PieCard,
  WarnList,
  Achievement,
  Result,
} from '@/components';
import { useBasicInfo } from '@/hooks';
import style from './index.less';

interface IProps {}

enum BattleStatus {
  Ready,
  Start,
  End,
}

const Index: React.FC<IProps> = () => {
  const { refetch, collapse } = useBasicInfo();
  useEffect(() => {
    refetch?.();
  }, []);
  return (
    <div className={style.bg}>
      <Header />
      <div className={style.content}>
        <div id="MapCancas"></div>
        <div className={style.left}>
          <TeamInfo />
          <List title="攻击队排名" type="attacker" collapse={false} />
          <List title="防守队排名" type="defender" collapse={false} />
        </div>
        <div className={style.middle}>
          <div className={style.battleContent}>
            <BattleInfo />
          </div>
        </div>
        <div className={style.right}>
          <PieCard />
          <WarnList />
          <Achievement />
        </div>
      </div>
      <Result type="attacker" />
    </div>
  );
};

export default Index;
