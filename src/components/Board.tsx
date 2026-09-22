'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { BoardRowLite } from '@/lib/board'
import type { EntityType } from '@/lib/types'

const FILTERS: { key: 'all' | EntityType; label: string }[] = [
  { key: 'all', label: 'Everyone' },
  { key: 'company', label: 'Companies' },
  { key: 'person', label: 'Executives' },
  { key: 'vc', label: 'VCs' },
]

const TYPE_LABEL: Record<EntityType, string> = {
  company: 'Company',
  person: 'Exec',
  vc: 'VC',
}

export function Board({
  rows,
  pageSize = 15,
  showFilters = true,
  maxRows = 60,
}: {
  rows: BoardRowLite[]
  pageSize?: number
  /** Off on pages already scoped to a single entity type. */
  showFilters?: boolean
  maxRows?: number
}) {
  const [filter, setFilter] = useState<'all' | EntityType>('all')
  const [expanded, setExpanded] = useState(false)

  const filtered = useMemo(
    () => (filter === 'all' ? rows : rows.filter(r => r.entityType === filter)),
    [rows, filter]
  )
  const visible = expanded ? filtered.slice(0, maxRows) : filtered.slice(0, pageSize)

  return (
    <div>
      {/* Filter tabs */}
      {showFilters && (
      <div className="flex flex-wrap items-center gap-1.5 mb-5">
        {FILTERS.map(f => {
          const active = filter === f.key
          const count = f.key === 'all' ? rows.length : rows.filter(r => r.entityType === f.key).length
          return (
            <button
              key={f.key}
              onClick={() => { setFilter(f.key); setExpanded(false) }}
              aria-pressed={active}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                active
                  ? 'bg-accent text-ink border-accent'
                  : 'text-paper-dim border-line hover:text-paper hover:border-[var(--line-str)]'
              }`}
            >
              {f.label}
              <span className={`ml-2 tnum text-xs ${active ? 'text-ink/60' : 'text-paper-mute'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>
      )}

      {/* Column headers — desktop only */}
      <div className="hidden md:grid grid-cols-[3rem_1fr_9rem_7rem_4rem] gap-4 px-4 pb-2.5 label border-b border-line">
        <span>Rank</span>
        <span>Name</span>
        <span>Most flagged</span>
        <span className="text-right">Receipts</span>
        <span className="text-right">Grade</span>
      </div>

      <ol className="divide-y divide-[var(--line)]">
        {visible.map((row, i) => (
          <li
            key={`${row.entityType}-${row.id}`}
            className="row-in"
            style={{ animationDelay: `${Math.min(i, 12) * 22}ms` }}
          >
            <Link
              href={`/${row.entityType}/${row.slug}`}
              className="group grid grid-cols-[2.25rem_1fr_auto] md:grid-cols-[3rem_1fr_9rem_7rem_4rem] gap-3 md:gap-4 items-center px-2 md:px-4 py-3.5 hover:bg-white/[0.035] transition-colors"
            >
              {/* Rank */}
              <span className="tnum text-sm text-paper-mute group-hover:text-accent transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Name + type */}
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-paper truncate group-hover:text-accent transition-colors">
                    {row.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-paper-mute opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </span>
                <span className="flex items-center gap-2 mt-0.5">
                  <span className="label !text-[0.625rem]">{TYPE_LABEL[row.entityType]}</span>
                  {row.subtitle && (
                    <span className="text-xs text-paper-mute truncate hidden sm:inline">
                      {row.subtitle}
                    </span>
                  )}
                </span>
                {/* Mobile-only flag line */}
                {row.topFlag && (
                  <span className="md:hidden flex items-center gap-1.5 mt-1.5 text-xs text-paper-dim">
                    <span>{row.topFlag.icon}</span>
                    <span>{row.topFlag.name}</span>
                    <span className="tnum text-[var(--opposed)]">×{row.topFlag.count}</span>
                  </span>
                )}
              </span>

              {/* Most flagged topic */}
              <span className="hidden md:flex items-center gap-1.5 min-w-0">
                {row.topFlag ? (
                  <>
                    <span className="shrink-0">{row.topFlag.icon}</span>
                    <span className="text-sm text-paper-dim truncate">{row.topFlag.name}</span>
                    <span className="tnum text-xs text-[var(--opposed)] shrink-0">
                      ×{row.topFlag.count}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-paper-mute">—</span>
                )}
              </span>

              {/* Receipt count + verdict bar */}
              <span className="hidden md:block text-right">
                <span className="tnum text-lg font-semibold text-paper leading-none">
                  {row.receipts}
                </span>
                <span className="block mt-1.5 w-full">
                  <MiniBar counts={row.counts} />
                </span>
              </span>

              {/* Grade */}
              <span className="flex justify-end">
                <span
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg border-2 flex items-center justify-center text-lg md:text-xl font-black shrink-0"
                  style={{
                    color: row.grade.color,
                    borderColor: row.grade.color,
                    backgroundColor: `${row.grade.color}14`,
                    letterSpacing: '-0.04em',
                  }}
                  title={row.grade.rated
                    ? `${row.grade.label} — ${row.grade.score}/100`
                    : row.grade.label}
                >
                  {row.grade.grade}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {filtered.length > visible.length && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-5 w-full py-3 rounded-lg border border-line text-sm font-medium text-paper-dim hover:text-paper hover:border-[var(--line-str)] transition-colors"
        >
          Show more ({filtered.length - visible.length} remaining)
        </button>
      )}
    </div>
  )
}

function MiniBar({ counts }: { counts: BoardRowLite['counts'] }) {
  const total = counts.opposed + counts.mixed + counts.silent + counts.supported
  if (total === 0) return null

  const segments = [
    { key: 'o', color: 'var(--opposed)', n: counts.opposed },
    { key: 'm', color: 'var(--mixed)', n: counts.mixed },
    { key: 'si', color: 'var(--silent)', n: counts.silent },
    { key: 'su', color: 'var(--supported)', n: counts.supported },
  ].filter(s => s.n > 0)

  return (
    <span className="flex gap-px h-1 rounded-full overflow-hidden bg-white/5 ml-auto w-16">
      {segments.map(s => (
        <span key={s.key} style={{ width: `${(s.n / total) * 100}%`, backgroundColor: s.color }} />
      ))}
    </span>
  )
}
