"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { StickyNote, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

// 🔐 Import Firebase Auth
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  
  // State to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  // Listen for authentication changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })

    return () => unsubscribe()
  }, [])

  // Handle logout directly from the navbar
  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/login")
    } catch (error) {
      console.log("Error logging out:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* 🔥 LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl shadow-md group-hover:scale-105 transition">
            <StickyNote className="h-5 w-5 text-white" />
          </div>

          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Smart Notes
          </span>
        </Link>

        {/* 🔹 NAV */}
        <nav className="flex items-center gap-4">

          {isLoggedIn ? (
            // User IS logged in: Show ONLY Logout and Theme Toggle
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2 hover:bg-red-500/10 hover:text-red-500 transition"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          ) : (
            // User IS NOT logged in: Show Login and Sign Up
            <>
              {pathname !== "/login" && (
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
              )}

              {pathname !== "/signup" && (
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              )}
            </>
          )}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}