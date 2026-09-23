import Link from 'next/link'
import { Globe, ArrowUpRight } from 'lucide-react'
import { StanceCard } from './StanceCard'
import { StatCard } from './StatCard'
import { StatsSummary } from './StatsSummary'
import { DonationsTable } from './DonationsTable'
import { ShareButtons } from './ShareButtons'
import { LogoImage } from './LogoImage'
import { TOPICS, STANCE_TOPICS } from '@/lib/constants'
import type { BoardRow, PortfolioEntry } from '@/lib/board'
import type { Stat, Donation, Person } from '@/lib/types'

const TYPE_LABEL = {
  company: 'Company',
  person: 'Executive',
  vc: 'Venture Fund',
} as const

export interface EntityProfileProps {
  row: BoardRow
  rank: number | null
  description: string | null
  website: string | null
  /** Small labelled facts shown under the name (founded, AUM, headcount…). */
  facts: { label: string; value: string }[]
  stats: Stat[]
  donations: Donation[]
  relatedPeople?: Person[]
  relatedLabel?: string
  /** VC pages only: companies this fund has backed. */
  portfolio?: PortfolioEntry[]
  /** Company pages only: funds that backed this company. */
  backers?: { vc: { id: string; name: string; slug: string }; round: string | null }[]
}

export function EntityProfile({
  row,
  rank,
  description,
  website,
  facts,
  stats,
  donations,
  relatedPeople = [],
  relatedLabel = 'Key people',
  portfolio = [],
  backers = [],
}: EntityProfileProps) {
  const { grade, counts, entityType } = row

  // Moral-stance topics only; the neutral stat topics render in their own block.
  const stances = row.stances.filter(s =>
    STANCE_TOPICS.includes(s.topic as (typeof STANCE_TOPICS)[number])
  )

  const flags = Object.entries(
    row.stances.reduce<Record<string, number>>((acc, s) => {
      if (s.position === 'opposed') acc[s.topic] = (acc[s.topic] || 0) + 1
      return acc
    }, {})
  ).sort((a, b) => b[1] - a[1])

  const total = row.receipts || 1
  const bar = [
    { k: 'opposed', c: 'var(--opposed)', n: counts.opposed },
    { k: 'mixed', c: 'var(--mixed)', n: counts.mixed },
    { k: 'silent', c: 'var(--silent)', n: counts.silent },
    { k: 'supported', c: 'var(--supported)', n: counts.supported },
  ].filter(s => s.n > 0)

  return (
    <div>
      {/* ───────── Scorecard hero (mirrors the share card) ───────── */}
      <section className="relative grain overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="absolute -top-56 -left-32 w-[42rem] h-[42rem] rounded-full blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${grade.color}1F, transparent 62%)` }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          {rank !== null && (
            <p className="label mb-5">#{rank} on the board</p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Grade */}
            <div
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 flex items-center justify-center shrink-0"
              style={{
                color: grade.color,
                borderColor: grade.color,
                backgroundColor: `${grade.color}14`,
              }}
            >
              <span
                className="text-6xl md:text-7xl font-black leading-none"
                style={{ letterSpacing: '-0.05em' }}
              >
                {grade.grade}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                {row.logo && (
                  <LogoImage
                    src={row.logo}
                    alt=""
                    type={entityType}
                    className="w-9 h-9 rounded-lg overflow-hidden border border-line shrink-0"
                  />
                )}
                <h1 className="display text-4xl md:text-6xl min-w-0 break-words">{row.name}</h1>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="label !text-ink bg-paper-dim px-2 py-0.5 rounded">
                  {TYPE_LABEL[entityType]}
                </span>
                <span className="text-lg font-medium" style={{ color: grade.color }}>
                  {grade.label}
                </span>
                {grade.rated && <span className="label">{grade.score}/100</span>}
                {grade.rated && (
                  <span className="label">
                    {grade.confidence} confidence · {grade.evidence.scoredTopics} issues
                  </span>
                )}
                {grade.flags.includes('epstein') && (
                  <span
                    className="label !text-ink px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'var(--opposed)' }}
                  >
                    Named in Epstein files
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Verdict bar */}
          {row.receipts > 0 && (
            <div className="mt-8">
              <div className="flex gap-px h-2.5 rounded-full overflow-hidden bg-white/5">
                {bar.map(s => (
                  <div
                    key={s.k}
                    style={{ width: `${(s.n / total) * 100}%`, backgroundColor: s.c }}
                    title={`${s.n} ${s.k}`}
                  />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                {bar.map(s => (
                  <span key={s.k} className="flex items-center gap-1.5 text-xs text-paper-dim">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.c }} />
                    <span className="tnum">{s.n}</span> {s.k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Numbers + flags */}
          <div className="mt-8 grid gap-6 sm:grid-cols-[repeat(2,minmax(0,7rem))_1fr] sm:items-start">
            <Metric value={row.receipts} label="Receipts" />
            <Metric value={counts.opposed} label="Against" color="var(--opposed)" />

            {flags.length > 0 && (
              <div className="min-w-0">
                <p className="label">Flagged on</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {flags.slice(0, 6).map(([id, count]) => {
                    const t = TOPICS[id as keyof typeof TOPICS]
                    return (
                      <Link
                        key={id}
                        href={`/topic/${id}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line bg-ink-raised text-sm font-medium hover:border-accent transition-colors"
                      >
                        <span>{t?.icon || '📌'}</span>
                        <span>{t?.name || id}</span>
                        <span className="tnum text-xs" style={{ color: 'var(--opposed)' }}>
                          ×{count}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Facts + link */}
          {(facts.length > 0 || website || description) && (
            <div className="mt-8 pt-7 border-t border-line">
              {description && (
                <p className="text-paper-dim max-w-3xl leading-relaxed">{description}</p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                {facts.map(f => (
                  <span key={f.label} className="text-sm text-paper-dim">
                    <span className="label !text-[0.625rem] mr-1.5">{f.label}</span>
                    {f.value}
                  </span>
                ))}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    {website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ───────── Body ───────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <StatsSummary stats={stats} donations={donations} />

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 min-w-0">
            <h2 className="display text-2xl mb-5">
              The receipts <span className="text-paper-mute tnum font-normal">({stances.length})</span>
            </h2>

            {stances.length > 0 ? (
              <div className="space-y-4">
                {stances.map(s => (
                  <StanceCard key={s.id} stance={s} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-line bg-ink-raised p-10 text-center">
                <p className="text-paper-dim">No documented receipts yet.</p>
                <Link href="/contribute" className="mt-2 inline-block text-sm text-accent hover:underline">
                  Know of one? Submit it →
                </Link>
              </div>
            )}

            {stats.length > 0 && (
              <>
                <h2 className="display text-2xl mt-12 mb-5">
                  The numbers <span className="text-paper-mute tnum font-normal">({stats.length})</span>
                </h2>
                <div className="space-y-4">
                  {stats.map(stat => (
                    <StatCard key={stat.id} stat={stat} />
                  ))}
                </div>
              </>
            )}

            <DonationsTable donations={donations} />

            {portfolio.length > 0 && (
              <section className="mt-12">
                <h2 className="display text-2xl mb-2">
                  What they funded{' '}
                  <span className="text-paper-mute tnum font-normal">({portfolio.length})</span>
                </h2>
                <p className="text-sm text-paper-dim mb-5 max-w-2xl leading-relaxed">
                  Documented funding relationships. A cheque is a fact, not a verdict — these
                  do not affect the grade above.
                </p>
                <div className="rounded-xl border border-line overflow-hidden">
                  {portfolio.map((p, i) => (
                    <Link
                      key={p.company.id}
                      href={`/company/${p.company.slug}`}
                      className={`group flex items-center gap-4 px-4 py-3 hover:bg-white/[0.035] transition-colors ${i > 0 ? 'border-t border-line' : ''}`}
                    >
                      <span
                        className="w-8 h-8 rounded-md border-2 flex items-center justify-center text-sm font-black shrink-0"
                        style={{ color: p.grade.color, borderColor: p.grade.color, backgroundColor: `${p.grade.color}14` }}
                      >
                        {p.grade.grade}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-paper truncate group-hover:text-accent transition-colors">
                          {p.company.name}
                        </span>
                        <span className="label !text-[0.625rem]">
                          {p.round}{p.date ? ` · from ${p.date}` : ''} · {p.receipts} receipts
                        </span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-paper-mute opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="rounded-xl border border-line bg-ink-raised p-5 lg:sticky lg:top-24">
              <h3 className="label mb-1">Share</h3>
              <p className="text-sm text-paper-dim mb-4 leading-relaxed">
                Posts with the scorecard card attached.
              </p>
              <ShareButtons
                entityType={entityType}
                entitySlug={row.slug}
                entityName={row.name}
                grade={grade}
                stances={row.stances}
                opposed={counts.opposed}
              />
            </div>

            {backers.length > 0 && (
              <div className="rounded-xl border border-line bg-ink-raised p-5">
                <h3 className="label mb-1">Backed by</h3>
                <p className="text-xs text-paper-mute mb-4">Documented investors.</p>
                <div className="flex flex-wrap gap-2">
                  {backers.map(b => (
                    <Link
                      key={b.vc.id}
                      href={`/vc/${b.vc.slug}`}
                      className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-line text-xs font-medium text-paper-dim hover:text-paper hover:border-accent transition-colors"
                    >
                      {b.vc.name}
                      {b.round && <span className="label !text-[0.5625rem]">{b.round}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedPeople.length > 0 && (
              <div className="rounded-xl border border-line bg-ink-raised p-5">
                <h3 className="label mb-4">{relatedLabel}</h3>
                <div className="space-y-1">
                  {relatedPeople.map(p => (
                    <Link
                      key={p.id}
                      href={`/person/${p.slug}`}
                      className="group flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <LogoImage
                        src={p.photo_url}
                        alt=""
                        type="person"
                        className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-line"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-paper truncate group-hover:text-accent transition-colors">
                          {p.name}
                        </span>
                        {p.current_role && (
                          <span className="block text-xs text-paper-mute truncate">{p.current_role}</span>
                        )}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-paper-mute opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

function Metric({ value, label, color }: { value: number; label: string; color?: string }) {
  return (
    <div>
      <p className="label">{label}</p>
      <p
        className="tnum text-4xl md:text-5xl font-bold mt-1.5 leading-none"
        style={color ? { color } : undefined}
      >
        {value}
      </p>
    </div>
  )
}
