import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ClientProviders } from '@/shared/providers/client-providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Prestige Academy - Platform Tryout CASN Terpercaya',
    template: '%s | Prestige Academy'
  },
  description: 'Platform tryout online untuk persiapan ujian CASN dengan sistem CAT yang terintegrasi',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
    <body className={`${poppins.variable} font-sans antialiased`}>
    <ClientProviders>
      {children}
    </ClientProviders>
    </body>
    </html>
  )
}