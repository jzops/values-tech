import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contribute — Receipts.Tech',
  description: 'Help document the receipts on tech companies. Submit tips and sources.',
  openGraph: {
    title: 'Contribute — Receipts.Tech',
    description: 'Help document the receipts on tech companies. Submit tips and sources.',
    images: ['/api/og/home'],
  },
  twitter: { card: 'summary_large_image', images: ['/api/og/home'] },
}

export default function ContributePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contribute</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Receipts.Tech is built on public information. Help us document what tech really does.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Submit a Receipt</h2>
        <p className="text-gray-600 mb-4">
          Know about a receipt we haven't documented? Send us:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
          <li>The company, person, or VC involved</li>
          <li>What topic it relates to (layoffs, DEI, remote work, etc.)</li>
          <li>A link to a public source (news article, tweet, company blog, etc.)</li>
          <li>The date it happened</li>
        </ul>
        <p className="text-gray-600 mb-4">
          Email tips to: <span className="font-mono bg-gray-100 px-2 py-1 rounded">tips@receipts.tech</span>
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What We're Looking For</h2>
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Public statements from executives on social media</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Company blog posts or press releases</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>News coverage with direct quotes or documentation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>SEC filings, NLRB rulings, and other official records</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Political donation records (FEC, state filings)</span>
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What We Don't Accept</h2>
        <div className="bg-red-50 p-6 rounded-xl mb-6">
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span>Anonymous allegations without documentation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span>Screenshots that can't be verified</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span>Rumors or secondhand information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span>Private communications (unless made public by the source)</span>
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Become a Contributor</h2>
        <p className="text-gray-600 mb-4">
          We're building a network of trusted contributors—journalists, researchers,
          and industry insiders who can help us document tech accountability.
        </p>
        <p className="text-gray-600">
          Interested? Email us at: <span className="font-mono bg-gray-100 px-2 py-1 rounded">contribute@receipts.tech</span>
        </p>
      </div>
    </div>
  )
}
