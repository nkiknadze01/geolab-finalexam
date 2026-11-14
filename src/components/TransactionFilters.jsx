import { CATEGORIES } from '../utils/finance'

const allCategories = [...new Set([...CATEGORIES.expense, ...CATEGORIES.income])]

export default function TransactionFilters({ filters, onChange }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value })

  return (
    <div className="card grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <input
        type="search"
        className="input"
        placeholder="ძებნა აღწერით..."
        aria-label="ძებნა"
        value={filters.search}
        onChange={set('search')}
      />
      <select className="input" aria-label="ტიპის ფილტრი" value={filters.type} onChange={set('type')}>
        <option value="all">ყველა ტიპი</option>
        <option value="income">შემოსავალი</option>
        <option value="expense">ხარჯი</option>
      </select>
      <select className="input" aria-label="კატეგორიის ფილტრი" value={filters.category} onChange={set('category')}>
        <option value="all">ყველა კატეგორია</option>
        {allCategories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select className="input" aria-label="დალაგება" value={filters.sort} onChange={set('sort')}>
        <option value="date-desc">ახალი ჯერ</option>
        <option value="date-asc">ძველი ჯერ</option>
        <option value="amount-desc">თანხა: მაღლიდან დაბლა</option>
        <option value="amount-asc">თანხა: დაბლიდან მაღლა</option>
      </select>
    </div>
  )
}
