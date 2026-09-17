import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Methodology — Receipts.Tech',
  description: 'How we research and verify the receipts documented on Receipts.Tech.',
  openGraph: {
    title: 'Methodology — Receipts.Tech',
    description: 'How we research and verify the receipts documented on Receipts.Tech.',
    images: ['/api/og/home'],
  },
  twitter: { card: 'summary_large_image', images: ['/api/og/home'] },
}

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <p className="label">How it works</p>
      <h1 className="display display-lg mt-2.5 mb-8">Methodology</h1>

      <div className="max-w-none">
        <p className="text-lg text-paper-dim mb-6">
          Every receipt on Receipts.Tech is sourced from public records. Here&rsquo;s how we find,
          verify, and present information.
        </p>

        <h2 className="display text-2xl mt-12 mb-4">Sources We Use</h2>
        <div className="space-y-4 text-paper-dim">
          <div className="bg-ink-raised p-4 rounded-lg">
            <h3 className="font-medium text-paper">Social Media</h3>
            <p className="text-sm mt-1">Twitter/X posts, LinkedIn articles, and other public social media from executives and official company accounts.</p>
          </div>
          <div className="bg-ink-raised p-4 rounded-lg">
            <h3 className="font-medium text-paper">News Coverage</h3>
            <p className="text-sm mt-1">Reports from major publications (TechCrunch, The Information, Bloomberg, etc.) and verified news organizations.</p>
          </div>
          <div className="bg-ink-raised p-4 rounded-lg">
            <h3 className="font-medium text-paper">Company Communications</h3>
            <p className="text-sm mt-1">Press releases, blog posts, all-hands meeting notes (when made public), and official company statements.</p>
          </div>
          <div className="bg-ink-raised p-4 rounded-lg">
            <h3 className="font-medium text-paper">Regulatory Filings</h3>
            <p className="text-sm mt-1">SEC filings (DEF 14A, 10-K, 8-K), NLRB decisions, and other government records.</p>
          </div>
          <div className="bg-ink-raised p-4 rounded-lg">
            <h3 className="font-medium text-paper">Donation Records</h3>
            <p className="text-sm mt-1">FEC filings, OpenSecrets data, and publicly disclosed corporate political contributions.</p>
          </div>
        </div>

        <h2 className="display text-2xl mt-12 mb-4">Position Classifications</h2>
        <div className="space-y-3 text-paper-dim">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: 'var(--supported)' }} />
            <span><strong>Supported:</strong> Clear public support through statements or actions</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: 'var(--opposed)' }} />
            <span><strong>Opposed:</strong> Clear public opposition through statements or actions</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: 'var(--mixed)' }} />
            <span><strong>Mixed:</strong> Inconsistent or contradictory positions over time</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: 'var(--silent)' }} />
            <span><strong>Silent:</strong> No public stance despite being asked or expected to comment</span>
          </div>
        </div>

        <h2 className="display text-2xl mt-12 mb-4">What We Don&rsquo;t Do</h2>
        <ul className="list-disc pl-6 text-paper-dim space-y-2">
          <li>We don&rsquo;t use anonymous sources or unverified leaks</li>
          <li>We don&rsquo;t infer positions from silence (silence is documented as silence)</li>
          <li>We don&rsquo;t editorialize or add our own opinions</li>
          <li>We don&rsquo;t accept payment to add or remove entries</li>
        </ul>

        <h2 className="display text-2xl mt-12 mb-4">Corrections Policy</h2>
        <p className="text-paper-dim mb-4">
          If we&rsquo;ve made an error, we want to fix it. Contact us with:
        </p>
        <ul className="list-disc pl-6 text-paper-dim space-y-2">
          <li>The specific entry that&rsquo;s incorrect</li>
          <li>What&rsquo;s wrong about it</li>
          <li>A source supporting the correction</li>
        </ul>
        <p className="text-paper-dim mt-4">
          Email corrections to: <span className="font-mono">corrections@reciepts.tech</span>
        </p>
      </div>
    </div>
  )
}
