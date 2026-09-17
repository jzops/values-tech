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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <p className="label">Help out</p>
      <h1 className="display display-lg mt-2.5 mb-8">Contribute</h1>

      <div className="max-w-none">
        <p className="text-lg text-paper-dim mb-6">
          Receipts.Tech is built on public information. Help us document what tech really does.
        </p>

        <h2 className="display text-2xl mt-12 mb-4">Submit a Receipt</h2>
        <p className="text-paper-dim mb-4">
          Know about a receipt we haven&rsquo;t documented? Send us:
        </p>
        <ul className="list-disc pl-6 text-paper-dim space-y-2 mb-4">
          <li>The company, person, or VC involved</li>
          <li>What topic it relates to (layoffs, DEI, remote work, etc.)</li>
          <li>A link to a public source (news article, tweet, company blog, etc.)</li>
          <li>The date it happened</li>
        </ul>
        <p className="text-paper-dim mb-4">
          Email tips to: <span className="font-mono bg-white/5 px-2 py-1 rounded">tips@reciepts.tech</span>
        </p>

        <h2 className="display text-2xl mt-12 mb-4">What We&rsquo;re Looking For</h2>
        <div className="rounded-xl border border-line bg-ink-raised p-6 mb-6" style={{ borderLeftWidth: '3px', borderLeftColor: 'var(--supported)' }}>
          <ul className="space-y-3 text-paper-dim">
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: 'var(--supported)' }}>✓</span>
              <span>Public statements from executives on social media</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: 'var(--supported)' }}>✓</span>
              <span>Company blog posts or press releases</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: 'var(--supported)' }}>✓</span>
              <span>News coverage with direct quotes or documentation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: 'var(--supported)' }}>✓</span>
              <span>SEC filings, NLRB rulings, and other official records</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: 'var(--supported)' }}>✓</span>
              <span>Political donation records (FEC, state filings)</span>
            </li>
          </ul>
        </div>

        <h2 className="display text-2xl mt-12 mb-4">What We Don&rsquo;t Accept</h2>
        <div className="rounded-xl border border-line bg-ink-raised p-6 mb-6" style={{ borderLeftWidth: '3px', borderLeftColor: 'var(--opposed)' }}>
          <ul className="space-y-3 text-paper-dim">
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: 'var(--opposed)' }}>✗</span>
              <span>Anonymous allegations without documentation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: 'var(--opposed)' }}>✗</span>
              <span>Screenshots that can&rsquo;t be verified</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: 'var(--opposed)' }}>✗</span>
              <span>Rumors or secondhand information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5" style={{ color: 'var(--opposed)' }}>✗</span>
              <span>Private communications (unless made public by the source)</span>
            </li>
          </ul>
        </div>

        <h2 className="display text-2xl mt-12 mb-4">Become a Contributor</h2>
        <p className="text-paper-dim mb-4">
          We&rsquo;re building a network of trusted contributors—journalists, researchers,
          and industry insiders who can help us document tech accountability.
        </p>
        <p className="text-paper-dim">
          Interested? Email us at: <span className="font-mono bg-white/5 px-2 py-1 rounded">contribute@reciepts.tech</span>
        </p>
      </div>
    </div>
  )
}
