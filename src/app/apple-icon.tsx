import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF8F0',
          borderRadius: '36px',
        }}
      >
        {/* Receipt body */}
        <div
          style={{
            position: 'relative',
            width: '100px',
            height: '120px',
            backgroundColor: '#FFFFFF',
            border: '4px solid #1a1a1a',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            paddingTop: '8px',
          }}
        >
          {/* Lines */}
          <div style={{ width: '56px', height: '4px', backgroundColor: '#1a1a1a', borderRadius: '2px', display: 'flex' }} />
          <div style={{ width: '56px', height: '4px', backgroundColor: '#1a1a1a', borderRadius: '2px', display: 'flex' }} />
          <div style={{ width: '40px', height: '4px', backgroundColor: '#1a1a1a', borderRadius: '2px', display: 'flex', alignSelf: 'flex-start', marginLeft: '18px' }} />
        </div>
        {/* Checkmark */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '28px',
            fontSize: '48px',
            color: '#FF6B35',
            fontWeight: 900,
            display: 'flex',
          }}
        >
          ✓
        </div>
      </div>
    ),
    { ...size }
  )
}
