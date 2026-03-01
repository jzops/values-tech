import { notFound } from 'next/navigation'
import Link from 'next/link'
import { User, Twitter, Linkedin, Building2, FileText } from 'lucide-react'
import { StanceCard } from '@/components/StanceCard'
import { TopicBadge } from '@/components/TopicBadge'
import { ReceiptCard } from '@/components/ReceiptCard'
import { ShareButtons } from '@/components/ShareButtons'
import { Metadata } from 'next'
import { getPersonBySlug, getStancesForEntity } from '@/lib/mock-data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const person = getPersonBySlug(slug)
  if (!person) return { title: 'Person Not Found' }

  const stances = getStancesForEntity('person', person.id)
  const description = `Check the receipts on ${person.name}. ${stances.length} documented public stances.`

  return {
    title: `${person.name} — receipts.tech`,
    description,
    openGraph: {
      title: `${person.name} — receipts.tech`,
      description,
      images: [`/api/og/person/${slug}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${person.name} — receipts.tech`,
      description,
      images: [`/api/og/person/${slug}`],
    },
  }
}

export default async function PersonPage({ params }: Props) {
  const { slug } = await params
  const person = getPersonBySlug(slug)
  
  if (!person) notFound()

  const stances = getStancesForEntity('person', person.id)
  const topics = [...new Set(stances.map(s => s.topic))]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {person.photo_url ? (
            <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-12 h-12 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{person.name}</h1>
          
          {/* Current role */}
          {person.current_role && (
            <div className="mt-2 flex items-center gap-2 text-lg text-gray-700">
              <span>{person.current_role}</span>
              {person.current_company && (
                <>
                  <span className="text-gray-400">@</span>
                  <Link 
                    href={`/company/${person.current_company.slug}`}
                    className="text-[#FF6B35] hover:underline"
                  >
                    {person.current_company.name}
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Social links */}
          <div className="mt-3 flex items-center gap-4">
            {person.twitter_handle && (
              <a
                href={`https://twitter.com/${person.twitter_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
              >
                <Twitter className="w-4 h-4" />
                @{person.twitter_handle}
              </a>
            )}
            {person.linkedin_url && (
              <a
                href={person.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {person.bio && (
        <p className="text-gray-600 mb-8 max-w-3xl">{person.bio}</p>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Topics covered */}
          {topics.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-500 mb-3">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {topics.map(topic => (
                  <TopicBadge key={topic} topicId={topic} size="sm" />
                ))}
              </div>
            </div>
          )}

          {/* Stances */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Public Stances ({stances.length})
          </h2>
          {stances.length > 0 ? (
            <div className="space-y-4">
              {stances.map(stance => (
                <StanceCard key={stance.id} stance={stance} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No documented stances yet.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Receipt Card Preview */}
          {stances.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Receipt Card</h3>
              </div>
              <div className="transform scale-[0.5] origin-top-left -mr-[200px] -mb-[200px]">
                <ReceiptCard
                  entity={person}
                  entityType="person"
                  stances={stances}
                  variant="square"
                />
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Share this receipt</h3>
            <ShareButtons
              entityType="person"
              entitySlug={person.slug}
              entityName={person.name}
            />
          </div>

          {/* Current Company */}
          {person.current_company && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Current Company</h3>
              <Link
                href={`/company/${person.current_company.slug}`}
                className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                  {person.current_company.logo_url ? (
                    <img src={person.current_company.logo_url} alt={person.current_company.name} className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{person.current_company.name}</p>
                  <p className="text-sm text-gray-500">{person.current_role}</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
