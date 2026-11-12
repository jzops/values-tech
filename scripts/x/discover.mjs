// Find candidate receipts on X using Grok's x_search tool.
//
// THIS IS DISCOVERY, NOT EVIDENCE. Grok is a language model: it can paraphrase a
// post, merge two posts, or invent one outright. Nothing it says may be written
// into a receipt. The only thing taken from this step is a POST URL, which is
// then verified verbatim through scripts/x/fetch-quote.mjs (publish.x.com/oembed,
// no key, returns the exact text). Model output is the lead; oEmbed is the proof.
//
//   node scripts/x/discover.mjs --handle sequoia --topic dei
//   node scripts/x/discover.mjs --query "Shaun Maguire DEI" --from 2025-01-01
//
// Key: $XAI_API_KEY, or ~/.xai_key (same pattern as ~/.elevenlabs_key).
// Cost: $5 per 1,000 posts fetched, $10 per 1,000 profiles, plus tokens.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

function key() {
  if (process.env.XAI_API_KEY) return process.env.XAI_API_KEY.trim()
  const f = path.join(os.homedir(), '.xai_key')
  if (fs.existsSync(f)) return fs.readFileSync(f, 'utf8').trim()
  console.error(`No xAI API key.

  This is NOT the same as a Grok subscription. X Premium / SuperGrok give you the
  chatbot; API access is billed separately and is what x_search needs.

    1. console.x.ai -> API Keys -> Create
    2. echo 'xai-...' > ~/.xai_key   (or export XAI_API_KEY)

  The X API at developer.x.com is a different product again ($200/mo Basic) and
  is not needed for this.`)
  process.exit(1)
}

const arg = n => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : null }
const handle = arg('handle'), query = arg('query'), topic = arg('topic')
const from = arg('from'), to = arg('to')
if (!handle && !query) { console.error('need --handle <account> or --query "<text>"'); process.exit(1) }

// Asking for "notable statements" returns quote-tweets and replies, whose
// meaning lives in the post being quoted — oEmbed does not return that, so they
// cannot be turned into a receipt without misrepresenting the author. Of 15
// posts found that way for one account, exactly one stood alone. Ask for
// self-contained posts instead.
const ask = query
  ? `Find posts on X matching: ${query}.${topic ? ` Focus on anything bearing on ${topic}.` : ''}`
  : `Find substantive public positions stated by @${handle}${topic ? ` on ${topic}` : ''}.`

const xs = { type: 'x_search' }
if (handle) xs.allowed_x_handles = [handle.replace(/^@/, '')]
if (from) xs.from_date = from
if (to) xs.to_date = to

const MODEL = process.env.XAI_MODEL ?? 'grok-4.3'   // cheaper: $1.25/$2.50 vs $2/$6
const body = {
  model: MODEL,
  max_output_tokens: 4000,
  input: [{
    role: 'user',
    content:
      `${ask}\n\n` +
      `Only include posts that STAND ALONE — the full claim must be in the post's own text. ` +
      `Exclude replies, quote-tweets, and posts whose meaning depends on an image, link or ` +
      `another post ("As a reminder", "I respect him for this", "This is huge"). ` +
      `Prefer posts of at least 15 words that state a position, name a person or organisation, ` +
      `or describe something the author did.\n\n` +
      `Run AT MOST 2 searches and inspect at most 40 posts — do not exhaustively crawl the ` +
      `account. Stop as soon as you have 15 good candidates or have run those 2 searches.\n\n` +
      `For each: the post URL, the date, and the text exactly as posted. Do not summarise, ` +
      `interpret or editorialise. If you are not certain a post exists, omit it. At most 15.`,
  }],
  tools: [xs],
}

const LOGFILE = new URL('./spend.jsonl', import.meta.url)
const spentAlready = (() => {
  try {
    return fs.readFileSync(LOGFILE, 'utf8').trim().split('\n')
      .reduce((a, l) => a + (l ? JSON.parse(l).cost ?? 0 : 0), 0)
  } catch { return 0 }
})()
const BUDGET = Number(process.env.XAI_BUDGET ?? 25)
if (spentAlready >= BUDGET) {
  console.error(`Stopping: $${spentAlready.toFixed(2)} already spent, budget is $${BUDGET}.\n` +
                `Raise it with XAI_BUDGET=50, or clear scripts/x/spend.jsonl to reset the counter.`)
  process.exit(1)
}

const r = await fetch('https://api.x.ai/v1/responses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key()}` },
  body: JSON.stringify(body),
})
if (!r.ok) { console.error(`xAI ${r.status}: ${(await r.text()).slice(0, 400)}`); process.exit(1) }
const d = await r.json()

// Post URLs are the only durable output. Everything else is a lead.
const text = JSON.stringify(d)
const urls = [...new Set((text.match(/https:\\?\/\\?\/(?:x|twitter)\.com\/[A-Za-z0-9_]+\/status\/\d+/g) || [])
  .map(u => u.replace(/\\/g, '')))]

const out = d.output?.flatMap(o => o.content?.map(c => c.text).filter(Boolean) ?? []).join('\n') ?? ''
console.log(out.trim() || '(no prose returned)')
console.log(`\n── ${urls.length} post URL(s) to verify ──`)
urls.forEach(u => console.log(`  ${u}`))
if (urls.length) {
  console.log(`\nVerify the wording before writing any of it into a receipt:\n  node scripts/x/fetch-quote.mjs ${urls.join(' ')}`)
}
// ── Spend ────────────────────────────────────────────────────────────────
// Billing is on auto-reload, so every run reports what it cost and appends to a
// running total. A single entity query runs about $0.25, most of it the posts
// themselves ($5 per 1,000) rather than tokens.
const u = d.usage ?? {}
const t = u.server_side_tool_usage_details ?? {}
const cost =
  (u.input_tokens ?? 0) / 1e6 * 2 +
  (u.output_tokens ?? 0) / 1e6 * 6 +
  (t.x_posts_fetched ?? 0) / 1000 * 5 +
  (t.x_users_fetched ?? 0) / 1000 * 10 +
  (t.web_search_calls ?? 0) / 1000 * 5

const LOG = new URL('./spend.jsonl', import.meta.url)
let total = cost
try {
  for (const line of fs.readFileSync(LOG, 'utf8').trim().split('\n')) {
    if (line) total += JSON.parse(line).cost ?? 0
  }
} catch {}
fs.appendFileSync(LOG, JSON.stringify({
  at: new Date().toISOString(), q: handle ? `@${handle}` : query,
  posts: t.x_posts_fetched ?? 0, cost: Number(cost.toFixed(4)),
}) + '\n')

console.log(`\ncost this run : $${cost.toFixed(3)}  (${t.x_posts_fetched ?? 0} posts, ${(u.total_tokens ?? 0).toLocaleString()} tokens)`)
console.log(`spent so far  : $${total.toFixed(2)}   (scripts/x/spend.jsonl)`)
const CAP = Number(process.env.XAI_BUDGET ?? 25)
if (total > CAP) console.log(`\n!! past the $${CAP} budget. Raise XAI_BUDGET or stop here.`)
