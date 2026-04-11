"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { NoteCard } from "@/components/note-card"

import { onAuthStateChanged, User } from "firebase/auth"
import { auth, db } from "@/lib/firebase"

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"

interface Note {
  id: string
  content: string
  createdAt: Date
  userEmail?: string
  pinned?: boolean
}

export default function DashboardPage() {
  const [notes, setNotes] = React.useState<Note[]>([])
  const [newNote, setNewNote] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [user, setUser] = React.useState<User | null>(null)

  const router = useRouter()

  // 🔐 Auth + Realtime Notes
  React.useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login")
        setUser(null)
      } else {
        setUser(currentUser)

        const q = query(
          collection(db, "notes"),
          where("userEmail", "==", currentUser.email)
        )

        unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const data: Note[] = snapshot.docs.map((doc) => {
            const d = doc.data()
            return {
              id: doc.id,
              content: d.content || "",
              createdAt: d.createdAt?.toDate?.() || new Date(),
              userEmail: d.userEmail,
              pinned: d.pinned || false,
            }
          })

          // 📌 Pin + Latest sorting
          data.sort((a, b) => {
            if (a.pinned !== b.pinned) {
              return Number(b.pinned) - Number(a.pinned)
            }
            return b.createdAt.getTime() - a.createdAt.getTime()
          })

          setNotes(data)
        })
      }
    })

    return () => {
      unsubscribeAuth()
      if (unsubscribeSnapshot) unsubscribeSnapshot()
    }
  }, [router])

  // ➕ Add Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newNote.trim() || !user) {
      console.log("❌ Empty note or user missing")
      return
    }

    try {
      console.log("🔥 Adding note...")

      await addDoc(collection(db, "notes"), {
        content: newNote,
        createdAt: serverTimestamp(),
        userEmail: user.email,
        pinned: false,
      })

      console.log("✅ Note added successfully")

      setNewNote("")
    } catch (error) {
      console.log("❌ ADD ERROR:", error)
    }
  }

  // 🗑 Delete Note
  const handleDeleteNote = async (id: string) => {
    try {
      await deleteDoc(doc(db, "notes", id))
    } catch (error) {
      console.log("DELETE ERROR:", error)
    }
  }

  // ✏️ Edit Note
  const handleEditNote = async (id: string, newContent: string) => {
    try {
      await updateDoc(doc(db, "notes", id), {
        content: newContent,
      })
    } catch (error) {
      console.log("EDIT ERROR:", error)
    }
  }

  // 📌 Pin / Unpin
  const handleTogglePin = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, "notes", id), {
        pinned: !current,
      })
    } catch (error) {
      console.log("PIN ERROR:", error)
    }
  }

  // 🔎 Search filter
  const filteredNotes = React.useMemo(() => {
    return notes.filter((note) =>
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [notes, searchQuery])

  // ⛔ Loading state fix (important)
  if (user === null) return null

  // Format the username nicely (use display name, or split the email so it just says "Welcome, kunal" instead of "Welcome, kunal@gmail.com")
  const displayName = user.displayName || (user.email ? user.email.split('@')[0] : "User")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="container mx-auto flex-1 px-4 py-8">
        
        {/* Welcome Header */}
        <h1 className="text-3xl font-bold mb-8 tracking-tight">
          Welcome, {displayName}
        </h1>

        {/* Add Note */}
        <form onSubmit={handleAddNote} className="mb-6 flex gap-3">
          <Input
            placeholder="Write a new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </form>

        {/* Search */}
        <Input
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-8"
        />

        {/* Notes */}
        <div className="grid gap-4">
          {filteredNotes.length ? (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                content={note.content}
                createdAt={note.createdAt}
                onDelete={handleDeleteNote}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground mt-8">
              No notes found.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}