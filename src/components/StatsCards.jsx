import { memo } from 'react'
import { formatMoney } from '../utils/finance'

const cards = [
  { key: 'balance', label: 'ბალანსი', color: 'text-brand-700', bg: 'bg-brand-50' },
  { key: 'income', label: 'შემოსავალი', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  { key: 'expense', label: 'ხარჯი', color: 'text-rose-700', bg: 'bg-rose-50' },
]

function StatsCards({ summary }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <div key={c.key} className="card">
          <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${c.bg} ${c.color}`}>{c.label}</span>
          <p data-testid={`stat-${c.key}`} className="mt-3 text-2xl font-bold text-slate-900">
            {formatMoney(summary[c.key])}
          </p>
        </div>
      ))}
    </div>
  )
}

export default memo(StatsCards)
