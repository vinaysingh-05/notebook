"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { StickyNote, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  isAuthenticated?: boolean
  userName?: string
  onLogout?: () => void
}

export function Navbar({ isAuthenticated = false, userName, onLogout }: NavbarProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <StickyNote className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">Smart Notes</span>
        </Link>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                Welcome, <span className="font-medium text-foreground">{userName}</span>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
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
                  <Button size="sm">Sign Up</Button>
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
