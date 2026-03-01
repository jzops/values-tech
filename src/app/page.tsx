import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, Building2, Landmark, AlertCircle, Briefcase, Handshake } from 'lucide-react'
import { SearchBox } from '@/components/SearchBox'
import { StanceCard } from '@/components/StanceCard'
import { ReceiptCard } from '@/components/ReceiptCard'
import { TOPICS } from '@/lib/constants'
import {
  companies,
  people,
  stances,
  vcs,
  getRecentStances,
  getEntityForStance,
  getPersonBySlug,
  getStancesForEntity,
  getVCBySlug,
  getCompanyBySlug
} from '@/lib/mock-data'

export default function HomePage() {
  const recentStances = getRecentStances(6).map(stance => ({
    ...stance,
    ...getEntityForStance(stance)
  }))

  const stats = {
    companies: companies.length,
    people: people.length,
    stances: stances.length,
    vcs: vcs.length
  }

  const featuredTopics = ['layoffs', 'dei', 'remote_work', 'palestine', 'ai_ethics', 'epstein']

  // Featured receipts - high-profile entities
  const featuredPeople = ['reid-hoffman', 'peter-thiel', 'elon-musk', 'marc-andreessen']
    .map(slug => {
      const person = getPersonBySlug(slug)
      if (!person) return null
      const personStances = getStancesForEntity('person', person.id)
      return { entity: person, entityType: 'person' as const, stances: personStances }
    })
    .filter(Boolean)
    .slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium mb-6">
            <AlertCircle className="w-4 h-4" />
            <span>166+ documented receipts and counting</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Before they send you their receipts,{' '}
            <span className="text-[#FF6B35]">check theirs.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Check the receipts on tech companies, VCs, and executives before you take their money,
            join their company, or use their products. Every receipt is sourced from public records.
          </p>

          <div className="mt-10 max-w-xl mx-auto">
            <SearchBox />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span><strong className="text-gray-900">{stats.companies}</strong> Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span><strong className="text-gray-900">{stats.people}</strong> People</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4" />
              <span><strong className="text-gray-900">{stats.vcs}</strong> VCs</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span><strong className="text-gray-900">{stats.stances}</strong> Receipts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/vcs"
              className="group flex items-start gap-4 p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#FF6B35] hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                <Landmark className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#FF6B35] transition-colors">
                  Taking VC money?
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Check their receipts before signing that term sheet.
                </p>
              </div>
            </Link>

            <Link
              href="/companies"
              className="group flex items-start gap-4 p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#FF6B35] hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                <Briefcase className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#FF6B35] transition-colors">
                  Joining a company?
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Know what they stand for before you sign the offer.
                </p>
              </div>
            </Link>

            <Link
              href="/people"
              className="group flex items-start gap-4 p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#FF6B35] hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                <Handshake className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#FF6B35] transition-colors">
                  Partnering with someone?
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Check the executive's track record first.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Receipts */}
      {featuredPeople.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Receipts</h2>
                <p className="text-gray-600 mt-1">High-profile tech figures with documented stances</p>
              </div>
              <Link
                href="/people"
                className="text-sm font-medium text-[#FF6B35] hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPeople.map(item => (
                item && (
                  <Link
                    key={item.entity.id}
                    href={`/person/${item.entity.slug}`}
                    className="block hover:scale-[1.02] transition-transform"
                  >
                    <ReceiptCard
                      entity={item.entity}
                      entityType={item.entityType}
                      stances={item.stances}
                      variant="portrait"
                    />
                  </Link>
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Topics */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Browse by Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {featuredTopics.map(topicId => {
              const topic = TOPICS[topicId as keyof typeof TOPICS]
              return (
                <Link
                  key={topicId}
                  href={`/topic/${topicId}`}
                  className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <span className="text-xl">{topic.icon}</span>
                  <span className="font-medium text-gray-900 text-sm">{topic.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Stances */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Receipts</h2>
            <Link
              href="/topics"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              View all topics <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {recentStances.map(stance => (
              <StanceCard
                key={stance.id}
                stance={stance}
                showEntity
                entityName={stance.name}
                entitySlug={stance.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Accountability through transparency
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Every receipt we document is sourced from public records: social media posts,
            press releases, news articles, SEC filings, and donation records.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/methodology"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Our Methodology
            </Link>
            <Link
              href="/contribute"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Submit a Receipt
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
