import ExpenseForm from '@/features/expense/components/ExpenseForm'
import { UserRole } from '@/types/membership'
import { ReactNode } from 'react'

const AddExpensePage = () => {
  return <ExpenseForm />
}

AddExpensePage.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>
}

AddExpensePage.allowedRoles = [UserRole.ADMIN]

export default AddExpensePage
