export interface IExpense {
  totalExpense: number
  name: string
  category: {
    id: string
    name: string
    expense: number
  }[]
}

export interface IExpenses {
  id: string
  eventId: string
  itemName: string
  cost: number
  description?: string
  category: {
    id: string
    eventId: string
    categoryName: string
  }
}
