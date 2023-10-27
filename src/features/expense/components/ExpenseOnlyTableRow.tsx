import { IExpenses } from '@/types/expense'
import { ReactNode } from 'react'

interface IProps {
  expense: IExpenses
  children: ReactNode
}

const ExpenseOnlyTableRow: React.FC<IProps> = ({ expense, children }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-normal break-all">
        {expense.itemName}
      </td>
      <td className="px-6 py-4 whitespace-normal break-all">{expense.cost}</td>
      <td className="px-6 py-4 whitespace-normal break-all">
        {expense.description}
      </td>
      <td className="px-6 py-4 whitespace-normal break-all">
        {expense.category.categoryName}
      </td>
      <td>{children}</td>
    </tr>
  )
}

export default ExpenseOnlyTableRow
