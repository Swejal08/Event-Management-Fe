import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const SideBarHeader: React.FC<{ header: string }> = ({ header }) => {
  const [isProfileActive, setIsProfileActive] = useState(false)

  const profileRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleProfile = (e: MouseEvent) => {
      if (
        e.target instanceof Node &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      )
        setIsProfileActive(false)
    }
    document.addEventListener('click', handleProfile)
  }, [])

  return (
    <div
      ref={profileRef}
      onClick={() => setIsProfileActive(!isProfileActive)}
      className=" border-b h-16 flex flew-row gap-8 items-center px-8 py-2  cursor-pointer hover:bg-gray-50"
    >
      <h1 className="text-2xl font-bold">{header}</h1>
      <div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isProfileActive ? (
          <div className="absolute z-10 top-12 right-0 w-64 rounded-lg bg-white shadow-md border text-sm text-gray-600">
            <div className="p-2 text-left">
              <Link
                href="/events"
                className="block font-bold w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150"
              >
                Events
              </Link>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default SideBarHeader
