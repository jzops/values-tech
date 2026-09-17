import { readFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Shared chrome for every OG card.
 *
 * These images are the product for anyone who never clicks through, so they
 * are sized for how Twitter actually renders them: a ~500px-wide thumbnail in
 * a scrolling feed. Every type size here is roughly 2x what the same element
 * would be on the site, and nothing load-bearing sits below 28px.
 */
export const OG = {
  W: 1200,
  H: 630,
  ink: '#0A0A0C',
  raised: '#131318',
  line: '#26262E',
  paper: '#F7F4EF',
  dim: '#A7A7B2',
  mute: '#6E6E7A',
  accent: '#FF6B35',
  opposed: '#FF4D4F',
  supported: '#34D399',
  mixed: '#F5A524',
  silent: '#6E6E7A',
} as const

export const POSITION_HEX: Record<string, string> = {
  opposed: OG.opposed,
  supported: OG.supported,
  mixed: OG.mixed,
  silent: OG.silent,
}

type FontSpec = {
  name: string
  data: ArrayBuffer
  weight: 400 | 500 | 700 | 900
  style: 'normal'
}

let fontCache: FontSpec[] | null = null

async function read(file: string): Promise<ArrayBuffer> {
  const buf = await readFile(path.join(process.cwd(), 'public', 'fonts', file))
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
}

/**
 * Loaded once per server instance. Bundled rather than fetched at render time
 * so a crawler never waits on fonts.gstatic.com to hand back a card.
 */
export async function ogFonts(): Promise<FontSpec[]> {
  if (fontCache) return fontCache

  const [black, bold, medium, mono] = await Promise.all([
    read('Inter-Black.ttf'),
    read('Inter-Bold.ttf'),
    read('Inter-Medium.ttf'),
    read('JetBrainsMono-Bold.ttf'),
  ])

  fontCache = [
    { name: 'Inter', data: black, weight: 900, style: 'normal' },
    { name: 'Inter', data: bold, weight: 700, style: 'normal' },
    { name: 'Inter', data: medium, weight: 500, style: 'normal' },
    { name: 'Mono', data: mono, weight: 700, style: 'normal' },
  ]
  return fontCache
}

/** Long-lived caching: cards only change when the dataset does. */
export const OG_HEADERS = {
  'Content-Type': 'image/png',
  'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
}

/** Trim to a character budget on a word boundary. */
export function clamp(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

/**
 * Names get progressively smaller so a long one ("Andreessen Horowitz")
 * still fills the same optical space as a short one ("Meta").
 */
export function nameSize(name: string): number {
  if (name.length <= 11) return 104
  if (name.length <= 16) return 84
  if (name.length <= 22) return 68
  if (name.length <= 30) return 54
  return 44
}
