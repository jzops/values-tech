import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getBoardRow, getBoardRank } from '@/lib/board'
import { TOPICS } from '@/lib/constants'
import { OG, POSITION_HEX, ogFonts, OG_HEADERS, clamp, nameSize } from '@/lib/og'
import type { EntityType } from '@/lib/types'

export const runtime = 'nodejs'

const TYPE_LABEL: Record<EntityType, string> = {
  company: 'Company',
  person: 'Executive',
  vc: 'Venture Fund',
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  const { type, slug } = await params

  if (type !== 'company' && type !== 'person' && type !== 'vc') {
    return new Response('Unknown entity type', { status: 404 })
  }

  const row = getBoardRow(type, slug)
  if (!row) return new Response('Not found', { status: 404 })

  const rank = getBoardRank(type, row.id)
  const { grade } = row

  // Up to three topics this entity is flagged on, heaviest first.
  const flags = Object.entries(
    row.stances.reduce<Record<string, number>>((acc, s) => {
      if (s.position === 'opposed') acc[s.topic] = (acc[s.topic] || 0) + 1
      return acc
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, count]) => ({
      name: TOPICS[id as keyof typeof TOPICS]?.name || id,
      count,
    }))

  const total = row.receipts || 1
  const bar = [
    { c: POSITION_HEX.opposed, n: row.counts.opposed },
    { c: POSITION_HEX.mixed, n: row.counts.mixed },
    { c: POSITION_HEX.silent, n: row.counts.silent },
    { c: POSITION_HEX.supported, n: row.counts.supported },
  ].filter(s => s.n > 0)

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
        {/* Grade-tinted bloom, keyed to the verdict */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            left: -160,
            width: 760,
            height: 760,
            borderRadius: 760,
            background: `radial-gradient(circle, ${grade.color}22, ${grade.color}00 65%)`,
            display: 'flex',
          }}
        />

        {/* ── Header ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '30px 56px',
            borderBottom: `1px solid ${OG.line}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', width: 6, height: 30, backgroundColor: OG.accent, marginRight: 16 }} />
            <span style={{ fontSize: 25, fontWeight: 900, letterSpacing: 1 }}>RECEIPTS</span>
            <span style={{ fontSize: 25, fontWeight: 900, letterSpacing: 1, color: OG.accent }}>.TECH</span>
          </div>
          {rank !== null && rank <= 50 && (
            <span style={{ fontFamily: 'Mono', fontSize: 20, color: OG.mute, letterSpacing: 2 }}>
              #{rank} ON THE BOARD
            </span>
          )}
        </div>

        {/* ── Body ── */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', padding: '0 56px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Grade block */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 168,
                height: 168,
                borderRadius: 26,
                border: `6px solid ${grade.color}`,
                backgroundColor: `${grade.color}1A`,
                marginRight: 40,
              }}
            >
              <span style={{ fontSize: 112, fontWeight: 900, color: grade.color, lineHeight: 1 }}>
                {grade.grade}
              </span>
            </div>

            {/* Name + meta */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span
                style={{
                  fontSize: nameSize(row.name),
                  fontWeight: 900,
                  letterSpacing: -2,
                  lineHeight: 1.05,
                }}
              >
                {clamp(row.name, 38)}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 14 }}>
                <span
                  style={{
                    fontFamily: 'Mono',
                    fontSize: 19,
                    letterSpacing: 2,
                    color: OG.ink,
                    backgroundColor: OG.dim,
                    padding: '5px 12px',
                    borderRadius: 6,
                  }}
                >
                  {TYPE_LABEL[type].toUpperCase()}
                </span>
                <span style={{ fontSize: 26, color: OG.dim, marginLeft: 16 }}>
                  {clamp(grade.label, 30)}
                </span>
              </div>
            </div>
          </div>

          {/* Verdict bar */}
          <div style={{ display: 'flex', width: '100%', height: 10, borderRadius: 6, overflow: 'hidden', marginTop: 40, backgroundColor: OG.raised }}>
            {bar.map((s, i) => (
              <div key={i} style={{ display: 'flex', width: `${(s.n / total) * 100}%`, backgroundColor: s.c }} />
            ))}
          </div>

          {/* Numbers */}
          <div style={{ display: 'flex', marginTop: 38 }}>
            <Stat value={String(row.receipts)} label="Receipts on file" />
            <Stat value={String(row.counts.opposed)} label="Count against" color={OG.opposed} />
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span style={{ fontFamily: 'Mono', fontSize: 17, letterSpacing: 2, color: OG.mute }}>
                FLAGGED ON
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 12 }}>
                {flags.length > 0 ? (
                  flags.map(f => (
                    <div
                      key={f.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: `1px solid ${OG.line}`,
                        backgroundColor: OG.raised,
                        borderRadius: 8,
                        padding: '7px 13px',
                        marginRight: 10,
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontSize: 22, fontWeight: 700 }}>{f.name}</span>
                      <span style={{ fontSize: 20, fontWeight: 700, color: OG.opposed, marginLeft: 9 }}>
                        ×{f.count}
                      </span>
                    </div>
                  ))
                ) : (
                  <span style={{ fontSize: 24, color: OG.dim }}>No receipts against</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '22px 56px',
            borderTop: `1px solid ${OG.line}`,
            backgroundColor: OG.raised,
          }}
        >
          <span style={{ fontFamily: 'Mono', fontSize: 21, color: OG.accent, letterSpacing: 2 }}>
            reciepts.tech
          </span>
          <span style={{ fontSize: 21, color: OG.mute }}>
            Every line links to a public source.
          </span>
        </div>
      </div>
    ),
    {
      width: OG.W,
      height: OG.H,
      fonts: await ogFonts(),
      headers: OG_HEADERS,
    }
  )
}

function Stat({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 232, paddingRight: 20 }}>
      <span style={{ fontFamily: 'Mono', fontSize: 17, letterSpacing: 2, color: OG.mute }}>
        {label.toUpperCase()}
      </span>
      <span style={{ fontSize: 66, fontWeight: 900, lineHeight: 1.1, marginTop: 6, color: color || OG.paper }}>
        {value}
      </span>
    </div>
  )
}
