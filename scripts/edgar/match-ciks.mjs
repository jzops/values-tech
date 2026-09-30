// Stage 1 of the EDGAR DEI importer: resolve tracked companies to SEC CIKs and
// their 10-K filing history.
//
// Conservative by design. Attaching one company's filing to another is the worst
// failure this pipeline can produce, so a name only resolves when it matches
// exactly after stripping legal-form suffixes, or when aliases.json says so by
// hand. Every result is then re-verified against data.sec.gov before it is kept.
import { createJiti } from 'jiti'
import fs from 'node:fs'

const UA = 'reciepts.tech research robin@reciepts.tech'
const here = p => new URL(p, import.meta.url)
const jiti = createJiti(import.meta.url, { interopDefault: true })
const { companies } = await jiti.import('../../src/lib/mock-data.ts')

const { aliases, blocklist } = JSON.parse(fs.readFileSync(here('./aliases.json'), 'utf8'))
const blocked = new Set(blocklist)
const sec = JSON.parse(fs.readFileSync(here('./company_tickers.json'), 'utf8'))

// Only legal-form suffixes. Stripping 'Systems' or 'Technologies' collapses
// distinct companies onto each other (Mercury / Mercury Systems).
const LEGAL = /\b(inc|incorporated|corp|corporation|co|company|ltd|limited|llc|plc)\b/g
const norm = s => s.toLowerCase().replace(/[.,'&()]/g, ' ').replace(LEGAL, ' ').replace(/\s+/g, ' ').trim()

const byTicker = new Map(), byNorm = new Map()
for (const r of Object.values(sec)) {
  const cik = String(r.cik_str).padStart(10, '0')
  byTicker.set(r.ticker, { cik, ticker: r.ticker, title: r.title })
  const n = norm(r.title)
  if (!n) continue
  if (!byNorm.has(n)) byNorm.set(n, [])
  byNorm.get(n).push({ cik, ticker: r.ticker, title: r.title })
}

const candidates = []
for (const c of companies) {
  if (blocked.has(c.name)) continue
  let hit = null
  if (aliases[c.name]) {
    hit = byTicker.get(aliases[c.name])
    if (!hit) { console.warn(`alias ticker not in SEC file: ${c.name} -> ${aliases[c.name]}`); continue }
  } else {
    const hits = byNorm.get(norm(c.name))
    if (!hits) continue
    if (new Set(hits.map(h => h.cik)).size > 1) continue // ambiguous: skip
    hit = hits[0]
  }
  candidates.push({ id: c.id, name: c.name, slug: c.slug, ...hit })
}

// Verify against SEC's own record. Catches ticker-file entries whose CIK belongs
// to a different filer, and drops anything that never files a 10-K (foreign
// issuers file 20-F; a DEI-phrase absence there would mean nothing).
const sleep = ms => new Promise(r => setTimeout(r, ms))
const verified = [], rejected = []
for (const c of candidates) {
  let d
  try {
    const res = await fetch(`https://data.sec.gov/submissions/CIK${c.cik}.json`, { headers: { 'User-Agent': UA } })
    if (!res.ok) { rejected.push({ ...c, why: `HTTP ${res.status}` }); await sleep(120); continue }
    d = await res.json()
  } catch (e) { rejected.push({ ...c, why: String(e) }); await sleep(120); continue }

  const f = d.filings?.recent ?? {}
  const tenKs = (f.form ?? []).map((form, i) => ({
    form, date: f.filingDate[i], accession: f.accessionNumber[i], doc: f.primaryDocument[i],
  })).filter(x => x.form === '10-K')

  if (!tenKs.length) { rejected.push({ ...c, sec_name: d.name, why: 'no 10-K on file' }); await sleep(120); continue }
  if (norm(d.name) !== norm(c.title)) {
    // Ticker file and submissions API disagree on who this CIK is.
    rejected.push({ ...c, sec_name: d.name, why: `entity mismatch: ticker file says "${c.title}", SEC says "${d.name}"` })
    await sleep(120); continue
  }
  verified.push({ ...c, sec_name: d.name, ten_ks: tenKs })
  await sleep(120)
}

fs.writeFileSync(here('./ciks.json'), JSON.stringify(verified, null, 2))
fs.writeFileSync(here('./rejected.json'), JSON.stringify(rejected, null, 2))
console.log(`tracked companies : ${companies.length}`)
console.log(`candidates        : ${candidates.length}`)
console.log(`VERIFIED          : ${verified.length}`)
console.log(`rejected          : ${rejected.length}`)
console.log('\n-- rejected --')
console.log(rejected.map(r => `  ${r.name.padEnd(20)} ${r.why}`).join('\n'))
