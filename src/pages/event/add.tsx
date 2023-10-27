import EventForm from '@/features/event/components/EventForm'
import { UserRole } from '@/types/membership'
import React, { ReactNode } from 'react'

const AddEventPage = () => {
  return <EventForm />
}

AddEventPage.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>
}

export default AddEventPage
