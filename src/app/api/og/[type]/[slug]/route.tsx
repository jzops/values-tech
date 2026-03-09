import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getCompanyBySlug, getPersonBySlug, getVCBySlug, getStancesForEntity } from '@/lib/mock-data'
import { TOPICS } from '@/lib/constants'
import { calculateGrade } from '@/lib/grade'

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
  const topStances = stances.slice(0, 5)
  const { grade, color: gradeColor, label: gradeLabel } = calculateGrade(stances)

  // Count positions
  const counts = { supported: 0, opposed: 0, mixed: 0, silent: 0 }
  for (const s of stances) {
    counts[s.position as keyof typeof counts] = (counts[s.position as keyof typeof counts] || 0) + 1
  }

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  const divider = '═'.repeat(40)
  const thinDivider = '─'.repeat(40)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e8e4df',
          padding: '24px',
        }}
      >
        {/* Receipt paper */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#FFF8F0',
            padding: '36px 48px',
            fontFamily: 'monospace',
            color: '#1a1a1a',
            position: 'relative',
            borderTop: '4px dashed #ccc',
            borderBottom: '4px dashed #ccc',
          }}
        >
          {/* Grade stamp - rotated colored element */}
          <div
            style={{
              position: 'absolute',
              top: '32px',
              right: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              border: `6px solid ${gradeColor}`,
              borderRadius: '60px',
              transform: 'rotate(-12deg)',
              opacity: 0.85,
            }}
          >
            <span style={{ fontSize: '52px', fontWeight: 900, color: gradeColor, lineHeight: 1 }}>
              {grade}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: gradeColor, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {gradeLabel}
            </span>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', letterSpacing: '1px', color: '#666' }}>{divider}</span>
            <span style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '6px', marginTop: '4px' }}>
              RECEIPT
            </span>
            <span style={{ fontSize: '14px', color: '#888', marginTop: '2px' }}>
              Receipts.Tech
            </span>
            <span style={{ fontSize: '14px', letterSpacing: '1px', color: '#666', marginTop: '4px' }}>{divider}</span>
          </div>

          {/* Entity info */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px', marginTop: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888' }}>
              <span>DATE: {dateStr}</span>
              <span>TIME: {timeStr}</span>
            </div>
            <span style={{ fontSize: '32px', fontWeight: 700, marginTop: '8px', maxWidth: '70%' }}>
              {entity.name}
            </span>
            <span style={{ fontSize: '16px', color: '#666', marginTop: '2px' }}>
              {subtitle}
            </span>
          </div>

          {/* Thin divider */}
          <span style={{ fontSize: '12px', color: '#ccc', letterSpacing: '0px' }}>{thinDivider}</span>

          {/* Line items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px', flex: 1 }}>
            {topStances.map((stance, i) => {
              const topic = TOPICS[stance.topic as keyof typeof TOPICS]
              const posText = stance.position.toUpperCase()
              const topicName = topic?.name || stance.topic
              const dots = '.'.repeat(Math.max(2, 28 - topicName.length - posText.length))

              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <div style={{ display: 'flex', fontSize: '15px', fontWeight: 600 }}>
                    <span>{i + 1}. {topicName}</span>
                    <span style={{ color: '#bbb', margin: '0 4px' }}>{dots}</span>
                    <span>{posText}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#777', paddingLeft: '18px', lineHeight: 1.3 }}>
                    {stance.summary.length > 65 ? stance.summary.slice(0, 62) + '...' : stance.summary}
                  </span>
                </div>
              )
            })}
            {stances.length > 5 && (
              <span style={{ fontSize: '13px', color: '#999', marginTop: '4px' }}>
                + {stances.length - 5} more receipts on file
              </span>
            )}
          </div>

          {/* Thin divider */}
          <span style={{ fontSize: '12px', color: '#ccc', letterSpacing: '0px' }}>{thinDivider}</span>

          {/* Totals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '8px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>OPPOSED</span>
              <span style={{ fontWeight: 700 }}>{counts.opposed}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>MIXED</span>
              <span style={{ fontWeight: 700 }}>{counts.mixed}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>SUPPORTED</span>
              <span style={{ fontWeight: 700 }}>{counts.supported}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', borderTop: '2px solid #1a1a1a', paddingTop: '4px' }}>
              <span style={{ fontWeight: 700, fontSize: '16px' }}>TOTAL RECEIPTS</span>
              <span style={{ fontWeight: 700, fontSize: '16px' }}>{stances.length}</span>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '12px' }}>
            <span style={{ fontSize: '11px', color: '#999', fontStyle: 'italic' }}>
              Before they send you their receipts, check theirs.
            </span>
            <span style={{ fontSize: '11px', color: '#bbb', marginTop: '4px', letterSpacing: '2px' }}>
              reciepts.tech/{type}/{slug}
            </span>
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
