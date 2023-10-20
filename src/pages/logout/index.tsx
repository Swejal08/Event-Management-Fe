import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'

const Logout = () => {
  const cookie = new Cookies()
  const router = useRouter()

  const handleLogout = () => {
    cookie.remove('accessToken')
    router.push('/login')
  }

  return (
    <Link
      onClick={handleLogout}
      href="#"
      className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
    >
      Logout
    </Link>
  )
}

export default Logout
