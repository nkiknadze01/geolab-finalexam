import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { loginUser, parseToken, registerUser } from '../utils/authApi'
import { getToken, removeToken, setToken } from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => parseToken(getToken()))

  const handleAuth = useCallback((result) => {
    setToken(result.token) // Token -> localStorage
    setUser(result.user)
  }, [])

  const login = useCallback(async (values) => handleAuth(await loginUser(values)), [handleAuth])
  const register = useCallback(async (values) => handleAuth(await registerUser(values)), [handleAuth])

  const logout = useCallback(() => {
    removeToken()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, register, logout }),
    [user, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
