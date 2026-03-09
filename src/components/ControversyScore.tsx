'use client'

import { Stance } from '@/lib/types'
import { calculateGrade } from '@/lib/grade'

interface ControversyScoreProps {
  stances: Stance[]
  size?: 'sm' | 'lg'
}

export function ControversyScore({ stances, size = 'lg' }: ControversyScoreProps) {
  const { grade, score, color, label } = calculateGrade(stances)

  if (size === 'sm') {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2"
        style={{ borderColor: color }}
        title={`${label} (${score}/100)`}
      >
        <span className="text-sm font-bold" style={{ color }}>{grade}</span>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    )
  }

  const counts = { supported: 0, opposed: 0, mixed: 0, silent: 0 }
  for (const s of stances) {
    counts[s.position as keyof typeof counts] = (counts[s.position as keyof typeof counts] || 0) + 1
  }
  const total = stances.length

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-4">
        {/* Grade circle */}
        <div
          className="flex flex-col items-center justify-center w-20 h-20 rounded-full border-4"
          style={{ borderColor: color }}
        >
          <span className="text-3xl font-black leading-none" style={{ color }}>{grade}</span>
          <span className="text-[10px] font-semibold text-gray-500 mt-0.5">{score}/100</span>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{label}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Based on {total} documented receipt{total !== 1 ? 's' : ''}
          </p>

          {/* Position breakdown bar */}
          {total > 0 && (
            <div className="mt-3 flex gap-0.5 h-2 rounded-full overflow-hidden">
              {counts.opposed > 0 && (
                <div
                  className="bg-red-500 rounded-l-full"
                  style={{ width: `${(counts.opposed / total) * 100}%` }}
                  title={`${counts.opposed} opposed`}
                />
              )}
              {counts.mixed > 0 && (
                <div
                  className="bg-amber-400"
                  style={{ width: `${(counts.mixed / total) * 100}%` }}
                  title={`${counts.mixed} mixed`}
                />
              )}
              {counts.silent > 0 && (
                <div
                  className="bg-gray-300"
                  style={{ width: `${(counts.silent / total) * 100}%` }}
                  title={`${counts.silent} silent`}
                />
              )}
              {counts.supported > 0 && (
                <div
                  className="bg-green-500 rounded-r-full"
                  style={{ width: `${(counts.supported / total) * 100}%` }}
                  title={`${counts.supported} supported`}
                />
              )}
            </div>
          )}

          {/* Legend */}
          {total > 0 && (
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
              {counts.opposed > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />{counts.opposed} Opposed</span>}
              {counts.mixed > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" />{counts.mixed} Mixed</span>}
              {counts.silent > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300" />{counts.silent} Silent</span>}
              {counts.supported > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />{counts.supported} Supported</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
