// Post one reviewed draft to X.
//
// One draft, named explicitly, with --confirm. There is deliberately no
// "post everything" mode and no scheduler hook.
//
// Each post is a public, attributable accusation against a named company or
// person, and the error rate on this corpus is not zero: a receipt cited a
// Variety article that supported none of its claims, two asserted a layoff took
// effect before it was filed, and one published an "Epstein connection" on
// someone whose own record said she had none. Those were all caught by reading
// them. A scheduler would have posted them.
//
//   node scripts/x/post.mjs --id <draft-id>              # shows it, posts nothing
//   node scripts/x/post.mjs --id <draft-id> --confirm    # posts it
import crypto from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const arg = n => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : null }
const ID = arg('id')
const CONFIRM = process.argv.includes('--confirm')
const QUEUE = new URL('./queue.jsonl', import.meta.url)

if (!ID) { console.error('usage: node scripts/x/post.mjs --id <draft-id> [--confirm]'); process.exit(1) }

const rows = fs.readFileSync(QUEUE, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l))
const draft = rows.find(d => d.id === ID)
if (!draft) { console.error(`no draft ${ID}`); process.exit(1) }
if (draft.status === 'posted') { console.error(`${ID} was already posted: ${draft.url}`); process.exit(1) }

console.log(`\n${draft.text}\n`)
console.log(`[${draft.text.length} chars]  the receipt: ${draft.review}\n`)

if (!CONFIRM) {
  console.log('Nothing posted. Read the receipt at the link above, then re-run with --confirm.')
  process.exit(0)
}

// ── credentials ──────────────────────────────────────────────────────────
// Posting needs X API keys, which are NOT the xAI key — different company,
// different console. developer.x.com -> your app -> Keys and tokens. You need
// all four, and the access token must have Read and Write permission.
function creds() {
  const f = path.join(os.homedir(), '.x_api_keys.json')
  let c = {}
  if (fs.existsSync(f)) c = JSON.parse(fs.readFileSync(f, 'utf8'))
  c = {
    appKey: process.env.X_APP_KEY ?? c.appKey,
    appSecret: process.env.X_APP_SECRET ?? c.appSecret,
    accessToken: process.env.X_ACCESS_TOKEN ?? c.accessToken,
    accessSecret: process.env.X_ACCESS_SECRET ?? c.accessSecret,
  }
  if (Object.values(c).some(v => !v)) {
    console.error(`Missing X API credentials.

  These are NOT the xAI key. Different company, different console.

    1. developer.x.com -> create a Project + App
    2. User authentication settings -> App permissions: Read and Write
    3. Keys and tokens -> generate Access Token & Secret AFTER setting Read+Write,
       or the token stays read-only and posting fails with 403
    4. Save them:

  cat > ~/.x_api_keys.json <<'JSON'
  { "appKey": "...", "appSecret": "...",
    "accessToken": "...", "accessSecret": "..." }
  JSON
  chmod 600 ~/.x_api_keys.json

  Posting is billed pay-per-use at about $0.01 per post.`)
    process.exit(1)
  }
  return c
}

// ── OAuth 1.0a ───────────────────────────────────────────────────────────
// POST /2/tweets sends a JSON body, which is not part of the signature base
// string — only the oauth_* parameters are.
const enc = s => encodeURIComponent(s).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase())
function authHeader(method, url, c) {
  const p = {
    oauth_consumer_key: c.appKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: c.accessToken,
    oauth_version: '1.0',
  }
  const base = [method.toUpperCase(), enc(url),
    enc(Object.keys(p).sort().map(k => `${enc(k)}=${enc(p[k])}`).join('&'))].join('&')
  const signingKey = `${enc(c.appSecret)}&${enc(c.accessSecret)}`
  p.oauth_signature = crypto.createHmac('sha1', signingKey).update(base).digest('base64')
  return 'OAuth ' + Object.keys(p).sort().map(k => `${enc(k)}="${enc(p[k])}"`).join(', ')
}

const c = creds()
const URL_ = 'https://api.x.com/2/tweets'
const res = await fetch(URL_, {
  method: 'POST',
  headers: { Authorization: authHeader('POST', URL_, c), 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: draft.text }),
})
const out = await res.json().catch(() => ({}))
if (!res.ok) {
  console.error(`X API ${res.status}: ${JSON.stringify(out).slice(0, 400)}`)
  if (res.status === 403) console.error('\n403 usually means the access token predates Read+Write. Regenerate it.')
  process.exit(1)
}

const postId = out.data?.id
draft.status = 'posted'
draft.url = postId ? `https://x.com/i/status/${postId}` : null
draft.posted_at = new Date().toISOString()
fs.writeFileSync(QUEUE, rows.map(d => JSON.stringify(d)).join('\n') + '\n')
console.log(`posted: ${draft.url ?? JSON.stringify(out)}`)
