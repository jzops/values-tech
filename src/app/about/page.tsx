import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Receipts.Tech',
  description: 'Learn about Receipts.Tech and our mission to hold tech accountable.',
  openGraph: {
    title: 'About — Receipts.Tech',
    description: 'Learn about Receipts.Tech and our mission to hold tech accountable.',
    images: ['/api/og/home'],
  },
  twitter: { card: 'summary_large_image', images: ['/api/og/home'] },
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <p className="label">What this is</p>
      <h1 className="display display-lg mt-2.5 mb-8">About Receipts.Tech</h1>

      <div className="max-w-none">
        <p className="text-lg text-paper-dim mb-6">
          <strong>Receipts.Tech</strong> documents what tech companies, executives, and venture
          capitalists actually do—not what they say. Before you take their money, join their
          company, or use their products, check their receipts.
        </p>

        <h2 className="display text-2xl mt-12 mb-4">Why This Exists</h2>
        <p className="text-paper-dim mb-4">
          Tech companies love to talk about their values. They publish elaborate culture decks,
          tout their commitments to employees, and position themselves as forces for good.
        </p>
        <p className="text-paper-dim mb-4">
          But what happens when those values are tested? When layoffs happen. When politics
          enter the workplace. When workers try to organize. When the money gets tight.
        </p>
        <p className="text-paper-dim mb-4">
          We believe actions speak louder than mission statements. This project documents
          those actions—the real receipts that show what companies and leaders do when it matters.
        </p>

        <h2 className="display text-2xl mt-12 mb-4">Our Approach</h2>
        <ul className="list-disc pl-6 text-paper-dim space-y-2 mb-4">
          <li><strong>Public sources only:</strong> Every receipt we document comes from publicly available information—news articles, social media posts, SEC filings, donation records, company statements.</li>
          <li><strong>Direct links:</strong> We link to primary sources whenever possible so you can verify claims yourself.</li>
          <li><strong>No editorial spin:</strong> We document what happened, not what we think about it. You can draw your own conclusions.</li>
          <li><strong>Corrections welcome:</strong> If we&rsquo;ve gotten something wrong, let us know. We&rsquo;ll fix it.</li>
        </ul>

        <h2 className="display text-2xl mt-12 mb-4">Who&rsquo;s Behind This</h2>
        <p className="text-paper-dim mb-4">
          Receipts.Tech is an independent project. We&rsquo;re not affiliated with any company,
          publication, or political organization. We believe transparency and accountability
          matter in tech—and that founders, employees, and users deserve to know who they&rsquo;re
          dealing with.
        </p>

        <h2 className="display text-2xl mt-12 mb-4">Contact</h2>
        <p className="text-paper-dim mb-4">
          Have a tip? Found an error? Want to contribute?
        </p>
        <p className="text-paper-dim">
          Email: <span className="font-mono">tips@reciepts.tech</span>
        </p>
      </div>
    </div>
  )
}
