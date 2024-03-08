import React, { useMemo } from 'react'
import style from "./style.less"
import cls from "classnames"

interface IProps {
    title: string
    collapse?: boolean
}

const List: React.FC<IProps> = ({ title, collapse, children }) => {
    const hasCollapse = useMemo(() => typeof collapse === 'boolean', [collapse])
    return <div className={style.panel}>
        <div className={style.header}>
            {
                hasCollapse && <div className={style.collapse} />
            }
            <div className={style.title}>{title}</div>
            <div className={style.shadow} />
            {/* <div className={cls(style.shadowLight, style.shadow)} /> */}
        </div>
        <div className={style.content}>
            {children}
        </div>
    </div>
}

export default List
