import type { Transaction } from '@/types'
import { useMemo, useState } from 'react'
import { fmt } from '@/utils/dates'
import { parseAmount } from '@/utils/parse'
import { formatCurrency } from '@/utils/currency'
import { toCSV } from '@/utils/csv'
import { Download, Search } from 'lucide-react'

export default function TransactionsTable({ data }: { data: Transaction[] }) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return data
    return data.filter(t =>
      t.account.toLowerCase().includes(term) ||
      t.industry.toLowerCase().includes(term) ||
      t.state.toLowerCase().includes(term)
    )
  }, [q, data])

  const download = () => {
    const blob = toCSV(filtered)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transactions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const totals = useMemo(() => {
    const dep = filtered.filter(t => t.transaction_type==='deposit').reduce((s,t)=>s+parseAmount(t.amount),0)
    const wit = filtered.filter(t => t.transaction_type==='withdraw').reduce((s,t)=>s+parseAmount(t.amount),0)
    return { dep, wit, total: dep+wit }
  }, [filtered])

  return (
    <div className="glass rounded-2xl p-6 shadow-card animate-slide-up">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-ink-500">
          <span className="font-semibold">{filtered.length}</span> transações
          <span className="mx-2">•</span>
          <span className="text-emerald-600 dark:text-emerald-400">{formatCurrency(totals.dep)}</span> receitas
          <span className="mx-2">•</span>
          <span className="text-rose-600 dark:text-rose-400">{formatCurrency(totals.wit)}</span> despesas
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" size={16}/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar transações..."
                   className="pl-9 pr-3 py-2 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-slate-900 text-sm" />
          </div>
          <button onClick={download} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-ink-200 dark:border-ink-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">
            <Download size={16}/> Exportar CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-ink-500">
            <tr className="border-b border-ink-200 dark:border-ink-800">
              <th className="text-left py-2 pr-4">Data</th>
              <th className="text-left py-2 pr-4">Conta</th>
              <th className="text-left py-2 pr-4">Indústria</th>
              <th className="text-left py-2 pr-4">Estado</th>
              <th className="text-left py-2 pr-4">Tipo</th>
              <th className="text-right py-2">Valor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, idx) => (
              <tr key={idx} className="border-b border-ink-200/70 dark:border-ink-800/70 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2 pr-4">{fmt(t.date)}</td>
                <td className="py-2 pr-4">{t.account}</td>
                <td className="py-2 pr-4">{t.industry}</td>
                <td className="py-2 pr-4">{t.state}</td>
                <td className="py-2 pr-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${t.transaction_type==='deposit' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                    {t.transaction_type === 'deposit' ? 'Receita' : 'Despesa'}
                  </span>
                </td>
                <td className="py-2 text-right">
                  <span className={t.transaction_type==='deposit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                    {formatCurrency(parseAmount(t.amount))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-ink-500">Nenhuma transação encontrada</div>
        )}
      </div>
    </div>
  )
}
