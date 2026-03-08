'use client'

import { TrendingDown, DollarSign, Building2 } from 'lucide-react'
import { Stat, Donation } from '@/lib/types'

interface StatsSummaryProps {
  stats: Stat[]
  donations: Donation[]
}

export function StatsSummary({ stats, donations }: StatsSummaryProps) {
  // Aggregate key metrics
  const totalLayoffs = stats
    .filter(s => s.stat_type === 'layoffs')
    .reduce((sum, s) => sum + (s.numeric_value || 0), 0)

  const latestLayoffDate = stats
    .filter(s => s.stat_type === 'layoffs' && s.stat_date)
    .sort((a, b) => new Date(b.stat_date!).getTime() - new Date(a.stat_date!).getTime())[0]?.stat_date

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0)

  const govContracts = stats.filter(s => s.stat_type === 'government_contracts')
  const totalContractValue = govContracts.reduce((sum, s) => sum + (s.monetary_value || 0), 0)

  const latestCompensation = stats
    .filter(s => s.stat_type === 'exec_compensation')
    .sort((a, b) => new Date(b.stat_date!).getTime() - new Date(a.stat_date!).getTime())[0]

  // Only show if we have data
  if (stats.length === 0 && donations.length === 0) return null

  const cards = []

  if (totalLayoffs > 0) {
    cards.push(
      <SummaryCard
        key="layoffs"
        icon={<TrendingDown className="w-5 h-5 text-gray-600" />}
        label="Total Layoffs"
        value={totalLayoffs.toLocaleString()}
        subtext={latestLayoffDate ? `Last: ${formatDate(latestLayoffDate)}` : undefined}
      />
    )
  }

  if (totalDonations > 0) {
    cards.push(
      <SummaryCard
        key="donations"
        icon={<DollarSign className="w-5 h-5 text-gray-600" />}
        label="Political Donations"
        value={formatCurrency(totalDonations)}
        subtext={`${donations.length} donation${donations.length !== 1 ? 's' : ''}`}
      />
    )
  }

  if (totalContractValue > 0) {
    cards.push(
      <SummaryCard
        key="contracts"
        icon={<Building2 className="w-5 h-5 text-gray-600" />}
        label="Gov't Contracts"
        value={formatCurrency(totalContractValue)}
        subtext={`${govContracts.length} contract${govContracts.length !== 1 ? 's' : ''}`}
      />
    )
  }

  if (latestCompensation?.monetary_value) {
    cards.push(
      <SummaryCard
        key="compensation"
        icon={<DollarSign className="w-5 h-5 text-gray-600" />}
        label="CEO Compensation"
        value={formatCurrency(latestCompensation.monetary_value)}
        subtext={latestCompensation.stat_date ? formatDate(latestCompensation.stat_date) : undefined}
      />
    )
  }

  if (cards.length === 0) return null

  return (
    <div className="bg-gray-100 rounded-xl p-6 mb-8">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Key Stats
      </h3>
      <div className={`grid gap-4 ${cards.length === 1 ? 'grid-cols-1' : cards.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
        {cards}
      </div>
    </div>
  )
}

function SummaryCard({ icon, label, value, subtext }: {
  icon: React.ReactNode
  label: string
  value: string
  subtext?: string
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
    </div>
  )
}

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`
  return `$${amount.toLocaleString()}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
