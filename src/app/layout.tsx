import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'receipts.tech — Before they send you their receipts, check theirs.',
  description: 'Check the receipts on tech companies, VCs, and executives before you take their money, join their company, or use their products.',
  openGraph: {
    title: 'receipts.tech — Before they send you their receipts, check theirs.',
    description: 'Check the receipts on tech companies, VCs, and executives before you take their money, join their company, or use their products.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'receipts.tech — Before they send you their receipts, check theirs.',
    description: 'Check the receipts on tech companies, VCs, and executives.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-white text-gray-900`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
