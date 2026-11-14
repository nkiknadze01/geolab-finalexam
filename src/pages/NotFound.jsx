import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-6xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-xl font-semibold">გვერდი ვერ მოიძებნა</h1>
      <Link to="/" className="btn-primary mt-6">
        მთავარ გვერდზე დაბრუნება
      </Link>
    </div>
  )
}
