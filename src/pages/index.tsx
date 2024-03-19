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
import { BasicInformation } from '@/types';
import { RequestUrl } from '@/utlis';
import useRequest from '@/hooks/useRequest';

import style from './index.less';

interface IProps {}

enum BattleStatus {
  Ready,
  Start,
  End,
}

const Index: React.FC<IProps> = () => {
  const battleStatus: BattleStatus = useMemo(() => {
    return BattleStatus.End;
  }, []);
  const { get } = useRequest();

  const refetch = useCallback(() => {
    return get<BasicInformation>(RequestUrl.basicInformation, {
      exerciseId: '10000153',
    }).then((response) => {
      console.log('object :>> ', response.data);
    });
  }, []);

  useEffect(() => {
    refetch();
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
              <BattleInfo />
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
      {battleStatus == BattleStatus.End && <Result type="attacker" />}
    </div>
  );
};

export default Index;
