import SessionHeadingButtons from '@/features/session/components/SessionHeadingButtons'
import Sessions from '@/features/session/pages/sessions'
import EventLayout from '@/layouts/eventLayout'
import { IEventDetails } from '@/types/event'
import { ReactNode } from 'react'

interface IProps {
  eventDetails: IEventDetails
}

const SessionsPage = ({ eventDetails }: IProps) => {
  return <Sessions eventDetails={eventDetails} />
}

SessionsPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <EventLayout
      header="Sessions"
      activeSideBar="session"
      actionItems={<SessionHeadingButtons />}
    >
      {page}
    </EventLayout>
  )
}

export default SessionsPage
