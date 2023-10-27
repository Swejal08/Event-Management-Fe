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

export const GET_ALL_EVENT_EXPENSES = gql`
  query GetEventExpenses($eventId: ID!) {
    getExpenses(eventId: $eventId) {
      id
      eventId
      itemName
      cost
      description
      category {
        id
        eventId
        categoryName
      }
    }
  }
`

export const REMOVE_EXPENSE = gql`
  mutation deleteExpense($input: DeleteExpense!) {
    deleteExpense(input: $input)
  }
`

export const EXPENSE_DETAILS = gql`
  query GetExpenseDetails($id: ID!, $eventId: ID!) {
    expenseDetails(id: $id, eventId: $eventId) {
      id
      eventId
      itemName
      cost
      description
      categoryId
    }
  }
`

export const UPDATE_EXPENSE = gql`
  mutation updateExpense($input: UpdateExpense!) {
    updateExpense(input: $input)
  }
`
