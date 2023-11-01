import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { GET_ALL_EVENT_EXPENSES } from '@/graphql/expense'
import ExpenseOnlyTable from '../components/ExpenseOnlyTable'

const Expenses = () => {
  const router = useRouter()
  const eventId = router.query.pid

  const { loading, data: expenses } = useQuery(GET_ALL_EVENT_EXPENSES, {
    variables: { eventId },
  })

  return <>{!loading && <ExpenseOnlyTable expenses={expenses.getExpenses} />}</>
}

export default Expenses
