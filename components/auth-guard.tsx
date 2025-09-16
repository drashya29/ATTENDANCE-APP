"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  email: string
  role: "admin" | "teacher"
  name: string
  permissions?: string[]
  loginTime?: string
}

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "admin" | "teacher"
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      if (requiredRole && parsedUser.role !== requiredRole) {
        if (parsedUser.role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/dashboard")
        }
        return
      }
    } else {
      router.push("/")
      return
    }
    setIsLoading(false)
  }, [router, requiredRole])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/"
  }

  return { user, logout }
}
