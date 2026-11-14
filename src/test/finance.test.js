import { describe, expect, it } from 'vitest'
import { calculateSummary, expensesByCategory, filterTransactions } from '../utils/finance'

const data = [
  { id: '1', title: 'ხელფასი', amount: 1000, type: 'income', category: 'ხელფასი', date: '2026-11-01' },
  { id: '2', title: 'სუპერმარკეტი', amount: 200, type: 'expense', category: 'საკვები', date: '2026-11-02' },
  { id: '3', title: 'ტაქსი', amount: 50, type: 'expense', category: 'ტრანსპორტი', date: '2026-11-03' },
]

describe('finance utils', () => {
  it('calculates income, expense and balance', () => {
    expect(calculateSummary(data)).toEqual({ income: 1000, expense: 250, balance: 750 })
  })

  it('groups expenses by category, largest first', () => {
    expect(expensesByCategory(data)).toEqual([
      { category: 'საკვები', total: 200 },
      { category: 'ტრანსპორტი', total: 50 },
    ])
  })

  it('filters by type and search, and sorts by amount', () => {
    expect(filterTransactions(data, { type: 'expense' })).toHaveLength(2)
    expect(filterTransactions(data, { search: 'ტაქ' })).toHaveLength(1)
    expect(filterTransactions(data, { sort: 'amount-desc' })[0].id).toBe('1')
  })
})
