import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import Panel from '../Panel';
import { RequestUrl, bus } from '@/utils';
import { useRequest, useBasicInfo } from '@/hooks';

import style from './style.less';

interface IProps {
  title: string;
  type: 'attacker' | 'defender';
  collapse?: boolean;
}

interface TeamData {
  teamName: string;
  score: number;
  rankNum: number;
  teamMemberNum: number;
}

const List: React.FC<IProps> = ({ title, type, collapse }) => {
  // 请求地址
  const queryUrl = useMemo(
    () =>
      type === 'attacker' ? RequestUrl.attackerRanks : RequestUrl.defenderRanks,
    [type],
  );
  const ref = useRef<HTMLDivElement>(null);
  const { basicData: data } = useBasicInfo();
  const [listData, setListData] = useState<TeamData[]>([]);
  const { get } = useRequest();
  const showType = useMemo(() => {
    return data?.openRankStatus === 1 ? 'rank' : 'member';
  }, [data]);

  const queryData = useCallback(() => {
    get<TeamData[]>(queryUrl).then((res) => {
      setListData(res.data || []);
    });
  }, []);
  useEffect(() => {
    queryData();
    bus.addListener('ws:refresh:rank', () => {
      queryData();
    });
    return () => {
      bus.removeListener('ws:refresh:rank');
    };
  }, []);

  const columns = useMemo(() => {
    if (showType === 'member') {
      return [
        {
          label: '队伍名称',
          dataIndex: 'name',
          render: (record: TeamData) => {
            return (
              <div
                className={
                  type === 'attacker' ? style.colorRed : style.colorBlue
                }
              >
                {record.teamName}
              </div>
            );
          },
        },
        {
          label: '队员总数',
          dataIndex: 'memberNum',
          render: (record: TeamData) => {
            return <div>{record.teamMemberNum}</div>;
          },
        },
      ];
    }
    return [
      {
        label: '名次',
        dataIndex: 'rank',
        width: 60,
        render: (record: TeamData) => {
          return <div>{record.rankNum}</div>;
        },
      },
      {
        label: '队伍名称',
        dataIndex: 'name',
        render: (record: TeamData) => {
          return (
            <div
              className={type === 'attacker' ? style.colorRed : style.colorBlue}
            >
              {record.teamName}
            </div>
          );
        },
      },
      {
        label: '得分',
        dataIndex: 'score',
        width: 60,
        render: (record: TeamData) => {
          return <div>{record.score}</div>;
        },
      },
    ];
  }, [showType]);

  const renderList = useMemo(
    () => (
      <div className={listData.length > 10 ? style.listContent : ''}>
        {listData.map((item, index) => {
          return (
            <div className={style.renderItem} key={index}>
              {columns.map((column, columnindex) => {
                return (
                  <div
                    className={style.itemCell}
                    style={
                      column.width
                        ? {
                            width: `${column.width}px`,
                            maxWidth: `${column.width}px`,
                          }
                        : undefined
                    }
                    key={`${index}-${columnindex}`}
                  >
                    {column.render(item)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    ),
    [listData, columns],
  );
  return (
    <Panel title={title} collapse={collapse}>
      <div className={style.list}>
        <div className={style.header}>
          {columns.map((column) => (
            <div
              className={style.headerItem}
              style={
                column.width
                  ? {
                      width: `${column.width}px`,
                      maxWidth: `${column.width}px`,
                    }
                  : undefined
              }
              key={column.dataIndex}
            >
              {column.label}
            </div>
          ))}
        </div>
        <div className={style.body} ref={ref}>
          {renderList}
          {listData.length > 10 && renderList}
        </div>
      </div>
    </Panel>
  );
};

export default List;
