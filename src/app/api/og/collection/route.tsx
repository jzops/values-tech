import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { companies, people, vcs, stances } from '@/lib/mock-data'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Collection'
  const description = searchParams.get('description') || ''

  // Auto-generate count based on title
  let count = 0
  if (title.toLowerCase().includes('compan')) count = companies.length
  else if (title.toLowerCase().includes('people') || title.toLowerCase().includes('executive')) count = people.length
  else if (title.toLowerCase().includes('vc')) count = vcs.length
  else if (title.toLowerCase().includes('topic')) count = 12

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
          {/* Brand header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', letterSpacing: '1px', color: '#666' }}>{divider}</span>
            <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '4px', marginTop: '4px', color: '#888' }}>
              RECEIPTS.TECH
            </span>
            <span style={{ fontSize: '14px', letterSpacing: '1px', color: '#666', marginTop: '4px' }}>{divider}</span>
          </div>

          {/* Collection title */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '32px', marginBottom: '16px' }}>
            <span style={{ fontSize: '52px', fontWeight: 900, letterSpacing: '6px', textTransform: 'uppercase' }}>
              {title}
            </span>
            {count > 0 && (
              <span style={{ fontSize: '24px', color: '#666', marginTop: '8px' }}>
                {count} entries tracked
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
              <span style={{ fontSize: '18px', color: '#555', fontStyle: 'italic', textAlign: 'center', maxWidth: '80%' }}>
                {description}
              </span>
            </div>
          )}

          {/* Thin divider */}
          <span style={{ fontSize: '12px', color: '#ccc', letterSpacing: '0px', textAlign: 'center', marginTop: '32px' }}>{thinDivider}</span>

          {/* Stats summary */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '24px', fontSize: '16px', color: '#888' }}>
            <span>{companies.length} companies</span>
            <span>{people.length} executives</span>
            <span>{vcs.length} VCs</span>
            <span>{stances.length} receipts</span>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', paddingTop: '16px' }}>
            <span style={{ fontSize: '11px', color: '#999', fontStyle: 'italic' }}>
              Before they send you their receipts, check theirs.
            </span>
            <span style={{ fontSize: '11px', color: '#bbb', marginTop: '4px', letterSpacing: '2px' }}>
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
