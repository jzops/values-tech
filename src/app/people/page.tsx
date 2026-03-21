import { EntityCard } from '@/components/EntityCard'
import { Metadata } from 'next'
import { people, companies, getStanceCountForEntity } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'People — Receipts.Tech',
  description: 'Check the receipts on tech executives. Documented public stances on important issues.',
  openGraph: {
    title: 'People — Receipts.Tech',
    description: 'Check the receipts on tech executives. Documented public stances on important issues.',
    images: ['/api/og/collection?title=People&description=Check+the+receipts+on+tech+executives'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og/collection?title=People&description=Check+the+receipts+on+tech+executives'],
  },
}

export default function PeoplePage() {
  const peopleWithCounts = people.map(person => {
    const company = person.current_company_id 
      ? companies.find(c => c.id === person.current_company_id) 
      : null
    return {
      ...person,
      stanceCount: getStanceCountForEntity('person', person.id),
      companyName: company?.name
    }
  }).sort((a, b) => b.stanceCount - a.stanceCount)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">People</h1>
        <p className="mt-2 text-gray-600">
          {people.length} tech executives and leaders tracked
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {peopleWithCounts.map(person => (
          <EntityCard
            key={person.id}
            type="person"
            entity={person}
            stanceCount={person.stanceCount}
            subtitle={person.current_role && person.companyName 
              ? `${person.current_role} @ ${person.companyName}`
              : person.current_role || undefined
            }
          />
        ))}
      </div>
    </div>
  )
}
