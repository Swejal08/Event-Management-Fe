import Header from '@/components/Header'
import EventSidebar from '@/components/SideBar/EventSidebar'
import { GET_EVENT_DETAILS } from '@/graphql/event'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

interface IProps {
  actionItems?: ReactNode
  showHeading?: boolean
  activeSideBar: string
  header: string
  children: ReactNode
}

const EventLayout: React.FC<IProps> = ({
  actionItems,
  showHeading = true,
  activeSideBar,
  header,
  children,
}) => {
  const router = useRouter()
  const eventId = router.query.pid

  const { loading: loadingEventDetails, data: dataEventDetails } = useQuery(
    GET_EVENT_DETAILS,
    {
      variables: {
        eventId,
      },
    },
  )

  if (loadingEventDetails || !dataEventDetails) {
    return null
  }

  return (
    <div className="flex">
      <div className="w-80">
        <EventSidebar
          active={activeSideBar}
          header={dataEventDetails.eventDetails.name}
        />
      </div>
      <div className="flex-grow">
        {showHeading && <Header heading={header} actionItems={actionItems} />}
        {React.Children.map(children, child => {
          return React.cloneElement(child as React.ReactElement, {
            eventDetails: dataEventDetails.eventDetails,
          })
        })}
      </div>
    </div>
  )
}

export default EventLayout
