import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getCompanyBySlug, getPersonBySlug, getVCBySlug, getStancesForEntity } from '@/lib/mock-data'
import { TOPICS } from '@/lib/constants'
import { calculateGrade } from '@/lib/grade'

export const runtime = 'edge'

const FORMAT_CONFIGS = {
  landscape: { width: 1200, height: 630, maxStances: 4 },
  square: { width: 1080, height: 1080, maxStances: 6 },
  story: { width: 1080, height: 1920, maxStances: 10 },
} as const

type Format = keyof typeof FORMAT_CONFIGS

const POS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  opposed: { bg: '#fef2f2', text: '#dc2626', border: '#fca5a5' },
  supported: { bg: '#f0fdf4', text: '#16a34a', border: '#86efac' },
  mixed: { bg: '#fffbeb', text: '#d97706', border: '#fcd34d' },
  silent: { bg: '#f9fafb', text: '#6b7280', border: '#d1d5db' },
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  const { type, slug } = await params
  const { searchParams } = new URL(request.url)
  const format = (searchParams.get('format') || 'square') as Format
  const config = FORMAT_CONFIGS[format] || FORMAT_CONFIGS.square

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
  const topStances = stances.slice(0, config.maxStances)
  const { grade, color: gradeColor, label: gradeLabel } = calculateGrade(stances)

  const counts = { supported: 0, opposed: 0, mixed: 0, silent: 0 }
  for (const s of stances) {
    counts[s.position as keyof typeof counts] = (counts[s.position as keyof typeof counts] || 0) + 1
  }

  const isStory = format === 'story'
  const isLandscape = format === 'landscape'

  // Responsive sizing
  const pad = isStory ? 48 : isLandscape ? 32 : 40
  const headerSize = isStory ? 52 : isLandscape ? 36 : 44
  const subtitleSize = isStory ? 22 : isLandscape ? 16 : 20
  const stanceGap = isStory ? 16 : isLandscape ? 8 : 12
  const topicSize = isStory ? 18 : isLandscape ? 14 : 16
  const summarySize = isStory ? 16 : isLandscape ? 12 : 14
  const summaryMax = isStory ? 100 : isLandscape ? 70 : 85
  const gradeSize = isStory ? 72 : isLandscape ? 48 : 60
  const gradeLabelSize = isStory ? 14 : isLandscape ? 10 : 12
  const gradeBoxSize = isStory ? 130 : isLandscape ? 90 : 110
  const countBarHeight = isStory ? 12 : isLandscape ? 8 : 10

  // Calculate bar widths
  const total = stances.length || 1
  const barMax = config.width - pad * 2 - 40
  const oppWidth = Math.max(4, (counts.opposed / total) * barMax)
  const mixWidth = Math.max(4, (counts.mixed / total) * barMax)
  const supWidth = Math.max(4, (counts.supported / total) * barMax)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f0f0f',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background accent gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: isStory ? '400px' : isLandscape ? '200px' : '300px',
            background: 'linear-gradient(180deg, rgba(255,107,53,0.15) 0%, rgba(255,107,53,0) 100%)',
            display: 'flex',
          }}
        />

        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundSize: '40px 40px',
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            display: 'flex',
          }}
        />

        {/* Top bar - brand stripe */}
        <div
          style={{
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #FF6B35, #FF8F65, #FF6B35)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: `${pad}px`,
          }}
        >
          {/* Header row: Brand + Grade */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: isStory ? '32px' : isLandscape ? '16px' : '24px',
            }}
          >
            {/* Left: brand + entity */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, maxWidth: '70%' }}>
              {/* Brand tag */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: isStory ? '20px' : '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: isLandscape ? '24px' : '28px',
                    height: isLandscape ? '24px' : '28px',
                    backgroundColor: '#FF6B35',
                    borderRadius: '6px',
                  }}
                >
                  <span style={{ fontSize: isLandscape ? '12px' : '14px', fontWeight: 900, color: '#fff' }}>R</span>
                </div>
                <span style={{ fontSize: isLandscape ? '12px' : '14px', fontWeight: 600, color: '#888', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Receipts.Tech
                </span>
              </div>

              {/* Entity name */}
              <span
                style={{
                  fontSize: `${headerSize}px`,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#fff',
                }}
              >
                {entity.name}
              </span>

              {/* Subtitle */}
              <span
                style={{
                  fontSize: `${subtitleSize}px`,
                  color: '#888',
                  marginTop: '6px',
                  fontWeight: 500,
                }}
              >
                {subtitle}
              </span>
            </div>

            {/* Right: Grade circle */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: `${gradeBoxSize}px`,
                height: `${gradeBoxSize}px`,
                borderRadius: '50%',
                border: `4px solid ${gradeColor}`,
                backgroundColor: `${gradeColor}15`,
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: `${gradeSize}px`, fontWeight: 900, color: gradeColor, lineHeight: 1 }}>
                {grade}
              </span>
              <span style={{ fontSize: `${gradeLabelSize}px`, fontWeight: 700, color: gradeColor, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>
                {gradeLabel}
              </span>
            </div>
          </div>

          {/* Position summary bar */}
          <div
            style={{
              display: 'flex',
              gap: '3px',
              marginBottom: isStory ? '28px' : isLandscape ? '12px' : '20px',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            {counts.opposed > 0 && (
              <div style={{ width: `${oppWidth}px`, height: `${countBarHeight}px`, backgroundColor: '#ef4444', borderRadius: '3px', display: 'flex' }} />
            )}
            {counts.mixed > 0 && (
              <div style={{ width: `${mixWidth}px`, height: `${countBarHeight}px`, backgroundColor: '#f59e0b', borderRadius: '3px', display: 'flex' }} />
            )}
            {counts.supported > 0 && (
              <div style={{ width: `${supWidth}px`, height: `${countBarHeight}px`, backgroundColor: '#22c55e', borderRadius: '3px', display: 'flex' }} />
            )}
          </div>

          {/* Position counts row */}
          <div
            style={{
              display: 'flex',
              gap: isLandscape ? '16px' : '24px',
              marginBottom: isStory ? '32px' : isLandscape ? '14px' : '24px',
              fontSize: isLandscape ? '12px' : '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'flex' }} />
              <span style={{ color: '#aaa' }}>Opposed</span>
              <span style={{ fontWeight: 700, color: '#ef4444' }}>{counts.opposed}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'flex' }} />
              <span style={{ color: '#aaa' }}>Mixed</span>
              <span style={{ fontWeight: 700, color: '#f59e0b' }}>{counts.mixed}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'flex' }} />
              <span style={{ color: '#aaa' }}>Supported</span>
              <span style={{ fontWeight: 700, color: '#22c55e' }}>{counts.supported}</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', backgroundColor: '#2a2a2a', display: 'flex', marginBottom: isStory ? '28px' : isLandscape ? '12px' : '20px' }} />

          {/* Stances list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${stanceGap}px`, flex: 1 }}>
            {topStances.map((stance, i) => {
              const topic = TOPICS[stance.topic as keyof typeof TOPICS]
              const topicName = topic?.name || stance.topic
              const topicIcon = topic?.icon || '📋'
              const pos = POS_COLORS[stance.position] || POS_COLORS.silent
              const posLabel = stance.position.charAt(0).toUpperCase() + stance.position.slice(1)
              const summary = stance.summary.length > summaryMax
                ? stance.summary.slice(0, summaryMax - 3) + '...'
                : stance.summary

              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {/* Topic row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: `${topicSize}px` }}>{topicIcon}</span>
                    <span style={{ fontSize: `${topicSize}px`, fontWeight: 700, color: '#e5e5e5' }}>
                      {topicName}
                    </span>
                    {/* Position pill */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        borderRadius: '100px',
                        backgroundColor: pos.bg,
                        border: `1px solid ${pos.border}`,
                        marginLeft: '4px',
                      }}
                    >
                      <span style={{ fontSize: `${topicSize - 4}px`, fontWeight: 700, color: pos.text }}>
                        {posLabel}
                      </span>
                    </div>
                  </div>
                  {/* Summary */}
                  <span style={{ fontSize: `${summarySize}px`, color: '#888', lineHeight: 1.4, paddingLeft: `${topicSize + 8}px` }}>
                    {summary}
                  </span>
                </div>
              )
            })}
            {stances.length > config.maxStances && (
              <span style={{ fontSize: `${summarySize}px`, color: '#555', marginTop: '4px' }}>
                + {stances.length - config.maxStances} more receipts on file
              </span>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: isStory ? '32px' : '16px',
              paddingTop: isStory ? '24px' : '12px',
              borderTop: '1px solid #2a2a2a',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: isLandscape ? '11px' : '13px', color: '#555', fontStyle: 'italic' }}>
                Before they send you their receipts, check theirs.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#FF6B35',
                  borderRadius: '4px',
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff' }}>R</span>
              </div>
              <span style={{ fontSize: isLandscape ? '13px' : '16px', fontWeight: 700, color: '#FF6B35', letterSpacing: '1px' }}>
                RECEIPTS.TECH
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar - brand stripe */}
        <div
          style={{
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #FF6B35, #FF8F65, #FF6B35)',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      width: config.width,
      height: config.height,
    }
  )
}
