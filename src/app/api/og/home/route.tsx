import { ImageResponse } from '@vercel/og'
import { getBoard, getSiteStats } from '@/lib/board'
import { OG, ogFonts, OG_HEADERS, clamp } from '@/lib/og'

export const runtime = 'nodejs'

const TYPE_LABEL: Record<string, string> = {
  company: 'COMPANY',
  person: 'EXEC',
  vc: 'VC',
}

/**
 * The homepage card shows the actual top of the board rather than a tagline.
 * Someone scrolling past should be able to read four real names and a grade
 * without clicking — that is the hook.
 */
export async function GET() {
  const stats = getSiteStats()
  const top = getBoard(2).slice(0, 4)

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
            top: -300,
            left: -200,
            width: 900,
            height: 900,
            borderRadius: 900,
            background: `radial-gradient(circle, ${OG.accent}1F, ${OG.accent}00 62%)`,
            display: 'flex',
          }}
        />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '28px 56px',
            borderBottom: `1px solid ${OG.line}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', width: 6, height: 30, backgroundColor: OG.accent, marginRight: 16 }} />
            <span style={{ fontSize: 25, fontWeight: 900, letterSpacing: 1 }}>RECEIPTS</span>
            <span style={{ fontSize: 25, fontWeight: 900, letterSpacing: 1, color: OG.accent }}>.TECH</span>
          </div>
          <span style={{ fontFamily: 'Mono', fontSize: 20, color: OG.mute, letterSpacing: 2 }}>
            {stats.receipts.toLocaleString('en-US')} RECEIPTS ON FILE
          </span>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flex: 1, padding: '34px 56px 0' }}>
          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', width: 470, paddingRight: 44 }}>
            <span style={{ fontSize: 56, fontWeight: 900, letterSpacing: -2.2, lineHeight: 1.04 }}>
              Before they send you their receipts,
            </span>
            <span style={{ fontSize: 56, fontWeight: 900, letterSpacing: -2.2, lineHeight: 1.04, color: OG.accent }}>
              check theirs.
            </span>
            <span style={{ fontSize: 23, color: OG.dim, marginTop: 20, lineHeight: 1.4 }}>
              {stats.companies} companies · {stats.people} execs · {stats.vcs} VCs
            </span>
          </div>

          {/* Live board */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span style={{ fontFamily: 'Mono', fontSize: 17, letterSpacing: 2.5, color: OG.mute, marginBottom: 14 }}>
              RANKED BY PAPER TRAIL
            </span>

            {top.map((row, i) => (
              <div
                key={row.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '13px 16px',
                  marginBottom: 9,
                  borderRadius: 12,
                  backgroundColor: OG.raised,
                  border: `1px solid ${OG.line}`,
                }}
              >
                <span style={{ fontFamily: 'Mono', fontSize: 19, color: OG.mute, width: 38 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: 27, fontWeight: 700, lineHeight: 1.15 }}>
                    {clamp(row.name, 22)}
                  </span>
                  <span style={{ fontFamily: 'Mono', fontSize: 14, letterSpacing: 1.5, color: OG.mute, marginTop: 3 }}>
                    {TYPE_LABEL[row.entityType]} · {row.receipts} RECEIPTS
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 46,
                    height: 46,
                    borderRadius: 10,
                    border: `3px solid ${row.grade.color}`,
                    backgroundColor: `${row.grade.color}1A`,
                  }}
                >
                  <span style={{ fontSize: 28, fontWeight: 900, color: row.grade.color }}>
                    {row.grade.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
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
          <span style={{ fontSize: 21, color: OG.mute }}>
            Every line links to a public source.
          </span>
        </div>
      </div>
    ),
    { width: OG.W, height: OG.H, fonts: await ogFonts(), headers: OG_HEADERS }
  )
}
