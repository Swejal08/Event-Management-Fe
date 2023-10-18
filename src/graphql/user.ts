import { gql } from '@apollo/client'

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: NewUser!) {
    createUser(input: $input) {
      id
      name
      email
      phone
    }
  }
`

export const INVITE_USER = gql`
  mutation assignUserToEvent($input: AssignEventMembership!) {
    assignEventMembership(input: $input)
  }
`

export const NON_EVENT_MEMBER_USER = gql`
  query GetNonEventMemberUser($userId: ID!, $eventId: ID!) {
    nonEventMembers(userId: $userId, eventId: $eventId) {
      id
      name
      email
      phone
    }
  }
`

export const USER_DETAILS = gql`
  query GetUserDetailsForEvent($userId: ID!, $memberId: ID!, $eventId: ID!) {
    userDetails(userId: $userId, memberId: $memberId, eventId: $eventId) {
      id
      name
      email
      phone
      role
    }
  }
`
