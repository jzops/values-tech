import { Stance } from './types'

export type Grade = 'A' | 'B' | 'C' | 'D' | 'F'
export type Confidence = 'low' | 'medium' | 'high'
export type GradeFlag = 'epstein'

export interface GradeResult {
  /**
   * Display glyph only — 'A'..'F' when rated, an em dash when not.
   * Always a single character so it fits the fixed-size boxes on the profile
   * hero and the 168px OG card, which do not shrink to fit.
   */
  grade: Grade | '—'
  /** Use this for logic. null when unrated. */
  letter: Grade | null
  rated: boolean
  /** null when unrated — every consumer must guard before rendering. */
  score: number | null
  /** Never null, so sort comparators stay consistent. Neutral 50 when unrated. */
  sortScore: number
  color: string
  /** Long form: 'Clean record' … 'Insufficient evidence'. */
  label: string
  /** ≤ 8 chars, for badges that stack a label inside a circle. */
  shortLabel: string
  confidence: Confidence | null
  evidence: {
    receipts: number
    /** The grading unit: distinct topics, not raw receipt count. */
    scoredTopics: number
  }
  flags: GradeFlag[]
  unratedReason: 'no_data' | 'thin_record' | null
}

/**
 * An entity is graded on ISSUES, not articles.
 *
 * Receipts are averaged within a topic first, then topics are averaged. Without
 * this, whoever got more press coverage scores worse for the same conduct —
 * roughly 180 receipts in the corpus are same-entity/same-topic/same-position
 * restatements of one story.
 */
const POSITION_VALUE: Record<string, number> = {
  opposed: 0,
  mixed: 50,
  silent: 45,
  supported: 100,
}

/**
 * Minimum evidence before we put a letter on someone.
 *
 * Both conditions matter: 3 receipts confined to a single topic is one story,
 * not a pattern. Below this the entity renders as explicitly unrated rather
 * than being handed a middling C, which is what the old code did — it returned
 * `C / 50 / 'No Data'` for the 322 entities with no receipts at all, visually
 * identical to a genuinely mixed record.
 */
const MIN_RECEIPTS = 3
const MIN_TOPICS = 2

/** One neutral pseudo-issue. Pulls thin records toward the middle so the
 *  extremes have to be earned across several documented issues. */
const SMOOTHING = 1

const GRADE_COLORS: Record<Grade, string> = {
  A: '#22c55e',
  B: '#84cc16',
  C: '#f59e0b',
  D: '#f97316',
  F: '#ef4444',
}
const UNRATED_COLOR = '#6E6E7A'

const GRADE_LABELS: Record<Grade, string> = {
  A: 'Clean record',
  B: 'Minor issues',
  C: 'Mixed record',
  D: 'Concerning',
  F: 'Major issues',
}

function letterFor(score: number): Grade {
  if (score >= 70) return 'A'
  if (score >= 55) return 'B'
  if (score >= 40) return 'C'
  if (score >= 25) return 'D'
  return 'F'
}

function confidenceFor(topics: number): Confidence {
  if (topics >= 6) return 'high'
  if (topics >= 4) return 'medium'
  return 'low'
}

function unrated(reason: 'no_data' | 'thin_record', receipts: number, topics: number): GradeResult {
  return {
    grade: '—',
    letter: null,
    rated: false,
    score: null,
    sortScore: 50,
    color: UNRATED_COLOR,
    label: reason === 'no_data' ? 'No receipts on file' : 'Insufficient evidence',
    shortLabel: reason === 'no_data' ? 'NO DATA' : 'UNRATED',
    confidence: null,
    evidence: { receipts, scoredTopics: topics },
    flags: [],
    unratedReason: reason,
  }
}

export function calculateGrade(stances: Stance[]): GradeResult {
  const byTopic = new Map<string, number[]>()
  for (const s of stances) {
    const value = POSITION_VALUE[s.position]
    if (value === undefined) continue
    const bucket = byTopic.get(s.topic)
    if (bucket) bucket.push(value)
    else byTopic.set(s.topic, [value])
  }

  const receipts = stances.length
  const topics = byTopic.size

  // A documented Epstein connection is a categorical disqualifier and bypasses
  // the evidence gate — otherwise the people with exactly two such receipts
  // would render "Insufficient evidence", which reads as a cover-up.
  //
  // This MUST key on `opposed` only. The topic is also used to record the
  // ABSENCE of a connection (filed as `mixed`), e.g. "Safra Catz no Epstein
  // connections documented". Keying on anything looser published that person as
  // "F — Epstein Connection" across her profile, the board, her share card and
  // the page description. See src/lib/data-integrity.ts for the standing check.
  const hasEpsteinConnection = stances.some(
    s => s.topic === 'epstein' && s.position === 'opposed'
  )

  if (receipts === 0) return unrated('no_data', 0, 0)

  if (!hasEpsteinConnection && (receipts < MIN_RECEIPTS || topics < MIN_TOPICS)) {
    return unrated('thin_record', receipts, topics)
  }

  // Issue-level rollup, then smooth toward neutral.
  const topicMeans = [...byTopic.values()].map(v => v.reduce((a, b) => a + b, 0) / v.length)
  const raw = topicMeans.reduce((a, b) => a + b, 0) / topicMeans.length
  let score = Math.round((raw * topics + 50 * SMOOTHING) / (topics + SMOOTHING))

  // Cap rather than zero, so the number still reflects the wider record.
  if (hasEpsteinConnection) score = Math.min(score, 15)

  score = Math.max(0, Math.min(100, score))
  const letter = letterFor(score)

  return {
    grade: letter,
    letter,
    rated: true,
    score,
    sortScore: score,
    color: GRADE_COLORS[letter],
    label: hasEpsteinConnection ? 'Named in Epstein files' : GRADE_LABELS[letter],
    shortLabel: hasEpsteinConnection ? 'EPSTEIN' : GRADE_LABELS[letter].toUpperCase(),
    confidence: confidenceFor(topics),
    evidence: { receipts, scoredTopics: topics },
    flags: hasEpsteinConnection ? ['epstein'] : [],
    unratedReason: null,
  }
}
