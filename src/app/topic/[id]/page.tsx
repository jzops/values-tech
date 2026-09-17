import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { StanceCard } from '@/components/StanceCard'
import { CollectionHeader } from '@/components/CollectionHeader'
import { TOPICS, POSITION_LABELS } from '@/lib/constants'
import { collectionMetadata } from '@/lib/metadata'
import { getStancesByTopic, getEntityForStance } from '@/lib/mock-data'

interface Props {
  params: Promise<{ id: string }>
}

const POSITION_VAR = {
  opposed: 'var(--opposed)',
  mixed: 'var(--mixed)',
  silent: 'var(--silent)',
  supported: 'var(--supported)',
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const topic = TOPICS[id as keyof typeof TOPICS]
  if (!topic) return { title: 'Topic not found' }

  const count = getStancesByTopic(id).length
  return collectionMetadata({
    title: topic.name,
    description: `${count} documented receipts on ${topic.name.toLowerCase()} across tech companies, executives, and VCs. Every line links to a public source.`,
    path: `/topic/${id}`,
  })
}

export default async function TopicPage({ params }: Props) {
  const { id } = await params
  const topic = TOPICS[id as keyof typeof TOPICS]
  if (!topic) notFound()

  const stances = getStancesByTopic(id).map(s => {
    const e = getEntityForStance(s)
    return { ...s, entityName: e.name, entitySlug: e.slug }
  })

  const counts = {
    opposed: stances.filter(s => s.position === 'opposed').length,
    mixed: stances.filter(s => s.position === 'mixed').length,
    silent: stances.filter(s => s.position === 'silent').length,
    supported: stances.filter(s => s.position === 'supported').length,
  }

  const entities = new Set(stances.map(s => `${s.entity_type}:${s.entity_id}`)).size

  return (
    <div>
      <CollectionHeader
        eyebrow={`${topic.icon}  Topic`}
        title={topic.name}
        blurb={topic.description}
        stats={[
          { n: stances.length, l: 'Receipts' },
          { n: entities, l: 'Entities' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Verdict split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {(['opposed', 'mixed', 'silent', 'supported'] as const).map(k => (
            <div
              key={k}
              className="rounded-xl border border-line bg-ink-raised px-5 py-4"
              style={{ borderLeftWidth: '3px', borderLeftColor: POSITION_VAR[k] }}
            >
              <p className="tnum text-3xl font-bold leading-none" style={{ color: POSITION_VAR[k] }}>
                {counts[k]}
              </p>
              <p className="label mt-2">{POSITION_LABELS[k]}</p>
            </div>
          ))}
        </div>

        <h2 className="display text-2xl mb-5">
          Every receipt <span className="text-paper-mute tnum font-normal">({stances.length})</span>
        </h2>

        {stances.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {stances.map(s => (
              <StanceCard
                key={s.id}
                stance={s}
                showEntity
                entityName={s.entityName}
                entitySlug={s.entitySlug}
                hideTopic
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-line bg-ink-raised p-10 text-center">
            <p className="text-paper-dim">No documented receipts on this topic yet.</p>
          </div>
        )}

        {/* Other topics */}
        <div className="mt-14 pt-10 border-t border-line">
          <h2 className="label mb-4">Other topics</h2>
          <div className="flex flex-wrap gap-2">
            {Object.values(TOPICS)
              .filter(t => t.id !== id)
              .map(t => (
                <Link
                  key={t.id}
                  href={`/topic/${t.id}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line bg-ink-raised text-sm font-medium text-paper-dim hover:text-paper hover:border-accent transition-colors"
                >
                  <span>{t.icon}</span>
                  {t.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
