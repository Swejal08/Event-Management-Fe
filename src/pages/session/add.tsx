import { useQuery } from '@apollo/client'

import { GET_EVENTS_QUERY } from '@/graphql/event'
import SessionForm from '@/features/session/components/SessionForm'

const AddSession = () => {
  const { loading, data } = useQuery(GET_EVENTS_QUERY)

  if (loading) {
    return null
  }

  return <SessionForm events={data.events} />
}

export default AddSession
