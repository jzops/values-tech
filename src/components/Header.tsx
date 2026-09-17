import Link from 'next/link'
import { Search } from 'lucide-react'
import { Logo } from './Logo'

const NAV = [
  { href: '/companies', label: 'Companies' },
  { href: '/people', label: 'People' },
  { href: '/vcs', label: 'VCs' },
  { href: '/topics', label: 'Topics' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center text-paper shrink-0" aria-label="Receipts.Tech home">
            <Logo className="h-7" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-paper-dim hover:text-paper hover:bg-white/5 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-paper-mute border border-line rounded-lg hover:border-[var(--line-str)] hover:text-paper-dim transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </Link>
            <Link
              href="/contribute"
              className="hidden sm:inline-flex px-3 py-1.5 text-sm font-semibold rounded-lg bg-accent text-ink hover:bg-[var(--accent-hi)] transition-colors"
            >
              Submit
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
