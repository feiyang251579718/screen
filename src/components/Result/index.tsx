import React, { useEffect, useMemo, useState, useCallback } from 'react';
import cls from 'classnames';
import { TeamDetail, AttackInfo, SubTarget } from '@/types';
import { RequestUrl, bus } from '@/utils';
import { useRequest, useBasicInfo } from '@/hooks';
import style from './style.less';
import { useInterval } from 'ahooks';

interface IProps {
  type: 'attacker' | 'defender';
}

const Result: React.FC<IProps> = ({ type }) => {
  const [teamInfo, setTeamInfo] = useState<TeamDetail>();
  const [teamId, setTeamId] = useState<number>();
  const [warnData, setWarnData] = useState<AttackInfo>();
  const [index, setIndex] = useState<number>(0);
  const [interval, setInterval] = useState<number | undefined>(5000);
  const { get } = useRequest();
  const { collapse: globalCollapse, setCollapse } = useBasicInfo();
  const queryUrl = useMemo(
    () =>
      warnData?.roleType === 1
        ? RequestUrl.attackerInfo
        : RequestUrl.defenderInfo,
    [warnData],
  );

  useInterval(
    () => {
      const i = index + 1;
      if (
        warnData?.isMatchAreaTargets?.length &&
        i < warnData?.isMatchAreaTargets?.length - 1
      ) {
        setIndex(i);
      } else {
        setInterval(undefined);
        setCollapse?.(false);
      }
    },
    interval,
    { immediate: true },
  );

  const targets = useMemo(() => {
    return warnData?.isMatchAreaTargets[index]?.subTargets || [];
  }, [index, warnData]);

  console.log('targets :>> ', targets);

  useEffect(() => {
    bus.addListener('ws:refresh:report', (data: AttackInfo) => {
      console.log('report data :>> ', data);
      setWarnData(data);
      setTeamId(data.teamId);
      setIndex(0);
      setCollapse?.(true);
    });
    return () => {
      bus.removeListener('ws:refresh:resource');
    };
  }, []);

  const queryData = useCallback(() => {
    if (teamId) {
      get<TeamDetail>(queryUrl, { teamId }).then((res) => {
        setTeamInfo(res.data);
      });
    }
  }, []);

  useEffect(() => {
    queryData();
  }, []);

  console.log('warnData :>> ', warnData);

  const typeCls = useMemo(() => {
    return warnData?.roleType === 1 ? style.success : style.failed;
  }, [warnData]);

  return (
    <div
      className={cls(
        style.result,
        typeCls,
        globalCollapse ? 'show' : 'collapsed',
      )}
    >
      <div className={style.team}>
        <div className={style.teamTitle}>
          {teamInfo?.teamName || warnData?.teamName}
        </div>
      </div>
      <div className={style.content}>
        <div className={style.left}>
          <div className={style.teamInfo}>
            <div className={cls(style.icon, style.rank)} />
            <div className={style.text}>
              <div className={style.num}>{teamInfo?.rankNum}</div>
              <div className={style.desc}>队伍排名</div>
            </div>
          </div>
          <div className={style.teamInfo}>
            <div className={cls(style.icon, style.report)} />
            <div className={style.text}>
              <div className={style.num}>{teamInfo?.reportNum}</div>
              <div className={style.desc}>报告通过次数</div>
            </div>
          </div>
          <div className={style.teamInfo}>
            <div className={cls(style.icon, style.score)} />
            <div className={style.text}>
              <div className={style.num}>{teamInfo?.score}</div>
              <div className={style.desc}>队伍总分</div>
            </div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.totalInfo}>
            <div className={style.num}>{teamInfo?.score}</div>
            <div className={style.desc}>
              <div className={style.title}>被防守</div>
              <div className={style.info}>靶标信息</div>
            </div>
          </div>
          <div className={style.list}>
            {targets.map((item) => (
              <div className={style.item} key={item.identifyByTimestamp}>
                <div className={style.icon}></div>
                <div className={style.name}>{item.assetName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
