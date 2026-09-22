import type { Metadata } from 'next'
import { Board } from '@/components/Board'
import { CollectionHeader } from '@/components/CollectionHeader'
import { getBoard, toLite } from '@/lib/board'
import { collectionMetadata } from '@/lib/metadata'
import { vcs } from '@/lib/mock-data'

export const metadata: Metadata = collectionMetadata({
  title: 'Venture funds',
  description: 'Check the fund before you take the money. Ranked by how much of their record cuts against them.',
  path: '/vcs',
})

export default function VCsPage() {
  const rows = getBoard(1).filter(r => r.entityType === 'vc').map(toLite)
  const rated = rows.filter(r => r.grade.rated).length
  const receipts = rows.reduce((n, r) => n + r.receipts, 0)

  return (
    <div>
      <CollectionHeader
        eyebrow="The board"
        title="Venture funds"
        blurb="Check the fund before you take the money. Ranked by how much of their record cuts against them."
        stats={[
          { n: vcs.length, l: 'Tracked' },
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
