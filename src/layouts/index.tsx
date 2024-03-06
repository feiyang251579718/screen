import React from 'react'

interface IProps {
    children?: React.ReactNode
}

const Main: React.FC<IProps> = ({ children }) => {
    return <div className="mainBody">{children}</div>
}

export default Main
