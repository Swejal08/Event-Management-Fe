import Sidebar from '@/components/SideBar'
import TableLoading from '@/components/Tables/TableLoading'
import EventTable from '@/features/event/components/EventTable'
import { GET_EVENTS_QUERY } from '@/graphql/event'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Events = () => {
  const { loading, error, data } = useQuery(GET_EVENTS_QUERY)

  const router = useRouter()

  const eventId = router.query.pid

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Event Lists
          </h3>
          <p className="text-gray-600 mt-2">List of all your events</p>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            href={`/event/add`}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Event
          </Link>
          <Link
            href={`/category/add`}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Category
          </Link>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        {loading && <TableLoading rowHeight={24} headerCount={3} />}
        {!loading && <EventTable events={data.events} />}
      </div>
    </div>
  )
}

export default Events
