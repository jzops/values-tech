import Link from 'next/link'
import { Logo } from './Logo'
import { SITE_TAGLINE } from '@/lib/site'
import { getSiteStats } from '@/lib/board'

const COLUMNS = [
  {
    title: 'Browse',
    links: [
      { href: '/companies', label: 'Companies' },
      { href: '/people', label: 'People' },
      { href: '/vcs', label: 'VCs' },
      { href: '/topics', label: 'Topics' },
    ],
  },
  {
    title: 'About',
    links: [
      { href: '/about', label: 'What this is' },
      { href: '/methodology', label: 'Methodology' },
      { href: '/contribute', label: 'Submit a receipt' },
    ],
  },
]

export function Footer() {
  const stats = getSiteStats()

  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo className="h-7 text-paper" />
            <p className="mt-4 text-sm text-paper-dim max-w-xs leading-relaxed">
              {SITE_TAGLINE}
            </p>
            <p className="mt-4 label">
              {stats.receipts.toLocaleString('en-US')} receipts · {stats.entities} entities tracked
            </p>
          </div>

          {COLUMNS.map(col => (
            <div key={col.title}>
              <h3 className="label">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper-dim hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule my-10" />

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-paper-mute leading-relaxed max-w-2xl">
            Every entry links to a public source — filings, donation records, press releases,
            reporting, or the subject&rsquo;s own posts. Found something wrong?{' '}
            <Link href="/contribute" className="text-accent hover:underline">Tell us</Link>.
          </p>
          <p className="label shrink-0">reciepts.tech</p>
        </div>
      </div>
    </footer>
  )
}
