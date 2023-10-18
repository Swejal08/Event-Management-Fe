import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/client'
import {
  CREATE_USER_MUTATION,
  INVITE_USER,
  NON_EVENT_MEMBER_USER,
} from '@/graphql/user'
import { useToasts } from '@/hooks/useToasts'
import { useRouter } from 'next/router'
import { MembershipRole } from '@/components/userTable'

interface IFormInput {
  userId: string
  role: MembershipRole
}

const InviteUser = () => {
  const [inviteUser] = useMutation(INVITE_USER)

  const router = useRouter()

  const eventId = router.query.pid

  const { showSuccessMessage, showErrorMessage } = useToasts()

  const { loading, error, data } = useQuery(NON_EVENT_MEMBER_USER, {
    variables: {
      userId: '0c5d07f9-b6b6-4ab8-85ff-09d92824be4a',
      eventId,
    },
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async ({ userId, role }) => {
    try {
      const { data } = await inviteUser({
        variables: {
          input: {
            userId: '0c5d07f9-b6b6-4ab8-85ff-09d92824be4a',
            eventId,
            memberId: userId,
            role,
          },
        },
      })
      if (data) {
        showSuccessMessage('User created')
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
              Add a User
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
              <label className="font-medium">Select a user</label>
              <Controller
                name="userId"
                control={control}
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
                      Choose a user
                    </option>

                    {data.nonEventMembers.map((user: any) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div>
              <label className="font-medium">Start a role</label>

              <Controller
                name="role"
                control={control}
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
                      Choose role
                    </option>

                    {Object.values(MembershipRole).map(role => (
                      <option key={role} value={role}>
                        {role.toUpperCase()}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Add User
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default InviteUser
