/**
 * Single source of truth for the canonical origin.
 *
 * NOTE THE SPELLING: the live domain is recIEpts.tech (i before e).
 * `receipts.tech` is a different party's domain and does not resolve —
 * pointing OG/Twitter image tags at it is why link previews rendered blank.
 * Always build absolute share URLs from SITE_URL, never a hardcoded string.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://reciepts.tech'

export const SITE_NAME = 'Receipts.Tech'
export const SITE_TAGLINE = 'Before they send you their receipts, check theirs.'
/**
 * The account that owns the share cards. X renders this as the attribution line
 * on every large-image card, so it must be the real handle — a guess credits
 * the card to whoever actually owns that name.
 *
 * NOTE THE SPELLING, as with the domain: rec-I-E-pts. The handle is
 * `@recieptsdottech` ("reciepts dot tech"), not `@receiptstech`.
 */
export const TWITTER_HANDLE =
  process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@recieptsdottech'

/** Absolute URL for a site-relative path. */
export function abs(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Canonical page path for an entity. */
export function entityPath(entityType: 'company' | 'person' | 'vc', slug: string): string {
  return `/${entityType}/${slug}`
}

/** OG image endpoint for an entity scorecard. */
export function entityOgPath(entityType: 'company' | 'person' | 'vc', slug: string): string {
  return `/api/og/${entityType}/${slug}`
}
