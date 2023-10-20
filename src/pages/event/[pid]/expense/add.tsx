import AddExpense from '@/features/expense/pages/add'
import { UserRole } from '@/types/membership'
import { ReactNode } from 'react'

const AddExpensePage = () => {
  return <AddExpense />
}

AddExpensePage.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>
}

AddExpensePage.allowedRoles = [UserRole.ADMIN]

export default AddExpensePage
