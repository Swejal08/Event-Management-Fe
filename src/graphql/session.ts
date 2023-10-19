import { gql } from '@apollo/client'

export const ADD_EVENT_SESSION = gql`
  mutation createSession($input: NewSession!) {
    createSession(input: $input) {
      id
      name
      eventId
      startDate
      endDate
    }
  }
`

export const REMOVE_EVENT_SESSION = gql`
  mutation deleteSession($input: DeleteSession!) {
    deleteSession(input: $input)
  }
`
