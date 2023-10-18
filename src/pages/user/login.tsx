import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { CREATE_USER_MUTATION, USER_LOGIN } from '@/graphql/user'
import { useToasts } from '@/hooks/useToasts'

interface IFormInput {
  email: string
  password: string
}

const Login = () => {
  const [login] = useMutation(USER_LOGIN)

  const { showSuccessMessage, showErrorMessage } = useToasts()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      const { data } = await login({
        variables: { input: { email, password } },
      })
      if (data) {
        showSuccessMessage('Login Successful')
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
              User Login
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
              <label className="font-medium">Email</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                {...register('password', {
                  required: 'Password is required',
                })}
                type="password"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login
