export const TOPICS = {
  layoffs: {
    id: 'layoffs',
    name: 'Layoffs',
    description: 'How they handled layoffs — severance, notice, communication',
    icon: '📉',
    color: 'red'
  },
  dei: {
    id: 'dei',
    name: 'DEI',
    description: 'Diversity, equity, and inclusion stances and actions',
    icon: '🌈',
    color: 'purple'
  },
  remote_work: {
    id: 'remote_work',
    name: 'Remote Work',
    description: 'Remote, hybrid, or return-to-office policies',
    icon: '🏠',
    color: 'blue'
  },
  union: {
    id: 'union',
    name: 'Unionization',
    description: 'Stance on worker unionization efforts',
    icon: '✊',
    color: 'orange'
  },
  politics: {
    id: 'politics',
    name: 'Politics',
    description: 'Political donations and endorsements',
    icon: '🗳️',
    color: 'gray'
  },
  palestine: {
    id: 'palestine',
    name: 'Palestine',
    description: 'Stance on Palestinian rights. Opposed = supports Israeli military/occupation, censors Palestinian voices. Supported = defends Palestinian rights.',
    icon: '🇵🇸',
    color: 'green'
  },
  environment: {
    id: 'environment',
    name: 'Environment',
    description: 'Climate and sustainability actions',
    icon: '🌍',
    color: 'emerald'
  },
  ai_ethics: {
    id: 'ai_ethics',
    name: 'AI Ethics',
    description: 'AI safety and responsible AI development',
    icon: '🤖',
    color: 'indigo'
  },
  worker_treatment: {
    id: 'worker_treatment',
    name: 'Worker Treatment',
    description: 'General treatment of employees',
    icon: '👷',
    color: 'amber'
  },
  exec_compensation: {
    id: 'exec_compensation',
    name: 'Executive Pay',
    description: 'CEO pay vs worker pay disparities',
    icon: '💰',
    color: 'yellow'
  },
  free_speech: {
    id: 'free_speech',
    name: 'Free Speech',
    description: 'Content moderation and speech policies',
    icon: '📢',
    color: 'sky'
  },
  immigration: {
    id: 'immigration',
    name: 'Immigration',
    description: 'Visa sponsorship and immigration policy stances',
    icon: '🛂',
    color: 'teal'
  },
  epstein: {
    id: 'epstein',
    name: 'Epstein Files',
    description: 'Connections to Jeffrey Epstein documented in DOJ files. Number of file mentions indicates depth of relationship.',
    icon: '📁',
    color: 'rose'
  },
  // Founder/Investor Relations
  founder_treatment: {
    id: 'founder_treatment',
    name: 'Founder Treatment',
    description: 'How VCs treat founders - down rounds, board coups, forced removals',
    icon: '🤝',
    color: 'violet'
  },
  term_sheets: {
    id: 'term_sheets',
    name: 'Term Sheets',
    description: 'Predatory vs fair term sheet practices - participating preferred, ratchets',
    icon: '📝',
    color: 'slate'
  },
  // Worker & Ethics
  contractor_classification: {
    id: 'contractor_classification',
    name: 'Contractor Rights',
    description: 'Gig economy worker classification and contractor treatment',
    icon: '🚗',
    color: 'cyan'
  },
  sexual_harassment: {
    id: 'sexual_harassment',
    name: 'Sexual Harassment',
    description: 'Documented harassment cases and how companies handled them',
    icon: '⚠️',
    color: 'pink'
  },
  whistleblower: {
    id: 'whistleblower',
    name: 'Whistleblowers',
    description: 'Treatment of internal dissent and whistleblower retaliation',
    icon: '🔔',
    color: 'fuchsia'
  },
  government_contracts: {
    id: 'government_contracts',
    name: 'Government Contracts',
    description: 'ICE, military, surveillance, and controversial government partnerships',
    icon: '🏛️',
    color: 'stone'
  },
  // Business Practices
  data_privacy: {
    id: 'data_privacy',
    name: 'Data Privacy',
    description: 'Data breaches, user data sales, surveillance capitalism practices',
    icon: '🔒',
    color: 'blue'
  },
  antitrust: {
    id: 'antitrust',
    name: 'Antitrust',
    description: 'Anti-competitive practices, killer acquisitions, platform abuse',
    icon: '⚖️',
    color: 'red'
  },
  tax_avoidance: {
    id: 'tax_avoidance',
    name: 'Tax Practices',
    description: 'Offshore schemes, aggressive tax strategies, tax haven usage',
    icon: '💸',
    color: 'lime'
  },
  open_source: {
    id: 'open_source',
    name: 'Open Source',
    description: 'Support for or exploitation of open source community',
    icon: '🌐',
    color: 'emerald'
  }
} as const

export const POSITION_COLORS = {
  supported: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', dot: 'bg-green-500' },
  opposed: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', dot: 'bg-red-500' },
  silent: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' },
  mixed: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200', dot: 'bg-amber-500' }
} as const

export const POSITION_LABELS = {
  supported: 'Supported',
  opposed: 'Opposed',
  silent: 'Silent',
  mixed: 'Mixed'
} as const

export const SOURCE_LABELS = {
  social_media: 'Social Media',
  press_release: 'Press Release',
  news: 'News',
  sec_filing: 'SEC Filing',
  donation_record: 'Donation Record',
  company_website: 'Company Website',
  interview: 'Interview',
  fec_filing: 'FEC Filing',
  government_record: 'Government Record'
} as const

// Stats type configuration - neutral factual data
export const STAT_TYPE_CONFIG = {
  layoffs: {
    id: 'layoffs',
    name: 'Layoffs',
    icon: '📉',
    description: 'Workforce reductions and layoff events'
  },
  exec_compensation: {
    id: 'exec_compensation',
    name: 'Executive Pay',
    icon: '💰',
    description: 'CEO and executive compensation packages'
  },
  government_contracts: {
    id: 'government_contracts',
    name: 'Government Contracts',
    icon: '🏛️',
    description: 'Contracts with government agencies'
  },
  remote_policy: {
    id: 'remote_policy',
    name: 'Remote Policy',
    icon: '🏠',
    description: 'Office attendance requirements'
  }
} as const

// Topics that are moral stances (pass/fail) vs neutral stats
export const STANCE_TOPICS = [
  'epstein',
  'dei',
  'sexual_harassment',
  'union',
  'worker_treatment',
  'palestine',
  'ai_ethics',
  'whistleblower',
  'free_speech',
  'antitrust',
  'data_privacy',
  'founder_treatment',
  'contractor_classification'
] as const

export const STAT_TOPICS = [
  'layoffs',
  'exec_compensation',
  'government_contracts',
  'remote_work'
] as const
