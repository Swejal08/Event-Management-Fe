import { IExpense } from '@/types/expense'
import { ReactNode } from 'react'

interface IProps {
  expense: IExpense['category'][number]
}

const ExpenseTableRow: React.FC<IProps> = ({ expense }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-normal break-all">{expense.name}</td>
      <td className="px-6 py-4 whitespace-normal break-all">
        {expense.expense}
      </td>
    </tr>
  )
}

export default ExpenseTableRow
