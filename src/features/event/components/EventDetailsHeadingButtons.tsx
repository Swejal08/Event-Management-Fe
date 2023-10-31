import RBACInline from '@/components/RBAC/RBACInline'
import { DASHBOARD_URL } from '@/consts/route'
import Logout from '@/pages/logout'
import { UserRole } from '@/types/membership'
import Link from 'next/link'
import { useRouter } from 'next/router'

const EventDetailsHeadingButtons = () => {
  const router = useRouter()
  const eventId = router.query.pid as string

  return (
    <div className="mt-3 md:mt-0 flex gap-2">
      <RBACInline
        allowedRoles={[UserRole.ADMIN, UserRole.CONTRIBUTOR]}
        eventId={eventId}
      >
        <Link
          href={DASHBOARD_URL.SESSION.ADD(eventId)}
          className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
        >
          Add Session
        </Link>
        <Link
          href={DASHBOARD_URL.USER.INVITE(eventId)}
          className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
        >
          Invite User
        </Link>
      </RBACInline>
      <RBACInline allowedRoles={[UserRole.ADMIN]} eventId={eventId}>
        <Link
          href={DASHBOARD_URL.CATEGORY.ADD(eventId)}
          className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
        >
          Add Category
        </Link>
      </RBACInline>
      <RBACInline allowedRoles={[UserRole.ADMIN]} eventId={eventId}>
        <Link
          href={DASHBOARD_URL.EXPENSE.ADD(eventId)}
          className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
        >
          Add Expense
        </Link>
      </RBACInline>
    </div>
  )
}

export default EventDetailsHeadingButtons
