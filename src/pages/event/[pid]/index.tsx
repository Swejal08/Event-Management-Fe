import SessionTable from '@/components/SessionTable'
import ExpenseTable from '@/components/expenseTable'
import UserTable from '@/components/userTable'
import { GET_EVENT_DETAILS } from '@/graphql/event'
import { GET_EVENT_MEMBERS_DETAIL } from '@/graphql/eventMembers'
import { GET_EVENT_EXPENSES } from '@/graphql/expense'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const EventDetails = () => {
  const router = useRouter()

  const eventId = router.query.pid

  const {
    loading: loadingEventDetails,
    error: errorEventDetails,
    data: dataEventDetails,
  } = useQuery(GET_EVENT_DETAILS, {
    variables: {
      userId: '0c5d07f9-b6b6-4ab8-85ff-09d92824be4a',
      eventId,
    },
  })

  const {
    loading: loadingEventMembers,
    error: errorEventMembers,
    data: dataEventMembers,
  } = useQuery(GET_EVENT_MEMBERS_DETAIL, {
    variables: {
      userId: '0c5d07f9-b6b6-4ab8-85ff-09d92824be4a',
      eventId,
    },
  })

  const {
    loading: loadingEventExpenses,
    error: errorEventExpenses,
    data: dataEventExpenses,
  } = useQuery(GET_EVENT_EXPENSES, {
    variables: {
      userId: '0c5d07f9-b6b6-4ab8-85ff-09d92824be4a',
      eventId,
    },
  })

  if (loadingEventDetails) {
    return null
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-8">
      {/* Event Heading */}
      <h1 className="text-3xl font-bold mb-4">
        {dataEventDetails.eventDetails.name}
      </h1>

      {/* Description and Location in the same line */}
      <div className="mb-8 flex items-center my-12">
        <table className="w-full table-auto text-sm text-left border-collapse max-w-[400px]">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 max-w-[200px]">Description</th>
              <th className="py-3 px-6 max-w-[200px]">Location</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 ">
            <tr>
              <td className="px-6 py-4 max-w-[200px] whitespace-nowrap">
                {dataEventDetails.eventDetails.description}
              </td>
              <td className="px-6 py-4 max-w-[200px] whitespace-nowrap">
                {dataEventDetails.eventDetails.location}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="ml-auto flex space-x-4">
          <Link
            href={`/event/${eventId}/session/add`}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Session
          </Link>
          <Link
            href={`/event/${eventId}/invite`}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Invite User
          </Link>
        </div>
      </div>

      {/* Sessions and Membership side by side */}
      <div className="flex">
        {/* Left Side: Sessions */}
        <div className="flex-1 pr-8">
          <h2 className="text-xl font-semibold mb-4">Sessions</h2>
          {!loadingEventDetails && (
            <SessionTable sessions={dataEventDetails.eventDetails.sessions} />
          )}
        </div>

        {/* Right Side: Membership */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Members</h2>
          {!loadingEventMembers && (
            <UserTable members={dataEventMembers.eventMembers} />
          )}
        </div>
      </div>
      {!loadingEventExpenses && (
        <div>
          <h2 className="text-xl font-semibold mb-4 mt-8">Expenses</h2>
          <p className="font-bold mt-2">
            Total Expense: {dataEventExpenses.totalExpense.totalExpense}
          </p>

          <ExpenseTable categories={dataEventExpenses.totalExpense.category} />
        </div>
      )}
    </div>
  )
}

export default EventDetails
