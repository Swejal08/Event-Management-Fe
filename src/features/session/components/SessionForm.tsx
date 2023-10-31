import { GET_EVENT_DETAILS } from '@/graphql/event'
import { ADD_EVENT_SESSION, UPDATE_EVENT_SESSION } from '@/graphql/session'
import { useToasts } from '@/hooks/useToasts'
import { IEvent } from '@/types/event'
import { ISession } from '@/types/session'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { DASHBOARD_URL } from '@/consts/route'

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

  const eventId = router.query.pid as string

  const event = events?.filter((event: IEvent) => event.id === eventId) ?? []

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
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: session
      ? {
          eventId: event[0].name,
          name: session.name,
          startDate: session.startDate,
          endDate: session.endDate,
        }
      : { eventId: event[0].name },
  })

  const onSubmit: SubmitHandler<IFormInput> = async ({
    name,
    startDate,
    endDate,
  }) => {
    const sessionInput = {
      eventId,
      name,
      startDate: moment
        .utc(new Date(startDate))
        .local()
        .format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment
        .utc(new Date(endDate))
        .local()
        .format('YYYY-MM-DD HH:mm:ss'),
    }

    if (session) {
      try {
        const { data } = await updateSession({
          variables: { input: { id: session.id, ...sessionInput, eventId } },
        })

        if (data) {
          showSuccessMessage('Session updated')
          router.push(DASHBOARD_URL.SESSION.ROOT(eventId))
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
          router.push(DASHBOARD_URL.SESSION.ROOT(eventId))
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
              {session ? 'Update' : 'Create'} a Session
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
              <input
                disabled
                type="eventId"
                defaultValue={events?.length ? event[0].name : undefined}
                {...register('eventId', {
                  required: 'Event is required',
                })}
                className="cursor-not-allowed w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

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

            <div className="flex flex-col">
              <label className="font-medium">Start Date</label>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: 'Start Date is required' }}
                render={({ field: { onChange, value } }) => {
                  const selectedDate = value ? new Date(value) : null
                  return (
                    <DatePicker
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      selected={selectedDate}
                      onChange={onChange}
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="M/d/yyyy h:mmaaa"
                      popperPlacement="bottom-end"
                      minDate={new Date(new Date().toLocaleDateString())}
                    />
                  )
                }}
              />
              {errors.startDate && (
                <p className="text-red-500">{errors.startDate.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="font-medium">End Date</label>
              <Controller
                name="endDate"
                control={control}
                rules={{
                  required: 'End Date is required',
                  validate: (value: string) => {
                    const startDateTime = moment(getValues('startDate'))
                    const endDateTime = moment(value)
                    if (endDateTime.isSameOrBefore(startDateTime)) {
                      return 'End Date must be later than Start Date'
                    } else {
                      return true
                    }
                  },
                }}
                render={({ field: { onChange, value } }) => {
                  const selectedDate = value ? new Date(value) : null
                  return (
                    <DatePicker
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      selected={selectedDate}
                      onChange={onChange}
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="M/d/yyyy h:mmaaa"
                      popperPlacement="bottom-end"
                      minDate={new Date(new Date().toLocaleDateString())}
                    />
                  )
                }}
              />
              {errors.endDate && (
                <p className="text-red-500">{errors.endDate.message}</p>
              )}
            </div>

            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              {session ? 'Update' : 'Create'} Session
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default SessionForm
