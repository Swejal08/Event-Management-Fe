import { useRouter } from 'next/router'

export enum MembershipRole {
  ADMIN = 'admin',
  CONTRIBUTOR = 'contributor',
  ATTENDEE = 'attendee',
}

interface EventMembers {
  id: string
  role: MembershipRole
  user: {
    id: string
    name: string
    email: string
    phone?: string
  }
}

interface IProps {
  members: EventMembers[]
}

const UserTable: React.FC<IProps> = ({ members }) => {
  const router = useRouter()

  const eventId = router.query.pid

  const reassignUserNavigation = (userId: string) => {
    router.push(`/event/${eventId}/user/${userId}/reassign`)
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Phone</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {members.map(member => (
              <tr key={member.id} className="cursor-pointer">
                <td
                  className="px-6 py-4 whitespace-normal break-all"
                  onClick={() => reassignUserNavigation(member.user.id)}
                >
                  {member.user.name}
                </td>
                <td className="px-6 py-4 whitespace-normal break-all">
                  {member.user.email}
                </td>
                <td className="px-6 py-4 whitespace-normal break-all">
                  {member.role}
                </td>
                <td className="px-6 py-4 whitespace-normal break-all">
                  {member.user.phone ?? '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserTable
