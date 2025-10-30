import type { Transaction } from '@/types'
import { parseAmount } from './parse'
import { fmt } from './dates'

export function toCSV(rows: Transaction[]) {
  const header = ['date','amount','transaction_type','currency','account','industry','state']
  const data = rows.map(r => [
    fmt(r.date,'yyyy-MM-dd'),
    (parseAmount(r.amount)).toFixed(2).replace('.',','),
    r.transaction_type,
    r.currency,
    r.account,
    r.industry,
    r.state
  ])
  const csv = [header, ...data].map(line => line.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
  return new Blob([csv], { type: 'text/csv;charset=utf-8' })
}
