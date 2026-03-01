import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getCompanyBySlug, getPersonBySlug, getVCBySlug, getStancesForEntity } from '@/lib/mock-data'
import { TOPICS } from '@/lib/constants'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  const { type, slug } = await params

  let entity: { name: string; id: string; slug: string } | null = null
  let subtitle = ''
  let entityType: 'company' | 'person' | 'vc' = 'company'

  if (type === 'company') {
    const company = getCompanyBySlug(slug)
    if (company) {
      entity = company
      subtitle = company.industry || 'Tech Company'
      entityType = 'company'
    }
  } else if (type === 'person') {
    const person = getPersonBySlug(slug)
    if (person) {
      entity = person
      subtitle = person.current_role || 'Tech Executive'
      entityType = 'person'
    }
  } else if (type === 'vc') {
    const vc = getVCBySlug(slug)
    if (vc) {
      entity = vc
      subtitle = 'Venture Capital'
      entityType = 'vc'
    }
  }

  if (!entity) {
    return new Response('Entity not found', { status: 404 })
  }

  const stances = getStancesForEntity(entityType, entity.id)
  const topStances = stances.slice(0, 4)

  // Determine dominant position for border color
  const positionCounts = stances.reduce((acc, s) => {
    acc[s.position] = (acc[s.position] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const dominantPosition = Object.entries(positionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'silent'

  const borderColor = dominantPosition === 'opposed' ? '#ef4444'
    : dominantPosition === 'supported' ? '#22c55e'
    : dominantPosition === 'mixed' ? '#f59e0b'
    : '#9ca3af'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          padding: '48px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Main card with border */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            border: `6px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '40px',
            backgroundColor: '#fafafa',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px', marginRight: '12px' }}>📑</span>
            <span style={{ fontSize: '24px', fontWeight: 600, color: '#6b7280', letterSpacing: '2px' }}>
              RECEIPT
            </span>
          </div>

          {/* Entity name */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
            <span style={{ fontSize: '48px', fontWeight: 700, color: '#111827' }}>
              {entity.name}
            </span>
            <span style={{ fontSize: '24px', color: '#6b7280', marginTop: '8px' }}>
              {subtitle}
            </span>
          </div>

          {/* Stances list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            {topStances.map((stance, i) => {
              const topic = TOPICS[stance.topic as keyof typeof TOPICS]
              const posColor = stance.position === 'opposed' ? '#dc2626'
                : stance.position === 'supported' ? '#16a34a'
                : stance.position === 'mixed' ? '#d97706'
                : '#6b7280'

              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '24px', color: posColor }}>•</span>
                  <span style={{ fontSize: '22px', color: '#374151', lineHeight: 1.4 }}>
                    {stance.summary.length > 80 ? stance.summary.slice(0, 77) + '...' : stance.summary}
                  </span>
                </div>
              )
            })}
            {stances.length > 4 && (
              <span style={{ fontSize: '20px', color: '#9ca3af', marginTop: '8px' }}>
                + {stances.length - 4} more receipts
              </span>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 'auto',
              paddingTop: '24px',
              borderTop: '2px dashed #e5e7eb',
            }}
          >
            <span style={{ fontSize: '18px', color: '#6b7280', fontStyle: 'italic' }}>
              Before they send you their receipts, check theirs.
            </span>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#111827' }}>receipts</span>
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#FF6B35' }}>.tech</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
