import React, { useMemo } from 'react'
import style from "./style.less"

interface IProps {
    type: "resource" | 'attack' | 'defense'
    count: number
}

const BattleInfo: React.FC<IProps> = ({ type, count }) => {
    const title = useMemo(() => {
        switch (type) {
            case "resource":
                return "资产数量"
            case "attack":
                return "攻击报告通过"
            case "defense":
                return "防守报告通过"
            default:
                return "资产数量"
        }
    }, [type])
    return <div className={style.battleInfo}>
        <div className={style.num}>
            {count}
        </div>
        <div className={style.title}>{title}</div>
    </div>
}

export default BattleInfo
