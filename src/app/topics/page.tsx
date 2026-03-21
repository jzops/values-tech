import Link from 'next/link'
import { TOPICS } from '@/lib/constants'
import { getStanceCountForTopic } from '@/lib/mock-data'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Topics — Receipts.Tech',
  description: 'Browse all topics we track: layoffs, DEI, remote work, unionization, politics, and more.',
  openGraph: {
    title: 'Topics — Receipts.Tech',
    description: 'Browse all topics we track: layoffs, DEI, remote work, unionization, politics, and more.',
    images: ['/api/og/collection?title=Topics&description=Layoffs,+DEI,+remote+work,+politics,+and+more'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og/collection?title=Topics&description=Layoffs,+DEI,+remote+work,+politics,+and+more'],
  },
}

export default function TopicsPage() {
  const topicsWithCounts = Object.values(TOPICS).map(topic => ({
    ...topic,
    count: getStanceCountForTopic(topic.id)
  })).sort((a, b) => b.count - a.count)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Topics</h1>
        <p className="mt-2 text-gray-600">
          Browse stances by topic
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topicsWithCounts.map(topic => (
          <Link
            key={topic.id}
            href={`/topic/${topic.id}`}
            className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{topic.icon}</span>
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {topic.count} stances
              </span>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-[#FF6B35] transition-colors">
              {topic.name}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {topic.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
