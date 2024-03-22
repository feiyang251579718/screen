import React from 'react';
import { Statistic } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useBasicInfo } from '@/hooks';
import style from './style.less';

dayjs.extend(duration);

interface IProps {}

const { Countdown } = Statistic;
const Header: React.FC<IProps> = () => {
  const { basicData } = useBasicInfo();
  return (
    <div className={style.header}>
      <div className={style.logo}>
        <img src={basicData?.exerciseLogo} alt="logo" />
      </div>
      <div className={style.title}>{basicData?.exerciseName}</div>
      <div className={style.time}>
        <div>演练倒计时:</div>
        <div className={style.countdown}>
          <Countdown
            value={basicData?.exerciseEndTime || Date.now()}
            format="HH:mm:ss"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
