import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SearchBox } from '@/components/SearchBox'
import { StanceCard } from '@/components/StanceCard'
import { Board } from '@/components/Board'
import { getBoard, toLite, getSiteStats, getTopicLeaderboard } from '@/lib/board'
import { getRecentStances, getEntityForStance } from '@/lib/mock-data'

export default function HomePage() {
  const stats = getSiteStats()
  const board = getBoard(2).map(toLite)
  const topics = getTopicLeaderboard().slice(0, 12)
  const recent = getRecentStances(6).map(s => ({ ...s, ...getEntityForStance(s) }))

  return (
    <div>
      {/* ───────── Hero ───────── */}
      <section className="relative grain overflow-hidden border-b border-line">
        {/* Accent bloom behind the headline */}
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[46rem] h-[46rem] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.10), transparent 62%)' }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-14 md:pt-28 md:pb-20">
          <div className="flex items-center gap-2.5 mb-7">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="label !text-paper-dim">
              {stats.receipts.toLocaleString('en-US')} receipts on file · updated daily
            </span>
          </div>

          <h1 className="display display-xl max-w-4xl">
            Before they send you
            <br />
            their receipts,{' '}
            <span className="text-accent">check theirs.</span>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-paper-dim max-w-2xl leading-relaxed">
            A public record of where tech companies, VCs, and executives actually stood —
            on layoffs, DEI, Palestine, unions, surveillance, and money in politics.
            Every line links to its source.
          </p>

          <div className="mt-9 max-w-xl">
            <SearchBox />
          </div>

          {/* Stat strip */}
          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--line)] border border-line rounded-xl overflow-hidden">
            {[
              { n: stats.receipts, l: 'Receipts' },
              { n: stats.companies, l: 'Companies' },
              { n: stats.people, l: 'Executives' },
              { n: stats.vcs, l: 'VCs' },
            ].map(s => (
              <div key={s.l} className="bg-ink-raised px-5 py-4">
                <dd className="tnum text-3xl font-bold text-paper leading-none">
                  {s.n.toLocaleString('en-US')}
                </dd>
                <dt className="label mt-2">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── The Board ───────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="label">The board</p>
            <h2 className="display display-lg mt-2.5">Ranked by paper trail</h2>
            <p className="mt-3 text-paper-dim max-w-xl leading-relaxed">
              Ordered by how many documented receipts cut against them. Grade weighs
              the whole record, not the loudest headline.
            </p>
          </div>
          <Link
            href="/methodology"
            className="text-sm font-medium text-paper-dim hover:text-accent transition-colors flex items-center gap-1.5 shrink-0"
          >
            How we grade <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Board rows={board} />
      </section>

      {/* ───────── Topics ───────── */}
      <section className="border-y border-line bg-ink-raised/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <p className="label">By issue</p>
          <h2 className="display display-lg mt-2.5 mb-8">What they&rsquo;re flagged on</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {topics.map(t => (
              <Link
                key={t.id}
                href={`/topic/${t.id}`}
                className="group flex items-center gap-3 p-4 rounded-xl border border-line bg-ink-raised hover:border-accent hover:bg-ink-hi transition-colors"
              >
                <span className="text-2xl shrink-0">{t.icon}</span>
                <span className="min-w-0">
                  <span className="block font-semibold text-paper text-sm truncate group-hover:text-accent transition-colors">
                    {t.name}
                  </span>
                  <span className="label !text-[0.625rem] mt-0.5 block">
                    {t.total} receipts
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Recent ───────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="label">By date</p>
            {/*
              Ordered by when the event happened (`stance_date`), not when it was
              added here — `created_at` is null on every record, so ingestion
              recency is not computable. Don't call this "Just added".
            */}
            <h2 className="display display-lg mt-2.5">Most recent receipts</h2>
          </div>
          <Link
            href="/topics"
            className="text-sm font-medium text-paper-dim hover:text-accent transition-colors flex items-center gap-1.5 shrink-0"
          >
            All topics <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {recent.map(stance => (
            <StanceCard
              key={stance.id}
              stance={stance}
              showEntity
              entityName={stance.name}
              entitySlug={stance.slug}
            />
          ))}
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="relative grain overflow-hidden rounded-2xl border border-line bg-ink-raised px-6 py-14 md:px-14 md:py-16 text-center">
          <div
            aria-hidden
            className="absolute inset-x-0 -bottom-32 h-64 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,107,53,0.12), transparent 70%)' }}
          />
          <div className="relative">
            <h2 className="display display-lg max-w-2xl mx-auto">
              Know something that isn&rsquo;t here?
            </h2>
            <p className="mt-4 text-paper-dim max-w-lg mx-auto leading-relaxed">
              Every receipt needs a public source. Send the link and we&rsquo;ll verify it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contribute"
                className="px-6 py-3 rounded-lg bg-accent text-ink font-semibold hover:bg-[var(--accent-hi)] transition-colors"
              >
                Submit a receipt
              </Link>
              <Link
                href="/methodology"
                className="px-6 py-3 rounded-lg border border-line text-paper font-semibold hover:border-[var(--line-str)] hover:bg-white/5 transition-colors"
              >
                Read the methodology
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
