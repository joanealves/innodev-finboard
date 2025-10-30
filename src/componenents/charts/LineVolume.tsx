import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useMemo } from 'react'
import type { Transaction } from '@/types'
import { fmt } from '@/utils/dates'
import { parseAmount } from '@/utils/parse'
import { formatCurrency } from '@/utils/currency'
import { TrendingUp } from 'lucide-react'

export default function LineVolume({ data }: { data: Transaction[] }) {
  const series = useMemo(() => {
    const m = new Map<string, number>()
    let acc = 0
    const sorted = [...data].sort((a, b) => a.date - b.date)
    for (const t of sorted) {
      const key = fmt(t.date, 'yyyy-MM-dd')
      const value = parseAmount(t.amount) * (t.transaction_type === 'deposit' ? 1 : -1)
      acc += value
      m.set(key, acc)
    }
    return [...m.entries()]
      .map(([d, value]) => ({ date: fmt(new Date(d).getTime(), 'dd/MM'), value, fullDate: d }))
      .sort((a, b) => a.fullDate.localeCompare(b.fullDate))
  }, [data])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value
      return (
        <div className="glass rounded-xl px-4 py-3 border border-slate-200/20 dark:border-slate-700/30">
          <p className="text-xs text-ink-500 mb-1">{payload[0].payload.fullDate}</p>
          <p className={`text-lg font-bold ${value >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{formatCurrency(value)}</p>
        </div>
      )
    }
    return null
  }

const first = series.at(0)
const last = series.at(-1)
const totalChange = first && last ? last.value - first.value : 0
const percentChange = first && last && first.value !== 0
  ? ((totalChange / Math.abs(first.value)) * 100).toFixed(1)
  : '0.0'

  return (
    <div className="glass rounded-2xl p-6 shadow-card hover:shadow-card-hover animate-slide-up">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Evolução do Saldo</h3>
          <p className="text-sm text-ink-500">Acumulado ao longo do período</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
          <TrendingUp className="text-blue-500" size={18} />
          <span className={`text-sm font-bold ${totalChange >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {totalChange >= 0 ? '+' : ''}{percentChange}%
          </span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1}/>
            <XAxis dataKey="date" tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 12 }} stroke="currentColor" opacity={0.3}/>
            <YAxis tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 12 }} stroke="currentColor" opacity={0.3} tickFormatter={(v)=>`R$ ${(v/1000).toFixed(0)}k`}/>
            <Tooltip content={<CustomTooltip/>} cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}/>
            <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#colorGradient)"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
