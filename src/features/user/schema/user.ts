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

export const USER_LOGIN = gql`
  mutation userLogin($input: InputLogin!) {
    login(input: $input) {
      id
      email
      accessToken
    }
  }
`

export const GET_ME = gql`
  query Me {
    me {
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

export const REMOVE_USER = gql`
  mutation removeUserFromEvent($input: RemoveEventMembership!) {
    removeEventMembership(input: $input)
  }
`

export const NON_EVENT_MEMBER_USER = gql`
  query GetNonEventMemberUser($eventId: ID!) {
    nonEventMembers(eventId: $eventId) {
      id
      name
      email
      phone
    }
  }
`

export const USER_DETAILS = gql`
  query GetUserDetailsForEvent($userId: ID!, $eventId: ID!) {
    userDetails(userId: $userId, eventId: $eventId) {
      id
      name
      email
      phone
      role
    }
  }
`

export const MY_USER_DETAILS = gql`
  query GetMyUserDetails($eventId: ID!) {
    myUserDetail(eventId: $eventId) {
      id
      name
      email
      phone
      role
    }
  }
`
