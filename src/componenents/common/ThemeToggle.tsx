import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '@/hooks/useDarkMode'

export default function ThemeToggle() {
  const { dark, setDark } = useDarkMode()
  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all group"
      aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}
    >
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
        <Sun size={18} className={`absolute transition-all ${dark ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'} text-amber-500`} />
        <Moon size={18} className={`absolute transition-all ${dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'} text-blue-500`} />
      </div>
      <div className="flex-1 text-left">
        <span className="block text-sm font-semibold">{dark ? 'Modo Escuro' : 'Modo Claro'}</span>
        <span className="block text-xs text-ink-500">{dark ? 'Tema noturno ativo' : 'Tema diurno ativo'}</span>
      </div>
      <div className={`relative w-11 h-6 rounded-full ${dark ? 'bg-blue-500' : 'bg-amber-500'}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${dark ? 'left-[22px]' : 'left-0.5'}`} />
      </div>
    </button>
  )
}
