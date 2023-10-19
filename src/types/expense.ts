export interface IExpense {
  totalExpense: number
  name: string
  category: {
    id: string
    name: string
    expense: number
  }[]
}
