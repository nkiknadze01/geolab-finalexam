import { uid } from '../utils/id'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { readJSON, writeJSON } from '../utils/storage'
import { calculateSummary } from '../utils/finance'

const seed = () => {
  const d = (days) => new Date(Date.now() - days * 864e5).toISOString().slice(0, 10)
  return [
    { id: uid(), title: 'ხელფასი', amount: 3200, type: 'income', category: 'ხელფასი', date: d(10) },
    { id: uid(), title: 'სუპერმარკეტი', amount: 184.5, type: 'expense', category: 'საკვები', date: d(6) },
    { id: uid(), title: 'მეტრო და ავტობუსი', amount: 45, type: 'expense', category: 'ტრანსპორტი', date: d(4) },
    { id: uid(), title: 'ფრილანსის პროექტი', amount: 650, type: 'income', category: 'ფრილანსი', date: d(3) },
    { id: uid(), title: 'კინო', amount: 28, type: 'expense', category: 'გართობა', date: d(1) },
  ]
}

export function useTransactions(userEmail) {
  const key = `ft_tx_${userEmail}`
  const [transactions, setTransactions] = useState(() => readJSON(key, null) ?? seed())

  useEffect(() => {
    writeJSON(key, transactions)
  }, [key, transactions])

  const addTransaction = useCallback((data) => {
    setTransactions((prev) => [{ ...data, id: uid() }, ...prev])
  }, [])

  const updateTransaction = useCallback((id, data) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)))
  }, [])

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const summary = useMemo(() => calculateSummary(transactions), [transactions])

  return { transactions, summary, addTransaction, updateTransaction, deleteTransaction }
}
