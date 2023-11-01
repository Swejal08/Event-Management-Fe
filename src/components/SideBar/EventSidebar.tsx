import { useRouter } from 'next/router'
import SideBarHeader from './SideBarHeader'
import { DASHBOARD_URL } from '@/consts/route'
import { Puzzle } from 'lucide-react'

interface IProps {
  header: string
  active: string
}

const EventSidebar: React.FC<IProps> = ({ header, active }) => {
  const router = useRouter()

  const eventId = router.query.pid as string

  const navigation = [
    {
      href: DASHBOARD_URL.EVENT.ROOT(eventId),
      name: 'Home',
      key: 'home',
      icon: <Puzzle />,
    },
    {
      href: DASHBOARD_URL.SESSION.ROOT(eventId),
      name: 'Sessions',
      key: 'sessions',
      icon: <Puzzle />,
    },
    {
      href: DASHBOARD_URL.USER.ROOT(eventId),
      name: 'Members',
      key: 'members',
      icon: <Puzzle />,
    },
    {
      href: DASHBOARD_URL.EXPENSE.ROOT(eventId),
      name: 'Expenses',
      key: 'expenses',
      icon: <Puzzle />,
    },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 h-full border-r bg-white space-y-8 sm:w-80">
        <div className="flex flex-col h-full">
          <SideBarHeader header={header} />
          <div className="flex-1 flex flex-col h-full overflow-auto">
            <ul className="px-4 py-2 text-sm font-medium flex-1">
              {navigation.map(item => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-x-2 text-gray-600 p-4 rounded-lg  hover:bg-gray-100 ${
                      item.key === active ? 'bg-gray-100' : ''
                    } duration-150`}
                  >
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default EventSidebar
