import { USERS_KEY, readJSON, writeJSON } from './storage'

/**
 * Mock backend. რეალურ პროექტში ეს ფუნქციები შეიცვლება fetch/axios-ის გამოძახებებით.
 * Token-ს ვაგენერირებთ ლოკალურად და ვინახავთ localStorage-ში (იხ. AuthContext).
 */
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

const encode = (value) => btoa(unescape(encodeURIComponent(value)))
const decode = (value) => decodeURIComponent(escape(atob(value)))

const makeToken = (user) =>
  `ft.${encode(JSON.stringify({ email: user.email, name: user.name, exp: Date.now() + 7 * 864e5 }))}`

export function parseToken(token) {
  try {
    if (!token?.startsWith('ft.')) return null
    const payload = JSON.parse(decode(token.slice(3)))
    if (payload.exp < Date.now()) return null
    return { email: payload.email, name: payload.name }
  } catch {
    return null
  }
}

export async function registerUser({ name, email, password }) {
  await delay()
  const users = readJSON(USERS_KEY, [])
  const normalized = email.trim().toLowerCase()
  if (users.some((u) => u.email === normalized)) {
    throw new Error('ამ ელ-ფოსტით მომხმარებელი უკვე არსებობს')
  }
  const user = { name: name.trim(), email: normalized, password: encode(password) }
  writeJSON(USERS_KEY, [...users, user])
  return { token: makeToken(user), user: { name: user.name, email: user.email } }
}

export async function loginUser({ email, password }) {
  await delay()
  const users = readJSON(USERS_KEY, [])
  const user = users.find((u) => u.email === email.trim().toLowerCase())
  if (!user || user.password !== encode(password)) {
    throw new Error('ელ-ფოსტა ან პაროლი არასწორია')
  }
  return { token: makeToken(user), user: { name: user.name, email: user.email } }
}
