// src/types.ts

// Tipo para definir o tipo de transação
export type TransactionType = 'deposit' | 'withdraw';

// Estrutura de uma transação financeira
export interface Transaction {
  date: number; // epoch ms
  amount: string; // "5565" -> 55.65
  transaction_type: TransactionType;
  currency: string; // e.g. "BRL"
  account: string;
  industry: string;
  state: string;
}

// Estado global dos filtros
export interface FiltersState {
  dateFrom?: string; // ISO yyyy-MM-dd
  dateTo?: string;   // ISO yyyy-MM-dd
  accounts: string[];
  industries: string[];
  states: string[];
}
