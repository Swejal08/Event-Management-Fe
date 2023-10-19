import EventForm from '@/features/event/components/EventForm'
import { CREATE_EVENT_MUTATION, GET_EVENTS_QUERY } from '@/graphql/event'
import { useToasts } from '@/hooks/useToasts'
import { useMutation } from '@apollo/client'
import Router, { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const AddEvent = () => {
  return <EventForm />
}

export default AddEvent
