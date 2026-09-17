import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getStanceById, getEntityForStance } from '@/lib/mock-data'
import { TOPICS, POSITION_LABELS, SOURCE_LABELS } from '@/lib/constants'
import { OG, POSITION_HEX, ogFonts, OG_HEADERS, clamp } from '@/lib/og'

export const runtime = 'nodejs'

/** Summary type shrinks as the claim gets longer so the block always fills. */
function summarySize(len: number): number {
  if (len <= 110) return 42
  if (len <= 180) return 36
  if (len <= 250) return 31
  return 27
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const stance = getStanceById(id)
  if (!stance) return new Response('Not found', { status: 404 })

  const entity = getEntityForStance(stance)
  const topic = TOPICS[stance.topic as keyof typeof TOPICS]
  const color = POSITION_HEX[stance.position] || OG.silent

  const summary = clamp(stance.summary, 300)
  const dateStr = stance.stance_date
    ? new Date(stance.stance_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
    : null

  const sourceLabel =
    SOURCE_LABELS[stance.source_type as keyof typeof SOURCE_LABELS] || stance.source_type

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: OG.ink,
          fontFamily: 'Inter',
          color: OG.paper,
          position: 'relative',
        }}
      >
        {/* Verdict-tinted bloom */}
        <div
          style={{
            position: 'absolute',
            top: -280,
            right: -180,
            width: 820,
            height: 820,
            borderRadius: 820,
            background: `radial-gradient(circle, ${color}1F, ${color}00 63%)`,
            display: 'flex',
          }}
        />

        {/* Verdict spine down the left edge */}
        <div
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 10, backgroundColor: color, display: 'flex' }}
        />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '28px 56px 28px 62px',
            borderBottom: `1px solid ${OG.line}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', width: 6, height: 30, backgroundColor: OG.accent, marginRight: 16 }} />
            <span style={{ fontSize: 25, fontWeight: 900, letterSpacing: 1 }}>RECEIPTS</span>
            <span style={{ fontSize: 25, fontWeight: 900, letterSpacing: 1, color: OG.accent }}>.TECH</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: `3px solid ${color}`,
              borderRadius: 10,
              padding: '7px 20px',
            }}
          >
            <span style={{ fontSize: 26, fontWeight: 900, color, letterSpacing: 2 }}>
              {POSITION_LABELS[stance.position].toUpperCase()}
            </span>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            padding: '0 56px 0 62px',
          }}
        >
          {/* Topic + date */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Mono', fontSize: 19, letterSpacing: 2.5, color }}>
              {(topic?.name || stance.topic).toUpperCase()}
            </span>
            {dateStr && (
              <span style={{ fontFamily: 'Mono', fontSize: 19, letterSpacing: 2.5, color: OG.mute, marginLeft: 16 }}>
                · {dateStr}
              </span>
            )}
          </div>

          {/* Entity */}
          <span style={{ fontSize: 58, fontWeight: 900, letterSpacing: -2, lineHeight: 1.08, marginTop: 12 }}>
            {clamp(entity.name, 34)}
          </span>

          {/* The claim */}
          <span
            style={{
              fontSize: summarySize(summary.length),
              fontWeight: 500,
              color: OG.dim,
              lineHeight: 1.38,
              marginTop: 22,
            }}
          >
            {summary}
          </span>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 56px 20px 62px',
            borderTop: `1px solid ${OG.line}`,
            backgroundColor: OG.raised,
          }}
        >
          <span style={{ fontFamily: 'Mono', fontSize: 21, color: OG.accent, letterSpacing: 2 }}>
            reciepts.tech
          </span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Mono', fontSize: 18, letterSpacing: 1.5, color: OG.mute }}>
              SOURCE: {sourceLabel.toUpperCase()}
            </span>
            {stance.verified && (
              <span
                style={{
                  fontFamily: 'Mono',
                  fontSize: 18,
                  letterSpacing: 1.5,
                  color: OG.supported,
                  marginLeft: 18,
                }}
              >
                ✓ VERIFIED
              </span>
            )}
          </div>
        </div>
      </div>
    ),
    { width: OG.W, height: OG.H, fonts: await ogFonts(), headers: OG_HEADERS }
  )
}
