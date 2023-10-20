import { MY_USER_DETAILS } from '@/graphql/user'
import { UserRole } from '@/types/membership'
import { useQuery } from '@apollo/client'
import { ReactNode } from 'react'

interface IProps {
  allowedRoles: UserRole[]
  children: ReactNode
  eventId: string
}

const RBACInline: React.FC<IProps> = ({ allowedRoles, children, eventId }) => {
  const { loading, error, data } = useQuery(MY_USER_DETAILS, {
    variables: { eventId },
  })

  if (loading || error) {
    return null
  }

  if (!allowedRoles.includes(data.myUserDetail.role)) {
    return null
  }

  return children
}

export default RBACInline
