import Table from '@/components/Tables/Table'
import { useRouter } from 'next/router'
import { IExpenses } from '@/types/expense'
import ExpenseTableRow from './ExpenseTableRow'
import ExpenseOnlyTableRow from './ExpenseOnlyTableRow'
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useToasts } from '@/hooks/useToasts'
import { GET_ALL_EVENT_EXPENSES, REMOVE_EXPENSE } from '@/graphql/expense'
import ExpenseDeleteModal from './ExpenseDeleteModal'
import { MY_USER_DETAILS } from '@/features/user/schema/user'
import { IsAdmin, IsAttendee } from '@/lib/utils'
import RBACInline from '@/components/RBAC/RBACInline'
import { UserRole } from '@/types/membership'
import { DASHBOARD_URL } from '@/consts/route'

interface IProps {
  expenses: IExpenses[]
}

const ExpenseOnlyTable: React.FC<IProps> = ({ expenses }) => {
  const EXPENSE_ONLY_COLUMNS = [
    {
      key: 'item',
      label: 'Item',
    },
    {
      key: 'cost',
      label: 'Cost',
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'category',
      label: 'Category',
    },
  ]

  const router = useRouter()
  const eventId = router.query.pid as string
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [activeExpenseId, setActiveExpenseId] = useState<string | null>(null)
  const [removeExpense] = useMutation(REMOVE_EXPENSE, {
    refetchQueries: [
      {
        query: GET_ALL_EVENT_EXPENSES,
        variables: { eventId },
      },
    ],
  })
  const { showSuccessMessage, showErrorMessage } = useToasts()

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false)
  }

  const { loading, error, data } = useQuery(MY_USER_DETAILS, {
    variables: { eventId },
  })

  if (loading || error) {
    return null
  }

  if (IsAdmin(data.myUserDetail.role)) {
    EXPENSE_ONLY_COLUMNS.push({
      key: 'action',
      label: 'Action',
    })
  }

  const handleExpenseRemoval = async (id: string | null) => {
    if (!id) {
      return
    }

    try {
      const { data } = await removeExpense({
        variables: { input: { id, eventId } },
      })

      if (data) {
        showSuccessMessage('Session removed')
      }
    } catch (err: any) {
      showErrorMessage(
        err.response?.data ? err.response.data.error : err.message,
      )
    }
  }

  const renderActionButtons = (expense: IExpenses) => (
    <RBACInline allowedRoles={[UserRole.ADMIN]} eventId={eventId}>
      <button
        onClick={() =>
          router.push(DASHBOARD_URL.EXPENSE.EDIT(eventId, expense.id))
        }
        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
      >
        Edit
      </button>
      <button
        onClick={() => {
          setActiveExpenseId(expense.id)
          setDeleteModalOpen(true)
        }}
        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
      >
        Remove
      </button>
    </RBACInline>
  )

  return (
    <>
      <Table
        columns={EXPENSE_ONLY_COLUMNS}
        rows={expenses.map(expense => (
          <ExpenseOnlyTableRow key={expense.id} expense={expense}>
            {renderActionButtons(expense)}
          </ExpenseOnlyTableRow>
        ))}
      />
      <ExpenseDeleteModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        expenseId={activeExpenseId}
        onDelete={handleExpenseRemoval}
      />
    </>
  )
}

export default ExpenseOnlyTable
