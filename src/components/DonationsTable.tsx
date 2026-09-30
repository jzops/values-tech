'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Donation } from '@/lib/types'

interface DonationsTableProps {
  donations: Donation[]
}

/** Rows shown before the table collapses behind a toggle. FEC imports push some
 *  people past 80 donations, which buries the rest of the profile. */
const PREVIEW_ROWS = 15

export function DonationsTable({ donations }: DonationsTableProps) {
  const [expanded, setExpanded] = useState(false)
  if (donations.length === 0) return null

  // Largest first: with FEC data loaded, the point of this table is the size of
  // the cheques, not their chronology.
  const sorted = [...donations].sort((a, b) => b.amount - a.amount)
  const shown = expanded ? sorted : sorted.slice(0, PREVIEW_ROWS)
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0)

  // Attribution notes repeat almost verbatim across a donor's records (same name,
  // same employer), so they are deduped — one line each, not one per row.
  const notes = [...new Set(donations.map(d => d.notes).filter(Boolean) as string[])]

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-paper">
          Political Donations ({donations.length})
        </h3>
        <span className="text-sm font-mono text-paper-dim">
          Total: {formatCurrency(totalAmount)}
        </span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead className="bg-ink-raised">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium text-paper-mute">Date</th>
              <th className="px-4 py-3 font-medium text-paper-mute">Amount</th>
              <th className="px-4 py-3 font-medium text-paper-mute">Recipient</th>
              <th className="px-4 py-3 font-medium text-paper-mute">Type</th>
              <th className="px-4 py-3 font-medium text-paper-mute w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)] bg-ink-raised">
            {shown.map((donation) => (
              <tr key={donation.id} className="hover:bg-white/5">
                <td className="px-4 py-3 text-paper-dim whitespace-nowrap">
                  {new Date(donation.donation_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-4 py-3 font-mono font-medium text-paper tnum">
                  {formatCurrency(donation.amount)}
                </td>
                <td className="px-4 py-3 text-paper">
                  <span>{donation.recipient}</span>
                  {donation.pac_name && donation.pac_name !== donation.recipient && (
                    <span className="text-paper-mute text-xs ml-1 block">
                      via {donation.pac_name}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-0.5 rounded text-xs bg-white/5 text-paper-dim capitalize whitespace-nowrap">
                    {donation.recipient_type.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={donation.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View this record on fec.gov"
                    className="text-paper-mute hover:text-paper"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sorted.length > PREVIEW_ROWS && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-3 text-xs label text-paper-mute hover:text-paper transition-colors"
        >
          {expanded ? 'Show fewer' : `Show all ${sorted.length} donations`}
        </button>
      )}
      {notes.length > 0 && (
        <div className="mt-3 space-y-1">
          {notes.map(n => (
            <p key={n} className="text-xs text-paper-mute italic">* {n}</p>
          ))}
        </div>
      )}
    </div>
  )
}

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`
  return `$${amount.toLocaleString('en-US')}`
}
