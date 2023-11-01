import { DASHBOARD_URL } from '@/consts/route'
import Logout from '@/pages/logout'
import Link from 'next/link'

const EventHeadingButtons = () => {
  return (
    <div className="mt-3 md:mt-0 flex gap-2">
      <Link
        href={DASHBOARD_URL.EVENT.ADD}
        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
      >
        Add Event
      </Link>
      <Logout />
    </div>
  )
}

export default EventHeadingButtons
