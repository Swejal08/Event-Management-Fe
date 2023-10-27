import { gql } from '@apollo/client'

export const ADD_EVENT_CATEGORY = gql`
  mutation createCategory($input: NewCategory!) {
    createCategory(input: $input) {
      id
      eventId
      categoryName
    }
  }
`

export const GET_EVENT_CATEGORIES = gql`
  query getCategories($eventId: ID!) {
    getCategories(eventId: $eventId) {
      id
      eventId
      categoryName
    }
  }
`
