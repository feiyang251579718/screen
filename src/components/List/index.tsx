import React, { useMemo } from 'react'
import style from "./style.less"
import Panel from "../Panel"

interface IProps {
    title: string
}

interface TeamData {
    name: string
    score: number
    rank: number
    memberNum: number
}

const List: React.FC<IProps> = ({ title }) => {
    const listData = new Array<TeamData>(10).fill({ name: '黑客', score: 23841, rank: 1, memberNum: 2 })
    const columns = useMemo(() => {
        return [
            {
                label: '名次',
                dataIndex: 'rank',
                width: 60,
                render: (record: TeamData) => {
                    return <div>{record.rank}</div>
                }
            },
            {
                label: '队伍名称',
                dataIndex: 'name',
                render: (record: TeamData) => {
                    return <div>{record.name}</div>
                }
            },
            {
                label: '得分',
                dataIndex: 'score',
                width: 60,
                render: (record: TeamData) => {
                    return <div>{record.score}</div>
                }
            },
        ]
    }, [])
    return <Panel title={title}>
        <div className={style.list}>
            <div className={style.header}>
                {
                    columns.map(column => <div className={style.headerItem}
                        style={column.width ? { width: `${column.width}px`, maxWidth: `${column.width}px` } : undefined}
                        key={column.dataIndex}>{column.label}</div>)
                }
            </div>
            <div className={style.body}>
                {
                    listData.map((item, index) => {
                        return <div className={style.renderItem} key={index}>
                            {
                                columns.map((column, index) => {
                                    return <div className={style.itemCell} style={column.width ? { width: `${column.width}px`, maxWidth: `${column.width}px` } : undefined} key={index}>{column.render(item)}</div>
                                })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    </Panel>
}

export default List
