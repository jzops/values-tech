import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { EntityProfile } from '@/components/EntityProfile'
import { getBoardRow, getBoardRank } from '@/lib/board'
import { entityMetadata } from '@/lib/metadata'
import {
  getPersonBySlug,
  getStatsForEntity,
  getDonationsForEntity,
  companies,
} from '@/lib/mock-data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const row = getBoardRow('person', slug)
  if (!row) return { title: 'Person not found' }
  return entityMetadata(row)
}

export default async function PersonPage({ params }: Props) {
  const { slug } = await params
  const person = getPersonBySlug(slug)
  const row = getBoardRow('person', slug)
  if (!person || !row) notFound()

  const company = person.current_company_id
    ? companies.find(c => c.id === person.current_company_id)
    : null

  const facts = [
    person.current_role && { label: 'Role', value: person.current_role },
    company && { label: 'Company', value: company.name },
    person.twitter_handle && { label: 'X', value: `@${person.twitter_handle}` },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <EntityProfile
      row={row}
      rank={getBoardRank('person', person.id)}
      description={person.bio}
      website={person.twitter_handle ? `https://x.com/${person.twitter_handle}` : null}
      facts={facts}
      stats={getStatsForEntity('person', person.id)}
      donations={getDonationsForEntity('person', person.id)}
    />
  )
}
