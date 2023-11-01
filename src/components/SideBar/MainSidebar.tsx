import { DASHBOARD_URL } from '@/consts/route'
import Box from '@/icons/box'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
  active: string
}

const MainSidebar: React.FC<IProps> = ({ active }) => {
  const navigation = [
    {
      href: DASHBOARD_URL.EVENTS,
      name: 'Events',
      key: 'events',
      icon: <Box />,
    },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 h-full border-r bg-white space-y-8 sm:w-80">
        <div className="flex flex-col h-full">
          <Link
            className=" border-b h-16 flex flew-row gap-2 items-center px-8 cursor-pointer"
            href={DASHBOARD_URL.EVENTS}
          >
            <Image
              height={40}
              width={40}
              className="rounded-full"
              src="/em.jpg"
              alt="Avatar"
            />
            <h1 className="text-2xl font-bold">EMS</h1>
          </Link>
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

export default MainSidebar
