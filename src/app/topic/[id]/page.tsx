import { notFound } from 'next/navigation'
import Link from 'next/link'
import { StanceCard } from '@/components/StanceCard'
import { TOPICS, POSITION_COLORS } from '@/lib/constants'
import { Metadata } from 'next'
import { getStancesByTopic, getEntityForStance } from '@/lib/mock-data'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const topic = TOPICS[id as keyof typeof TOPICS]
  if (!topic) return { title: 'Topic Not Found' }
  
  return {
    title: `${topic.name} — Receipts.Tech`,
    description: `${topic.description} Check the receipts on tech companies, executives, and VCs.`,
  }
}

export default async function TopicPage({ params }: Props) {
  const { id } = await params
  const topic = TOPICS[id as keyof typeof TOPICS]
  
  if (!topic) notFound()

  const rawStances = getStancesByTopic(id)
  const stances = rawStances.map(stance => ({
    ...stance,
    entityName: getEntityForStance(stance).name,
    entitySlug: getEntityForStance(stance).slug
  }))

  const positionCounts = {
    supported: stances.filter(s => s.position === 'supported').length,
    opposed: stances.filter(s => s.position === 'opposed').length,
    silent: stances.filter(s => s.position === 'silent').length,
    mixed: stances.filter(s => s.position === 'mixed').length
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{topic.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900">{topic.name}</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">{topic.description}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={`rounded-xl p-4 ${POSITION_COLORS.supported.bg} ${POSITION_COLORS.supported.border} border`}>
          <p className="text-2xl font-bold text-green-700">{positionCounts.supported}</p>
          <p className="text-sm text-green-600">Supported</p>
        </div>
        <div className={`rounded-xl p-4 ${POSITION_COLORS.opposed.bg} ${POSITION_COLORS.opposed.border} border`}>
          <p className="text-2xl font-bold text-red-700">{positionCounts.opposed}</p>
          <p className="text-sm text-red-600">Opposed</p>
        </div>
        <div className={`rounded-xl p-4 ${POSITION_COLORS.mixed.bg} ${POSITION_COLORS.mixed.border} border`}>
          <p className="text-2xl font-bold text-amber-700">{positionCounts.mixed}</p>
          <p className="text-sm text-amber-600">Mixed</p>
        </div>
        <div className={`rounded-xl p-4 ${POSITION_COLORS.silent.bg} ${POSITION_COLORS.silent.border} border`}>
          <p className="text-2xl font-bold text-gray-600">{positionCounts.silent}</p>
          <p className="text-sm text-gray-500">Silent</p>
        </div>
      </div>

      {/* Other Topics */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-500 mb-3">Other Topics</h2>
        <div className="flex flex-wrap gap-2">
          {Object.values(TOPICS)
            .filter(t => t.id !== id)
            .slice(0, 8)
            .map(t => (
              <Link
                key={t.id}
                href={`/topic/${t.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <span>{t.icon}</span>
                <span>{t.name}</span>
              </Link>
            ))}
        </div>
      </div>

      {/* Stances */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        All Stances ({stances.length})
      </h2>
      {stances.length > 0 ? (
        <div className="space-y-4">
          {stances.map(stance => (
            <StanceCard
              key={stance.id}
              stance={stance}
              showEntity
              entityName={stance.entityName}
              entitySlug={stance.entitySlug}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No documented stances yet.</p>
        </div>
      )}
    </div>
  )
}
