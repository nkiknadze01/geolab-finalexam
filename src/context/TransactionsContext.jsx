import { createContext, useContext } from 'react'
import { useAuth } from './AuthContext'
import { useTransactions } from '../hooks/useTransactions'

const TransactionsContext = createContext(null)

// key={user.email} ქმნის ახალ state-ს მომხმარებლის შეცვლისას
function Inner({ email, children }) {
  const value = useTransactions(email)
  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>
}

export function TransactionsProvider({ children }) {
  const { user } = useAuth()
  if (!user) return children
  return (
    <Inner key={user.email} email={user.email}>
      {children}
    </Inner>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTransactionsContext() {
  const ctx = useContext(TransactionsContext)
  if (!ctx) throw new Error('useTransactionsContext must be used inside TransactionsProvider')
  return ctx
}
