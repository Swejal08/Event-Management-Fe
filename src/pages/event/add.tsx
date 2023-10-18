import { CREATE_EVENT_MUTATION } from '@/graphql/event'
import { useToasts } from '@/hooks/useToasts'
import { useMutation } from '@apollo/client'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
  name: string
  description: string
  location: string
}

const AddEvent = () => {
  const { showSuccessMessage, showErrorMessage } = useToasts()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>()

  const [createEvent] = useMutation(CREATE_EVENT_MUTATION)

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const eventInput = {
      userId: '0c5d07f9-b6b6-4ab8-85ff-09d92824be4a',
      name: data.name,
      description: data.description,
      location: data.location,
    }
    try {
      const { data } = await createEvent({ variables: { input: eventInput } })
      if (data) {
        reset()
        showSuccessMessage('Event created')
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
              Create an Event
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
              Create Event
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default AddEvent
