import { DASHBOARD_URL } from '@/consts/route'
import {
  CREATE_EVENT_MUTATION,
  GET_EVENTS_QUERY,
  UPDATE_EVENT,
} from '@/graphql/event'
import { useToasts } from '@/hooks/useToasts'
import { IEvent } from '@/types/event'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
  name: string
  description: string
  location: string
}

interface IProps {
  event?: IEvent
}

const EventForm: React.FC<IProps> = ({ event }) => {
  const { showSuccessMessage, showErrorMessage } = useToasts()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: event
      ? {
          name: event.name,
          description: event.description,
          location: event.location,
        }
      : {},
  })
  const router = useRouter()

  const [createEvent] = useMutation(CREATE_EVENT_MUTATION, {
    refetchQueries: [
      {
        query: GET_EVENTS_QUERY,
      },
    ],
  })

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    refetchQueries: [
      {
        query: GET_EVENTS_QUERY,
      },
    ],
  })

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const eventInput = {
      name: data.name,
      description: data.description,
      location: data.location,
    }
    try {
      if (!event) {
        const { data } = await createEvent({
          variables: { input: eventInput },
        })
        if (data) {
          showSuccessMessage('Event created')
          router.push(DASHBOARD_URL.EVENTS)
        }
      } else {
        const { data } = await updateEvent({
          variables: { input: { id: event.id, ...eventInput } },
        })
        if (data) {
          showSuccessMessage('Event updated')
          router.push(DASHBOARD_URL.EVENTS)
        }
      }
    } catch (err: any) {
      showErrorMessage(
        err.response?.data ? err.response.data.error : err.message,
      )
    }
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              {event ? 'Update' : 'Create'} an Event
            </h3>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              <label className="font-medium">Description</label>
              <textarea
                {...register('description', {
                  required: 'Description is required',
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Location</label>
              <input
                {...register('location', {
                  required: 'Location is required',
                })}
                type="text"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.location && (
                <p className="text-red-500">{errors.location.message}</p>
              )}
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              {event ? 'Update' : 'Create'} Event
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default EventForm
