export type TransactionType = 'deposit' | 'withdraw'

export interface Transaction {
  date: number            // epoch ms
  amount: string          // "5565" -> 55.65
  transaction_type: TransactionType
  currency: string
  account: string
  industry: string
  state: string
}

export interface FiltersState {
  dateFrom?: string
  dateTo?: string
  accounts: string[]
  industries: string[]
  states: string[]
}
