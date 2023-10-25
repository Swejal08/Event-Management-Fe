import EventTable from '@/features/event/components/EventTable'
import { GET_EVENTS_QUERY } from '@/graphql/event'
import { useQuery } from '@apollo/client'
import { ReactNode } from 'react'
import MainLayout from '@/layouts/mainLayout'
import EventHeadingButtons from '@/features/event/components/EventsHeadingButtons'

const EventsPage = () => {
  const { loading, data } = useQuery(GET_EVENTS_QUERY)

  if (loading) {
    return null
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <EventTable events={data.events} />
    </div>
  )
}

EventsPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <MainLayout
      header="Events"
      activeSideBar="events"
      actionItems={<EventHeadingButtons />}
    >
      {page}
    </MainLayout>
  )
}

export default EventsPage
