import { gql } from '@apollo/client'

export const CREATE_EVENT_MUTATION = gql`
  mutation createEvent($input: NewEvent!) {
    createEvent(input: $input) {
      id
      name
      description
      location
    }
  }
`

export const UPDATE_EVENT = gql`
  mutation updateEvent($input: UpdateEvent!) {
    updateEvent(input: $input)
  }
`

export const GET_EVENTS_QUERY = gql`
  query GetMyEvents {
    events {
      id
      name
      description
      location
    }
  }
`

export const GET_EVENT_DETAILS = gql`
  query GetEventDetails($eventId: ID!) {
    eventDetails(eventId: $eventId) {
      id
      name
      location
      description
      sessions {
        id
        name
        startDate
        endDate
      }
    }
  }
`

export const REMOVE_EVENT = gql`
  mutation deleteEvent($input: DeleteEvent!) {
    deleteEvent(input: $input)
  }
`
