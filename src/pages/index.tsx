import React from 'react'
import { Header, List } from "@/components"
import style from "./index.less"

interface IProps { }

const Index: React.FC<IProps> = () => {
  return <div className={style.bg}>
    <Header />
    <div className={style.content}>
      <List title="攻击队排名" />
    </div>
  </div>
}

export default Index
