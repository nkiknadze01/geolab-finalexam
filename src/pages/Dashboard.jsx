import { Link } from 'react-router-dom'
import StatsCards from '../components/StatsCards'
import CategoryChart from '../components/CategoryChart'
import TransactionList from '../components/TransactionList'
import { useAuth } from '../context/AuthContext'
import { useTransactionsContext } from '../context/TransactionsContext'
import { filterTransactions } from '../utils/finance'

export default function Dashboard() {
  const { user } = useAuth()
  const { transactions, summary } = useTransactionsContext()
  const recent = filterTransactions(transactions, { sort: 'date-desc' }).slice(0, 5)

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">გამარჯობა, {user.name} 👋</h1>
        <p className="text-sm text-slate-500">თქვენი ფინანსების მიმოხილვა</p>
      </div>

      <StatsCards summary={summary} />

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryChart transactions={transactions} />
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">ბოლო ტრანზაქციები</h2>
            <Link to="/transactions" className="text-sm font-semibold text-brand-600 hover:underline">
              ყველას ნახვა →
            </Link>
          </div>
          <TransactionList transactions={recent} />
        </div>
      </div>
    </div>
  )
}
