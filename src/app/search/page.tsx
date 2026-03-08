import { SearchBox } from '@/components/SearchBox'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search — Receipts.Tech',
  description: 'Search for tech companies, executives, and VCs to check their receipts.',
}

export default function SearchPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Search</h1>
        <p className="mt-2 text-gray-600">
          Find companies, people, or VCs
        </p>
      </div>

      <SearchBox autoFocus size="lg" />

      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Try searching for:</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {['Meta', 'Elon Musk', 'a16z', 'Stripe', 'Sam Altman', 'Sequoia'].map(term => (
            <span
              key={term}
              className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
            >
              {term}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
