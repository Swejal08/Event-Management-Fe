import { gql } from '@apollo/client'

export const ADD_EVENT_SESSION = gql`
  mutation createSession($input: NewSession!) {
    createSession(input: $input) {
      id
      eventId
      startDate
      endDate
    }
  }
`
