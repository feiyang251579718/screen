import React, { useState, useRef, useEffect } from 'react';
import VirtualList, { ListRef } from 'rc-virtual-list';
import { useSize } from 'ahooks';
import { AttackInfo } from '@/types';
import Panel from '../Panel';
import EmptyData from '../EmptyData';
import { parseTime } from '@/utils';
import style from './style.less';

interface IProps {}

const WarnList: React.FC<IProps> = () => {
  const [warnList, setWarnList] = useState<AttackInfo[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const size = useSize(listRef);
  const vListRef = useRef<ListRef>(null);
  useEffect(() => {
    setWarnList([
      {
        teamName: '测试大屏接口防守1',
        reportId: 177,
        reportName: '测试目标靶标测试发送socket哈',
        teamId: 112896,
        time: '10:03:47',
        isMatchAreaTargets: [
          {
            id: 24,
            isMatch: 1,
            keyOnly: 1709884455747,
            nodeId: 'node1709884456552',
            subTargets: [
              {
                assetName: '服务器共享靶标007',
                identifyByTimestamp: 1709884434731,
                targetId: 39,
                targetType: 3001,
              },
              {
                assetName: '服务器-专用-默认0041',
                identifyByTimestamp: 1709885180537,
                targetId: 240,
                targetType: 3001,
              },
            ],
            targetId: 117,
          },
          {
            id: 26,
            isMatch: 1,
            keyOnly: 1709885228092,
            nodeId: 'node1709885228109',
            subTargets: [
              {
                assetName: '快照靶标',
                identifyByTimestamp: 1709885404713,
                targetId: 363,
                targetType: 3001,
              },
            ],
            targetId: 377,
          },
        ],
        roleType: 2,
        type: 1,
        content: '测试大屏接口防守1 提交了 测试目标靶标测试发送socket哈',
      },
    ]);
  }, []);
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
                <div className={style.time}>{item.time}</div>
                <div className={style.title}>
                  {item.content}
                  <span
                    className={item.roleType === 1 ? style.black : style.white}
                  >
                    【{item.reportName}】
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
