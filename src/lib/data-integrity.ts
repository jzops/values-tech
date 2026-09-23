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
  const bySlug: [string, { slug: string; name: string }[]][] = [
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

  // ── Duplicate entity NAMES ─────────────────────────────────────────
  // Slug-uniqueness does not catch this: "Anthropic" existed twice as
  // /anthropic (14 receipts) and /anthropic-2 (0), the second rendering as a
  // permanently empty page for a company that is in fact well documented.
  for (const [label, list] of bySlug) {
    const dupNames = duplicates(list as { name: string }[], e => e.name)
    if (dupNames.size > 0) {
      issues.push({
        severity: 'error',
        check: `${label}-name-unique`,
        detail:
          `${dupNames.size} duplicated ${label} name(s) under different slugs — ` +
          `one of each pair will render as an empty page: ${[...dupNames.keys()].join(', ')}`,
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

  // ── Misattribution ─────────────────────────────────────────────────
  // 13 records were deleted for naming an entity unrelated to the one they
  // were filed against ("Accel endorsed Trump…" actually described a16z).
  // A firm's record legitimately describes its own founder, so only flag a
  // summary that OPENS with a different tracked entity that has no link to it.
  // Restricted to ORG-on-ORG, which is where the real errors were. A firm's
  // record naming a partner ("Peter Thiel's firm", "Marc Andreessen endorsed…")
  // is legitimate and would otherwise swamp this with ~140 false positives;
  // one firm's record opening with a DIFFERENT firm's name essentially never is.
  const orgNames = [...companies.map(c => c.name), ...vcs.map(v => v.name)]
    .filter(n => n.length >= 5)
    .sort((a, b) => b.length - a.length)

  const ownName = (s: (typeof stances)[number]): string => {
    const src = s.entity_type === 'company' ? companies : s.entity_type === 'person' ? people : vcs
    return (src as { id: string; name: string }[]).find(e => e.id === s.entity_id)?.name || ''
  }

  // Word-boundary match, or "Square" matches "Squarespace" and "Remote"
  // matches "Remote-first" — both produced false positives.
  const escapeRe = (v: string) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const opensWith = (text: string, name: string) =>
    new RegExp(`^${escapeRe(name)}(?![A-Za-z0-9-])`).test(text)

  // A record describing a RELATIONSHIP usually concerns the filed entity, not
  // the company it opens with ("Anduril partnership announced" is OpenAI's pivot).
  const relational = /partner|partnership|acquired|acquisition|merger|alongside|competitor|rival|versus|\bvs\b/i

  const misattributed = stances.filter(s => {
    if (s.entity_type === 'person') return false // person records routinely name their employer
    const own = ownName(s)
    if (!own) return false
    const other = orgNames.find(n => opensWith(s.summary.slice(0, 60), n))
    if (!other || other === own) return false
    // Related if either name contains the other (Alphabet / Google, a16z funds).
    if (own.includes(other) || other.includes(own)) return false
    if (s.summary.includes(own) || relational.test(s.summary)) return false
    return true
  })
  if (misattributed.length > 0) {
    issues.push({
      severity: 'warn',
      check: 'possible-misattribution',
      detail:
        `${misattributed.length} receipt(s) open by naming a different tracked entity — ` +
        `verify before publishing: ` +
        misattributed.slice(0, 10).map(s => `${s.id}(${ownName(s)})`).join(', '),
    })
  }

  // ── Polarity ───────────────────────────────────────────────────────
  // `government_contracts` defines itself as controversial work, so holding it
  // is the mark AGAINST. A `supported` record here is either a company that
  // DECLINED the work or a sign error — the latter scored Palantir's ICE
  // contracts at +100 before it was caught.
  const govSupported = stances.filter(
    s => s.topic === 'government_contracts' && s.position === 'supported'
  )
  if (govSupported.length > 0) {
    issues.push({
      severity: 'warn',
      check: 'gov-contracts-polarity',
      detail:
        `${govSupported.length} government_contracts receipt(s) marked 'supported' ` +
        `(ids ${govSupported.map(s => s.id).join(', ')}). Only correct when the entity ` +
        `DECLINED the work — otherwise holding these contracts is the mark against.`,
    })
  }

  // ── Near-duplicates ────────────────────────────────────────────────
  // Same entity, same topic, same position is usually one story filed twice.
  // Grading rolls up by topic so this no longer skews scores, but it still
  // double-renders on the profile.
  const seen = new Map<string, number>()
  for (const s of stances) {
    const k = `${s.entity_type}:${s.entity_id}:${s.topic}:${s.position}`
    seen.set(k, (seen.get(k) || 0) + 1)
  }
  const dupPairs = [...seen.values()].filter(n => n > 1).reduce((a, n) => a + n - 1, 0)
  if (dupPairs > 0) {
    issues.push({
      severity: 'warn',
      check: 'near-duplicate-receipts',
      detail: `${dupPairs} receipt(s) repeat an existing entity+topic+position combination.`,
    })
  }

  // ── Source quality ─────────────────────────────────────────────────
  // The share card footer claims "Every line links to a public source". A URL
  // with no path points at a homepage, not at the evidence.
  const bareSources = stances.filter(s => {
    if (!s.source_url) return true
    try {
      const u = new URL(s.source_url)
      return (u.pathname === '' || u.pathname === '/') && !u.search
    } catch {
      return true
    }
  })
  if (bareSources.length > stances.length * 0.25) {
    issues.push({
      severity: 'warn',
      check: 'shallow-sources',
      detail:
        `${bareSources.length} of ${stances.length} receipts ` +
        `(${Math.round((bareSources.length / stances.length) * 100)}%) link to a homepage ` +
        `rather than the evidence. New receipts should deep-link.`,
    })
  }

  // ── Dates ──────────────────────────────────────────────────────────
  const today = new Date().toISOString().slice(0, 10)
  const future = stances.filter(s => s.stance_date && s.stance_date > today)
  if (future.length > 0) {
    issues.push({
      severity: 'error',
      check: 'future-dated',
      detail: `${future.length} receipt(s) dated in the future: ${future
        .slice(0, 8)
        .map(s => `${s.id}@${s.stance_date}`)
        .join(', ')}`,
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
