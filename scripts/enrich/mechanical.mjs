// Link the person a company or fund receipt is actually about.
//
// This is the only enrichment that can be done without research. Everything
// else — quotes, corroboration, outcomes — is a research job; see the note at
// the bottom for what was tried and why it failed.
//
//   node scripts/enrich/mechanical.mjs          # dry run
//   node scripts/enrich/mechanical.mjs --write
import { createJiti } from 'jiti'
import fs from 'node:fs'

const jiti = createJiti(import.meta.url, { interopDefault: true })
const { stances, people } = await jiti.import('../../src/lib/mock-data.ts')
const WRITE = process.argv.includes('--write')

// The name must be the subject of an action close by. "Sequoia partner Shaun
// Maguire posted" links; "Meta fired staff who criticised Zuckerberg" does not,
// because Zuckerberg is not the actor there.
const ACTS = 'said|posted|wrote|told|tweeted|stated|declared|called|led|announced|defended|refused|signed|donated|ordered|fired|cut|dismissed|claimed|argued'
const esc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const edits = []
for (const s of stances) {
  if (s.actor_person_id || s.entity_type === 'person') continue
  for (const p of people) {
    if (!s.summary.includes(p.name)) continue
    if (new RegExp(`${esc(p.name)}\\b[^.]{0,40}?\\b(${ACTS})\\b`).test(s.summary)) {
      edits.push({ id: s.id, pid: p.id, name: p.name })
      break
    }
  }
}

console.log(`receipts            : ${stances.length}`)
console.log(`actor links to add  : ${edits.length}`)

if (!WRITE) {
  console.log('\n-- sample --')
  for (const e of edits.slice(0, 8)) console.log(`  [${e.id}] → ${e.name}`)
  console.log('\ndry run; pass --write to apply')
} else {
  const path = new URL('../../src/lib/mock-data.ts', import.meta.url)
  let src = fs.readFileSync(path, 'utf8')
  let n = 0
  for (const e of edits) {
    const re = new RegExp(`(  \\{ id: '${e.id}',)(.*?)(verified: (?:true|false))( \\},)`, 's')
    const m = src.match(re)
    if (!m || m[0].includes('actor_person_id')) continue
    src = src.replace(m[0], `${m[1]}${m[2]}${m[3]}, actor_person_id: '${e.pid}'${m[4]}`)
    n++
  }
  fs.writeFileSync(path, src)
  console.log(`\nwritten: ${n}`)
}

// ── What was tried and removed ───────────────────────────────────────────
// Lifting quotes out of summaries into the `quote` field. 810 summaries contain
// a quoted span, but only 14 sat where the quote could simply be truncated off,
// and even those stranded the subject when the attribution verb went with it:
// "In a subsequent Axel Springer interview, Nadella." The other 730 carry the
// quote mid-sentence, where removing it breaks the grammar outright. Lifting a
// quote means rewriting the sentence around it — editorial work, done per
// receipt during research, not as a bulk transformation over published claims.
