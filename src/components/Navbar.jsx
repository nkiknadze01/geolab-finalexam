import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import GeoLabLogo from './GeoLabLogo'

const links = [
  { to: '/', label: 'დაფა', end: true },
  { to: '/transactions', label: 'ტრანზაქციები' },
]

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const close = () => setOpen(false)
  const handleLogout = () => {
    close()
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <GeoLabLogo className="h-9" />
          <span className="h-6 w-px bg-slate-200" aria-hidden="true" />
          <Link to="/" className="flex items-center gap-2 text-base font-bold text-brand-700 sm:text-lg" onClick={close}>
            <img src="/favicon.svg" alt="" width="28" height="28" className="hidden sm:block" />
            Finance Tracker
          </Link>
        </div>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="მთავარი ნავიგაცია">
          {isAuthenticated ? (
            <>
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                  {l.label}
                </NavLink>
              ))}
              <span className="ml-3 text-sm text-slate-500">{user.name}</span>
              <button className="btn-ghost ml-2" onClick={handleLogout}>
                გამოსვლა
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                შესვლა
              </NavLink>
              <Link to="/register" className="btn-primary ml-2">
                რეგისტრაცია
              </Link>
            </>
          )}
        </nav>

        {/* Burger button */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label={open ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav id="mobile-menu" className="border-t border-slate-200 bg-white px-4 py-3 md:hidden" aria-label="მობილური ნავიგაცია">
          <div className="flex flex-col gap-1">
            {isAuthenticated ? (
              <>
                <p className="px-3 pb-2 text-sm text-slate-500">გამარჯობა, {user.name}</p>
                {links.map((l) => (
                  <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={close}>
                    {l.label}
                  </NavLink>
                ))}
                <button className="btn-ghost mt-2" onClick={handleLogout}>
                  გამოსვლა
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClass} onClick={close}>
                  შესვლა
                </NavLink>
                <Link to="/register" className="btn-primary mt-2" onClick={close}>
                  რეგისტრაცია
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
