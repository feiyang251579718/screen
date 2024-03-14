import React, { useMemo } from 'react';
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
  return (
    <div className={style.bg}>
      <Header />
      <div className={style.content}>
        {battleStatus !== BattleStatus.End && (
          <div className={style.left}>
            <TeamInfo />
            <List
              title="攻击队排名"
              type="attacker"
              collapse={false}
              showType="member"
            />
            <List title="防守队排名" type="defender" collapse={false} />
          </div>
        )}
        <div className={style.middle}>
          {battleStatus !== BattleStatus.End && (
            <div className={style.battleContent}>
              <BattleInfo type="resource" count={8} />
              <BattleInfo type="attack" count={23} />
              <BattleInfo type="defense" count={15} />
            </div>
          )}
          <div></div>
        </div>
        {battleStatus !== BattleStatus.End && (
          <div className={style.right}>
            <PieCard />
            <WarnList />
            <Achievement />
          </div>
        )}
      </div>
      {battleStatus == BattleStatus.End && <Result />}
    </div>
  );
};

export default Index;
