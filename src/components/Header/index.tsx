import { ReactNode } from 'react'

interface IProps {
  heading: string
  actionItems?: ReactNode
}

const Header: React.FC<IProps> = ({ heading, actionItems }) => {
  return (
    <nav className="border-b h-16 bg-white w-full md:static">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <h1 className="text-2xl font-bold">{heading}</h1>
        </div>
        <div className="hidden md:inline-block ml-auto">{actionItems}</div>
      </div>
    </nav>
  )
}

export default Header
