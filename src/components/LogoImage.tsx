'use client'

import { useState } from 'react'
import { Building2, User, Landmark } from 'lucide-react'

interface LogoImageProps {
  src: string | null
  alt: string
  type?: 'company' | 'person' | 'vc'
  className?: string
}

export function LogoImage({ src, alt, type = 'company', className = '' }: LogoImageProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // If no src or error occurred, show fallback
  if (!src || error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        {type === 'person' ? (
          <User className="w-1/2 h-1/2 text-gray-400" />
        ) : type === 'vc' ? (
          <Landmark className="w-1/2 h-1/2 text-gray-400" />
        ) : (
          <Building2 className="w-1/2 h-1/2 text-gray-400" />
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {type === 'person' ? (
            <User className="w-1/2 h-1/2 text-gray-400" />
          ) : type === 'vc' ? (
            <Landmark className="w-1/2 h-1/2 text-gray-400" />
          ) : (
            <Building2 className="w-1/2 h-1/2 text-gray-400" />
          )}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  )
}
