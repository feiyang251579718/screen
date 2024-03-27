import React, { useState, useRef, useEffect, useCallback } from 'react';
import VirtualList, { ListRef } from 'rc-virtual-list';
import { useSize } from 'ahooks';
import { AttackInfo } from '@/types';
import Panel from '../Panel';
import EmptyData from '../EmptyData';
import { bus } from '@/utils';
import style from './style.less';

interface IProps {}

const WarnList: React.FC<IProps> = () => {
  const [warnList, setWarnList] = useState<AttackInfo[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const size = useSize(listRef);
  const vListRef = useRef<ListRef>(null);
  useEffect(() => {
    bus.addListener('ws:refresh:report', (data: AttackInfo) => {
      setWarnList((list) => [...list, data]);
    });
    return () => {
      bus.removeListener('ws:refresh:report');
    };
  }, []);

  useEffect(() => {
    if (vListRef.current) {
      vListRef.current.scrollTo({
        index: warnList.length - 1,
      });
    }
  }, [warnList]);
  const renderContent = useCallback((data: AttackInfo) => {
    const [start, end] = data.content.split(data.reportName);
    return (
      <>
        {start}
        <span className={data.roleType === 1 ? style.black : style.white}>
          【{data.reportName}】
        </span>
        {end}
      </>
    );
  }, []);
  return (
    <Panel title="成果态势" size="large" collapse={false}>
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
                <div className={style.title}>{renderContent(item)}</div>
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
