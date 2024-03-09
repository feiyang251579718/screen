import React from 'react';
import {
  Header,
  List,
  TeamInfo,
  BattleInfo,
  PieCard,
  WarnList,
  Achievement,
} from '@/components';
import style from './index.less';

interface IProps {}

const Index: React.FC<IProps> = () => {
  return (
    <div className={style.bg}>
      <Header />
      <div className={style.content}>
        <div className={style.left}>
          <TeamInfo />
          <List
            title="攻击队排名"
            type="red"
            collapse={false}
            showType="member"
          />
          <List title="防守队排名" type="blue" collapse={false} />
        </div>
        <div className={style.middle}>
          <div className={style.battleContent}>
            <BattleInfo type="resource" count={8} />
            <BattleInfo type="attack" count={23} />
            <BattleInfo type="defense" count={15} />
          </div>
          <div></div>
        </div>
        <div className={style.right}>
          <PieCard />
          <WarnList />
          <Achievement />
        </div>
      </div>
    </div>
  );
};

export default Index;
