import React, { useMemo } from 'react'
import cls from "classnames"
import style from "./style.less"

interface IProps {
    title: string
    collapse?: boolean
    size?: 'small' | 'medium' | 'large'
}

const List: React.FC<IProps> = ({ title, collapse, size, children }) => {
    const hasCollapse = useMemo(() => typeof collapse === 'boolean', [collapse])
    const panelSize = useMemo(() => {
        switch (size) {
            case 'small':
                return style.panelSmall
            case 'medium':
                return style.panelMedium
            case 'large':
                return style.panelLarge
            default:
                return style.panel
        }
    }, [size])
    return <div className={cls(style.panel, panelSize)}>
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
