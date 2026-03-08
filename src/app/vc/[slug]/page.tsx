import { notFound } from 'next/navigation'
import { Landmark, Globe, DollarSign, FileText } from 'lucide-react'
import { StanceCard } from '@/components/StanceCard'
import { StatCard } from '@/components/StatCard'
import { StatsSummary } from '@/components/StatsSummary'
import { DonationsTable } from '@/components/DonationsTable'
import { TopicBadge } from '@/components/TopicBadge'
import { ReceiptCard } from '@/components/ReceiptCard'
import { ShareButtons } from '@/components/ShareButtons'
import { Metadata } from 'next'
import { getVCBySlug, getStancesForEntity, getStatsForEntity, getDonationsForEntity } from '@/lib/mock-data'
import { STANCE_TOPICS } from '@/lib/constants'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const vc = getVCBySlug(slug)
  if (!vc) return { title: 'VC Not Found' }

  const stances = getStancesForEntity('vc', vc.id)
  const description = `Check the receipts on ${vc.name} before taking their money. ${stances.length} documented stances.`

  return {
    title: `${vc.name} — Receipts.Tech`,
    description,
    openGraph: {
      title: `${vc.name} — Receipts.Tech`,
      description,
      images: [`/api/og/vc/${slug}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${vc.name} — Receipts.Tech`,
      description,
      images: [`/api/og/vc/${slug}`],
    },
  }
}

export default async function VCPage({ params }: Props) {
  const { slug } = await params
  const vc = getVCBySlug(slug)

  if (!vc) notFound()

  const allStances = getStancesForEntity('vc', vc.id)
  const stats = getStatsForEntity('vc', vc.id)
  const donations = getDonationsForEntity('vc', vc.id)

  // Filter stances to only show moral judgment topics
  const stances = allStances.filter(s => STANCE_TOPICS.includes(s.topic as typeof STANCE_TOPICS[number]))
  const topics = [...new Set(stances.map(s => s.topic))]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {vc.logo_url ? (
            <img src={vc.logo_url} alt={vc.name} className="w-full h-full object-cover" />
          ) : (
            <Landmark className="w-10 h-10 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{vc.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
            <span className="font-medium text-gray-500">Venture Capital</span>
            {vc.aum && (
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {vc.aum} AUM
              </span>
            )}
          </div>
          {vc.website && (
            <a
              href={vc.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm text-[#FF6B35] hover:underline"
            >
              <Globe className="w-4 h-4" />
              {vc.website.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      {vc.description && (
        <p className="text-gray-600 mb-8 max-w-3xl">{vc.description}</p>
      )}

      {/* Stats Summary */}
      <StatsSummary stats={stats} donations={donations} />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Topics covered */}
          {topics.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-500 mb-3">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {topics.map(topic => (
                  <TopicBadge key={topic} topicId={topic} size="sm" />
                ))}
              </div>
            </div>
          )}

          {/* Stances */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Stances ({stances.length})
          </h2>
          {stances.length > 0 ? (
            <div className="space-y-4">
              {stances.map(stance => (
                <StanceCard key={stance.id} stance={stance} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No documented stances yet.</p>
            </div>
          )}

          {/* Stats Timeline */}
          {stats.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">
                Stats ({stats.length})
              </h2>
              <div className="space-y-4">
                {stats.map(stat => (
                  <StatCard key={stat.id} stat={stat} />
                ))}
              </div>
            </>
          )}

          {/* Donations Table */}
          <DonationsTable donations={donations} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Receipt Card Preview */}
          {stances.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Receipt Card</h3>
              </div>
              <div className="transform scale-[0.5] origin-top-left -mr-[200px] -mb-[200px]">
                <ReceiptCard
                  entity={vc}
                  entityType="vc"
                  stances={stances}
                  variant="square"
                />
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Share this receipt</h3>
            <ShareButtons
              entityType="vc"
              entitySlug={vc.slug}
              entityName={vc.name}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
