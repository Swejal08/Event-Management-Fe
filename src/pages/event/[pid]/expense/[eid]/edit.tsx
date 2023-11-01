import { ReactNode } from 'react'
import { UserRole } from '@/types/membership'
import ExpenseForm from '@/features/expense/components/ExpenseForm'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { EXPENSE_DETAILS } from '@/graphql/expense'

const EditExpensePage = () => {
  const router = useRouter()

  const expenseId = router.query.eid
  const eventId = router.query.pid

  const { loading, data } = useQuery(EXPENSE_DETAILS, {
    variables: { id: expenseId, eventId },
  })

  if (loading) {
    return null
  }

  return <ExpenseForm expense={data.expenseDetails} />
}

EditExpensePage.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>
}

EditExpensePage.allowedRoles = [UserRole.ADMIN]

export default EditExpensePage
