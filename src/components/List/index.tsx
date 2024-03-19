import React, { useMemo } from 'react';
import Panel from '../Panel';
import { RequestUrl } from '@/utils';

import style from './style.less';

interface IProps {
  title: string;
  type: 'attacker' | 'defender';
  collapse?: boolean;
  showType?: 'member' | 'rank';
}

interface TeamData {
  teamName: string;
  score: number;
  rankNum: number;
  teamMemberNum: number;
}

const List: React.FC<IProps> = ({ title, type, collapse, showType }) => {
  // 请求地址
  const queryUrl = useMemo(
    () =>
      type === 'attacker' ? RequestUrl.attackerRanks : RequestUrl.defenderInfo,
    [type],
  );
  const listData = new Array<TeamData>(10).fill({
    teamName: '黑客',
    score: 23841,
    rankNum: 1,
    teamMemberNum: 2,
  });
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
        <div className={style.body}>
          {listData.map((item, index) => {
            return (
              <div className={style.renderItem} key={index}>
                {columns.map((column, index) => {
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
                      key={index}
                    >
                      {column.render(item)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
};

export default List;
