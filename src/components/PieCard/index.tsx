import React from 'react'
import Panel from '../Panel'
import EmptyData from '../EmptyData'

import style from "./style.less"

interface IProps { }

const PieCard: React.FC<IProps> = () => {
  return <Panel title="威胁分析" collapse={false}>
    <div className={style.pieCard}>
      <EmptyData />
    </div>
  </Panel>
}

export default PieCard
