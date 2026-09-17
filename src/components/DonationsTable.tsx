'use client'

import { ExternalLink } from 'lucide-react'
import { Donation } from '@/lib/types'

interface DonationsTableProps {
  donations: Donation[]
}

export function DonationsTable({ donations }: DonationsTableProps) {
  if (donations.length === 0) return null

  const sortedDonations = [...donations].sort(
    (a, b) => new Date(b.donation_date).getTime() - new Date(a.donation_date).getTime()
  )

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0)

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
            {sortedDonations.map((donation) => (
              <tr key={donation.id} className="hover:bg-white/5">
                <td className="px-4 py-3 text-paper-dim">
                  {new Date(donation.donation_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-4 py-3 font-mono font-medium text-paper">
                  {formatCurrency(donation.amount)}
                </td>
                <td className="px-4 py-3 text-paper">
                  <span>{donation.recipient}</span>
                  {donation.pac_name && (
                    <span className="text-paper-mute text-xs ml-1 block">
                      via {donation.pac_name}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-0.5 rounded text-xs bg-white/5 text-paper-dim capitalize">
                    {donation.recipient_type.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={donation.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
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
      {donations.some(d => d.notes) && (
        <div className="mt-3 space-y-1">
          {donations.filter(d => d.notes).map(d => (
            <p key={d.id} className="text-xs text-paper-mute italic">
              * {d.notes}
            </p>
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
