import Table from '@/components/Tables/Table'
import { useRouter } from 'next/router'
import { IExpense } from '@/types/expense'
import ExpenseTableRow from './ExpenseTableRow'

interface IProps {
  categories: IExpense['category']
}

const ExpenseTable: React.FC<IProps> = ({ categories }) => {
  const EXPENSE_COLUMNS = [
    {
      key: 'categoryName',
      label: 'Category',
    },
    {
      key: 'cost',
      label: 'Cost',
    },
  ]

  const router = useRouter()

  return (
    <>
      <Table
        columns={EXPENSE_COLUMNS}
        rows={categories.map(category => (
          <ExpenseTableRow key={category.id} expense={category} />
        ))}
      />
    </>
  )
}

export default ExpenseTable
