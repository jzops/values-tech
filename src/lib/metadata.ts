import type { Metadata } from 'next'
import { SITE_NAME, TWITTER_HANDLE, abs, entityPath, entityOgPath } from './site'
import type { BoardRow } from './board'
import type { EntityType } from './types'

const TYPE_NOUN: Record<EntityType, string> = {
  company: 'company',
  person: 'executive',
  vc: 'venture fund',
}

/**
 * One builder for all three entity types so the page title, the card, and the
 * card's alt text can never disagree about what the record says.
 */
export function entityMetadata(row: BoardRow): Metadata {
  const { name, entityType, slug, grade, receipts, counts, topFlag } = row

  const title = `${name} — the receipts`

  const flagPart = topFlag
    ? ` Most flagged on ${topFlag.name} (${topFlag.count}).`
    : ''
  const description =
    `Grade ${grade.grade} — ${grade.label.toLowerCase()}. ` +
    `${receipts} documented receipt${receipts === 1 ? '' : 's'} on this ${TYPE_NOUN[entityType]}, ` +
    `${counts.opposed} of them against.${flagPart} Every line links to a public source.`

  const image = abs(entityOgPath(entityType, slug))
  const url = abs(entityPath(entityType, slug))

  return {
    title,
    description,
    alternates: { canonical: entityPath(entityType, slug) },
    openGraph: {
      type: 'profile',
      siteName: SITE_NAME,
      url,
      title: `${name} — Grade ${grade.grade} on ${SITE_NAME}`,
      description,
      images: [{
        url: image,
        width: 1200,
        height: 630,
        alt: `${name}: grade ${grade.grade}, ${receipts} receipts on file, ${counts.opposed} against.`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title: `${name} — Grade ${grade.grade} on ${SITE_NAME}`,
      description,
      images: [image],
    },
  }
}

/** Metadata for list/collection pages that share the homepage card. */
export function collectionMetadata(opts: {
  title: string
  description: string
  path: string
}): Metadata {
  const image = abs('/api/og/home')
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: abs(opts.path),
      title: `${opts.title} — ${SITE_NAME}`,
      description: opts.description,
      images: [{ url: image, width: 1200, height: 630, alt: opts.description }],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title: `${opts.title} — ${SITE_NAME}`,
      description: opts.description,
      images: [image],
    },
  }
}
