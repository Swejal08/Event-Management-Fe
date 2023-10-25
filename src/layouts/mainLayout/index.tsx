import Header from '@/components/Header'
import MainSidebar from '@/components/SideBar/MainSidebar'
import React, { ReactNode } from 'react'

interface IProps {
  actionItems?: ReactNode
  showHeading?: boolean
  activeSideBar: string
  header: string
  children: ReactNode
}

const MainLayout: React.FC<IProps> = ({
  actionItems,
  showHeading = true,
  activeSideBar,
  header,
  children,
}) => {
  return (
    <div className="flex">
      <div className="w-80">
        <MainSidebar active={activeSideBar} />
      </div>
      <div className="flex-grow">
        {showHeading && <Header heading={header} actionItems={actionItems} />}
        {children}
      </div>
    </div>
  )
}

export default MainLayout
