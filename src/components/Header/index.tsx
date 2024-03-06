import React, { useState, useMemo } from 'react'
import { useInterval } from 'ahooks';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import style from "./style.less"


dayjs.extend(duration);

interface IProps { }

const Header: React.FC<IProps> = () => {
  const [count, setCount] = useState(10 * 1000);
  useInterval(() => {
    if (count === 0) return;
    setCount(c => c - 1000);
  }, 1000);

  const timeStr = useMemo(() => {
    const countdownDuration = dayjs.duration(count)
    return `${Math.floor(countdownDuration.asHours())}小时${Math.floor(countdownDuration.minutes())}分${countdownDuration.seconds()}秒`
  }, [count])
  return <div className={style.header}>
    <div className={style.logo}>深信服产业教育中心</div>
    <div className={style.title}>深信服攻防模拟演练场</div>
    <div className={style.time}>
      <div>演练倒计时:</div>
      <div className={style.countdown}>{timeStr}</div>
    </div>
  </div>
}

export default Header
