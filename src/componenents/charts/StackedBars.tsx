import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useMemo } from 'react'
import type { Transaction } from '@/types'
import { fmt } from '@/utils/dates'
import { parseAmount } from '@/utils/parse'
import { formatCurrency } from '@/utils/currency'

export default function StackedBars({ data }: { data: Transaction[] }) {
  const series = useMemo(() => {
    const m = new Map<string, { deposit: number; withdraw: number }>()
    for (const t of data) {
      const key = fmt(t.date, 'yyyy-MM')
      const obj = m.get(key) ?? { deposit: 0, withdraw: 0 }
      const v = parseAmount(t.amount)
      if (t.transaction_type === 'deposit') obj.deposit += v; else obj.withdraw += v
      m.set(key, obj)
    }
    return [...m.entries()]
      .map(([month, { deposit, withdraw }]) => ({ month: month.replace('-', '/'), Receitas: deposit, Despesas: withdraw }))
      .sort((a, b) => a.month.localeCompare(b.month))
  }, [data])

  const CustomTooltip = ({ active, payload, label }: any) =>
    active && payload?.length ? (
      <div className="bg-card-light dark:bg-card-dark border border-ink-200 dark:border-ink-800 rounded-xl px-4 py-3 shadow-lg">
        <p className="text-sm font-medium mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-sm" style={{ color: entry.color }}>
            <span className="font-semibold">{entry.name}:</span> {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    ) : null

  return (
    <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-card-light dark:bg-card-dark p-6 shadow-card hover:shadow-card-hover transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Receitas vs Despesas</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500"/><span className="text-ink-500">Receitas</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500"/><span className="text-ink-500">Despesas</span></div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={series} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `R$ ${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Receitas" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Despesas" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
