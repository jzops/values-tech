import { notFound } from 'next/navigation'
import { Building2, Globe, Calendar, Users, DollarSign, FileText } from 'lucide-react'
import { StanceCard } from '@/components/StanceCard'
import { StatCard } from '@/components/StatCard'
import { StatsSummary } from '@/components/StatsSummary'
import { DonationsTable } from '@/components/DonationsTable'
import { TopicBadge } from '@/components/TopicBadge'
import { ReceiptCard } from '@/components/ReceiptCard'
import { ShareButtons } from '@/components/ShareButtons'
import { Metadata } from 'next'
import { getCompanyBySlug, getStancesForEntity, getStatsForEntity, getDonationsForEntity, getPeopleAtCompany } from '@/lib/mock-data'
import { STANCE_TOPICS } from '@/lib/constants'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const company = getCompanyBySlug(slug)
  if (!company) return { title: 'Company Not Found' }

  const stances = getStancesForEntity('company', company.id)
  const description = `Check the receipts on ${company.name}. ${stances.length} documented stances on layoffs, DEI, remote work, and more.`

  return {
    title: `${company.name} — receipts.tech`,
    description,
    openGraph: {
      title: `${company.name} — receipts.tech`,
      description,
      images: [`/api/og/company/${slug}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${company.name} — receipts.tech`,
      description,
      images: [`/api/og/company/${slug}`],
    },
  }
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params
  const company = getCompanyBySlug(slug)

  if (!company) notFound()

  const allStances = getStancesForEntity('company', company.id)
  const stats = getStatsForEntity('company', company.id)
  const donations = getDonationsForEntity('company', company.id)
  const keyPeople = getPeopleAtCompany(company.id)

  // Filter stances to only show moral judgment topics (not stats topics)
  const stances = allStances.filter(s => STANCE_TOPICS.includes(s.topic as typeof STANCE_TOPICS[number]))
  const topics = [...new Set(stances.map(s => s.topic))]

  function formatFunding(amount: number | null) {
    if (!amount) return null
    if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(0)}M`
    return `$${amount.toLocaleString()}`
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {company.logo_url ? (
            <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover" />
          ) : (
            <Building2 className="w-10 h-10 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
            {company.industry && (
              <span className="font-medium text-gray-900">{company.industry}</span>
            )}
            {company.founded_year && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Founded {company.founded_year}
              </span>
            )}
            {company.headcount_range && (
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {company.headcount_range} employees
              </span>
            )}
            {company.total_raised && (
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {formatFunding(company.total_raised)} raised
                {company.funding_stage && ` · ${company.funding_stage}`}
              </span>
            )}
          </div>
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm text-[#FF6B35] hover:underline"
            >
              <Globe className="w-4 h-4" />
              {company.website.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      {company.description && (
        <p className="text-gray-600 mb-8 max-w-3xl">{company.description}</p>
      )}

      {/* Stats Summary */}
      <StatsSummary stats={stats} donations={donations} />

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
            Stances ({stances.length})
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

          {/* Stats Timeline */}
          {stats.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">
                Stats ({stats.length})
              </h2>
              <div className="space-y-4">
                {stats.map(stat => (
                  <StatCard key={stat.id} stat={stat} />
                ))}
              </div>
            </>
          )}

          {/* Donations Table */}
          <DonationsTable donations={donations} />
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
                  entity={company}
                  entityType="company"
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
              entityType="company"
              entitySlug={company.slug}
              entityName={company.name}
            />
          </div>

          {/* Key People */}
          {keyPeople.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Key People</h3>
              <div className="space-y-3">
                {keyPeople.map(person => (
                  <Link
                    key={person.id}
                    href={`/person/${person.slug}`}
                    className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {person.photo_url ? (
                        <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-medium text-gray-500">
                          {person.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.current_role}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
