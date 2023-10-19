import Sidebar from '@/components/SideBar'
import TableLoading from '@/components/Tables/TableLoading'
import { GET_EVENTS_QUERY } from '@/graphql/event'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Events = () => {
  const { loading, error, data } = useQuery(GET_EVENTS_QUERY, {
    variables: {
      userId: '3841c2cd-5b37-41eb-ab8e-95c4536ae161',
    },
  })

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
            href={`/event/${eventId}/add`}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Event
          </Link>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        {loading && <TableLoading rowHeight={24} headerCount={3} />}
        {!loading && (
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6 max-w-[100px]">Event</th>
                <th className="py-3 px-6 max-w-[150px]">Description</th>
                <th className="py-3 px-6 max-w-[200px]">Location</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {!data.events.length ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 whitespace-nowrap">
                    {error
                      ? 'Uh oh, it looks like there is a problem'
                      : 'No events found'}
                  </td>
                </tr>
              ) : (
                data?.events.map((event: any) => (
                  <tr
                    key={event.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/event/${event.id}`)}
                  >
                    <td className="px-6 py-4 max-w-[100px] whitespace-normal break-all">
                      {event.name}
                    </td>
                    <td className="px-6 py-4 max-w-[150px] whitespace-normal break-all">
                      {event.description}
                    </td>
                    <td className="px-6 py-4 max-w-[200px] whitespace-normal break-all">
                      {event.location}
                    </td>
                    <td className="text-right px-6 max-w-[50px] whitespace-nowrap">
                      <a
                        // href="javascript:void()"
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Edit
                      </a>
                      <button
                        // href="javascript:void()"
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Events
