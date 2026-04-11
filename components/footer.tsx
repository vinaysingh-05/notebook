"use client"

import * as React from "react"
import Link from "next/link"
import { Linkedin, Mail, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false)

  return (
    <>
      <footer className="w-full border-t bg-card/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            
            {/* Left: Branding & Copyright */}
            <div>
              <h3 className="font-semibold text-lg bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Smart Notes
              </h3>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Vinay Kumar. All rights reserved.
              </p>
            </div>

            {/* Middle: Quick Links (Privacy) */}
            <div className="flex justify-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsPrivacyOpen(true)}
                className="text-muted-foreground hover:text-foreground gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Privacy Policy
              </Button>
            </div>

            {/* Right: Contact & Social */}
            <div className="flex justify-center md:justify-end gap-4">
              <Link 
                href="vk.singh.18.2005@gmail.com" 
                className="text-muted-foreground hover:text-purple-400 transition-colors"
                title="Email Me"
              >
                <Mail className="w-5 h-5" />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/vinay-kumar0805/" // <-- ADD YOUR LINKEDIN HERE
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-500 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </div>
      </footer>

      {/* Privacy Policy Popup Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-background border rounded-xl shadow-2xl p-6 flex flex-col max-h-[80vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-500" />
                Privacy Policy
              </h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsPrivacyOpen(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="overflow-y-auto pr-2 text-sm text-muted-foreground space-y-4">
              <p>
                <strong>Last Updated:</strong> April 2026
              </p>
              <p>
                Welcome to Smart Notes. We are committed to protecting your personal information and your right to privacy.
              </p>
              <h3 className="font-semibold text-foreground mt-4">1. Information We Collect</h3>
              <p>
                We only collect the minimum amount of data necessary to provide you with our services. This includes the email address used for authentication and the notes you securely save to your dashboard.
              </p>
              <h3 className="font-semibold text-foreground mt-4">2. How We Use Your Information</h3>
              <p>
                Your data is exclusively used to provide you with a personalized dashboard experience. We do not sell, rent, or share your personal information with third parties.
              </p>
              <h3 className="font-semibold text-foreground mt-4">3. Data Security</h3>
              <p>
                We use industry-standard security measures (via Firebase) to protect your notes and account information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t flex justify-end">
              <Button onClick={() => setIsPrivacyOpen(false)}>
                I Understand
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}