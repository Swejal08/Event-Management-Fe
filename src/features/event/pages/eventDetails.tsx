import ExpenseTable from '@/features/expense/components/ExpenseTable'
import { GET_EVENT_MEMBERS_DETAIL } from '@/features/user/schema/eventMembers'
import { GET_EVENT_EXPENSES } from '@/graphql/expense'
import { IEvent } from '@/types/event'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

interface IProps {
  eventDetails: IEvent
}

const EventDetails: React.FC<IProps> = ({ eventDetails }) => {
  const router = useRouter()

  const eventId = router.query.pid as string

  const { loading: loadingEventExpenses, data: dataEventExpenses } = useQuery(
    GET_EVENT_EXPENSES,
    {
      variables: {
        eventId,
      },
    },
  )

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-8">
      {eventDetails && (
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
                {eventDetails.description}
              </td>
              <td className="px-6 py-4 max-w-[200px] whitespace-nowrap">
                {eventDetails.location}
              </td>
            </tr>
          </tbody>
        </table>
      )}

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
