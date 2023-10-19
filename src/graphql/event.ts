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
        startDate
        endDate
      }
    }
  }
`
