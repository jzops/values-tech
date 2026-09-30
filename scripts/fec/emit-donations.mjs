// Write FEC donations into the `donations` array (neutral facts, no grade impact).
import fs from 'node:fs'
const here = p => new URL(p, import.meta.url)
const rows = JSON.parse(fs.readFileSync(here('./proposed.json'), 'utf8'))
  .map(({ _fec_name, _employer, ...d }) => d)   // audit-only fields, not shipped
const esc = s => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")

const path = new URL('../../src/lib/mock-data.ts', import.meta.url)
const lines = fs.readFileSync(path, 'utf8').split('\n')
const start = lines.findIndex(l => l.startsWith('export const donations'))
if (start === -1) throw new Error('donations array not found')
const close = lines.findIndex((l, i) => i > start && l === ']')
if (close === -1) throw new Error('end of donations array not found')

const out = rows.map(d =>
  `  { id: '${d.id}', entity_type: '${d.entity_type}', entity_id: '${d.entity_id}', ` +
  `amount: ${Math.round(d.amount)}, recipient: '${esc(d.recipient)}', recipient_type: '${d.recipient_type}', ` +
  `pac_name: ${d.pac_name ? `'${esc(d.pac_name)}'` : 'null'}, donation_date: '${d.donation_date}', ` +
  `source_url: '${esc(d.source_url)}', source_type: '${d.source_type}', verified: ${d.verified}, ` +
  `notes: '${esc(d.notes)}' },`)

lines.splice(close, 0, '',
  '  // Federal donations pulled from the FEC API and matched on contributor name +',
  '  // employer. Facts, not verdicts: these carry no grade. See scripts/fec/.',
  ...out)
fs.writeFileSync(path, lines.join('\n'))
console.log(`donations written: ${out.length}`)
