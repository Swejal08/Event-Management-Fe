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
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
      ),
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
