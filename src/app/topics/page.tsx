import Link from 'next/link'
import type { Metadata } from 'next'
import { CollectionHeader } from '@/components/CollectionHeader'
import { TOPICS } from '@/lib/constants'
import { getTopicLeaderboard, getSiteStats } from '@/lib/board'
import { collectionMetadata } from '@/lib/metadata'

export const metadata: Metadata = collectionMetadata({
  title: 'Topics',
  description:
    'Every issue we track — layoffs, DEI, Palestine, unions, surveillance, antitrust, and money in politics.',
  path: '/topics',
})

export default function TopicsPage() {
  const topics = getTopicLeaderboard()
  const stats = getSiteStats()

  return (
    <div>
      <CollectionHeader
        eyebrow="By issue"
        title="Topics"
        blurb="Every issue we track, ordered by how much documented evidence sits behind it."
        stats={[
          { n: topics.length, l: 'Topics' },
          { n: stats.receipts, l: 'Receipts' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topics.map(t => {
            const topic = TOPICS[t.id as keyof typeof TOPICS]
            const againstPct = t.total > 0 ? Math.round((t.opposed / t.total) * 100) : 0
            return (
              <Link
                key={t.id}
                href={`/topic/${t.id}`}
                className="group flex flex-col p-5 rounded-xl border border-line bg-ink-raised hover:border-accent transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-3xl">{t.icon}</span>
                  <span className="tnum text-2xl font-bold text-paper leading-none">{t.total}</span>
                </div>

                <h2 className="mt-4 text-lg font-semibold text-paper group-hover:text-accent transition-colors">
                  {t.name}
                </h2>
                {topic?.description && (
                  <p className="mt-1.5 text-sm text-paper-dim leading-relaxed flex-1">
                    {topic.description}
                  </p>
                )}

                <div className="mt-4">
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${againstPct}%`, backgroundColor: 'var(--opposed)' }}
                    />
                  </div>
                  <p className="label mt-2">
                    {t.opposed} against · {againstPct}%
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
