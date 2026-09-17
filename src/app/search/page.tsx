import type { Metadata } from 'next'
import Link from 'next/link'
import { SearchBox } from '@/components/SearchBox'
import { collectionMetadata } from '@/lib/metadata'
import { getSiteStats } from '@/lib/board'

export const metadata: Metadata = collectionMetadata({
  title: 'Search',
  description: 'Look up any tech company, executive, or venture fund and see their documented record.',
  path: '/search',
})

const SUGGESTIONS = [
  { label: 'Meta', href: '/company/meta' },
  { label: 'Elon Musk', href: '/person/elon-musk' },
  { label: 'a16z', href: '/vc/a16z' },
  { label: 'Palantir', href: '/company/palantir' },
  { label: 'Sam Altman', href: '/person/sam-altman' },
  { label: 'Sequoia', href: '/vc/sequoia' },
]

export default function SearchPage() {
  const stats = getSiteStats()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
      <p className="label text-center">Look them up</p>
      <h1 className="display display-lg mt-2.5 text-center">Search</h1>
      <p className="mt-4 text-center text-paper-dim">
        {stats.entities.toLocaleString('en-US')} companies, executives, and funds on file.
      </p>

      <div className="mt-9">
        <SearchBox autoFocus size="lg" />
      </div>

      <div className="mt-12 text-center">
        <p className="label">Try one of these</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map(s => (
            <Link
              key={s.label}
              href={s.href}
              className="px-3.5 py-1.5 rounded-lg border border-line bg-ink-raised text-sm font-medium text-paper-dim hover:text-paper hover:border-accent transition-colors"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
