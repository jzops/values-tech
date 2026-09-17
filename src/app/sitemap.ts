import type { MetadataRoute } from 'next'
import { companies, people, vcs, stances } from '@/lib/mock-data'
import { TOPICS } from '@/lib/constants'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages = ['', '/companies', '/people', '/vcs', '/topics', '/about', '/methodology', '/contribute', '/search']
    .map(path => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: (path === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
      priority: path === '' ? 1 : 0.7,
    }))

  const entityPages = [
    ...companies.map(c => `/company/${c.slug}`),
    ...people.map(p => `/person/${p.slug}`),
    ...vcs.map(v => `/vc/${v.slug}`),
  ].map(path => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const topicPages = Object.keys(TOPICS).map(id => ({
    url: `${SITE_URL}/topic/${id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const stancePages = stances.map(s => ({
    url: `${SITE_URL}/stance/${s.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...entityPages, ...topicPages, ...stancePages]
}
