import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_URL, SITE_NAME, SITE_TAGLINE, TWITTER_HANDLE, abs } from '@/lib/site'
import { companies, people, vcs, stances } from '@/lib/mock-data'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const entityCount = companies.length + people.length + vcs.length

const title = `${SITE_NAME} — ${SITE_TAGLINE}`
const description = `${stances.length.toLocaleString('en-US')} sourced receipts on ${entityCount} tech companies, VCs, and executives. Look them up before you take their money, join their company, or use their product.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  keywords: [
    'tech accountability', 'VC track record', 'startup due diligence',
    'tech executive donations', 'DEI rollback', 'tech layoffs', 'receipts',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title,
    description,
    images: [{
      url: abs('/api/og/home'),
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} — ${stances.length.toLocaleString('en-US')} sourced receipts on tech companies, VCs, and executives.`,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title,
    description,
    images: [abs('/api/og/home')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0C',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-ink text-paper">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
