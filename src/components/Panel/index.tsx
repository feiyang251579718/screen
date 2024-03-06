import React from 'react'
import style from "./style.less"

interface IProps {
    title: string
}

const List: React.FC<IProps> = ({ title, children }) => {
    return <div className={style.panel}>
        <div className={style.header}>
            <div className={style.title}>
                {title}
            </div>
        </div>
        <div className={style.content}>
            {children}
        </div>
    </div>
}

export default List
