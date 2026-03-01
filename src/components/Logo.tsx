export function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Receipt icon */}
      <rect x="4" y="4" width="24" height="32" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="10" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="24" x2="18" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Checkmark accent */}
      <path d="M18 28L21 31L26 24" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Text: receipts */}
      <text
        x="38"
        y="27"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        receipts
      </text>

      {/* .tech in accent color */}
      <text
        x="138"
        y="27"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="#FF6B35"
        letterSpacing="-0.02em"
      >
        .tech
      </text>
    </svg>
  )
}

export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Receipt icon */}
      <rect x="6" y="4" width="28" height="32" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="12" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="18" x2="28" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="24" x2="22" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Checkmark accent */}
      <path d="M22 28L26 32L34 22" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
