import { gql } from '@apollo/client'

export const GET_EVENT_MEMBERS_DETAIL = gql`
  query GetMemberDetails($eventId: ID!) {
    eventMembers(eventId: $eventId) {
      id
      role
      user {
        id
        name
        email
        phone
      }
    }
  }
`
