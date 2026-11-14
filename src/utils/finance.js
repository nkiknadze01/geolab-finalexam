export const CATEGORIES = {
  expense: ['საკვები', 'ტრანსპორტი', 'კომუნალური', 'გართობა', 'ჯანმრთელობა', 'შოპინგი', 'სხვა'],
  income: ['ხელფასი', 'ფრილანსი', 'საჩუქარი', 'ინვესტიცია', 'სხვა'],
}

// locale-ისგან დამოუკიდებელი ფორმატირება, რომ ყველა ბრაუზერში ერთნაირად გამოჩნდეს
export const formatMoney = (value) =>
  `${value < 0 ? '−' : ''}${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₾`

export const formatDate = (iso) => {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export function calculateSummary(transactions) {
  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  return { income, expense, balance: income - expense }
}

export function expensesByCategory(transactions) {
  const map = {}
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })
  return Object.entries(map)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
}

export function filterTransactions(transactions, { type = 'all', category = 'all', search = '', sort = 'date-desc' }) {
  const q = search.trim().toLowerCase()
  const result = transactions.filter(
    (t) =>
      (type === 'all' || t.type === type) &&
      (category === 'all' || t.category === category) &&
      (!q || t.title.toLowerCase().includes(q)),
  )
  const sorters = {
    'date-desc': (a, b) => new Date(b.date) - new Date(a.date),
    'date-asc': (a, b) => new Date(a.date) - new Date(b.date),
    'amount-desc': (a, b) => b.amount - a.amount,
    'amount-asc': (a, b) => a.amount - b.amount,
  }
  return [...result].sort(sorters[sort] || sorters['date-desc'])
}
