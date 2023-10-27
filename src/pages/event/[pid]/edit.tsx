import EventForm from '@/features/event/components/EventForm'
import { GET_EVENT_DETAILS } from '@/graphql/event'
import { UserRole } from '@/types/membership'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const EditEventPage = () => {
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

EditEventPage.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>
}

EditEventPage.allowedRoles = [UserRole.ADMIN]

export default EditEventPage
