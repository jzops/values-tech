import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { EntityProfile } from '@/components/EntityProfile'
import { getBoardRow, getBoardRank } from '@/lib/board'
import { entityMetadata } from '@/lib/metadata'
import { getCompanyBySlug, getStatsForEntity, getDonationsForEntity, getPeopleAtCompany } from '@/lib/mock-data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const row = getBoardRow('company', slug)
  if (!row) return { title: 'Company not found' }
  return entityMetadata(row)
}

function formatFunding(amount: number | null): string | null {
  if (!amount) return null
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(0)}M`
  return `$${amount.toLocaleString('en-US')}`
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params
  const company = getCompanyBySlug(slug)
  const row = getBoardRow('company', slug)
  if (!company || !row) notFound()

  const funding = formatFunding(company.total_raised)

  const facts = [
    company.industry && { label: 'Industry', value: company.industry },
    company.founded_year && { label: 'Founded', value: String(company.founded_year) },
    company.headcount_range && { label: 'Headcount', value: company.headcount_range },
    funding && {
      label: 'Raised',
      value: company.funding_stage ? `${funding} · ${company.funding_stage}` : funding,
    },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <EntityProfile
      row={row}
      rank={getBoardRank('company', company.id)}
      description={company.description}
      website={company.website}
      facts={facts}
      stats={getStatsForEntity('company', company.id)}
      donations={getDonationsForEntity('company', company.id)}
      relatedPeople={getPeopleAtCompany(company.id)}
      relatedLabel="Key people"
    />
  )
}
