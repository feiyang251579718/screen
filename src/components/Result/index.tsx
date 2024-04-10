import React, { useEffect, useMemo, useState, useCallback } from 'react';
import cls from 'classnames';
import { TeamDetail, AttackInfo, SubTarget } from '@/types';
import { RequestUrl, bus } from '@/utils';
import { useRequest, useBasicInfo } from '@/hooks';
import { slice } from 'lodash';
import Swiper from './Swiper';
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
  const [interval, setInterval] = useState<number | undefined>(15000);
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
      const length = warnData?.isMatchAreaTargets?.length || 0;
      if (warnData?.isMatchAreaTargets?.length && i <= length - 1) {
        setIndex(i);
      } else if (index === length - 1) {
        setIndex(0);
        setInterval(undefined);
        setCollapse?.(false);
      }
    },
    interval,
    { immediate: true },
  );

  const SubTargets = useMemo(
    () => warnData?.isMatchAreaTargets?.[index]?.subTargets || [],
    [index, warnData],
  );

  const tagetLists: SubTarget[][] = useMemo(() => {
    const pageSize = 6;
    const pageNum = Math.abs(SubTargets.length / 6);
    const tagetLists: SubTarget[][] = [];
    for (let i = 0; i < pageNum; i++) {
      tagetLists.push(
        slice(
          JSON.parse(JSON.stringify(SubTargets)),
          i * pageSize,
          i * (pageSize - 1) + pageSize,
        ),
      );
    }
    return tagetLists;
  }, [SubTargets]);

  useEffect(() => {
    bus.addListener('ws:refresh:report', (data: AttackInfo) => {
      setWarnData(data);
      setTeamId(data.teamId);
      setIndex(0);
      setCollapse?.(true);
      setInterval(15000);
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
  }, [teamId]);

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
            <Swiper targets={tagetLists} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
