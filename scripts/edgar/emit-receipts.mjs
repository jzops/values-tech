// Stage 3: turn confirmed DEI-language drops into receipts.
//
// Position is `mixed`, not `opposed`, and that is deliberate. The dei topic reads
// "Opposed = rolled back or ended DEI programs". What these filings prove is that
// a company deleted a phrase from its annual report — a documented retreat in how
// it describes itself to investors, but NOT evidence that any programme ended.
// Coding it `opposed` would be the same overreach that once published "Safra Catz
// — Epstein connection" off a record saying she had none.
//
// The summary therefore claims only what two filings show, and links to the later
// filing so anyone can check it.
import { createJiti } from 'jiti'
import fs from 'node:fs'

const here = p => new URL(p, import.meta.url)
const jiti = createJiti(import.meta.url, { interopDefault: true })
const { stances } = await jiti.import('../../src/lib/mock-data.ts')
const drops = JSON.parse(fs.readFileSync(here('./dei-drops.json'), 'utf8'))

// Skip anything already covered. Google, for one, has a receipt dated to the very
// filing this would cite.
const COVERED = /annual report|10-k|diversity, equity/i
const already = new Set(
  stances.filter(s => s.entity_type === 'company' && s.topic === 'dei' && COVERED.test(s.summary))
         .map(s => s.entity_id)
)

const esc = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
let id = Math.max(...stances.map(s => Number(s.id) || 0)) + 1

const rows = [], skipped = []
for (const d of drops) {
  if (already.has(d.id)) { skipped.push(d.name); continue }
  const rep = d.replacement?.[0]
  const summary =
    `Dropped the phrase "diversity, equity and inclusion" from its annual report. ` +
    `The wording appears in the 10-K filed ${d.had.date} and is absent from the 10-K filed ${d.latest.date}.` +
    (rep ? ` The later filing uses "${rep}" instead.` : '')
  rows.push(
    `  { id: '${id++}', entity_type: 'company', entity_id: '${d.id}', topic: 'dei', ` +
    `position: 'mixed', summary: '${esc(summary)}', source_url: '${d.latest_url}', ` +
    `source_type: 'sec_filing', stance_date: '${d.latest.date}', verified: true },`
  )
}

const path = new URL('../../src/lib/mock-data.ts', import.meta.url)
const src = fs.readFileSync(path, 'utf8')
const lines = src.split('\n')
const close = lines.findIndex((l, i) => i > 127 && l === ']')
if (close === -1) throw new Error('could not find the end of the stances array')

lines.splice(close, 0, '', '  // DEI language removed from annual reports — sourced from SEC EDGAR full-text', '  // search and verified against each filing. See scripts/edgar/.', ...rows)
fs.writeFileSync(path, lines.join('\n'))

console.log(`confirmed drops : ${drops.length}`)
console.log(`skipped (already covered): ${skipped.length}  ${skipped.join(', ')}`)
console.log(`receipts written: ${rows.length}`)
