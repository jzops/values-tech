import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { ShareActions } from '@/components/ShareActions'
import { StanceCard } from '@/components/StanceCard'
import { getStanceById, getEntityForStance, getStancesForEntity, people } from '@/lib/mock-data'
import { TOPICS, POSITION_LABELS, SOURCE_LABELS } from '@/lib/constants'
import { SITE_NAME, TWITTER_HANDLE, SITE_URL, abs } from '@/lib/site'

interface Props {
  params: Promise<{ id: string }>
}

const POSITION_VAR: Record<string, string> = {
  opposed: 'var(--opposed)',
  supported: 'var(--supported)',
  mixed: 'var(--mixed)',
  silent: 'var(--silent)',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const stance = getStanceById(id)
  if (!stance) return { title: 'Receipt not found' }

  const entity = getEntityForStance(stance)
  const topicName = TOPICS[stance.topic as keyof typeof TOPICS]?.name || stance.topic
  const verdict = POSITION_LABELS[stance.position]
  const title = `${entity.name} on ${topicName}: ${verdict}`
  const description = stance.summary.length > 200
    ? `${stance.summary.slice(0, 197)}…`
    : stance.summary
  const image = abs(`/api/og/stance/${id}`)

  return {
    title,
    description,
    alternates: { canonical: `/stance/${id}` },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      url: abs(`/stance/${id}`),
      title,
      description,
      images: [{
        url: image,
        width: 1200,
        height: 630,
        alt: `${entity.name} — ${verdict} on ${topicName}.`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title,
      description,
      images: [image],
    },
  }
}

export default async function StancePage({ params }: Props) {
  const { id } = await params
  const stance = getStanceById(id)
  if (!stance) notFound()

  const entity = getEntityForStance(stance)
  const topic = TOPICS[stance.topic as keyof typeof TOPICS]
  const topicName = topic?.name || stance.topic
  const color = POSITION_VAR[stance.position] || POSITION_VAR.silent
  const entityUrl = `/${stance.entity_type}/${entity.slug}`

  const others = getStancesForEntity(stance.entity_type, stance.entity_id)
    .filter(s => s.id !== stance.id)
    .slice(0, 3)

  const url = `${SITE_URL}/stance/${id}`
  const post = [
    `${entity.name} — ${topicName}: ${POSITION_LABELS[stance.position].toUpperCase()}`,
    '',
    stance.summary.length > 180 ? `${stance.summary.slice(0, 177)}…` : stance.summary,
    '',
    url,
  ].join('\n')

  const dateStr = stance.stance_date
    ? new Date(stance.stance_date).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    : null

  return (
    <div>
      <section className="relative grain overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="absolute -top-56 right-0 w-[40rem] h-[40rem] rounded-full blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color}1A, transparent 62%)` }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <Link
            href={entityUrl}
            className="inline-flex items-center gap-1.5 text-sm text-paper-mute hover:text-paper transition-colors mb-7"
          >
            <ArrowLeft className="w-4 h-4" />
            All receipts on {entity.name}
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className="px-3 py-1 rounded-md text-sm font-bold uppercase tracking-wider"
              style={{ color, backgroundColor: `${color}1A`, border: `1px solid ${color}` }}
            >
              {POSITION_LABELS[stance.position]}
            </span>
            <Link
              href={`/topic/${stance.topic}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-paper-dim hover:text-accent transition-colors"
            >
              <span>{topic?.icon || '📌'}</span>
              {topicName}
            </Link>
            {dateStr && <span className="label">{dateStr}</span>}
          </div>

          <h1 className="display text-4xl md:text-5xl mt-5">
            <Link href={entityUrl} className="hover:text-accent transition-colors">
              {entity.name}
            </Link>
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-paper leading-relaxed">
            {stance.summary}
          </p>

          {stance.quote && (
            <figure className="mt-7 border-l-2 pl-5" style={{ borderColor: POSITION_VAR[stance.position] }}>
              <blockquote className="text-lg md:text-xl text-paper leading-relaxed">
                &ldquo;{stance.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-sm text-paper-mute">
                {(() => {
                  const sid = stance.quote?.speaker_person_id
                  const sp = sid ? people.find(p => p.id === sid) : null
                  return sp
                    ? <Link href={`/person/${sp.slug}`} className="hover:text-accent transition-colors">— {stance.quote!.speaker}</Link>
                    : <>— {stance.quote!.speaker}</>
                })()}
              </figcaption>
            </figure>
          )}

          {stance.outcome && (
            <div className="mt-7">
              <p className="label mb-1.5">What happened next</p>
              <p className="text-base text-paper-dim leading-relaxed">{stance.outcome}</p>
            </div>
          )}

          {(() => {
            const aid = stance.actor_person_id
            const a = aid ? people.find(p => p.id === aid) : null
            if (!a) return null
            return (
              <p className="mt-5 text-sm text-paper-dim">
                Attributed to{' '}
                <Link href={`/person/${a.slug}`} className="text-accent hover:underline">{a.name}</Link>
                {a.current_role ? `, ${a.current_role}` : ''}. They are graded separately.
              </p>
            )
          })()}

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="label">
              Source: {SOURCE_LABELS[stance.source_type as keyof typeof SOURCE_LABELS] || stance.source_type}
            </span>
            {stance.verified && (
              <span className="label" style={{ color: 'var(--supported)' }}>✓ Verified</span>
            )}
            {stance.source_url && (
              <a
                href={stance.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Read the source
              </a>
            )}
          </div>
        </div>
      </section>

      {(stance.corroboration?.length ?? 0) > 0 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
          <div className="rounded-xl border border-line bg-ink-raised p-5">
            <h2 className="label mb-1">Also reported by</h2>
            <p className="text-sm text-paper-dim mb-4">
              Independent reporting of the same event. One source is a claim; several are a record.
            </p>
            <ul className="space-y-2">
              {stance.corroboration!.map(c => (
                <li key={c.url}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    {c.publisher}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="rounded-xl border border-line bg-ink-raised p-5">
          <h2 className="label mb-1">Share this receipt</h2>
          <p className="text-sm text-paper-dim mb-4">Posts with the receipt card attached.</p>
          <ShareActions
            post={post}
            url={url}
            cardUrl={`${SITE_URL}/api/og/stance/${id}`}
            downloadName={`${entity.slug}-${stance.topic}.png`}
          />
        </div>

        {others.length > 0 && (
          <section className="mt-12">
            <div className="flex items-end justify-between gap-4 mb-5">
              <h2 className="display text-2xl">More on {entity.name}</h2>
              <Link href={entityUrl} className="text-sm text-paper-dim hover:text-accent transition-colors shrink-0">
                See all →
              </Link>
            </div>
            <div className="space-y-4">
              {others.map(s => (
                <StanceCard key={s.id} stance={s} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
