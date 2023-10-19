import { useQuery } from '@apollo/client'

import { GET_EVENT_DETAILS } from '@/graphql/event'
import SessionForm from '@/features/session/components/SessionForm'
import { useRouter } from 'next/router'
import { IEvent } from '@/types/event'
import { ISession } from '@/types/session'

const EditSession = () => {
  const router = useRouter()

  const sessionId = router.query.pcid
  const eventId = router.query.pid

  const { loading, data } = useQuery(GET_EVENT_DETAILS, {
    variables: { eventId },
  })

  if (loading) {
    return null
  }

  const sessionDetail = data.eventDetails.sessions.find(
    (session: ISession) => session.id === sessionId,
  )

  if (!sessionDetail) {
    return <p>Something went wrong</p>
  }

  return <SessionForm session={sessionDetail} />
}

export default EditSession