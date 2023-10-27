import ExpenseHeadingButtons from '@/features/expense/components/ExpenseHeadingButtons'
import Expenses from '@/features/expense/pages/expenses'
import EventLayout from '@/layouts/eventLayout'
import { ReactNode } from 'react'

const ExpensePage = () => {
  return <Expenses />
}

ExpensePage.getLayout = function getLayout(page: ReactNode) {
  return (
    <EventLayout
      header="Expenses"
      activeSideBar="expenses"
      actionItems={<ExpenseHeadingButtons />}
    >
      {page}
    </EventLayout>
  )
}

export default ExpensePage
