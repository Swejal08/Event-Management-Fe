import { gql } from '@apollo/client'

export const GET_EVENT_MEMBERS_DETAIL = gql`
  query GetMemberDetails($userId: ID!, $eventId: ID!) {
    eventMembers(userId: $userId, eventId: $eventId) {
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
