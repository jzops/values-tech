export function CollectionHeader({
  eyebrow,
  title,
  blurb,
  stats,
}: {
  eyebrow: string
  title: string
  blurb: string
  stats: { n: number | string; l: string }[]
}) {
  return (
    <section className="relative grain overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="absolute -top-48 left-1/4 w-[38rem] h-[38rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.09), transparent 62%)' }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p className="label">{eyebrow}</p>
        <h1 className="display display-lg mt-2.5">{title}</h1>
        <p className="mt-4 text-paper-dim max-w-2xl leading-relaxed">{blurb}</p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {stats.map(s => (
            <div key={s.l}>
              <dd className="tnum text-3xl font-bold text-paper leading-none">{s.n}</dd>
              <dt className="label mt-1.5">{s.l}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
