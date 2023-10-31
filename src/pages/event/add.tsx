import EventForm from '@/features/event/components/EventForm'
import React, { ReactNode } from 'react'

const AddEventPage = () => {
  return <EventForm />
}

AddEventPage.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>
}

export default AddEventPage
