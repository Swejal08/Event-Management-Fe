import toast from 'react-hot-toast'

export const useToasts = () => {
  const showSuccessMessage = (message: string) => {
    toast.success(message)
  }

  const showErrorMessage = (message: string) => {
    toast.error(message)
  }

  return { showSuccessMessage, showErrorMessage }
}
