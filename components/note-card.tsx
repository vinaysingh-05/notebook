"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface NoteCardProps {
  id: string
  content: string
  createdAt: Date
  onDelete: (id: string) => void
}

export function NoteCard({ id, content, createdAt, onDelete }: NoteCardProps) {
  return (
    <Card className="group relative transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <p className="mb-3 whitespace-pre-wrap break-words text-sm leading-relaxed">
          {content}
        </p>
        <div className="flex items-center justify-between">
          <time className="text-xs text-muted-foreground">
            {createdAt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            className="h-8 w-8 text-muted-foreground opacity-0 transition-all duration-200 hover:text-destructive group-hover:opacity-100"
            aria-label="Delete note"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
