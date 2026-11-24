import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const USERS_KEY = 'lifepath_users'
const CURRENT_KEY = 'lifepath_current'

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

// Decides where a user should go next
export const getNextRoute = (user) => {
  if (!user) return '/signup'
  if (!user.profileComplete) return '/profile-setup'
  return '/dashboard'
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => read(CURRENT_KEY, null))

  const saveUser = (u) => {
    const users = read(USERS_KEY, {})
    users[u.email] = u
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    localStorage.setItem(CURRENT_KEY, JSON.stringify(u))
    setUser(u)
  }

  // New account: profile not done yet
  const register = ({ name, email }) => {
    const u = { name, email, profileComplete: false, profile: null }
    saveUser(u)
    return u
  }

  // Returns the user if the account exists, otherwise null
  const login = (email) => {
    const u = read(USERS_KEY, {})[email]
    if (!u) return null
    localStorage.setItem(CURRENT_KEY, JSON.stringify(u))
    setUser(u)
    return u
  }

  const saveProfile = (profile) => {
    saveUser({ ...user, profile, profileComplete: true })
  }

  const logout = () => {
    localStorage.removeItem(CURRENT_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, saveProfile, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)