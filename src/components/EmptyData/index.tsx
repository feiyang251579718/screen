import React from 'react'
import style from "./style.less"

interface IProps { }

const EmptyData: React.FC<IProps> = () => {
    return <div className={style.emptyData}>数据正在赶来...</div>
}

export default EmptyData
