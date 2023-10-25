import Link from 'next/link'
import { useRouter } from 'next/router'

const UserHeadingButtons = () => {
  const router = useRouter()
  const eventId = router.query.pid

  return (
    <div className="mt-3 md:mt-0 flex gap-2">
      <Link
        href={`/event/${eventId}/invite`}
        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
      >
        Invite User
      </Link>
    </div>
  )
}

export default UserHeadingButtons
