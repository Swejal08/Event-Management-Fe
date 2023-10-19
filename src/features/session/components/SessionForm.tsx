import { GET_EVENT_DETAILS } from '@/graphql/event'
import { ADD_EVENT_SESSION, UPDATE_EVENT_SESSION } from '@/graphql/session'
import { useToasts } from '@/hooks/useToasts'
import { IEvent } from '@/types/event'
import { ISession } from '@/types/session'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
  eventId: string
  name: string
  startDate: string
  endDate: string
}

interface IProps {
  events?: IEvent[]
  session?: ISession
}

const SessionForm: React.FC<IProps> = ({ events, session }) => {
  const router = useRouter()

  const eventId = router.query.pid

  const [createSession] = useMutation(ADD_EVENT_SESSION, {
    refetchQueries: [
      {
        query: GET_EVENT_DETAILS,
        variables: { eventId },
      },
    ],
  })

  const [updateSession] = useMutation(UPDATE_EVENT_SESSION, {
    refetchQueries: [
      {
        query: GET_EVENT_DETAILS,
        variables: { eventId },
      },
    ],
  })

  const { showSuccessMessage, showErrorMessage } = useToasts()

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: session
      ? {
          name: session.name,
          startDate: session.startDate,
          endDate: session.endDate,
        }
      : {},
  })

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const sessionInput = {
      eventId: data.eventId,
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
    }

    if (session) {
      try {
        const { data } = await updateSession({
          variables: { input: { id: session.id, ...sessionInput, eventId } },
        })

        if (data) {
          showSuccessMessage('Session updated')
          router.push(`/event/${eventId}`)
        }
      } catch (err: any) {
        showErrorMessage(
          err.response?.data ? err.response.data.error : err.message,
        )
      }
    } else {
      try {
        const { data } = await createSession({
          variables: { input: sessionInput },
        })
        if (data) {
          showSuccessMessage('Session created')
          router.push(`/event/${sessionInput.eventId}`)
        }
      } catch (err: any) {
        showErrorMessage(
          err.response?.data ? err.response.data.error : err.message,
        )
      }
    }
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              {eventId ? 'Update' : 'Create'} a Session
            </h3>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {events && !eventId && (
              <div>
                <label className="font-medium">Event</label>
                <Controller
                  name="eventId"
                  control={control}
                  defaultValue={events[0].id}
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

                      {events.map((event: any) => (
                        <option key={event.id} value={event.id}>
                          {event.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            )}

            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                {...register('name', {
                  required: 'Name is required',
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
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
              {eventId ? 'Update' : 'Create'} Session
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default SessionForm
