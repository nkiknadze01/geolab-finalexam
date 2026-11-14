import { useCallback, useMemo, useState } from 'react'
import TransactionForm from '../components/TransactionForm'
import TransactionFilters from '../components/TransactionFilters'
import TransactionList from '../components/TransactionList'
import { useTransactionsContext } from '../context/TransactionsContext'
import { filterTransactions } from '../utils/finance'

const defaultFilters = { search: '', type: 'all', category: 'all', sort: 'date-desc' }

export default function Transactions() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactionsContext()
  const [filters, setFilters] = useState(defaultFilters)
  const [editing, setEditing] = useState(null)

  const visible = useMemo(() => filterTransactions(transactions, filters), [transactions, filters])

  const handleSubmit = useCallback(
    async (data) => {
      if (editing) {
        updateTransaction(editing.id, data)
        setEditing(null)
      } else {
        addTransaction(data)
      }
    },
    [editing, addTransaction, updateTransaction],
  )

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm('დარწმუნებული ხართ, რომ გსურთ წაშლა?')) {
        deleteTransaction(id)
        setEditing((cur) => (cur?.id === id ? null : cur))
      }
    },
    [deleteTransaction],
  )

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-24">
          <TransactionForm editing={editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />
        </div>
      </div>

      <div className="space-y-4 lg:col-span-2">
        <h1 className="text-2xl font-bold text-slate-900">
          ტრანზაქციები <span className="text-base font-normal text-slate-500">({visible.length})</span>
        </h1>
        <TransactionFilters filters={filters} onChange={setFilters} />
        <TransactionList transactions={visible} onEdit={setEditing} onDelete={handleDelete} />
      </div>
    </div>
  )
}
