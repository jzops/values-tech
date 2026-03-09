import { Stance } from './types'

export type Grade = 'A' | 'B' | 'C' | 'D' | 'F'

export interface GradeResult {
  grade: Grade
  score: number // 0-100
  color: string
  label: string
}

const GRADE_COLORS: Record<Grade, string> = {
  A: '#22c55e',
  B: '#84cc16',
  C: '#f59e0b',
  D: '#f97316',
  F: '#ef4444',
}

const GRADE_LABELS: Record<Grade, string> = {
  A: 'Clean Record',
  B: 'Minor Issues',
  C: 'Mixed Record',
  D: 'Concerning',
  F: 'Major Issues',
}

export function calculateGrade(stances: Stance[]): GradeResult {
  if (stances.length === 0) {
    return { grade: 'C', score: 50, color: GRADE_COLORS.C, label: 'No Data' }
  }

  const counts = { supported: 0, opposed: 0, mixed: 0, silent: 0 }
  for (const s of stances) {
    counts[s.position as keyof typeof counts] = (counts[s.position as keyof typeof counts] || 0) + 1
  }

  const total = stances.length
  const opposedRatio = counts.opposed / total
  const supportedRatio = counts.supported / total
  const mixedRatio = counts.mixed / total

  // Score: 100 = all supported, 0 = all opposed
  // Supported adds points, opposed subtracts, mixed is neutral
  let score = 50 // baseline
  score += supportedRatio * 40
  score -= opposedRatio * 45
  score -= mixedRatio * 10

  // Volume penalty: more stances with bad positions = worse
  if (total > 10 && opposedRatio > 0.5) score -= 5
  if (total > 20 && opposedRatio > 0.6) score -= 5

  // Clamp
  score = Math.max(0, Math.min(100, Math.round(score)))

  let grade: Grade
  if (score >= 80) grade = 'A'
  else if (score >= 60) grade = 'B'
  else if (score >= 40) grade = 'C'
  else if (score >= 20) grade = 'D'
  else grade = 'F'

  return {
    grade,
    score,
    color: GRADE_COLORS[grade],
    label: GRADE_LABELS[grade],
  }
}
