#!/usr/bin/env node
/**
 * Research worklist generator.
 *
 * The bottleneck on this site is not entity count — it is receipts per entity.
 * 325 entities have zero receipts and 221 have too few to grade, so adding more
 * companies without receipts makes the site emptier, not fuller.
 *
 * This ranks what to research next by how much it moves the number of GRADEABLE
 * entities. An entity one receipt short of the threshold is worth far more than
 * a brand-new company with none.
 *
 *   node scripts/worklist.mjs              # top 40, human readable
 *   node scripts/worklist.mjs --json       # machine readable, for the populator
 *   node scripts/worklist.mjs --limit 100
 *   node scripts/worklist.mjs --type vc
 */
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url, { interopDefault: true })
const { companies, people, vcs, stances } = await jiti.import('../src/lib/mock-data.ts')
const { calculateGrade } = await jiti.import('../src/lib/grade.ts')
const { TOPICS } = await jiti.import('../src/lib/constants.ts')

const argv = process.argv.slice(2)
const asJson = argv.includes('--json')
const limit = Number(argv[argv.indexOf('--limit') + 1]) || (asJson ? 200 : 40)
const onlyType = argv.includes('--type') ? argv[argv.indexOf('--type') + 1] : null

// Thresholds mirror src/lib/grade.ts — keep in sync.
const MIN_RECEIPTS = 3
const MIN_TOPICS = 2

const byEntity = new Map()
for (const s of stances) {
  const k = `${s.entity_type}:${s.entity_id}`
  if (!byEntity.has(k)) byEntity.set(k, [])
  byEntity.get(k).push(s)
}

/**
 * How much public record probably exists, and how much a reader cares.
 *
 * Ranking purely by "closest to gradeable" surfaced obscure VCs that nobody is
 * deciding about and that have almost nothing documented — low yield per hour
 * of research, and low value even when it lands. A private company someone is
 * weighing an offer from is worth far more than another megacap everyone has
 * already made their mind up about.
 */
function prominence(type, e) {
  if (type === 'vc') {
    const m = String(e.aum || '').match(/([\d.]+)\s*B/i)
    return m ? Math.min(Number(m[1]), 60) : 1
  }
  if (type === 'person') return e.twitter_handle ? 40 : 8
  const raised = Number(e.total_raised || 0) / 1e9
  const head = (Number(String(e.headcount_range || '').replace(/[^\d]/g, '')) || 0) / 1000
  const base = raised * 12 + head * 2

  // A still-private company is a live decision — join it, take its money, use
  // it. A listed megacap is largely a settled question for most readers.
  const stage = String(e.funding_stage || '')
  const isPrivate = stage && !/public|ipo|acquired/i.test(stage)
  return isPrivate ? base * 2.5 + 15 : base * 0.4
}

/** Topics that carry the most receipts for this entity type, minus what it has. */
function suggestTopics(type, have) {
  const counts = new Map()
  for (const s of stances) {
    if (s.entity_type !== type) continue
    counts.set(s.topic, (counts.get(s.topic) || 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t)
    .filter(t => !have.has(t))
    .slice(0, 4)
}

const rows = []
for (const [type, list] of [['company', companies], ['person', people], ['vc', vcs]]) {
  if (onlyType && onlyType !== type) continue
  for (const e of list) {
    const st = byEntity.get(`${type}:${e.id}`) || []
    const grade = calculateGrade(st)
    if (grade.rated) continue // already gradeable — lower priority than the near-misses

    const have = new Set(st.map(s => s.topic))
    // How many NEW receipts are needed, assuming each lands on a fresh topic.
    const needReceipts = Math.max(0, MIN_RECEIPTS - st.length)
    const needTopics = Math.max(0, MIN_TOPICS - have.size)
    const gap = Math.max(needReceipts, needTopics)

    rows.push({
      type,
      id: e.id,
      name: e.name,
      slug: e.slug,
      receipts: st.length,
      topics: [...have],
      gap,
      suggest: suggestTopics(type, have),
      prominence: Math.round(prominence(type, e) * 10) / 10,
    })
  }
}

// Value = how likely research is to land x how much anyone cares, discounted
// by how much work it needs. Gap still matters — it is just no longer the only
// thing, which is what pushed obscure two-receipt VCs to the top.
for (const r of rows) r.value = Math.round((r.prominence / (r.gap + 0.5)) * 10) / 10
rows.sort((a, b) => b.value - a.value || a.gap - b.gap || a.name.localeCompare(b.name))

const picked = rows.slice(0, limit)

if (asJson) {
  console.log(JSON.stringify({ generated: new Date().toISOString(), worklist: picked }, null, 2))
} else {
  const rated = [...byEntity.keys()].filter(k => {
    const [t, id] = k.split(':')
    return calculateGrade(byEntity.get(`${t}:${id}`)).rated
  }).length
  const oneAway = rows.filter(r => r.gap === 1).length

  console.log(`\n  RESEARCH WORKLIST — ${new Date().toISOString().slice(0, 10)}`)
  console.log(`  ${rated} entities gradeable today.`)
  console.log(`  ${oneAway} are ONE receipt away → researching those takes it to ${rated + oneAway}.\n`)
  console.log(`  ${'ENTITY'.padEnd(28)} ${'TYPE'.padEnd(8)} HAVE NEED  VALUE  SUGGESTED TOPICS`)
  console.log(`  ${'-'.repeat(94)}`)
  for (const r of picked) {
    const topics = r.suggest.map(t => TOPICS[t]?.name || t).join(', ')
    console.log(
      `  ${r.name.slice(0, 27).padEnd(28)} ${r.type.padEnd(8)} ${String(r.receipts).padStart(2)}   ${String(r.gap).padStart(2)}  ${String(r.value).padStart(6)}  ${topics}`
    )
  }
  console.log(`\n  ${picked.length} shown of ${rows.length} ungraded. --json for the machine-readable form.\n`)
}
