import React, { useState, useRef } from 'react';
import VirtualList, { ListRef } from 'rc-virtual-list';
import { Tooltip } from 'antd';
import { useSize } from 'ahooks';
import Panel from '../Panel';
import EmptyData from '../EmptyData';
import { parseTime } from '@/utlis';
import style from './style.less';

interface IProps {}

interface ResultMessage {
  startTime: number | string;
  title: string;
}
const WarnList: React.FC<IProps> = () => {
  const [warnList, setWarnList] = useState<ResultMessage[]>(
    new Array(1000).fill(1).map((item, index) => ({
      startTime: new Date().getTime(),
      title: 'SSH账号暴力破解试点范围VS的服务费',
      key: index,
    })),
  );
  const listRef = useRef<HTMLDivElement>(null);
  const size = useSize(listRef);
  const vListRef = useRef<ListRef>(null);
  return (
    <Panel title="成果态势" size="large" collapse={false}>
      <div className={style.warnList} ref={listRef}>
        {warnList.length > 0 ? (
          <VirtualList
            className={style.list}
            data={warnList}
            height={size?.height || 210}
            itemKey="key"
            ref={vListRef}
            fullHeight={true}
            itemHeight={28}
          >
            {(item, index) => (
              <div className={style.listItem} key={index}>
                <div className={style.time}>
                  {parseTime(item.startTime, 'HH:mm:ss')}
                </div>
                <div className={style.title}>
                  <Tooltip title={item.title}>{item.title}</Tooltip>
                </div>
              </div>
            )}
          </VirtualList>
        ) : (
          <EmptyData />
        )}
      </div>
    </Panel>
  );
};

export default WarnList;
