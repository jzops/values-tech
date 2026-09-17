import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { EntityProfile } from '@/components/EntityProfile'
import { getBoardRow, getBoardRank } from '@/lib/board'
import { entityMetadata } from '@/lib/metadata'
import { getVCBySlug, getStatsForEntity, getDonationsForEntity } from '@/lib/mock-data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const row = getBoardRow('vc', slug)
  if (!row) return { title: 'Fund not found' }
  return entityMetadata(row)
}

export default async function VCPage({ params }: Props) {
  const { slug } = await params
  const vc = getVCBySlug(slug)
  const row = getBoardRow('vc', slug)
  if (!vc || !row) notFound()

  const facts = [vc.aum && { label: 'AUM', value: vc.aum }].filter(Boolean) as {
    label: string
    value: string
  }[]

  return (
    <EntityProfile
      row={row}
      rank={getBoardRank('vc', vc.id)}
      description={vc.description}
      website={vc.website}
      facts={facts}
      stats={getStatsForEntity('vc', vc.id)}
      donations={getDonationsForEntity('vc', vc.id)}
    />
  )
}
