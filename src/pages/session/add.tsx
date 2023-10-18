import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/client'
import { useToasts } from '@/hooks/useToasts'
import { ADD_EVENT_SESSION } from '@/graphql/session'
import { GET_EVENTS_QUERY } from '@/graphql/event'

interface IFormInput {
  eventId: string
  startDate: string
  endDate: string
}

const AddSession = () => {
  const [createSession] = useMutation(ADD_EVENT_SESSION)

  const { showSuccessMessage, showErrorMessage } = useToasts()

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>()

  const { loading, error, data } = useQuery(GET_EVENTS_QUERY, {
    variables: {
      userId: '0c5d07f9-b6b6-4ab8-85ff-09d92824be4a',
    },
  })

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const sessionInput = {
      userId: '0c5d07f9-b6b6-4ab8-85ff-09d92824be4a',
      eventId: data.eventId,
      startDate: data.startDate,
      endDate: data.endDate,
    }

    try {
      const { data } = await createSession({
        variables: { input: sessionInput },
      })
      if (data) {
        showSuccessMessage('Session created')
      }
    } catch (err: any) {
      showErrorMessage(
        err.response?.data ? err.response.data.error : err.message,
      )
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
              Create a Session
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
              <label className="font-medium">Event</label>
              <Controller
                name="eventId"
                control={control}
                defaultValue={data.events[0].id}
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
                      Choose an event
                    </option>

                    {data.events.map((event: any) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
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
                {...register('endDate', {
                  required: 'End Date is required',
                })}
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
