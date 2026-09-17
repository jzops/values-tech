import { ShareActions } from './ShareActions'
import { TOPICS } from '@/lib/constants'
import { SITE_URL } from '@/lib/site'
import type { Stance, EntityType } from '@/lib/types'
import type { GradeResult } from '@/lib/grade'

interface ShareButtonsProps {
  entityType: EntityType
  entitySlug: string
  entityName: string
  grade: GradeResult
  stances: Stance[]
  opposed: number
}

/**
 * Post text is built to stand on its own — if a client fails to unfurl the
 * card, the tweet still carries the grade, the volume, and the headline flag.
 */
function composePost(
  name: string,
  grade: GradeResult,
  stances: Stance[],
  opposed: number,
  url: string
): string {
  const flags = new Map<string, number>()
  for (const s of stances) {
    if (s.position !== 'opposed') continue
    flags.set(s.topic, (flags.get(s.topic) || 0) + 1)
  }
  const top = [...flags.entries()].sort((a, b) => b[1] - a[1])[0]

  const lines = [
    `${name}: grade ${grade.grade}.`,
    '',
    `${stances.length} receipts on file. ${opposed} against.`,
  ]
  if (top) {
    const topicName = TOPICS[top[0] as keyof typeof TOPICS]?.name || top[0]
    lines.push(`Most flagged: ${topicName} (×${top[1]}).`)
  }
  lines.push('', url)
  return lines.join('\n')
}

export function ShareButtons({
  entityType,
  entitySlug,
  entityName,
  grade,
  stances,
  opposed,
}: ShareButtonsProps) {
  const url = `${SITE_URL}/${entityType}/${entitySlug}`
  return (
    <ShareActions
      post={composePost(entityName, grade, stances, opposed, url)}
      url={url}
      cardUrl={`${SITE_URL}/api/og/${entityType}/${entitySlug}`}
      downloadName={`${entitySlug}-receipts.png`}
    />
  )
}
