/**
 * Build-time data integrity checks.
 *
 * These exist because two silent data defects shipped to production and stayed
 * there: 26 stances shared duplicate ids (making them unreachable at
 * /stance/[id] and in the OG card route), and 6 companies shared slugs (making
 * the richer of each pair unreachable entirely). Nothing surfaced either one —
 * `.find()` just quietly returned the first match.
 *
 * Run from `npm run check:data`, and as part of `prebuild` so a bad merge
 * fails the build instead of reaching the site.
 */
import { companies, people, vcs, stances } from './mock-data'

export interface IntegrityIssue {
  severity: 'error' | 'warn'
  check: string
  detail: string
}

function duplicates<T>(items: T[], key: (item: T) => string): Map<string, number> {
  const seen = new Map<string, number>()
  for (const item of items) {
    const k = key(item)
    seen.set(k, (seen.get(k) || 0) + 1)
  }
  return new Map([...seen].filter(([, n]) => n > 1))
}

export function checkDataIntegrity(): IntegrityIssue[] {
  const issues: IntegrityIssue[] = []

  // ── Unique stance ids ──────────────────────────────────────────────
  // `getStanceById` uses .find(), so a duplicate id hides a record from
  // /stance/[id], /api/og/stance/[id] and the sitemap.
  const dupStances = duplicates(stances, s => s.id)
  if (dupStances.size > 0) {
    issues.push({
      severity: 'error',
      check: 'stance-id-unique',
      detail: `${dupStances.size} duplicated stance id(s), hiding ${
        [...dupStances.values()].reduce((n, v) => n + v - 1, 0)
      } record(s): ${[...dupStances.keys()].slice(0, 12).join(', ')}`,
    })
  }

  // ── Unique slugs per entity type ───────────────────────────────────
  // Same failure mode via getCompanyBySlug / getPersonBySlug / getVCBySlug.
  const bySlug: [string, { slug: string }[]][] = [
    ['company', companies],
    ['person', people],
    ['vc', vcs],
  ]
  for (const [label, list] of bySlug) {
    const dup = duplicates(list, e => e.slug)
    if (dup.size > 0) {
      issues.push({
        severity: 'error',
        check: `${label}-slug-unique`,
        detail: `${dup.size} duplicated ${label} slug(s): ${[...dup.keys()].join(', ')}`,
      })
    }
  }

  // ── Every stance resolves to a real entity ─────────────────────────
  const ids = {
    company: new Set(companies.map(c => c.id)),
    person: new Set(people.map(p => p.id)),
    vc: new Set(vcs.map(v => v.id)),
  }
  const orphans = stances.filter(s => !ids[s.entity_type]?.has(s.entity_id))
  if (orphans.length > 0) {
    issues.push({
      severity: 'error',
      check: 'stance-entity-resolves',
      detail: `${orphans.length} stance(s) point at a missing entity: ${orphans
        .slice(0, 8)
        .map(s => `${s.id}→${s.entity_type}:${s.entity_id}`)
        .join(', ')}`,
    })
  }

  // ── The epstein auto-F predicate ───────────────────────────────────
  // `calculateGrade` must only auto-F on `opposed`. The topic is also used to
  // record the ABSENCE of a connection (filed as `mixed`), and grading those
  // as "Epstein Connection" publishes a false claim about a named person.
  const nonOpposedEpstein = stances.filter(
    s => s.topic === 'epstein' && s.position !== 'opposed'
  )
  if (nonOpposedEpstein.length > 0) {
    issues.push({
      severity: 'warn',
      check: 'epstein-clearing-records',
      detail:
        `${nonOpposedEpstein.length} epstein-topic stance(s) are not 'opposed' ` +
        `(ids ${nonOpposedEpstein.map(s => s.id).join(', ')}). These must never ` +
        `trigger the auto-F — verify grade.ts keys on position === 'opposed'.`,
    })
  }

  return issues
}

/** Print a report. Returns true when there are no `error`-severity issues. */
export function reportDataIntegrity(): boolean {
  const issues = checkDataIntegrity()
  const errors = issues.filter(i => i.severity === 'error')

  if (issues.length === 0) {
    console.log(
      `data-integrity: OK — ${stances.length} stances, ` +
        `${companies.length} companies, ${people.length} people, ${vcs.length} VCs`
    )
    return true
  }

  for (const i of issues) {
    console[i.severity === 'error' ? 'error' : 'warn'](
      `data-integrity ${i.severity.toUpperCase()} [${i.check}] ${i.detail}`
    )
  }
  return errors.length === 0
}
