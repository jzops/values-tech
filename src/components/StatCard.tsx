'use client'

import { ExternalLink } from 'lucide-react'
import { Stat } from '@/lib/types'
import { STAT_TYPE_CONFIG, SOURCE_LABELS } from '@/lib/constants'

interface StatCardProps {
  stat: Stat
}

export function StatCard({ stat }: StatCardProps) {
  const config = STAT_TYPE_CONFIG[stat.stat_type as keyof typeof STAT_TYPE_CONFIG]

  const formattedDate = stat.stat_date
    ? new Date(stat.stat_date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    : null

  const sourceLabel = SOURCE_LABELS[stat.source_type as keyof typeof SOURCE_LABELS] || stat.source_type

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg">{config?.icon || '📊'}</span>
            <span className="font-semibold text-gray-900">
              {config?.name || stat.stat_type}
            </span>
            {formattedDate && (
              <span className="text-xs text-gray-500">{formattedDate}</span>
            )}
          </div>

          {/* Headline with numbers */}
          <p className="mt-2 text-lg font-medium text-gray-900">{stat.headline}</p>

          {/* Details */}
          <p className="mt-1 text-sm text-gray-600 leading-relaxed">{stat.details}</p>

          {/* Numeric breakdown if applicable */}
          {stat.numeric_value !== null && (
            <div className="mt-3 flex items-center gap-4 text-sm">
              <span className="font-mono text-gray-700">
                {stat.numeric_value.toLocaleString()} affected
              </span>
              {stat.percentage_value !== null && (
                <span className="text-gray-500">
                  ({stat.percentage_value}% of workforce)
                </span>
              )}
            </div>
          )}

          {stat.monetary_value !== null && (
            <div className="mt-3 text-sm">
              <span className="font-mono text-gray-700">
                {formatCurrency(stat.monetary_value)}
              </span>
            </div>
          )}

          {/* Source */}
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <span className="font-medium">Source:</span>
            <span>{sourceLabel}</span>
            {stat.verified && (
              <span className="text-green-600">✓ Verified</span>
            )}
          </div>
        </div>

        <a
          href={stat.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`
  return `$${amount.toLocaleString()}`
}
