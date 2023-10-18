import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { CREATE_USER_MUTATION } from '@/graphql/user'
import { useToasts } from '@/hooks/useToasts'

interface IFormInput {
  startDate: string
  endDate: string
}

const AddSession = () => {
  const [createUser] = useMutation(CREATE_USER_MUTATION)

  const { showSuccessMessage, showErrorMessage } = useToasts()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async data => {
    // const userInput = {
    //   start: data.startDate,
    //   email: data.endDate,
    //   phone: data.phone,
    // }
    // try {
    //   const { data } = await createUser({ variables: { input: userInput } })
    //   if (data) {
    //     showSuccessMessage('User created')
    //   }
    // } catch (err: any) {
    //   showErrorMessage(
    //     err.response?.data ? err.response.data.error : err.message,
    //   )
    // }
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create an Event Session
            </h3>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <div>
              <label className="font-medium">Start Date</label>
              <input
                type="text"
                {...register('startDate', {
                  required: 'Start Date is required',
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.startDate && (
                <p className="text-red-500">{errors.startDate.message}</p>
              )}
            </div>
            <div>
              <label className="font-medium">End Date</label>
              <input
                {...register('endDate')}
                type="text"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.endDate && (
                <p className="text-red-500">{errors.endDate.message}</p>
              )}
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Create Session
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default AddSession
