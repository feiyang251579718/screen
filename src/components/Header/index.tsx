import React, { useState, useMemo } from 'react';
import { useInterval } from 'ahooks';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useQueryBasicInfo } from '@/hooks';
import style from './style.less';

dayjs.extend(duration);

interface IProps {}

const Header: React.FC<IProps> = () => {
  const [count, setCount] = useState(8000 * 1000);
  const { data } = useQueryBasicInfo();
  useInterval(() => {
    if (count === 0) return;
    setCount((c) => c - 1000);
  }, 1000);

  const timeStr = useMemo(() => {
    const countdownDuration = dayjs.duration(count);
    return `${Math.floor(countdownDuration.asHours())}:${Math.floor(
      countdownDuration.minutes(),
    )}:${countdownDuration.seconds()}`;
  }, [count]);
  return (
    <div className={style.header}>
      <div className={style.logo}>{data?.exerciseLogo}</div>
      <div className={style.title}>{data?.exerciseName}</div>
      <div className={style.time}>
        <div>演练倒计时:</div>
        <div className={style.countdown}>{timeStr}</div>
      </div>
    </div>
  );
};

export default Header;
