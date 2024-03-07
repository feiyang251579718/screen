import React from 'react'
import { Header, List, TeamInfo } from "@/components"
import style from "./index.less"

interface IProps { }

const Index: React.FC<IProps> = () => {
  return <div className={style.bg}>
    <Header />
    <div className={style.content}>
      <div className={style.left}>
        <TeamInfo />
        <List title="攻击队排名" type="red" collapse={false} />
        <List title="防守队排名" type="blue" collapse={false} />
      </div>
      <div className={style.middle}></div>
      <div className={style.right}></div>

    </div>
  </div>
}

export default Index
