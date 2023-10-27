import { useQuery } from '@apollo/client'

import { GET_EVENTS_QUERY } from '@/graphql/event'
import SessionForm from '@/features/session/components/SessionForm'
import { ReactNode } from 'react'
import { UserRole } from '@/types/membership'

const AddSession = () => {
  const { loading, data } = useQuery(GET_EVENTS_QUERY)

  if (loading) {
    return null
  }

  return <SessionForm events={data.events} />
}

AddSession.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>
}

AddSession.allowedRoles = [UserRole.ADMIN, UserRole.CONTRIBUTOR]

export default AddSession