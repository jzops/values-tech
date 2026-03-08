import { EntityCard } from '@/components/EntityCard'
import { Metadata } from 'next'
import { companies, getStanceCountForEntity } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Companies — Receipts.Tech',
  description: 'Check the receipts on tech companies. Documented stances on layoffs, DEI, remote work, and more.',
}

export default function CompaniesPage() {
  const companiesWithCounts = companies.map(company => ({
    ...company,
    stanceCount: getStanceCountForEntity('company', company.id)
  })).sort((a, b) => b.stanceCount - a.stanceCount)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
        <p className="mt-2 text-gray-600">
          {companies.length} tech companies tracked
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {companiesWithCounts.map(company => (
          <EntityCard
            key={company.id}
            type="company"
            entity={company}
            stanceCount={company.stanceCount}
            subtitle={company.industry || undefined}
          />
        ))}
      </div>
    </div>
  )
}
