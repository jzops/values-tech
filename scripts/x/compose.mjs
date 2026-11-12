// Build post drafts from receipts, into a queue for review.
//
// This composes. It does not post — scripts/x/post.mjs does that, and only for
// a draft you have named explicitly. The split is deliberate: every receipt is
// a graded, attributed claim about a real company or person, and this session
// alone found a receipt citing the wrong source, two asserting a layoff took
// effect before it was filed, and a published "Epstein connection" on someone
// whose record said she had none. Any of those would have been a public,
// attributable accusation if a scheduler had posted it unread.
//
//   node scripts/x/compose.mjs                 # 5 drafts from the newest receipts
//   node scripts/x/compose.mjs --entity meta
//   node scripts/x/compose.mjs --limit 10
import { createJiti } from 'jiti'
import fs from 'node:fs'

const jiti = createJiti(import.meta.url, { interopDefault: true })
const { stances, companies, people, vcs } = await jiti.import('../../src/lib/mock-data.ts')
const { SITE_URL } = await jiti.import('../../src/lib/site.ts')
const { TOPICS } = await jiti.import('../../src/lib/constants.ts')

const arg = n => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : null }
const LIMIT = Number(arg('limit') ?? 5)
const ENTITY = arg('entity')

const lookup = { company: companies, person: people, vc: vcs }
const entityFor = s => lookup[s.entity_type]?.find(e => e.id === s.entity_id)

// A receipt with a verbatim quote is the one worth posting: the card carries
// the grade, the quote carries the substance, and neither needs a thread.
let pool = stances.filter(s => s.quote?.text && s.stance_date && entityFor(s))
if (ENTITY) pool = pool.filter(s => entityFor(s)?.slug === ENTITY)
pool.sort((a, b) => (b.stance_date || '').localeCompare(a.stance_date || ''))

const posted = new Set()
try {
  for (const l of fs.readFileSync(new URL('./queue.jsonl', import.meta.url), 'utf8').trim().split('\n'))
    if (l) posted.add(JSON.parse(l).stance_id)
} catch {}

const clip = (t, n) => (t.length <= n ? t : `${t.slice(0, n - 1).trimEnd()}…`)

// A quote can contain an @handle. Posted as-is it becomes a live mention, which
// drags that account into a thread about them and reads as pile-on rather than
// documentation — Maguire's Tommy Robinson post is exactly this shape. A
// zero-width space after the @ is invisible to a reader and inert to X.
// The receipt on the site stays byte-for-byte verbatim; only the post is muted.
const muteMentions = t => t.replace(/@(?=\w)/g, '@\u200B')
const drafts = []
for (const s of pool) {
  if (drafts.length >= LIMIT) break
  if (posted.has(s.id)) continue
  const e = entityFor(s)
  const topic = TOPICS[s.topic]?.name ?? s.topic
  const url = `${SITE_URL}/stance/${s.id}`

  // 280 chars. The URL counts as 23 whatever its length, and the card renders
  // below the text rather than inside it.
  const head = `${e.name} — ${topic}`
  const room = 280 - head.length - 23 - 6
  const text = `${head}\n\n“${muteMentions(clip(s.quote.text, room))}”\n\n${url}`

  drafts.push({
    id: `d${Date.now()}-${s.id}`, stance_id: s.id, entity: e.name, slug: e.slug,
    topic: s.topic, date: s.stance_date, status: 'draft', text,
    review: `${SITE_URL}/stance/${s.id}`,
  })
}

if (!drafts.length) { console.log('nothing new to draft'); process.exit(0) }
fs.appendFileSync(new URL('./queue.jsonl', import.meta.url), drafts.map(d => JSON.stringify(d)).join('\n') + '\n')

console.log(`${drafts.length} draft(s) queued — none are posted.\n`)
for (const d of drafts) {
  console.log(`── ${d.id}  (${d.entity}, ${d.date})`)
  console.log(d.text.split('\n').map(l => '   ' + l).join('\n'))
  console.log(`   [${d.text.length} chars]  read it: ${d.review}\n`)
}
console.log('Post one, after reading it:\n  node scripts/x/post.mjs --id <id> --confirm')
