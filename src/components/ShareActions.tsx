'use client'

import { useState } from 'react'
import { Check, Copy, Download, Link2 } from 'lucide-react'

export function XIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

/**
 * The share surface shared by entity scorecards and single receipts.
 * Shows the exact post text, because the whole point is that someone can
 * see what they're about to put their name on before they click.
 */
export function ShareActions({
  post,
  url,
  cardUrl,
  downloadName,
  label = 'Post this receipt',
}: {
  post: string
  url: string
  cardUrl: string
  downloadName: string
  label?: string
}) {
  const [copied, setCopied] = useState<'link' | 'text' | null>(null)

  async function copy(what: 'link' | 'text') {
    try {
      await navigator.clipboard.writeText(what === 'link' ? url : post)
      setCopied(what)
      setTimeout(() => setCopied(null), 1800)
    } catch {
      /* clipboard blocked — the link and download still work */
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(post)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 w-full px-4 py-3 rounded-lg bg-accent text-ink font-semibold hover:bg-[var(--accent-hi)] transition-colors"
      >
        <XIcon />
        {label}
      </a>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => copy('link')}
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-line text-sm font-medium text-paper-dim hover:text-paper hover:border-[var(--line-str)] transition-colors"
        >
          {copied === 'link'
            ? <><Check className="w-4 h-4 text-[var(--supported)]" /> Copied</>
            : <><Link2 className="w-4 h-4" /> Copy link</>}
        </button>
        <button
          onClick={() => copy('text')}
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-line text-sm font-medium text-paper-dim hover:text-paper hover:border-[var(--line-str)] transition-colors"
        >
          {copied === 'text'
            ? <><Check className="w-4 h-4 text-[var(--supported)]" /> Copied</>
            : <><Copy className="w-4 h-4" /> Copy post</>}
        </button>
      </div>

      <a
        href={cardUrl}
        download={downloadName}
        className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-line text-sm font-medium text-paper-dim hover:text-paper hover:border-[var(--line-str)] transition-colors"
      >
        <Download className="w-4 h-4" />
        Download card
      </a>

      <pre className="mt-1 whitespace-pre-wrap break-words rounded-lg border border-line bg-ink p-3 text-xs leading-relaxed text-paper-mute font-mono">
        {post}
      </pre>
    </div>
  )
}
