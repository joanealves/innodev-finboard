import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      login: async (email, password) => {
        if (!email || !password) throw new Error('Credenciais inválidas')
        await new Promise(r => setTimeout(r, 500))
        set({ token: 'finboard-' + Math.random().toString(36).slice(2) })
      },
      logout: () => set({ token: null }),
    }),
    { name: 'auth' }
  )
)
