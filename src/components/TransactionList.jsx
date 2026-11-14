import { memo } from 'react'
import { formatDate, formatMoney } from '../utils/finance'

function TransactionItem({ t, onEdit, onDelete }) {
  const isIncome = t.type === 'income'
  return (
    <li className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="truncate font-medium text-slate-900">{t.title}</p>
        <p className="text-xs text-slate-500">
          {t.category} · {formatDate(t.date)}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className={`text-sm font-semibold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isIncome ? '+' : '−'}
          {formatMoney(t.amount)}
        </span>
        {onEdit && (
          <button className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100" aria-label={`რედაქტირება: ${t.title}`} onClick={() => onEdit(t)}>
            ✎
          </button>
        )}
        {onDelete && (
          <button className="rounded-md p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label={`წაშლა: ${t.title}`} onClick={() => onDelete(t.id)}>
            ✕
          </button>
        )}
      </div>
    </li>
  )
}

function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return <p className="card text-center text-sm text-slate-500">ტრანზაქციები ვერ მოიძებნა.</p>
  }
  return (
    <ul className="card divide-y divide-slate-100 !py-2">
      {transactions.map((t) => (
        <TransactionItem key={t.id} t={t} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default memo(TransactionList)
