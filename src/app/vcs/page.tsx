import { EntityCard } from '@/components/EntityCard'
import { Metadata } from 'next'
import { vcs, getStanceCountForEntity } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'VCs — receipts.tech',
  description: 'Check the receipts on VCs before taking their money. Documented stances on founder treatment, politics, and more.',
}

export default function VCsPage() {
  const vcsWithCounts = vcs.map(vc => ({
    ...vc,
    stanceCount: getStanceCountForEntity('vc', vc.id)
  })).sort((a, b) => b.stanceCount - a.stanceCount)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Venture Capital Firms</h1>
        <p className="mt-2 text-gray-600">
          {vcs.length} VCs tracked
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vcsWithCounts.map(vc => (
          <EntityCard
            key={vc.id}
            type="vc"
            entity={vc}
            stanceCount={vc.stanceCount}
            subtitle={vc.aum || undefined}
          />
        ))}
      </div>
    </div>
  )
}
