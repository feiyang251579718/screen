import React from 'react'
import Panel from '../Panel'
import EmptyData from '../EmptyData'
import style from "./style.less"

interface IProps { }

const WarnList: React.FC<IProps> = () => {
    return <Panel title="安全告警">
        <div className={style.warnList}>
            <EmptyData />
        </div>
    </Panel>
}

export default WarnList
