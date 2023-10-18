import { useRouter } from 'next/router'

interface CategoryExpenses {
  id: string
  name: string
  expense: number
}

interface IProps {
  categories: CategoryExpenses[]
}

const ExpenseTable: React.FC<IProps> = ({ categories }) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto max-w-[600px]">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Cost</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {categories.map(categoryExpense => (
              <tr key={categoryExpense.id} className="cursor-pointer">
                <td className="px-6 py-4 max-w-[300px] whitespace-normal break-all">
                  {categoryExpense.name}
                </td>
                <td className="px-6 py-4 max-w-[300px] whitespace-normal break-all">
                  {categoryExpense.expense}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExpenseTable
