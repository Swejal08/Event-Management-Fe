import { IMembershipDetails } from '@/types/membership'
import { ReactNode } from 'react'

interface IProps {
  user: IMembershipDetails
  children: ReactNode
}

const UserTableRow: React.FC<IProps> = ({ user, children }) => {
  const row = {
    name: user.user.name,
    email: user.user.email,
    phone: user.user.phone,
    role: user.role,
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-normal break-all">{row.name}</td>
      <td className="px-6 py-4 whitespace-normal break-all">{row.email}</td>
      <td className="px-6 py-4 whitespace-normal break-all">{row.role}</td>
      <td className="px-6 py-4 whitespace-normal break-all">
        {row.phone ?? '-'}
      </td>
      <td>{children}</td>
    </tr>
  )
}

export default UserTableRow
