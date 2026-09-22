import { companies, people, vcs, stances } from './mock-data'
import { calculateGrade, type GradeResult } from './grade'
import { TOPICS } from './constants'
import type { Company, Person, VC, Stance, EntityType } from './types'

export interface VerdictCounts {
  opposed: number
  mixed: number
  silent: number
  supported: number
}

export interface BoardRow {
  id: string
  name: string
  slug: string
  entityType: EntityType
  subtitle: string | null
  logo: string | null
  stances: Stance[]
  receipts: number
  opposed: number
  supported: number
  counts: VerdictCounts
  grade: GradeResult
  /** Topic with the most `opposed` receipts — the headline flag. */
  topFlag: { id: string; name: string; icon: string; count: number } | null
}

function subtitleFor(entity: Company | Person | VC, type: EntityType): string | null {
  if (type === 'person') return (entity as Person).current_role
  if (type === 'vc') return (entity as VC).aum
  return (entity as Company).industry
}

function logoFor(entity: Company | Person | VC, type: EntityType): string | null {
  if (type === 'person') return (entity as Person).photo_url
  return (entity as Company | VC).logo_url
}

/** The topic this entity has been dinged on most often. */
function topFlagFor(entityStances: Stance[]): BoardRow['topFlag'] {
  const counts = new Map<string, number>()
  for (const s of entityStances) {
    if (s.position !== 'opposed') continue
    counts.set(s.topic, (counts.get(s.topic) || 0) + 1)
  }
  if (counts.size === 0) return null

  const [topicId, count] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]
  const topic = TOPICS[topicId as keyof typeof TOPICS]
  return {
    id: topicId,
    name: topic?.name || topicId,
    icon: topic?.icon || '📌',
    count,
  }
}

function toRow(entity: Company | Person | VC, entityType: EntityType): BoardRow {
  const entityStances = stances.filter(
    s => s.entity_type === entityType && s.entity_id === entity.id
  )
  const counts: VerdictCounts = {
    opposed: entityStances.filter(s => s.position === 'opposed').length,
    mixed: entityStances.filter(s => s.position === 'mixed').length,
    silent: entityStances.filter(s => s.position === 'silent').length,
    supported: entityStances.filter(s => s.position === 'supported').length,
  }

  return {
    id: entity.id,
    name: entity.name,
    slug: entity.slug,
    entityType,
    subtitle: subtitleFor(entity, entityType),
    logo: logoFor(entity, entityType),
    stances: entityStances,
    receipts: entityStances.length,
    opposed: counts.opposed,
    supported: counts.supported,
    counts,
    grade: calculateGrade(entityStances),
    topFlag: topFlagFor(entityStances),
  }
}

/**
 * Every tracked entity as a board row.
 *
 * Ranking is deliberately *not* raw grade: a single opposed receipt would
 * otherwise outrank a documented pattern. We sort by opposed-count first so
 * the board leads with the entities that have the deepest paper trail, then
 * break ties on the grade score.
 */
export function getBoard(
  opts: number | { minReceipts?: number; ratedOnly?: boolean } = 1
): BoardRow[] {
  const { minReceipts = 1, ratedOnly = false } =
    typeof opts === 'number' ? { minReceipts: opts, ratedOnly: false } : opts

  const rows: BoardRow[] = [
    ...companies.map(c => toRow(c, 'company')),
    ...people.map(p => toRow(p, 'person')),
    ...vcs.map(v => toRow(v, 'vc')),
  ]

  return rows
    .filter(r => r.receipts >= minReceipts && (!ratedOnly || r.grade.rated))
    // `sortScore` rather than `score`: score is null for every unrated entity,
    // and a comparator that returns NaN makes Array.sort emit an arbitrary
    // order. sortScore falls back to a neutral 50.
    .sort((a, b) =>
      b.opposed - a.opposed ||
      a.grade.sortScore - b.grade.sortScore ||
      b.receipts - a.receipts ||
      a.name.localeCompare(b.name)
    )
}

export function getBoardRow(entityType: EntityType, slug: string): BoardRow | null {
  const source =
    entityType === 'company' ? companies :
    entityType === 'person' ? people : vcs
  const entity = source.find(e => e.slug === slug)
  return entity ? toRow(entity, entityType) : null
}

/** Where this entity sits on the full board, 1-indexed. Null if unranked. */
export function getBoardRank(entityType: EntityType, id: string): number | null {
  const idx = getBoard().findIndex(r => r.entityType === entityType && r.id === id)
  return idx === -1 ? null : idx + 1
}

/** Topics ordered by how many opposed receipts they carry site-wide. */
export function getTopicLeaderboard() {
  const counts = new Map<string, { total: number; opposed: number }>()
  for (const s of stances) {
    const cur = counts.get(s.topic) || { total: 0, opposed: 0 }
    cur.total += 1
    if (s.position === 'opposed') cur.opposed += 1
    counts.set(s.topic, cur)
  }

  return [...counts.entries()]
    .map(([id, c]) => ({
      id,
      name: TOPICS[id as keyof typeof TOPICS]?.name || id,
      icon: TOPICS[id as keyof typeof TOPICS]?.icon || '📌',
      ...c,
    }))
    .sort((a, b) => b.total - a.total)
}

export function getSiteStats() {
  return {
    companies: companies.length,
    people: people.length,
    vcs: vcs.length,
    receipts: stances.length,
    entities: companies.length + people.length + vcs.length,
    opposed: stances.filter(s => s.position === 'opposed').length,
    sources: new Set(stances.map(s => s.source_url).filter(Boolean)).size,
  }
}

/**
 * Board rows minus the full stance objects. The board table only needs
 * aggregates, and shipping ~1,400 stance objects to the client for a
 * table that renders counts would dominate the bundle.
 */
export type BoardRowLite = Omit<BoardRow, 'stances'>

export function toLite({ stances, ...rest }: BoardRow): BoardRowLite {
  void stances
  return rest
}
