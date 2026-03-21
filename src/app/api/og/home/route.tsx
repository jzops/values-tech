import { ImageResponse } from '@vercel/og'
import { companies, people, vcs, stances } from '@/lib/mock-data'

export const runtime = 'edge'

export async function GET() {
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
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', letterSpacing: '1px', color: '#666' }}>{divider}</span>
            <span style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '8px', marginTop: '8px' }}>
              RECEIPTS
            </span>
            <span style={{ fontSize: '48px', fontWeight: 900, color: '#FF6B35', marginTop: '-8px' }}>
              .TECH
            </span>
            <span style={{ fontSize: '14px', letterSpacing: '1px', color: '#666', marginTop: '8px' }}>{divider}</span>
          </div>

          {/* Tagline */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '18px', color: '#555', fontStyle: 'italic', textAlign: 'center' }}>
              Before they send you their receipts, check theirs.
            </span>
          </div>

          {/* Thin divider */}
          <span style={{ fontSize: '12px', color: '#ccc', letterSpacing: '0px', textAlign: 'center' }}>{thinDivider}</span>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px', fontSize: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>COMPANIES TRACKED</span>
              <span style={{ fontWeight: 700 }}>{companies.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>EXECUTIVES TRACKED</span>
              <span style={{ fontWeight: 700 }}>{people.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>VCs TRACKED</span>
              <span style={{ fontWeight: 700 }}>{vcs.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', borderTop: '2px solid #1a1a1a', paddingTop: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '22px' }}>TOTAL RECEIPTS ON FILE</span>
              <span style={{ fontWeight: 700, fontSize: '22px' }}>{stances.length}</span>
            </div>
          </div>

          {/* Thin divider */}
          <span style={{ fontSize: '12px', color: '#ccc', letterSpacing: '0px', textAlign: 'center', marginTop: '20px' }}>{thinDivider}</span>

          {/* Footer */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '14px', color: '#888' }}>
              Check the receipts on tech companies, VCs, and executives.
            </span>
            <span style={{ fontSize: '13px', color: '#bbb', marginTop: '6px', letterSpacing: '2px' }}>
              receipts.tech
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
