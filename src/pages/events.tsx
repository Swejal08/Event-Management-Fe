import EventTable from '@/features/event/components/EventTable'
import { GET_EVENTS_QUERY } from '@/graphql/event'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import Logout from './logout'
import RBACInline from '@/components/RBAC/RBACInline'
import { UserRole } from '@/types/membership'
import { ReactNode } from 'react'

const EventsPage = () => {
  const { loading, data } = useQuery(GET_EVENTS_QUERY)

  if (loading) {
    return null
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Event Lists
          </h3>
          <p className="text-gray-600 mt-2">List of all your events</p>
        </div>
        <div className="mt-3 md:mt-0 flex gap-2">
          <Link
            href={`/event/add`}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Event
          </Link>

          <Logout />
        </div>
      </div>
      <EventTable events={data.events} />
    </div>
  )
}

EventsPage.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>
}

export default EventsPage
