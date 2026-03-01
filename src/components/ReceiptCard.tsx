'use client'

import { Company, Person, VC, Stance } from '@/lib/types'
import { TOPICS, POSITION_COLORS } from '@/lib/constants'

interface ReceiptCardProps {
  entity: Company | Person | VC
  entityType: 'company' | 'person' | 'vc'
  stances: Stance[]
  variant?: 'square' | 'portrait' | 'landscape'
}

export function ReceiptCard({ entity, entityType, stances, variant = 'square' }: ReceiptCardProps) {
  const aspectClasses = {
    square: 'aspect-square w-[400px]',
    portrait: 'aspect-[4/5] w-[400px]',
    landscape: 'aspect-[16/9] w-[600px]',
  }

  // Get entity details
  const name = entity.name
  const subtitle = entityType === 'person'
    ? (entity as Person).current_role
    : entityType === 'vc'
      ? (entity as VC).aum
      : (entity as Company).industry

  // Get top 3 stances for display
  const topStances = stances.slice(0, 3)

  // Get position color for border
  const dominantPosition = getDominantPosition(stances)
  const borderColor = dominantPosition === 'opposed' ? 'border-red-500'
    : dominantPosition === 'supported' ? 'border-green-500'
    : dominantPosition === 'mixed' ? 'border-amber-500'
    : 'border-gray-400'

  return (
    <div
      className={`${aspectClasses[variant]} bg-white border-4 ${borderColor} rounded-2xl p-6 flex flex-col shadow-xl`}
      id="receipt-card"
    >
      {/* Header */}
      <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-4">
        <span className="text-lg">📑</span>
        <span className="uppercase tracking-wider">Receipt</span>
      </div>

      {/* Entity Info */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">{name}</h2>
        {subtitle && (
          <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
        )}
      </div>

      {/* Stances as bullet points */}
      <div className="flex-1 space-y-3">
        {topStances.map((stance, index) => {
          const topic = TOPICS[stance.topic as keyof typeof TOPICS]
          const positionColor = POSITION_COLORS[stance.position]
          return (
            <div key={stance.id || index} className="flex items-start gap-2">
              <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${positionColor.dot}`} />
              <p className="text-sm text-gray-700 leading-snug line-clamp-2">
                <span className="font-medium">{topic?.name}:</span>{' '}
                {truncateText(stance.summary, 80)}
              </p>
            </div>
          )
        })}
        {stances.length > 3 && (
          <p className="text-xs text-gray-400 pl-4">
            +{stances.length - 3} more receipts
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 italic mb-2">
          Before they send you their receipts, check theirs.
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">receipts.tech</span>
          <span className="text-xs text-gray-400">
            {stances.length} receipt{stances.length !== 1 ? 's' : ''} on file
          </span>
        </div>
      </div>
    </div>
  )
}

// Compact version for previews
export function ReceiptCardMini({ entity, entityType, stances }: Omit<ReceiptCardProps, 'variant'>) {
  const name = entity.name
  const dominantPosition = getDominantPosition(stances)
  const borderColor = dominantPosition === 'opposed' ? 'border-red-500'
    : dominantPosition === 'supported' ? 'border-green-500'
    : dominantPosition === 'mixed' ? 'border-amber-500'
    : 'border-gray-400'

  return (
    <div className={`bg-white border-2 ${borderColor} rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow`}>
      <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-2">
        <span>📑</span>
        <span className="uppercase tracking-wider">Receipt</span>
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-xs text-gray-500">
        {stances.length} receipt{stances.length !== 1 ? 's' : ''} on file
      </p>
    </div>
  )
}

// Helper functions
function getDominantPosition(stances: Stance[]): 'supported' | 'opposed' | 'mixed' | 'silent' {
  if (stances.length === 0) return 'silent'

  const counts = stances.reduce((acc, s) => {
    acc[s.position] = (acc[s.position] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return sorted[0][0] as 'supported' | 'opposed' | 'mixed' | 'silent'
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}
