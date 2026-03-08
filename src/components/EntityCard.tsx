import Link from 'next/link'
import { Company, Person, VC, EntityType } from '@/lib/types'
import { LogoImage } from './LogoImage'

interface EntityCardProps {
  type: EntityType
  entity: Company | Person | VC
  stanceCount?: number
  subtitle?: string
}

export function EntityCard({ type, entity, stanceCount, subtitle }: EntityCardProps) {
  const href = `/${type}/${entity.slug}`
  const imageUrl = 'logo_url' in entity ? entity.logo_url : 'photo_url' in entity ? entity.photo_url : null

  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <LogoImage
        src={imageUrl}
        alt={entity.name}
        type={type}
        className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{entity.name}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500 truncate">{subtitle}</p>
        )}
      </div>

      {typeof stanceCount === 'number' && stanceCount > 0 && (
        <div className="flex-shrink-0 text-right">
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {stanceCount} stance{stanceCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </Link>
  )
}
