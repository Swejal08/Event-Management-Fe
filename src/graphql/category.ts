import { gql } from '@apollo/client'

export const ADD_EVENT_CATEGORY = gql`
  mutation createCategory($input: NewCategory!) {
    createCategory(input: $input) {
      id
      categoryName
    }
  }
`

export const GET_EVENT_CATEGORIES = gql`
  query getCategories($userId: ID!, $eventId: ID!) {
    getCategories(userId: $userId, eventId: $eventId) {
      id
      categoryName
    }
  }
`
