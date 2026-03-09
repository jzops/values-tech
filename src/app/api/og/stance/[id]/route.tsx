import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getStanceById, getEntityForStance } from '@/lib/mock-data'
import { TOPICS } from '@/lib/constants'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const stance = getStanceById(id)

  if (!stance) {
    return new Response('Stance not found', { status: 404 })
  }

  const entity = getEntityForStance(stance)
  const topic = TOPICS[stance.topic as keyof typeof TOPICS]
  const topicName = topic?.name || stance.topic
  const topicIcon = topic?.icon || '📋'

  const posText = stance.position.toUpperCase()
  const posColor =
    stance.position === 'opposed' ? '#ef4444' :
    stance.position === 'supported' ? '#22c55e' :
    stance.position === 'mixed' ? '#f59e0b' : '#9ca3af'

  const dateStr = stance.stance_date
    ? new Date(stance.stance_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    : 'N/A'

  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  const divider = '═'.repeat(40)
  const thinDivider = '─'.repeat(40)

  // Wrap summary text for display
  const summary = stance.summary.length > 200 ? stance.summary.slice(0, 197) + '...' : stance.summary

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
            padding: '40px 56px',
            fontFamily: 'monospace',
            color: '#1a1a1a',
            position: 'relative',
            borderTop: '4px dashed #ccc',
            borderBottom: '4px dashed #ccc',
          }}
        >
          {/* Position stamp */}
          <div
            style={{
              position: 'absolute',
              top: '32px',
              right: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '140px',
              height: '60px',
              border: `4px solid ${posColor}`,
              borderRadius: '8px',
              transform: 'rotate(-6deg)',
              opacity: 0.85,
            }}
          >
            <span style={{ fontSize: '24px', fontWeight: 900, color: posColor, letterSpacing: '2px' }}>
              {posText}
            </span>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', letterSpacing: '1px', color: '#666' }}>{divider}</span>
            <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '6px', marginTop: '4px' }}>
              SINGLE RECEIPT
            </span>
            <span style={{ fontSize: '14px', color: '#888', marginTop: '2px' }}>
              Receipts.Tech
            </span>
            <span style={{ fontSize: '14px', letterSpacing: '1px', color: '#666', marginTop: '4px' }}>{divider}</span>
          </div>

          {/* Entity & meta info */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888' }}>
              <span>DATE: {dateStr}</span>
              <span>TIME: {timeStr}</span>
            </div>
            <span style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px', maxWidth: '70%' }}>
              {entity.name}
            </span>
          </div>

          {/* Thin divider */}
          <span style={{ fontSize: '12px', color: '#ccc', letterSpacing: '0px' }}>{thinDivider}</span>

          {/* Topic line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '20px', fontWeight: 700 }}>
            <span>{topicIcon}</span>
            <span>{topicName}</span>
          </div>

          {/* Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '16px', flex: 1 }}>
            <span style={{ fontSize: '18px', color: '#333', lineHeight: 1.5 }}>
              {summary}
            </span>
          </div>

          {/* Source */}
          {stance.source_url && (
            <div style={{ display: 'flex', marginTop: '12px' }}>
              <span style={{ fontSize: '12px', color: '#999' }}>
                SOURCE: {stance.source_url.length > 60 ? stance.source_url.slice(0, 57) + '...' : stance.source_url}
              </span>
            </div>
          )}

          {/* Thin divider */}
          <span style={{ fontSize: '12px', color: '#ccc', letterSpacing: '0px', marginTop: '12px' }}>{thinDivider}</span>

          {/* Footer */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '12px' }}>
            <span style={{ fontSize: '11px', color: '#999', fontStyle: 'italic' }}>
              Before they send you their receipts, check theirs.
            </span>
            <span style={{ fontSize: '11px', color: '#bbb', marginTop: '4px', letterSpacing: '2px' }}>
              reciepts.tech/stance/{id}
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
