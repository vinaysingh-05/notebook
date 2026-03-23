"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

interface User {
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  signup: (name: string, email: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [mounted, setMounted] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    setMounted(true)
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = React.useCallback((email: string, password: string) => {
    // Check if user exists in local storage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const existingUser = users.find(
      (u: { email: string; password: string }) => 
        u.email === email && u.password === password
    )

    if (existingUser) {
      const userData = { name: existingUser.name, email: existingUser.email }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    }
    return false
  }, [])

  const signup = React.useCallback((name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    
    // Check if email already exists
    if (users.some((u: { email: string }) => u.email === email)) {
      return false
    }

    // Add new user
    users.push({ name, email, password })
    localStorage.setItem("users", JSON.stringify(users))
    
    // Auto-login after signup
    const userData = { name, email }
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    return true
  }, [])

  const logout = React.useCallback(() => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }, [router])

  if (!mounted) {
    return null
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
