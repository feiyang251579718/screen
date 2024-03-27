import React, { useState, useRef, useCallback, useEffect } from 'react';
import VirtualList, { ListRef } from 'rc-virtual-list';
import { Tooltip } from 'antd';
import { useSize } from 'ahooks';
import Panel from '../Panel';
import EmptyData from '../EmptyData';
import { WarnMessage } from '@/types';
import { bus } from '@/utils';

import style from './style.less';
interface IProps {}

const WarnList: React.FC<IProps> = () => {
  const [warnList, setWarnList] = useState<WarnMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const size = useSize(listRef);
  const vListRef = useRef<ListRef>(null);

  useEffect(() => {
    bus.addListener('ws:refresh:warn', (data: WarnMessage) => {
      setWarnList((list) => [...list, data]);
    });
    return () => {
      bus.removeListener('ws:refresh:warn');
    };
  }, []);

  useEffect(() => {
    if (vListRef.current) {
      vListRef.current.scrollTo({
        index: warnList.length - 1,
      });
    }
  }, [warnList]);

  return (
    <Panel title="安全告警" size="large" collapse={false}>
      <div className={style.warnList} ref={listRef}>
        {warnList.length > 0 ? (
          <VirtualList
            className={style.list}
            data={warnList}
            height={size?.height || 210}
            itemKey="id"
            ref={vListRef}
            fullHeight={true}
            itemHeight={28}
          >
            {(item, index) => (
              <div className={style.listItem} key={index}>
                <div className={style.time}>{item.time}</div>
                <div className={style.title}>
                  <Tooltip title={item.infosecurityName}>
                    {item.infosecurityName}
                  </Tooltip>
                </div>
                <div className={style.terminal}>
                  <Tooltip title={item.isBeAttackTargetName}>
                    {item.isBeAttackTargetName}
                  </Tooltip>
                </div>
                <div className={style.type}>
                  <Tooltip title={item.content}>{item.content}</Tooltip>
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
