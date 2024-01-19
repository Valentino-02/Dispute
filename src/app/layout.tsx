import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import ThemeProvider from '@/components/providers/ThemeProvider'
import ModalProvider from '@/components/providers/ModalProvider'
import { SocketProvider } from '@/components/providers/SocketProvider'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { cn } from '@/lib/utils'
import { AuthProvider } from '@/components/providers/AuthProvider'

const font = Ubuntu({ subsets: ['latin'], weight: '700' })

export const metadata: Metadata = {
  title: 'Dispute',
  description:
    'Discord Clone made with Next.js, Typescript and Tailwind. It hosts the MySQL DB on PlanetScale, and uses Prisma as an ORM that lets you write type safe schemas. ',
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  },
  manifest: '/site.webmanifest',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, ' bg-white dark:bg-[#080719]')}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="dispute-theme"
          >
            <SocketProvider>
              <ModalProvider />
              <ToastContainer />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
