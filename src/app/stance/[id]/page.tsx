import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Calendar, Shield, ShieldAlert, ShieldQuestion, ShieldOff } from 'lucide-react'
import { ShareButtons } from '@/components/ShareButtons'
import { TopicBadge } from '@/components/TopicBadge'
import { Metadata } from 'next'
import { getStanceById, getEntityForStance } from '@/lib/mock-data'
import { TOPICS } from '@/lib/constants'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const stance = getStanceById(id)
  if (!stance) return { title: 'Stance Not Found' }

  const entity = getEntityForStance(stance)
  const topic = TOPICS[stance.topic as keyof typeof TOPICS]
  const topicName = topic?.name || stance.topic
  const description = `${entity.name} on ${topicName}: ${stance.summary.slice(0, 150)}`

  return {
    title: `${entity.name} on ${topicName} — Receipts.Tech`,
    description,
    openGraph: {
      title: `${entity.name} on ${topicName} — Receipts.Tech`,
      description,
      images: [`/api/og/stance/${id}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${entity.name} on ${topicName} — Receipts.Tech`,
      description,
      images: [`/api/og/stance/${id}`],
    },
  }
}

const positionConfig = {
  supported: { label: 'Supported', color: 'text-green-700 bg-green-50 border-green-200', icon: Shield },
  opposed: { label: 'Opposed', color: 'text-red-700 bg-red-50 border-red-200', icon: ShieldAlert },
  mixed: { label: 'Mixed', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: ShieldQuestion },
  silent: { label: 'Silent', color: 'text-gray-700 bg-gray-50 border-gray-200', icon: ShieldOff },
}

export default async function StancePage({ params }: Props) {
  const { id } = await params
  const stance = getStanceById(id)

  if (!stance) notFound()

  const entity = getEntityForStance(stance)
  const topic = TOPICS[stance.topic as keyof typeof TOPICS]
  const topicName = topic?.name || stance.topic
  const pos = positionConfig[stance.position] || positionConfig.silent
  const PosIcon = pos.icon

  const entityUrl = `/${stance.entity_type}/${entity.slug}`

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Back link */}
      <Link
        href={entityUrl}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {entity.name}
      </Link>

      {/* Entity name */}
      <div className="mb-2">
        <Link href={entityUrl} className="text-sm font-medium text-[#FF6B35] hover:underline">
          {entity.name}
        </Link>
      </div>

      {/* Topic */}
      <div className="mb-4">
        <TopicBadge topicId={stance.topic} size="lg" />
      </div>

      {/* Position badge */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${pos.color} mb-6`}>
        <PosIcon className="w-5 h-5" />
        <span className="font-semibold text-lg">{pos.label}</span>
      </div>

      {/* Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <p className="text-lg text-gray-800 leading-relaxed">{stance.summary}</p>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
        {stance.stance_date && (
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(stance.stance_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        )}
        {stance.source_url && (
          <a
            href={stance.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#FF6B35] hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            View Source
          </a>
        )}
        {stance.verified && (
          <span className="flex items-center gap-1.5 text-green-600">
            <Shield className="w-4 h-4" />
            Verified
          </span>
        )}
      </div>

      {/* Share */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Share this receipt</h3>
        <ShareButtons
          entityType={stance.entity_type}
          entitySlug={entity.slug}
          entityName={entity.name}
          stances={[stance]}
        />
      </div>
    </div>
  )
}
