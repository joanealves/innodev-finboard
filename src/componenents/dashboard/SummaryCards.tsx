import { ArrowDownCircle, ArrowUpCircle, Clock, Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import { useMemo } from 'react'
import { formatCurrency } from '@/utils/currency'

type SummaryItem = {
  label: string
  value: number
  icon: React.ComponentType<any>
  gradient: string
  iconBg: string
  iconColor: string
  trend?: number
  showTrend?: boolean
}

export default function SummaryCards({
  balance,
  deposits,
  withdraws,
  pending,
  currency = 'BRL',
}: {
  balance: number
  deposits: number
  withdraws: number
  pending: number
  currency?: string
}) {
  const balanceVariation = useMemo(
    () => (deposits === 0 ? 0 : (balance / deposits) * 100),
    [balance, deposits]
  )

  const items: SummaryItem[] = [
    {
      label: 'Saldo Total',
      value: balance,
      icon: Wallet,
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      iconBg: 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10',
      iconColor: 'text-blue-600 dark:text-blue-400',
      trend: balanceVariation,
      showTrend: true,
    },
    {
      label: 'Receitas',
      value: deposits,
      icon: ArrowUpCircle,
      gradient: 'from-emerald-500 via-green-600 to-teal-600',
      iconBg: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Despesas',
      value: withdraws,
      icon: ArrowDownCircle,
      gradient: 'from-rose-500 via-red-600 to-pink-600',
      iconBg: 'bg-gradient-to-br from-rose-500/10 to-pink-500/10',
      iconColor: 'text-rose-600 dark:text-rose-400',
    },
    {
      label: 'Pendentes',
      value: pending,
      icon: Clock,
      gradient: 'from-amber-500 via-orange-600 to-yellow-600',
      iconBg: 'bg-gradient-to-br from-amber-500/10 to-yellow-500/10',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
  ]

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
      {items.map(
        (
          { label, value, icon: Icon, gradient, iconBg, iconColor, trend, showTrend },
          idx
        ) => (
          <article
            key={label}
            className="group relative overflow-hidden glass rounded-2xl p-6 shadow-card hover:shadow-card-hover animate-slide-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-all`}
            />
            <div className="relative flex items-start justify-between mb-4">
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-xl ${iconBg} backdrop-blur-sm transition-all group-hover:scale-110 group-hover:rotate-6`}
              >
                <Icon className={`${iconColor}`} size={26} />
              </div>
              {showTrend && (
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-sm ${
                    (trend ?? 0) >= 0
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {(trend ?? 0) >= 0 ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  <span className="text-xs font-bold">
                    {Math.abs(trend ?? 0).toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-sm font-medium text-ink-500 mb-1">{label}</h3>
            <p className={`text-3xl font-bold ${iconColor}`}>
              {formatCurrency(value, currency)}
            </p>
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}
            />
          </article>
        )
      )}
    </section>
  )
}
