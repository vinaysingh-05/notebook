import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/auth-provider'
import { Footer } from '@/components/footer' // 👈 Import your new Footer
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Smart Notes',
  description: 'Organize your thoughts easily',

  icons: {
    icon: '/icon.png',   // 👈 your custom S logo
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 👈 Added min-h-screen flex flex-col to push footer to bottom */}
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            
            {/* 👈 flex-1 makes the main content take up all available space */}
            <div className="flex-1">
              {children}
            </div>

            {/* 👈 Added the Footer here */}
            <Footer />

          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}