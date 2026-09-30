// Stage 2: find companies that carried the DEI phrase in an earlier 10-K and
// dropped it from a later one.
//
// Two-step on purpose. EDGAR full-text search is the cheap screen (2 requests
// per company); it indexes the whole submission, exhibits included, and can lag.
// So every candidate is then VERIFIED by downloading the actual later 10-K and
// confirming the phrase is really absent from it. A receipt is only proposed
// when the document itself backs the claim.
import fs from 'node:fs'

const UA = 'reciepts.tech research robin@reciepts.tech'
const here = p => new URL(p, import.meta.url)
const sleep = ms => new Promise(r => setTimeout(r, ms))
const companies = JSON.parse(fs.readFileSync(here('./ciks.json'), 'utf8'))

// Both comma styles. Filings split roughly evenly between them and matching only
// one would invent drops for companies that merely moved the Oxford comma.
const PHRASES = ['diversity, equity and inclusion', 'diversity, equity, and inclusion']
// Used only to describe what replaced it — never on its own to claim a drop.
const SOFTER = ['inclusion and belonging', 'diversity and inclusion', 'inclusive culture']

async function fts(cik, phrase, tries = 4) {
  const u = `https://efts.sec.gov/LATEST/search-index?q=${encodeURIComponent(`"${phrase}"`)}&forms=10-K&ciks=${cik}`
  let last
  for (let i = 0; i < tries; i++) {
    const r = await fetch(u, { headers: { 'User-Agent': UA } })
    if (r.ok) return ((await r.json()).hits?.hits ?? []).map(h => String(h._id).split(':')[0])
    last = r.status
    if (r.status < 500 && r.status !== 429) break
    await sleep(800 * 2 ** i)   // EDGAR throws transient 500s under load
  }
  throw new Error(`FTS ${last}`)
}

const docUrl = (cik, acc, doc) =>
  `https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${acc.replace(/-/g, '')}/${doc}`

// Strip tags and normalise whitespace/entities so phrase matching sees prose,
// not markup. Filings wrap words in spans constantly.
const plain = html => html
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/\s+/g, ' ')
  .toLowerCase()

const candidates = [], errors = []
for (const c of companies) {
  try {
    const hit = new Set()
    for (const p of PHRASES) { for (const a of await fts(c.cik, p)) hit.add(a); await sleep(130) }

    // Oldest first, so we can find the exact filing where it disappeared.
    const ks = [...c.ten_ks].sort((a, b) => a.date.localeCompare(b.date))
    let lastWith = -1
    ks.forEach((k, i) => { if (hit.has(k.accession)) lastWith = i })
    if (lastWith === -1) continue                     // never carried it
    if (lastWith === ks.length - 1) continue          // still carries it

    // The next annual report after the last one containing the phrase. Using the
    // newest filing instead would date Tesla's change to 2026 when the phrase
    // actually went missing years earlier.
    const had = ks[lastWith], latest = ks[lastWith + 1]
    candidates.push({ ...c, latest, had, ten_ks: undefined })
  } catch (e) { errors.push({ name: c.name, why: String(e.message ?? e) }) }
}

console.log(`screened      : ${companies.length}`)
console.log(`drop candidates: ${candidates.length}`)
if (errors.length) console.log(`errors        : ${errors.length}`, errors.slice(0, 5))

// --- verification: the document must actually lack the phrase ---
const confirmed = [], refuted = []
for (const c of candidates) {
  const url = docUrl(c.cik, c.latest.accession, c.latest.doc)
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!r.ok) { refuted.push({ name: c.name, why: `doc HTTP ${r.status}`, url }); await sleep(130); continue }
    const txt = plain(await r.text())
    const still = PHRASES.filter(p => txt.includes(p))
    if (still.length) { refuted.push({ name: c.name, why: 'phrase IS present — FTS screen was wrong', url }); await sleep(130); continue }
    confirmed.push({ ...c, latest_url: url, replacement: SOFTER.filter(s => txt.includes(s)) })
  } catch (e) { refuted.push({ name: c.name, why: String(e.message ?? e), url }) }
  await sleep(130)
}

fs.writeFileSync(here('./dei-drops.json'), JSON.stringify(confirmed, null, 2))
console.log(`\nCONFIRMED by reading the filing : ${confirmed.length}`)
console.log(`refuted on verification         : ${refuted.length}`)
if (refuted.length) console.log(refuted.map(r => `  ${r.name.padEnd(20)} ${r.why}`).join('\n'))
console.log('\n-- confirmed drops --')
console.log(confirmed.map(c =>
  `  ${c.name.padEnd(20)} last had ${c.had.date} -> absent ${c.latest.date}` +
  (c.replacement.length ? `  (now says: ${c.replacement.join(', ')})` : '')).join('\n'))
