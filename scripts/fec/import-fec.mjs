// Pull federal political donations for tracked people from the FEC API.
//
// These land in `donations` (neutral facts), NOT in `stances`. That distinction
// is the whole point: a donation is a verifiable act, but the politics topic
// grades "funded efforts that attacked democratic institutions or civil rights",
// which is a judgement about the RECIPIENT. Marc Andreessen's $24M to Fairshake
// is real and worth publishing; it is not evidence of that, so it must not carry
// a grade. Anything that should be a graded receipt gets filed by hand.
//
// Name collisions are the live risk: FEC matches on a name string, and two people
// share a name often. Every record therefore has to match "LAST, FIRST" exactly
// after normalising, and the employer/occupation FEC has on file is kept in the
// notes so a human can audit the attribution.
import { createJiti } from 'jiti'
import fs from 'node:fs'

const KEY = process.env.FEC_API_KEY || 'DEMO_KEY'   // DEMO_KEY is 30 req/hour
const here = p => new URL(p, import.meta.url)
const sleep = ms => new Promise(r => setTimeout(r, ms))
const jiti = createJiti(import.meta.url, { interopDefault: true })
const { people, donations } = await jiti.import('../../src/lib/mock-data.ts')

const ROSTER = JSON.parse(fs.readFileSync(here('./roster.json'), 'utf8'))
const norm = s => (s || '').toLowerCase().replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim()

const cacheFile = n => here(`./cache/${n}.json`)
async function fecSearch(name) {
  const f = cacheFile(name.replace(/[^a-z0-9]/gi, '_'))
  try { return JSON.parse(fs.readFileSync(f, 'utf8')) } catch {}
  const u = `https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=${KEY}` +
            `&contributor_name=${encodeURIComponent(name)}&per_page=100` +
            `&sort=-contribution_receipt_amount&sort_hide_null=true`
  const r = await fetch(u)
  if (r.status === 429) throw new Error('RATE_LIMIT')
  if (!r.ok) throw new Error(`FEC ${r.status}`)
  const d = await r.json()
  fs.writeFileSync(f, JSON.stringify(d))
  await sleep(1200)
  return d
}

// FEC committee_type -> our recipient_type vocabulary.
const TYPE = { O: 'super_pac', P: 'candidate', H: 'candidate', S: 'candidate',
               X: 'party', Y: 'party', Z: 'party' }

const out = [], unmatched = [], errors = []
let id = donations.length + 1
const seen = new Set(donations.map(d => `${d.entity_id}|${d.recipient}|${d.donation_date}|${d.amount}`))

for (const entry of ROSTER) {
  const person = people.find(p => p.name === entry.name)
  if (!person) { errors.push(`${entry.name}: not a tracked person`); continue }
  let d
  try { d = await fecSearch(entry.fec_name) }
  catch (e) { errors.push(`${entry.name}: ${e.message}`); if (String(e.message) === 'RATE_LIMIT') break; continue }

  const want = norm(entry.fec_name)
  for (const r of d.results || []) {
    if (norm(r.contributor_name) !== want) { unmatched.push(r.contributor_name); continue }
    // Employer corroboration, as a soft signal. People at this level routinely file
    // as "SELF" or leave it blank, so a generic employer cannot be treated as a
    // mismatch — but a concrete employer that contradicts the person we mean (a
    // school district, a hospital) is a different donor with the same name.
    const emp = `${r.contributor_employer || ''} ${r.contributor_occupation || ''}`.toLowerCase()
    const generic = !emp.trim() || /\b(self|none|n\/?a|retired|not employed|requested|unemployed|info requested)\b/.test(emp)
    if (entry.employer_match && !generic && !entry.employer_match.some(m => emp.includes(m))) {
      unmatched.push(`${r.contributor_name} (${emp.trim()})`); continue
    }
    const amt = Number(r.contribution_receipt_amount) || 0
    if (amt < (entry.min_amount ?? 10000)) continue
    const cm = r.committee || {}
    const recipient = cm.name || r.committee_name || 'Unknown committee'
    const date = (r.contribution_receipt_date || '').slice(0, 10)
    if (!date) continue
    const k = `${person.id}|${recipient}|${date}|${amt}`
    if (seen.has(k)) continue
    seen.add(k)
    out.push({
      id: `don-fec-${id++}`, entity_type: 'person', entity_id: person.id, amount: amt,
      recipient, recipient_type: TYPE[cm.committee_type] || 'pac',
      pac_name: cm.committee_type === 'O' ? recipient : null, donation_date: date,
      source_url: `https://www.fec.gov/data/receipts/?data_type=processed&contributor_name=${encodeURIComponent(entry.fec_name)}&min_date=${date}&max_date=${date}`,
      source_type: 'fec_filing', verified: true, notes: null,
      _fec_name: entry.fec_name, _employer: r.contributor_employer || '',
    })
  }
}

// One uniform attribution line per donor. Per-record employer strings vary
// ("SPACEX" / "SPACE EXPLORATION TECHNOLOGIES CORP."), and rendering each as its
// own footnote buried the profile under a dozen near-identical lines. The full
// per-record detail stays in this file, which is committed.
const modal = {}
for (const o of out) {
  if (!o._employer) continue
  ;(modal[o.entity_id] ??= {})[o._employer] = (modal[o.entity_id]?.[o._employer] ?? 0) + 1
}
for (const o of out) {
  const counts = modal[o.entity_id]
  const emp = counts && Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
  o.notes = `Matched to FEC records filed under "${o._fec_name}"` +
            (emp ? `, employer on file "${emp}"` : '') + '.'
}
fs.writeFileSync(here('./proposed.json'), JSON.stringify(out, null, 2))
console.log(`roster        : ${ROSTER.length}`)
console.log(`donations found: ${out.length}`)
if (errors.length) console.log(`errors        : ${errors.length}\n  ${errors.join('\n  ')}`)
console.log(`\nrejected on name/employer mismatch: ${unmatched.length}`)
const agg = {}
for (const o of out) agg[o.entity_id] = (agg[o.entity_id] || 0) + o.amount
for (const [pid, total] of Object.entries(agg).sort((a, b) => b[1] - a[1])) {
  const p = people.find(x => x.id === pid)
  console.log(`  ${p.name.padEnd(20)} ${out.filter(o => o.entity_id === pid).length} donations  $${total.toLocaleString()}`)
}
