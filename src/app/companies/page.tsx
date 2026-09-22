import type { Metadata } from 'next'
import { Board } from '@/components/Board'
import { CollectionHeader } from '@/components/CollectionHeader'
import { getBoard, toLite } from '@/lib/board'
import { collectionMetadata } from '@/lib/metadata'
import { companies } from '@/lib/mock-data'

export const metadata: Metadata = collectionMetadata({
  title: 'Companies',
  description: 'Every tech company with a documented public record — ranked by how much of it cuts against them.',
  path: '/companies',
})

export default function CompaniesPage() {
  const rows = getBoard(1).filter(r => r.entityType === 'company').map(toLite)
  const rated = rows.filter(r => r.grade.rated).length
  const receipts = rows.reduce((n, r) => n + r.receipts, 0)

  return (
    <div>
      <CollectionHeader
        eyebrow="The board"
        title="Companies"
        blurb="Every tech company with a documented public record — ranked by how much of it cuts against them."
        stats={[
          { n: companies.length, l: 'Tracked' },
          { n: rated, l: 'Rated' },
          { n: receipts, l: 'Receipts' },
        ]}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <Board rows={rows} showFilters={false} pageSize={25} maxRows={500} />
      </div>
    </div>
  )
}
