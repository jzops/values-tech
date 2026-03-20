'use client'

import { useState } from 'react'
import { Building2, User, Landmark } from 'lucide-react'

interface LogoImageProps {
  src: string | null
  alt: string
  type?: 'company' | 'person' | 'vc'
  className?: string
}

function getFallbackUrl(src: string): string | null {
  try {
    const match = src.match(/icon\.horse\/icon\/([^?#]+)/)
    if (match) {
      const domain = match[1]
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    }
  } catch {
    return null
  }
  return null
}

export function LogoImage({ src, alt, type = 'company', className = '' }: LogoImageProps) {
  const [fallback, setFallback] = useState(false)
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const fallbackUrl = src ? getFallbackUrl(src) : null
  const currentSrc = fallback && fallbackUrl ? fallbackUrl : src

  const handleError = () => {
    if (!fallback && fallbackUrl) {
      setFallback(true)
      setLoaded(false)
    } else {
      setFailed(true)
    }
  }

  if (!currentSrc || failed) {
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
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={handleError}
      />
    </div>
  )
}
