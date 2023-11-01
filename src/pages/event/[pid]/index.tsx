import RBACInline from '@/components/RBAC/RBACInline'
import SessionTable from '@/features/session/components/SessionTable'
import UserTable from '@/features/user/components/UserTable'
import { GET_EVENT_DETAILS } from '@/graphql/event'
import { GET_EVENT_EXPENSES } from '@/graphql/expense'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { UserRole } from '@/types/membership'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { GET_EVENT_MEMBERS_DETAIL } from '@/features/user/schema/eventMembers'
import ExpenseTable from '@/features/expense/components/ExpenseTable'
import EventSidebar from '@/components/SideBar/EventSidebar'
import EventLayout from '@/layouts/eventLayout'
import EventDetailsHeadingButtons from '@/features/event/components/EventDetailsHeadingButtons'
import { IEvent } from '@/types/event'
import EventDetails from '@/features/event/pages/eventDetails'

interface IProps {
  eventDetails: IEvent
}

const EventDetailsPage = ({ eventDetails }: IProps) => {
  return <EventDetails eventDetails={eventDetails} />
}

EventDetailsPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <EventLayout
      header="Home"
      activeSideBar="home"
      actionItems={<EventDetailsHeadingButtons />}
    >
      {page}
    </EventLayout>
  )
}

export default EventDetailsPage
