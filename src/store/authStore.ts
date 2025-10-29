import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface AuthState {
token: string | null;
login: (email: string, password: string) => Promise<void>;
logout: () => void;
}


export const useAuth = create<AuthState>()(
persist(
(set) => ({
token: null,
login: async (email, password) => {
// fake auth, validação simples
if (!email || !password) throw new Error('Credenciais inválidas');
// Em produção: chamar API real e receber JWT
set({ token: 'fake-token-' + Math.random().toString(36).slice(2) });
},
logout: () => set({ token: null }),
}),
{ name: 'auth' }
)
);