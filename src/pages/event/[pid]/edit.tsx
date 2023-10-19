import EventForm from '@/features/event/components/EventForm'
import { GET_EVENT_DETAILS } from '@/graphql/event'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

const EditEvent = () => {
  const router = useRouter()
  const eventId = router.query.pid
  const { loading, data } = useQuery(GET_EVENT_DETAILS, {
    variables: {
      eventId,
    },
  })

  if (loading) {
    return null
  }

  return <EventForm event={data.eventDetails} />
}

export default EditEvent
