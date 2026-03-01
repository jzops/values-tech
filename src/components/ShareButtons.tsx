'use client'

import { useState } from 'react'
import { Download, Twitter, Linkedin, Link2, Check } from 'lucide-react'

interface ShareButtonsProps {
  entityType: 'company' | 'person' | 'vc'
  entitySlug: string
  entityName: string
}

export function ShareButtons({ entityType, entitySlug, entityName }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const pageUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${entityType}/${entitySlug}`
    : `https://receipts.tech/${entityType}/${entitySlug}`

  const ogImageUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://receipts.tech'}/api/og/${entityType}/${entitySlug}`

  const tweetText = `Check the receipts on ${entityName} 📑`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(pageUrl)}`

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`

  async function handleDownload() {
    setDownloading(true)
    try {
      const response = await fetch(ogImageUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `receipt-${entitySlug}-${new Date().toISOString().split('T')[0]}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
    setDownloading(false)
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        title="Download receipt card"
      >
        <Download className="w-4 h-4" />
        {downloading ? 'Downloading...' : 'Download'}
      </button>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-9 h-9 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        title="Share on Twitter/X"
      >
        <Twitter className="w-4 h-4" />
      </a>

      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-9 h-9 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      <button
        onClick={handleCopyLink}
        className="flex items-center justify-center w-9 h-9 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        title={copied ? 'Copied!' : 'Copy link'}
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  )
}
