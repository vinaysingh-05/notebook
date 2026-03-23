"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/components/auth-provider"
import { StickyNote, Sparkles, Shield, Zap } from "lucide-react"

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const features = [
    {
      icon: Sparkles,
      title: "Simple & Intuitive",
      description: "Clean interface designed for quick note-taking without distractions",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instantly add, search, and manage your notes with real-time filtering",
    },
    {
      icon: Shield,
      title: "Your Data, Your Control",
      description: "Notes are stored locally on your device for complete privacy",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 flex-col">
        {/* Hero Section */}
        <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <StickyNote className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-balance">Your thoughts, organized</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            Smart Notes is a minimal, beautiful note-taking app that helps you
            capture ideas quickly and find them instantly.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="min-w-40">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="min-w-40">
                Sign In
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t bg-card/50 px-4 py-20">
          <div className="container mx-auto">
            <h2 className="mb-12 text-center text-2xl font-bold sm:text-3xl">
              Why Smart Notes?
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t px-4 py-8">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <StickyNote className="h-5 w-5 text-primary" />
              <span className="font-semibold">Smart Notes</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with care. Your notes, your way.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
