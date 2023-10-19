import { gql } from '@apollo/client'

export const ADD_EVENT_EXPENSE = gql`
  mutation createExpense($input: NewExpense!) {
    createExpense(input: $input) {
      id
      eventId
      itemName
      cost
      description
    }
  }
`

export const GET_EVENT_EXPENSES = gql`
  query TotalEventExpense($eventId: ID!) {
    totalExpense(eventId: $eventId) {
      totalExpense
      name
      category {
        id
        name
        expense
      }
    }
  }
`