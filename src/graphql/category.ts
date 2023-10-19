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
  query getCategories {
    getCategories {
      id
      categoryName
    }
  }
`
