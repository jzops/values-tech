import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getStancesByTopic, getEntityForStance } from '@/lib/mock-data'
import { TOPICS } from '@/lib/constants'
import { OG, ogFonts, OG_HEADERS, clamp } from '@/lib/og'

export const runtime = 'nodejs'

/**
 * Topic cards. "Everyone flagged on Palestine" is one of the most shareable
 * units on the site, and it was falling back to the generic homepage card —
 * so every topic link looked identical in a feed.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const topic = TOPICS[id as keyof typeof TOPICS]
  if (!topic) return new Response('Unknown topic', { status: 404 })

  const stances = getStancesByTopic(id)
  const opposed = stances.filter(s => s.position === 'opposed')

  // The names a reader will recognise: entities with the most against them.
  const counts = new Map<string, number>()
  for (const s of opposed) {
    const name = getEntityForStance(s).name
    counts.set(name, (counts.get(name) || 0) + 1)
  }
  const worst = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
  const entities = new Set(stances.map(s => `${s.entity_type}:${s.entity_id}`)).size

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        backgroundColor: OG.ink, fontFamily: 'Inter', color: OG.paper, position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: -280, left: -180, width: 840, height: 840, borderRadius: 840,
          background: `radial-gradient(circle, ${OG.opposed}1F, ${OG.opposed}00 62%)`, display: 'flex',
        }} />

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '30px 56px', borderBottom: `1px solid ${OG.line}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', width: 6, height: 30, backgroundColor: OG.accent, marginRight: 16 }} />
            <span style={{ fontSize: 25, fontWeight: 900, letterSpacing: 1 }}>RECEIPTS</span>
            <span style={{ fontSize: 25, fontWeight: 900, letterSpacing: 1, color: OG.accent }}>.TECH</span>
          </div>
          <span style={{ fontFamily: 'Mono', fontSize: 20, color: OG.mute, letterSpacing: 2 }}>
            WHO&apos;S ON RECORD
          </span>
        </div>

        <div style={{ display: 'flex', flex: 1, alignItems: 'center', padding: '0 56px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: 500, paddingRight: 44 }}>
            <span style={{ fontSize: 78, fontWeight: 900, letterSpacing: -3, lineHeight: 1.02 }}>
              {clamp(topic.name, 22)}
            </span>
            <div style={{ display: 'flex', marginTop: 30 }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: 170 }}>
                <span style={{ fontSize: 60, fontWeight: 900, lineHeight: 1 }}>{stances.length}</span>
                <span style={{ fontFamily: 'Mono', fontSize: 16, letterSpacing: 2, color: OG.mute, marginTop: 8 }}>
                  RECEIPTS
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 60, fontWeight: 900, lineHeight: 1, color: OG.opposed }}>
                  {opposed.length}
                </span>
                <span style={{ fontFamily: 'Mono', fontSize: 16, letterSpacing: 2, color: OG.mute, marginTop: 8 }}>
                  AGAINST
                </span>
              </div>
            </div>
            <span style={{ fontSize: 22, color: OG.dim, marginTop: 26 }}>
              across {entities} companies, execs and funds
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span style={{ fontFamily: 'Mono', fontSize: 17, letterSpacing: 2.5, color: OG.mute, marginBottom: 14 }}>
              MOST ON RECORD
            </span>
            {worst.map(([name, n], i) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', padding: '11px 16px', marginBottom: 8,
                borderRadius: 11, backgroundColor: OG.raised, border: `1px solid ${OG.line}`,
              }}>
                <span style={{ fontFamily: 'Mono', fontSize: 17, color: OG.mute, width: 34 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 26, fontWeight: 700, flex: 1 }}>{clamp(name, 24)}</span>
                <span style={{ fontSize: 24, fontWeight: 900, color: OG.opposed }}>×{n}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 56px', borderTop: `1px solid ${OG.line}`, backgroundColor: OG.raised,
        }}>
          <span style={{ fontFamily: 'Mono', fontSize: 21, color: OG.accent, letterSpacing: 2 }}>
            reciepts.tech/topic/{id}
          </span>
          <span style={{ fontSize: 21, color: OG.mute }}>Every line links to a public source.</span>
        </div>
      </div>
    ),
    { width: OG.W, height: OG.H, fonts: await ogFonts(), headers: OG_HEADERS }
  )
}
