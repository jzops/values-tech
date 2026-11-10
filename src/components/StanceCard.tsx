import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Stance } from '@/lib/types'
import { TOPICS, POSITION_LABELS, SOURCE_LABELS } from '@/lib/constants'
import { people } from '@/lib/mock-data'

const POSITION_COLOR: Record<Stance['position'], string> = {
  opposed: 'var(--opposed)',
  supported: 'var(--supported)',
  mixed: 'var(--mixed)',
  silent: 'var(--silent)',
}

interface StanceCardProps {
  stance: Stance
  showEntity?: boolean
  entityName?: string
  entitySlug?: string
  /** Hide the topic chip on pages already scoped to one topic. */
  hideTopic?: boolean
}

export function StanceCard({
  stance,
  showEntity,
  entityName,
  entitySlug,
  hideTopic,
}: StanceCardProps) {
  const topic = TOPICS[stance.topic as keyof typeof TOPICS]
  const color = POSITION_COLOR[stance.position]

  // A company or fund receipt is often really about one person. Link them.
  const actorId = stance.actor_person_id ?? stance.quote?.speaker_person_id ?? null
  const actor = actorId ? people.find(p => p.id === actorId) : null
  const extraSources = stance.corroboration ?? []

  const formattedDate = stance.stance_date
    ? new Date(stance.stance_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null

  return (
    <article
      className="relative rounded-xl border border-line bg-ink-raised p-5 hover:border-[var(--line-str)] transition-colors"
      style={{ borderLeftWidth: '3px', borderLeftColor: color }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[0.6875rem] font-bold uppercase tracking-wider"
              style={{ color, backgroundColor: `${color}1A` }}
            >
              {POSITION_LABELS[stance.position]}
            </span>

            {!hideTopic && (
              <Link
                href={`/topic/${stance.topic}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-paper-dim hover:text-accent transition-colors"
              >
                <span>{topic?.icon || '📌'}</span>
                {topic?.name || stance.topic}
              </Link>
            )}

            {formattedDate && <span className="label !text-[0.625rem]">{formattedDate}</span>}
          </div>

          {showEntity && entityName && entitySlug && (
            <Link
              href={`/${stance.entity_type}/${entitySlug}`}
              className="block mt-2.5 font-semibold text-paper hover:text-accent transition-colors"
            >
              {entityName}
            </Link>
          )}

          <p className="mt-2 text-sm text-paper-dim leading-relaxed">{stance.summary}</p>

          {stance.quote && (
            <figure
              className="mt-3.5 border-l-2 pl-3.5"
              style={{ borderColor: color }}
            >
              <blockquote className="text-sm text-paper leading-relaxed">
                &ldquo;{stance.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-1.5 label !text-[0.625rem]">
                {actor ? (
                  <Link href={`/person/${actor.slug}`} className="hover:!text-accent transition-colors">
                    {stance.quote.speaker}
                  </Link>
                ) : (
                  stance.quote.speaker
                )}
              </figcaption>
            </figure>
          )}

          {stance.outcome && (
            <p className="mt-3 text-sm text-paper-dim leading-relaxed">
              <span className="label !text-[0.625rem] mr-1.5">What happened</span>
              {stance.outcome}
            </p>
          )}

          <div className="mt-3.5 flex items-center gap-3 flex-wrap">
            <span className="label !text-[0.625rem]">
              {SOURCE_LABELS[stance.source_type as keyof typeof SOURCE_LABELS] || stance.source_type}
            </span>
            {stance.verified && (
              <span className="label !text-[0.625rem]" style={{ color: 'var(--supported)' }}>
                ✓ Verified
              </span>
            )}
            {actor && !stance.quote && (
              <Link
                href={`/person/${actor.slug}`}
                className="label !text-[0.625rem] hover:!text-accent transition-colors"
              >
                ↳ {actor.name}
              </Link>
            )}
            {extraSources.length > 0 && (
              <span className="label !text-[0.625rem]" title={extraSources.map(c => c.publisher).join(', ')}>
                +{extraSources.length} source{extraSources.length === 1 ? '' : 's'}
              </span>
            )}
            <Link
              href={`/stance/${stance.id}`}
              className="label !text-[0.625rem] hover:!text-accent transition-colors ml-auto"
            >
              Share ↗
            </Link>
          </div>
        </div>

        {stance.source_url && (
          <a
            href={stance.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-2 -m-1 text-paper-mute hover:text-paper rounded-lg hover:bg-white/5 transition-colors"
            title="View source"
            aria-label="View original source"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </article>
  )
}
