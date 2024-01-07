import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'
import { Theme } from '@radix-ui/themes';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Library',
  description: 'Library where you can discover books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Theme accentColor="crimson">
          <NavBar />
          {children}
        </Theme>
      </body>
    </html>
  )
}
