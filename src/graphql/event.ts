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
  query GetMyEvents($userId: ID!) {
    events(userId: $userId) {
      id
      name
      description
      location
    }
  }
`

export const GET_EVENT_DETAILS = gql`
  query GetEventDetails($userId: ID!, $eventId: ID!) {
    eventDetails(userId: $userId, eventId: $eventId) {
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
