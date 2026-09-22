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

        <h2 className="display text-2xl mt-12 mb-4">How the Grade Is Calculated</h2>
        <p className="text-paper-dim mb-4">
          The arithmetic is published so you can reproduce it. Every number below comes
          from receipts visible on the entity&rsquo;s own page.
        </p>

        <div className="rounded-xl border border-line bg-ink-raised p-6 mb-6">
          <h3 className="label mb-3">1. We grade issues, not articles</h3>
          <p className="text-sm text-paper-dim leading-relaxed">
            Each receipt scores <strong className="text-paper">0</strong> if it counts
            against, <strong className="text-paper">50</strong> if mixed,{' '}
            <strong className="text-paper">45</strong> if silent, and{' '}
            <strong className="text-paper">100</strong> if it counts in their favour.
            Receipts are averaged <em>within a topic</em> first, then the topics are
            averaged. Without this, an entity that got more press coverage for the same
            conduct would score worse than one that got less.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-ink-raised p-6 mb-6">
          <h3 className="label mb-3">2. Thin records get no letter</h3>
          <p className="text-sm text-paper-dim leading-relaxed">
            We only grade an entity with at least{' '}
            <strong className="text-paper">3 receipts across 2 different issues</strong>.
            Below that it shows as <strong className="text-paper">Unrated</strong> —
            three receipts about one story is one story, not a pattern. Entities with no
            receipts show as <strong className="text-paper">No receipts on file</strong>,
            never as a middling grade. One neutral placeholder issue is also averaged in,
            so the extremes have to be earned across several documented issues.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-ink-raised p-6 mb-6">
          <h3 className="label mb-3">3. Cut-offs</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            {[
              ['A', '70–100', 'Clean record'],
              ['B', '55–69', 'Minor issues'],
              ['C', '40–54', 'Mixed record'],
              ['D', '25–39', 'Concerning'],
              ['F', '0–24', 'Major issues'],
            ].map(([g, range, label]) => (
              <span
                key={g}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line"
              >
                <strong className="text-paper">{g}</strong>
                <span className="tnum text-paper-mute">{range}</span>
                <span className="text-paper-dim">{label}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-ink-raised p-6 mb-6">
          <h3 className="label mb-3">4. The one override</h3>
          <p className="text-sm text-paper-dim leading-relaxed">
            A receipt on the Epstein files that counts <em>against</em> an entity caps
            the score at 15 and is shown as a separate badge. It is the only rule that
            bypasses the evidence threshold. Records that document the{' '}
            <em>absence</em> of a connection never trigger it — those are filed as mixed
            and are not a mark against anyone.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-ink-raised p-6 mb-6">
          <h3 className="label mb-3">5. What a grade is not</h3>
          <p className="text-sm text-paper-dim leading-relaxed">
            A grade describes the receipts we have documented — nothing more. Our corpus
            skews toward conduct that drew criticism, because that is what gets reported
            and submitted. A high grade means we have not documented much against an
            entity; it is not a character reference. A low grade is a claim about the
            record on this page, which you can check line by line.
          </p>
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
