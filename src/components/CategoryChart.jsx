import { memo, useMemo } from 'react'
import { expensesByCategory, formatMoney } from '../utils/finance'

const colors = ['bg-brand-600', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-sky-500', 'bg-fuchsia-500', 'bg-slate-500']

// მსუბუქი CSS-bar დიაგრამა — გარე chart ბიბლიოთეკის გარეშე (ბანდლი პატარა რჩება)
function CategoryChart({ transactions }) {
  const data = useMemo(() => expensesByCategory(transactions), [transactions])
  const total = data.reduce((s, d) => s + d.total, 0)

  return (
    <div className="card">
      <h2 className="text-lg font-semibold">ხარჯები კატეგორიების მიხედვით</h2>
      {data.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">ხარჯები ჯერ არ გაქვთ დამატებული.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {data.map((d, i) => {
            const pct = total ? Math.round((d.total / total) * 100) : 0
            return (
              <li key={d.category}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{d.category}</span>
                  <span className="text-slate-500">
                    {formatMoney(d.total)} · {pct}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${colors[i % colors.length]}`}
                    style={{ width: `${pct}%` }}
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={d.category}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default memo(CategoryChart)
