'use client'

import { useState } from 'react'
import { Download, Twitter, Linkedin, Link2, Check, ClipboardList, MessageSquare } from 'lucide-react'
import { Stance } from '@/lib/types'
import { TOPICS } from '@/lib/constants'

interface ShareButtonsProps {
  entityType: 'company' | 'person' | 'vc'
  entitySlug: string
  entityName: string
  stances?: Stance[]
}

function formatReceiptText(entityName: string, entityType: string, entitySlug: string, stances: Stance[]): string {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const topStances = stances.slice(0, 8)

  let lines: string[] = []
  lines.push('================================')
  lines.push('          RECEIPT')
  lines.push('       Receipts.Tech')
  lines.push('================================')
  lines.push(`ENTITY: ${entityName}`)
  lines.push(`DATE:   ${dateStr}`)
  lines.push('--------------------------------')

  topStances.forEach((s, i) => {
    const topic = TOPICS[s.topic as keyof typeof TOPICS]
    const topicName = topic?.name || s.topic
    const posText = s.position.toUpperCase()
    const dots = '.'.repeat(Math.max(2, 26 - topicName.length - posText.length))
    lines.push(`${i + 1}. ${topicName}${dots}${posText}`)

    // Wrap summary to ~32 chars per line
    const summary = s.summary.length > 64 ? s.summary.slice(0, 61) + '...' : s.summary
    const words = summary.split(' ')
    let line = '   '
    for (const word of words) {
      if (line.length + word.length + 1 > 35) {
        lines.push(line)
        line = '   ' + word
      } else {
        line += (line.length > 3 ? ' ' : '') + word
      }
    }
    if (line.trim()) lines.push(line)
    lines.push('')
  })

  if (stances.length > 8) {
    lines.push(`+ ${stances.length - 8} more receipts`)
    lines.push('')
  }

  lines.push('--------------------------------')
  lines.push(`TOTAL RECEIPTS:        ${stances.length}`)
  lines.push('================================')
  lines.push(`reciepts.tech/${entityType}/${entitySlug}`)

  return lines.join('\n')
}

function generateTweetThread(entityName: string, entityType: string, entitySlug: string, stances: Stance[]): string[] {
  const tweets: string[] = []
  const url = `https://reciepts.tech/${entityType}/${entitySlug}`

  // First tweet
  tweets.push(`Here are the receipts on ${entityName} 📑🧵\n\n${stances.length} documented receipts.\n\n${url}`)

  // One tweet per stance (up to 8)
  const topStances = stances.slice(0, 8)
  topStances.forEach((s, i) => {
    const topic = TOPICS[s.topic as keyof typeof TOPICS]
    const topicName = topic?.name || s.topic
    const emoji = topic?.icon || '📋'
    const posText = s.position === 'opposed' ? '🔴' : s.position === 'supported' ? '🟢' : s.position === 'mixed' ? '🟡' : '⚪'

    let tweet = `${i + 1}. ${emoji} ${topicName} ${posText}\n\n${s.summary}`
    if (s.source_url) {
      tweet += `\n\n${s.source_url}`
    }
    tweets.push(tweet)
  })

  // Final tweet
  if (stances.length > 8) {
    tweets.push(`${stances.length - 8} more receipts at:\n${url}\n\nBefore they send you their receipts, check theirs. 📑`)
  } else {
    tweets.push(`Full receipts: ${url}\n\nBefore they send you their receipts, check theirs. 📑`)
  }

  return tweets
}

export function ShareButtons({ entityType, entitySlug, entityName, stances = [] }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [receiptCopied, setReceiptCopied] = useState(false)
  const [threadCopied, setThreadCopied] = useState(false)
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

  async function handleCopyReceipt() {
    try {
      const text = formatReceiptText(entityName, entityType, entitySlug, stances)
      await navigator.clipboard.writeText(text)
      setReceiptCopied(true)
      setTimeout(() => setReceiptCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  async function handleCopyThread() {
    try {
      const tweets = generateTweetThread(entityName, entityType, entitySlug, stances)
      const threadText = tweets.map((t, i) => `--- Tweet ${i + 1} ---\n${t}`).join('\n\n')
      await navigator.clipboard.writeText(threadText)
      setThreadCopied(true)
      setTimeout(() => setThreadCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  return (
    <div className="flex flex-col gap-2">
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

      {stances.length > 0 && (
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyReceipt}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            title="Copy as receipt text"
          >
            <ClipboardList className="w-4 h-4" />
            {receiptCopied ? 'Copied!' : 'Copy Receipt'}
          </button>

          <button
            onClick={handleCopyThread}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            title="Copy as tweet thread"
          >
            <MessageSquare className="w-4 h-4" />
            {threadCopied ? 'Copied!' : 'Tweet Thread'}
          </button>
        </div>
      )}
    </div>
  )
}
