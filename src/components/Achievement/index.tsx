import React, { useState, useRef } from 'react';
import VirtualList, { ListRef } from 'rc-virtual-list';
import { useSize } from 'ahooks';
import Panel from '../Panel';
import EmptyData from '../EmptyData';
import { parseTime } from '@/utils';
import style from './style.less';

interface IProps {}

enum ActionType {
  whit,
  black,
}

interface ResultMessage {
  startTime: number | string;
  title: Array<string>;
  action: string;
  actionType: ActionType;
}

const WarnList: React.FC<IProps> = () => {
  const [warnList, setWarnList] = useState<ResultMessage[]>(
    new Array(1000).fill(1).map((item, index) => ({
      startTime: new Date().getTime(),
      title: ['黑客帝国的大帝队 提交了一份', ' 的防守报告'],
      action: '白名单加固',
      actionType: index % 3 === 0 ? ActionType.whit : ActionType.black,
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
                  黑客帝国的大帝队 提交了一份
                  <span
                    className={
                      item.actionType === ActionType.black
                        ? style.black
                        : style.white
                    }
                  >
                    【{item.action}】
                  </span>
                  的防守报告
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
