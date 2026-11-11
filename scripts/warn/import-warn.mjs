// Turn California WARN filings into layoff receipts.
//
// This exists because the thinnest receipts in the corpus are layoff one-liners
// — "Coda laid off 12% of staff in 2023", 35 characters, no number of people, no
// date beyond the year, no primary source. WARN notices are the opposite: a
// legally required state filing with an exact headcount, a notice date, an
// effective date and a county.
//
// Run `python3 scripts/warn/fetch-ca.py` first; it writes ca-warn.json.
import { createJiti } from 'jiti'
import fs from 'node:fs'

const here = p => new URL(p, import.meta.url)
const jiti = createJiti(import.meta.url, { interopDefault: true })
const { companies, stances } = await jiti.import('../../src/lib/mock-data.ts')
const fileArg = (() => { const i = process.argv.indexOf('--file'); return i > -1 ? process.argv[i + 1] : './ca-warn.json' })()
const { rows, source_url, report } = JSON.parse(fs.readFileSync(here(fileArg), 'utf8'))
const { blocklist } = JSON.parse(fs.readFileSync(here('./blocklist.json'), 'utf8'))
const blocked = new Set(blocklist)

// Legal-form suffixes only. Stripping real words ("Systems", "Technologies")
// collapses distinct employers onto each other.
const LEGAL = /\b(inc|incorporated|corp|corporation|co|company|ltd|limited|llc|plc|lp|holdings?)\b/g
const norm = s => (s || '').toLowerCase().replace(/[.,'&()\-]/g, ' ').replace(LEGAL, ' ').replace(/\s+/g, ' ').trim()

// One company can file several notices on one day, for different sites. That is
// one layoff event, not five receipts: Intel filed 24 and 10 on the same date.
const events = new Map()
for (const c of companies) {
  if (blocked.has(c.name)) continue
  const n = norm(c.name)
  if (n.length < 4) continue
  for (const w of rows) {
    const j = norm(w.company)
    if (j !== n && !j.startsWith(n + ' ')) continue
    const key = `${c.id}|${w.notice}`
    const e = events.get(key) ?? { company: c, notice: w.notice, total: 0, counties: new Set(), kinds: new Set(), effective: new Set(), filedAs: new Set() }
    e.total += Number(w.employees) || 0
    if (w.county) e.counties.add(w.county.replace(/ County$/, ''))
    if (w.kind) e.kinds.add(w.kind)
    if (w.effective) e.effective.add(w.effective)
    if (w.company) e.filedAs.add(w.company)
    events.set(key, e)
  }
}

// Don't restate a layoff already on file for the same company and month.
const existing = new Set(
  stances.filter(s => s.entity_type === 'company' && s.topic === 'layoffs' &&
                      s.source_type === 'government_record')
         .map(s => `${s.entity_id}|${s.stance_date}`)
)

const esc = s => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
const fmt = d => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
const list = a => a.length === 1 ? a[0] : `${a.slice(0, -1).join(', ')} and ${a.at(-1)}`

let id = Math.max(...stances.map(s => Number(s.id) || 0)) + 1
const out = [], skipped = []
for (const e of [...events.values()].sort((a, b) => b.total - a.total)) {
  if (!e.total || !e.notice) continue
  if (existing.has(`${e.company.id}|${e.notice}`)) { skipped.push(`${e.company.name} (${e.notice})`); continue }

  const counties = [...e.counties].sort()
  const sites = e.counties.size
  const permanent = [...e.kinds].every(k => /permanent/i.test(k))

  // summary = the filing. outcome = when it bit. No overlap (POPULATING.md §1b).
  const summary =
    `Cut ${e.total.toLocaleString('en-US')} job${e.total === 1 ? '' : 's'} in California. ` +
    `${e.company.name} filed ${sites > 1 ? `${sites} WARN notices` : 'a WARN notice'} with the state on ` +
    `${fmt(e.notice)} covering ${e.total.toLocaleString('en-US')} employee${e.total === 1 ? '' : 's'} ` +
    `in ${list(counties)} ${counties.length === 1 ? 'County' : 'Counties'}.`

  // California's own file sometimes records an effective date BEFORE the notice
  // date — Netflix's October filing lists 14 September. Publishing "took effect
  // on X" for a notice filed after X reads as our error, not the state's, so the
  // date is dropped whenever it is inconsistent. The permanence still stands.
  const effective = [...e.effective].sort()
  const coherent = effective.filter(d => d >= e.notice)
  const outcome = permanent || !permanent
    ? `${permanent ? 'Permanent' : 'Mixed permanent and temporary'}.` +
      (coherent.length
        ? ` The cuts took effect ` +
          (coherent.length === 1 ? `on ${fmt(coherent[0])}.` : `between ${fmt(coherent[0])} and ${fmt(coherent.at(-1))}.`)
        : '')
    : null

  out.push(
    `  { id: '${id++}', entity_type: 'company', entity_id: '${e.company.id}', topic: 'layoffs', ` +
    `position: 'opposed', summary: '${esc(summary)}', source_url: '${source_url}', ` +
    `source_type: 'government_record', stance_date: '${e.notice}', verified: true` +
    (outcome ? `, outcome: '${esc(outcome)}'` : '') + ` },`
  )
}

if (process.argv.includes('--write') && out.length) {
  const path = new URL('../../src/lib/mock-data.ts', import.meta.url)
  const lines = fs.readFileSync(path, 'utf8').split('\n')
  // The stances array is chunked (TS2590), so there is no single closing
  // bracket to find — an earlier version matched the next bare ']' and wrote
  // 221 receipts into the stats array instead. Append at the explicit marker.
  const close = lines.findIndex(l => l.includes('APPEND NEW RECEIPTS ABOVE'))
  if (close === -1) throw new Error('append marker not found in mock-data.ts')
  lines.splice(close, 0, '',
    `  // California WARN filings — ${report.split('A detailed')[0].trim()}`,
    '  // Exact headcounts from a mandatory state filing. See scripts/warn/.',
    ...out)
  fs.writeFileSync(path, lines.join('\n'))
}

console.log(`WARN rows            : ${rows.length}`)
console.log(`layoff events matched: ${events.size}`)
console.log(`receipts ${process.argv.includes('--write') ? 'WRITTEN' : 'proposed (dry run)'}: ${out.length}`)
console.log(`skipped, already covered this month: ${skipped.length}${skipped.length ? '  ' + skipped.join(', ') : ''}`)
console.log('\n' + out.map(r => '  ' + r.match(/summary: '([^']{0,118})/)[1]).join('\n'))
