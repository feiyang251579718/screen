import React, { useMemo } from 'react';
import cls from 'classnames';
import style from './style.less';

interface IProps {}

const Result: React.FC<IProps> = () => {
  const list = useMemo(() => {
    return new Array(6).fill(3).map((item, index) => ({
      name: index === 0 ? '靶标资产名称是的范德萨发' : '靶标资产名',
    }));
  }, []);

  const typeCls = useMemo(() => {
    return style.failed;
  }, []);

  return (
    <div className={cls(style.result, typeCls)}>
      <div className={style.team}>
        <div className={style.teamTitle}>黑客帝国1队</div>
      </div>
      <div className={style.content}>
        <div className={style.left}>
          <div className={style.teamInfo}>
            <div className={cls(style.icon, style.rank)} />
            <div className={style.text}>
              <div className={style.num}>5</div>
              <div className={style.desc}>队伍排名</div>
            </div>
          </div>
          <div className={style.teamInfo}>
            <div className={cls(style.icon, style.report)} />
            <div className={style.text}>
              <div className={style.num}>25</div>
              <div className={style.desc}>报告通过次数</div>
            </div>
          </div>
          <div className={style.teamInfo}>
            <div className={cls(style.icon, style.score)} />
            <div className={style.text}>
              <div className={style.num}>3456</div>
              <div className={style.desc}>队伍总分</div>
            </div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.totalInfo}>
            <div className={style.num}>8</div>
            <div className={style.desc}>
              <div className={style.title}>被防守</div>
              <div className={style.info}>靶标信息</div>
            </div>
          </div>
          <div className={style.list}>
            {list.map((item) => (
              <div className={style.item}>
                <div className={style.icon}></div>
                <div className={style.name}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
