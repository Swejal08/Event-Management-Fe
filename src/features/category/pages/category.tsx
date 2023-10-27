import { ADD_EVENT_CATEGORY } from '@/graphql/category'
import { useToasts } from '@/hooks/useToasts'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
  name: string
}

const AddEventCategory = () => {
  const { showSuccessMessage, showErrorMessage } = useToasts()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>()

  const router = useRouter()

  const eventId = router.query.pid

  const [createEvent] = useMutation(ADD_EVENT_CATEGORY)

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const categoryInput = {
      eventId,
      categoryName: data.name,
    }
    try {
      const { data } = await createEvent({
        variables: { input: categoryInput },
      })
      if (data) {
        reset()
        showSuccessMessage('Category created')
        router.push(`/event/${eventId}`)
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
              Create Event Category
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
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Create Category
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default AddEventCategory
