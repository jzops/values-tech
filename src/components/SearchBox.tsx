'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Building2, User, Landmark } from 'lucide-react'

interface SearchResult {
  type: 'company' | 'person' | 'vc'
  id: string
  name: string
  slug: string
  subtitle?: string
}

interface SearchBoxProps {
  autoFocus?: boolean
  onSelect?: () => void
  size?: 'sm' | 'lg'
}

export function SearchBox({ autoFocus = false, onSelect, size = 'lg' }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results || [])
        setShowResults(true)
        setSelectedIndex(-1)
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 200)

    return () => clearTimeout(handler)
  }, [query])

  const handleSelect = (result: SearchResult) => {
    router.push(`/${result.type}/${result.slug}`)
    setShowResults(false)
    setQuery('')
    onSelect?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSelect(results[selectedIndex])
    } else if (e.key === 'Escape') {
      setShowResults(false)
    }
  }

  const Icon = (type: string) => {
    switch (type) {
      case 'company': return Building2
      case 'person': return User
      case 'vc': return Landmark
      default: return Building2
    }
  }

  const sizeClasses = size === 'lg' 
    ? 'py-4 px-5 text-lg' 
    : 'py-2 px-3 text-sm'

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-paper-mute ${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          placeholder="Search a company, exec, or VC…"
          className={`w-full ${sizeClasses} pl-12 pr-10 rounded-xl bg-ink-raised border border-line text-paper placeholder:text-paper-mute focus:border-accent outline-none transition-colors`}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-paper-mute hover:text-paper"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-ink-raised rounded-xl border border-[var(--line-str)] shadow-2xl shadow-black/60 overflow-hidden z-50">
          {results.map((result, index) => {
            const ResultIcon = Icon(result.type)
            return (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleSelect(result)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${
                  index === selectedIndex ? 'bg-white/5' : ''
                } ${index > 0 ? 'border-t border-line' : ''}`}
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-line flex items-center justify-center shrink-0">
                  <ResultIcon className="w-4 h-4 text-paper-dim" />
                </div>
                <div>
                  <p className="font-medium text-paper">{result.name}</p>
                  {result.subtitle && (
                    <p className="text-xs text-paper-mute">{result.subtitle}</p>
                  )}
                </div>
                <span className="ml-auto label !text-[0.625rem]">{result.type}</span>
              </button>
            )
          })}
        </div>
      )}

      {showResults && query.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-ink-raised rounded-xl border border-[var(--line-str)] shadow-2xl shadow-black/60 p-4 text-center text-sm text-paper-mute z-50">
          No results for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  )
}
