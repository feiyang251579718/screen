import React from 'react';
import { useBasicInfo } from '@/hooks';
import cls from 'classnames';
import style from './style.less';

interface IProps {}

const TeamInfo: React.FC<IProps> = () => {
  const { basicData: data, collapse } = useBasicInfo();
  return (
    <div className={cls(style.teamInfo, collapse ? 'collapsed' : '')}>
      <div className={style.teamDivider} />
      <div className={style.container}>
        <div className={style.team}>
          <div className={style.teamTitle}>攻击队信息</div>
          <div className={style.teamContent}>
            <div className={style.teamItem}>
              <div className={style.num}>{data?.attackerTeamNum || 0}</div>
              <div className={style.desc}>攻击队伍数</div>
            </div>
            <div className={style.teamItem}>
              <div className={style.num}>
                {data?.attackerTeamMemberNum || 0}
              </div>
              <div className={style.desc}>攻击队员总数</div>
            </div>
          </div>
        </div>
        <div className={style.team}>
          <div className={style.teamTitle}>防守队信息</div>
          <div className={style.teamContent}>
            <div className={style.teamItem}>
              <div className={style.num}>{data?.defenderTeamNum || 0}</div>
              <div className={style.desc}>防守队伍数</div>
            </div>
            <div className={style.teamItem}>
              <div className={style.num}>
                {data?.defenderTeamMemberNum || 0}
              </div>
              <div className={style.desc}>防守队员总数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
