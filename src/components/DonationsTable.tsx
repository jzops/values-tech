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
        <h3 className="text-lg font-semibold text-gray-900">
          Political Donations ({donations.length})
        </h3>
        <span className="text-sm font-mono text-gray-600">
          Total: {formatCurrency(totalAmount)}
        </span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium text-gray-500">Date</th>
              <th className="px-4 py-3 font-medium text-gray-500">Amount</th>
              <th className="px-4 py-3 font-medium text-gray-500">Recipient</th>
              <th className="px-4 py-3 font-medium text-gray-500">Type</th>
              <th className="px-4 py-3 font-medium text-gray-500 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {sortedDonations.map((donation) => (
              <tr key={donation.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-600">
                  {new Date(donation.donation_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-4 py-3 font-mono font-medium text-gray-900">
                  {formatCurrency(donation.amount)}
                </td>
                <td className="px-4 py-3 text-gray-900">
                  <span>{donation.recipient}</span>
                  {donation.pac_name && (
                    <span className="text-gray-500 text-xs ml-1 block">
                      via {donation.pac_name}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700 capitalize">
                    {donation.recipient_type.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={donation.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600"
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
            <p key={d.id} className="text-xs text-gray-500 italic">
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
  return `$${amount.toLocaleString()}`
}
