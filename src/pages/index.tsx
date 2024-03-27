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
  const battleStatus: BattleStatus = useMemo(() => {
    return BattleStatus.Start;
  }, []);
  const { refetch } = useBasicInfo();
  useEffect(() => {
    refetch?.();
  }, []);
  return (
    <div className={style.bg}>
      <Header />
      <div className={style.content}>
        <div id="MapCancas"></div>
        {battleStatus !== BattleStatus.End && (
          <div className={style.left}>
            <TeamInfo />
            <List title="攻击队排名" type="attacker" collapse={false} />
            <List title="防守队排名" type="defender" collapse={false} />
          </div>
        )}
        <div className={style.middle}>
          {battleStatus !== BattleStatus.End && (
            <div className={style.battleContent}>
              <BattleInfo />
            </div>
          )}
        </div>
        {battleStatus !== BattleStatus.End && (
          <div className={style.right}>
            <PieCard />
            <WarnList />
            <Achievement />
          </div>
        )}
      </div>
      {battleStatus == BattleStatus.End && <Result type="attacker" />}
    </div>
  );
};

export default Index;
