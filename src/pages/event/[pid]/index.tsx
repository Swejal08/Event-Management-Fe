import RBACInline from '@/components/RBAC/RBACInline'
import ExpenseTable from '@/features/expense/components/ExpenseTable'
import SessionTable from '@/features/session/components/SessionTable'
import UserTable from '@/features/user/components/UserTable'
import { GET_EVENT_DETAILS } from '@/graphql/event'
import { GET_EVENT_EXPENSES } from '@/graphql/expense'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { UserRole } from '@/types/membership'
import { useRouter } from 'next/router'
import React from 'react'
import { GET_EVENT_MEMBERS_DETAIL } from '@/features/user/schema/eventMembers'

const EventDetails = () => {
  const router = useRouter()

  const eventId = router.query.pid as string

  const { loading: loadingEventDetails, data: dataEventDetails } = useQuery(
    GET_EVENT_DETAILS,
    {
      variables: {
        eventId,
      },
    },
  )

  const { loading: loadingEventMembers, data: dataEventMembers } = useQuery(
    GET_EVENT_MEMBERS_DETAIL,
    {
      variables: {
        eventId,
      },
    },
  )

  const {
    loading: loadingEventExpenses,
    error: errorEventExpenses,
    data: dataEventExpenses,
  } = useQuery(GET_EVENT_EXPENSES, {
    variables: {
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
          <RBACInline
            allowedRoles={[UserRole.ADMIN, UserRole.CONTRIBUTOR]}
            eventId={eventId}
          >
            <Link
              href={`/session/add`}
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
          </RBACInline>
          <RBACInline allowedRoles={[UserRole.ADMIN]} eventId={eventId}>
            <Link
              href={`/category/add`}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add Category
            </Link>
          </RBACInline>
          <RBACInline allowedRoles={[UserRole.ADMIN]} eventId={eventId}>
            <Link
              href={`/event/${eventId}/expense/add`}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add Expense
            </Link>
          </RBACInline>
        </div>
      </div>

      <div className="flex-1 pr-8">
        <h2 className="text-xl font-semibold">Sessions</h2>
        {!loadingEventDetails && (
          <SessionTable sessions={dataEventDetails.eventDetails.sessions} />
        )}
      </div>

      <div className="flex-1 mt-12">
        <h2 className="text-xl font-semibold">Members</h2>
        {!loadingEventMembers && (
          <UserTable users={dataEventMembers.eventMembers} />
        )}
      </div>
      {/* {!loadingEventExpenses && (
        <div>
          <h2 className="text-xl font-semibold mb-4 mt-8">Expenses</h2>
          <p className="font-bold mt-2">
            Total Expense: {dataEventExpenses.totalExpense.totalExpense}
          </p>

          <ExpenseTable categories={dataEventExpenses.totalExpense.category} />
        </div>
      )} */}
    </div>
  )
}

export default EventDetails
