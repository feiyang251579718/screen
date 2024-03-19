import React from 'react';
import { useRequest } from '@/hooks';
import style from './style.less';

interface IProps {}

const TeamInfo: React.FC<IProps> = () => {
  const { get } = useRequest();
  return (
    <div className={style.teamInfo}>
      <div className={style.teamDivider} />
      <div className={style.container}>
        <div className={style.team}>
          <div className={style.teamTitle}>攻击队信息</div>
          <div className={style.teamContent}>
            <div className={style.teamItem}>
              <div className={style.num}>5</div>
              <div className={style.desc}>攻击队伍数</div>
            </div>
            <div className={style.teamItem}>
              <div className={style.num}>100</div>
              <div className={style.desc}>攻击队员总数</div>
            </div>
          </div>
        </div>
        <div className={style.team}>
          <div className={style.teamTitle}>防守队信息</div>
          <div className={style.teamContent}>
            <div className={style.teamItem}>
              <div className={style.num}>5</div>
              <div className={style.desc}>防守队伍数</div>
            </div>
            <div className={style.teamItem}>
              <div className={style.num}>100</div>
              <div className={style.desc}>防守队员总数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
