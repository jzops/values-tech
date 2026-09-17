import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getSiteStats } from '@/lib/board'
import { OG, ogFonts, OG_HEADERS, clamp } from '@/lib/og'

export const runtime = 'nodejs'

/** Generic card for list pages: ?title=Companies&description=… */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = clamp(searchParams.get('title') || 'Receipts.Tech', 34)
  const description = clamp(
    searchParams.get('description') || 'Check the receipts before you take the money.',
    130
  )
  const stats = getSiteStats()

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
        <div
          style={{
            position: 'absolute',
            top: -280,
            left: -180,
            width: 860,
            height: 860,
            borderRadius: 860,
            background: `radial-gradient(circle, ${OG.accent}1F, ${OG.accent}00 62%)`,
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '30px 56px',
            borderBottom: `1px solid ${OG.line}`,
          }}
        >
          <div style={{ display: 'flex', width: 6, height: 30, backgroundColor: OG.accent, marginRight: 16 }} />
          <span style={{ fontSize: 25, fontWeight: 900, letterSpacing: 1 }}>RECEIPTS</span>
          <span style={{ fontSize: 25, fontWeight: 900, letterSpacing: 1, color: OG.accent }}>.TECH</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            padding: '0 56px',
          }}
        >
          <span style={{ fontSize: 94, fontWeight: 900, letterSpacing: -3.5, lineHeight: 1.02 }}>
            {title}
          </span>
          <span style={{ fontSize: 30, color: OG.dim, lineHeight: 1.42, marginTop: 22, maxWidth: 960 }}>
            {description}
          </span>

          <div style={{ display: 'flex', marginTop: 38 }}>
            {[
              { n: stats.receipts.toLocaleString('en-US'), l: 'RECEIPTS' },
              { n: String(stats.companies), l: 'COMPANIES' },
              { n: String(stats.people), l: 'EXECS' },
              { n: String(stats.vcs), l: 'VCS' },
            ].map(s => (
              <div key={s.l} style={{ display: 'flex', flexDirection: 'column', width: 210 }}>
                <span style={{ fontSize: 46, fontWeight: 900, lineHeight: 1 }}>{s.n}</span>
                <span
                  style={{ fontFamily: 'Mono', fontSize: 16, letterSpacing: 2, color: OG.mute, marginTop: 8 }}
                >
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 56px',
            borderTop: `1px solid ${OG.line}`,
            backgroundColor: OG.raised,
          }}
        >
          <span style={{ fontFamily: 'Mono', fontSize: 21, color: OG.accent, letterSpacing: 2 }}>
            reciepts.tech
          </span>
          <span style={{ fontSize: 21, color: OG.mute }}>Every line links to a public source.</span>
        </div>
      </div>
    ),
    { width: OG.W, height: OG.H, fonts: await ogFonts(), headers: OG_HEADERS }
  )
}
