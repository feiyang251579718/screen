import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SubTarget } from '@/types';
import { Autoplay, EffectFade } from 'swiper';
import style from './style.less';

import 'swiper/modules/grid/grid.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/swiper.less';

interface IProps {
  targets: SubTarget[][];
}

export default ({ targets }: IProps) => {
  return (
    <Swiper
      width={520}
      height={150}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        waitForTransition: true,
      }}
      modules={[Autoplay, EffectFade]}
      effect="fade"
    >
      {targets.map((target, index) => (
        <SwiperSlide key={index} className={style.listItem}>
          {target.map((item, tIndes) => (
            <div className={style.item} key={item.identifyByTimestamp}>
              <div className={style.icon}></div>
              <div className={style.name}>{item.assetName}</div>
            </div>
          ))}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
