import { GET_EVENT_CATEGORIES } from '@/graphql/category'
import {
  ADD_EVENT_EXPENSE,
  GET_ALL_EVENT_EXPENSES,
  UPDATE_EXPENSE,
} from '@/graphql/expense'
import { useToasts } from '@/hooks/useToasts'
import { IExpense, IExpenses } from '@/types/expense'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
  item: string
  cost: string | number
  description?: string
  categoryId: string
}

export interface IExpenseDetails {
  id: string
  eventId: string
  itemName: string
  cost: number
  description?: string
  categoryId: string
}

interface IProps {
  expense?: IExpenseDetails
}

const ExpenseForm: React.FC<IProps> = ({ expense }) => {
  const { showSuccessMessage, showErrorMessage } = useToasts()
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: expense
      ? {
          item: expense.itemName,
          cost: expense.cost,
          description: expense.description,
          categoryId: expense.categoryId,
        }
      : {},
  })

  const router = useRouter()

  const eventId = router.query.pid

  const [createExpense] = useMutation(ADD_EVENT_EXPENSE)

  const [updateExpense] = useMutation(UPDATE_EXPENSE, {
    refetchQueries: [
      {
        query: GET_ALL_EVENT_EXPENSES,
        variables: { eventId },
      },
    ],
  })

  const { loading, data } = useQuery(GET_EVENT_CATEGORIES, {
    variables: { eventId },
  })

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const expenseInput = {
      eventId: eventId as string,
      itemName: data.item,
      cost: parseInt(data.cost as string, 10),
      description: data.description ?? null,
      categoryId: data.categoryId,
    }

    if (expense) {
      try {
        const { data } = await updateExpense({
          variables: { id: expense.id, ...expenseInput },
        })
        if (data) {
          showSuccessMessage('Expense updated')
          router.push(`/event/${eventId}/expense`)
        }
      } catch (err: any) {
        showErrorMessage(
          err.response?.data ? err.response.data.error : err.message,
        )
      }
    } else {
      try {
        const { data } = await createExpense({
          variables: { input: expenseInput },
        })
        if (data) {
          showSuccessMessage('Expense created')
          router.push(`/event/${eventId}/expense`)
        }
      } catch (err: any) {
        showErrorMessage(
          err.response?.data ? err.response.data.error : err.message,
        )
      }
    }
  }

  if (loading) {
    return null
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              {expense ? 'Update' : 'Create'} an Expense
            </h3>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                {...register('item', {
                  required: 'Item is required',
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.item && (
                <p className="text-red-500">{errors.item.message}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Cost</label>
              <input
                type="number"
                {...register('cost', {
                  required: 'Cost is required',
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.cost && (
                <p className="text-red-500">{errors.cost.message}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Description</label>
              <input
                type="text"
                {...register('description')}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div>
              <label className="font-medium">
                Category{' '}
                {data.getCategories.length ? '' : '(Create event Category)'}
              </label>
              <Controller
                name="categoryId"
                control={control}
                disabled={!data.getCategories.length}
                defaultValue={
                  expense ? expense.categoryId : data.getCategories?.[0]?.id
                }
                render={({ field }) => (
                  <select
                    {...field}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option
                      value=""
                      disabled
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      Choose a Category
                    </option>

                    {data.getCategories.map(
                      (category: IExpenses['category']) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                      ),
                    )}
                  </select>
                )}
              />
              {errors.categoryId && (
                <p className="text-red-500">{errors.categoryId.message}</p>
              )}
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              {expense ? 'Update' : 'Create'} Expense
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default ExpenseForm
