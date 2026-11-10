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

const ask = query
  ? `Find posts on X matching: ${query}.${topic ? ` Focus on anything bearing on ${topic}.` : ''}`
  : `Find notable public statements posted by @${handle}${topic ? ` about ${topic}` : ''}.`

const xs = { type: 'x_search' }
if (handle) xs.allowed_x_handles = [handle.replace(/^@/, '')]
if (from) xs.from_date = from
if (to) xs.to_date = to

const body = {
  model: 'grok-4.7',
  input: [{
    role: 'user',
    content:
      `${ask}\n\nFor each post return: the post URL, the date, and the text as posted. ` +
      `Do not summarise, interpret or editorialise. If you are not certain a post exists, omit it. ` +
      `Return at most 15.`,
  }],
  tools: [xs],
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
if (d.usage) console.log(`\nusage: ${JSON.stringify(d.usage)}`)
