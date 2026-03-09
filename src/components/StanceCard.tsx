'use client'

import { ExternalLink } from 'lucide-react'
import { Stance } from '@/lib/types'
import { TOPICS, POSITION_COLORS, POSITION_LABELS, SOURCE_LABELS } from '@/lib/constants'
import Link from 'next/link'

interface StanceCardProps {
  stance: Stance
  showEntity?: boolean
  entityName?: string
  entitySlug?: string
}

export function StanceCard({ stance, showEntity, entityName, entitySlug }: StanceCardProps) {
  const topic = TOPICS[stance.topic as keyof typeof TOPICS]
  const positionColors = POSITION_COLORS[stance.position]

  const formattedDate = stance.stance_date
    ? new Date(stance.stance_date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    : null

  return (
    <div className={`rounded-lg border ${positionColors.border} ${positionColors.bg} p-4`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg">{topic?.icon || '📌'}</span>
            <Link
              href={`/topic/${stance.topic}`}
              className="font-semibold text-gray-900 hover:underline"
            >
              {topic?.name || stance.topic}
            </Link>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${positionColors.bg} ${positionColors.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${positionColors.dot}`} />
              {POSITION_LABELS[stance.position]}
            </span>
            {formattedDate && (
              <span className="text-xs text-gray-500">{formattedDate}</span>
            )}
          </div>

          {showEntity && entityName && entitySlug && (
            <Link
              href={`/${stance.entity_type}/${entitySlug}`}
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline mt-1 block"
            >
              {entityName}
            </Link>
          )}

          <p className="mt-2 text-sm text-gray-700 leading-relaxed">{stance.summary}</p>

          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <span className="font-medium">Source:</span>
              {SOURCE_LABELS[stance.source_type as keyof typeof SOURCE_LABELS] || stance.source_type}
            </span>
            {stance.verified && (
              <span className="inline-flex items-center gap-1 text-green-600">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified
              </span>
            )}
            <Link
              href={`/stance/${stance.id}`}
              className="ml-auto text-gray-400 hover:text-[#FF6B35] transition-colors"
              title="Share this receipt"
            >
              Share
            </Link>
          </div>
        </div>

        <a
          href={stance.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-colors"
          title="View source"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
