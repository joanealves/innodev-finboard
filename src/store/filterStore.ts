import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FiltersState } from '@/types'

interface FilterStore extends FiltersState {
  setDateFrom: (v?: string) => void
  setDateTo: (v?: string) => void
  setAccounts: (v: string[]) => void
  setIndustries: (v: string[]) => void
  setStates: (v: string[]) => void
  reset: () => void
}

const initial: FiltersState = { accounts: [], industries: [], states: [] }

export const useFilters = create<FilterStore>()(
  persist(
    (set) => ({
      ...initial,
      setDateFrom: (v) => set({ dateFrom: v }),
      setDateTo: (v) => set({ dateTo: v }),
      setAccounts: (v) => set({ accounts: v }),
      setIndustries: (v) => set({ industries: v }),
      setStates: (v) => set({ states: v }),
      reset: () => set(initial),
    }),
    { name: 'filters' }
  )
)
