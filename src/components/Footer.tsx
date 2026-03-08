import Link from 'next/link'
import { LogoMark } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <LogoMark className="h-8 w-8 text-gray-900" />
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Before they send you their receipts, check theirs.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Browse</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/companies" className="text-sm text-gray-600 hover:text-gray-900">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/people" className="text-sm text-gray-600 hover:text-gray-900">
                  People
                </Link>
              </li>
              <li>
                <Link href="/vcs" className="text-sm text-gray-600 hover:text-gray-900">
                  VCs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Topics</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/topic/layoffs" className="text-sm text-gray-600 hover:text-gray-900">
                  Layoffs
                </Link>
              </li>
              <li>
                <Link href="/topic/dei" className="text-sm text-gray-600 hover:text-gray-900">
                  DEI
                </Link>
              </li>
              <li>
                <Link href="/topic/remote_work" className="text-sm text-gray-600 hover:text-gray-900">
                  Remote Work
                </Link>
              </li>
              <li>
                <Link href="/topic/palestine" className="text-sm text-gray-600 hover:text-gray-900">
                  Palestine
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-sm text-gray-600 hover:text-gray-900">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="text-sm text-gray-600 hover:text-gray-900">
                  Contribute
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            All data sourced from public records. © {new Date().getFullYear()} Receipts.Tech
          </p>
        </div>
      </div>
    </footer>
  )
}
