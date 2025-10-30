import { useFilters } from '@/store/filterStore'
import { useTransactions } from '@/hooks/useTransactions'
import { Calendar, Building2, Factory, MapPin, X, Filter, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function FiltersBar() {
  const { vocab } = useTransactions()
  const { dateFrom, dateTo, accounts, industries, states, setDateFrom, setDateTo, setAccounts, setIndustries, setStates, reset } = useFilters()
  const [open, setOpen] = useState(false)

  const activeFiltersCount = [dateFrom, dateTo, accounts.length>0, industries.length>0, states.length>0].filter(Boolean).length

  const Content = () => (
    <>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold"><Calendar size={16} className="text-blue-500" /> Data Inicial</label>
        <input type="date" value={dateFrom ?? ''} onChange={e => setDateFrom(e.target.value || undefined)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"/>
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold"><Calendar size={16} className="text-blue-500" /> Data Final</label>
        <input type="date" value={dateTo ?? ''} onChange={e => setDateTo(e.target.value || undefined)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"/>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold"><Building2 size={16} className="text-emerald-500" /> Contas {accounts.length>0 && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">{accounts.length}</span>}</label>
        <select multiple value={accounts} onChange={e => setAccounts(Array.from(e.target.selectedOptions).map(o=>o.value))} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[44px] shadow-sm">
          {vocab.accounts.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <p className="text-xs text-ink-500 flex items-center gap-1"><Sparkles size={10} className="text-amber-500" /> Ctrl/Cmd + clique para múltipla seleção</p>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold"><Factory size={16} className="text-violet-500" /> Indústrias {industries.length>0 && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400">{industries.length}</span>}</label>
        <select multiple value={industries} onChange={e => setIndustries(Array.from(e.target.selectedOptions).map(o=>o.value))} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent min-h-[44px] shadow-sm">
          {vocab.industries.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
        <p className="text-xs text-ink-500 flex items-center gap-1"><Sparkles size={10} className="text-amber-500" /> Ctrl/Cmd + clique para múltipla seleção</p>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold"><MapPin size={16} className="text-rose-500" /> Estados {states.length>0 && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400">{states.length}</span>}</label>
        <select multiple value={states} onChange={e => setStates(Array.from(e.target.selectedOptions).map(o=>o.value))} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent min-h-[44px] shadow-sm">
          {vocab.states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <p className="text-xs text-ink-500 flex items-center gap-1"><Sparkles size={10} className="text-amber-500" /> Ctrl/Cmd + clique para múltipla seleção</p>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile button */}
      <div className="lg:hidden mb-6">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl glass shadow-card hover:shadow-card-hover">
          <Filter size={18} className="text-blue-500" />
          <span className="font-semibold">Filtros Avançados</span>
          {activeFiltersCount>0 && <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow">{activeFiltersCount}</span>}
        </button>
      </div>

      {/* Desktop */}
      <section className="hidden lg:block mb-8">
        <div className="glass rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10">
                <Filter className="text-blue-500" size={18}/>
              </div>
              <div>
                <h3 className="text-lg font-bold">Filtros Avançados</h3>
                {activeFiltersCount>0 && <p className="text-sm text-ink-500">{activeFiltersCount} filtro(s) ativo(s)</p>}
              </div>
            </div>
            {activeFiltersCount>0 && (
              <button onClick={reset} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-sm font-semibold">
                <X size={16}/> Limpar Tudo
              </button>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <Content />
          </div>
        </div>
      </section>

      {/* Mobile modal */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto glass rounded-t-3xl border-t border-slate-200/50 dark:border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10">
                  <Filter className="text-blue-500" size={18}/>
                </div>
                <h3 className="text-xl font-bold">Filtros Avançados</h3>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                <X size={22}/>
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <Content />
            </div>
            <div className="flex gap-3 sticky bottom-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg py-4 -mx-6 px-6 border-t border-slate-200/50 dark:border-slate-700/50">
              <button onClick={reset} className="flex-1 px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold">Limpar</button>
              <button onClick={() => setOpen(false)} className="flex-1 px-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold shadow">Aplicar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
