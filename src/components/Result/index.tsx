import React from 'react'
import Panel from '../Panel'
import EmptyData from '../EmptyData'

import style from "./style.less"

interface IProps { }

const Result: React.FC<IProps> = () => {
    return <Panel title="成果态势" size='large' collapse={false}>
        <div className={style.result}>
            <EmptyData />
        </div>
    </Panel>
}

export default Result
