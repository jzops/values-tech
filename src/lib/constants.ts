export const TOPICS = {
  layoffs: {
    id: 'layoffs',
    name: 'Layoffs',
    description: 'How they handled layoffs. Opposed = cut staff hard, poor notice or severance. Supported = avoided cuts or handled them generously.',
    icon: '📉',
    color: 'red'
  },
  dei: {
    id: 'dei',
    name: 'DEI',
    description: 'Opposed = rolled back or ended DEI programs. Supported = maintained or expanded them.',
    icon: '🌈',
    color: 'purple'
  },
  remote_work: {
    id: 'remote_work',
    name: 'Remote Work',
    description: 'Opposed = forced return-to-office against staff wishes. Supported = kept remote or hybrid flexibility.',
    icon: '🏠',
    color: 'blue'
  },
  union: {
    id: 'union',
    name: 'Unionization',
    description: 'Opposed = fought organising efforts. Supported = stayed neutral or recognised the union.',
    icon: '✊',
    color: 'orange'
  },
  politics: {
    id: 'politics',
    name: 'Politics',
    description: 'Opposed = funded or endorsed efforts that attacked democratic institutions or civil rights. Supported = funded or endorsed efforts defending them. Inaugural donations are mixed.',
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
    description: 'Opposed = walked back climate commitments or lobbied against them. Supported = made and kept substantive commitments.',
    icon: '🌍',
    color: 'emerald'
  },
  ai_ethics: {
    id: 'ai_ethics',
    name: 'AI Ethics',
    description: 'Opposed = shipped unsafe systems, gutted safety teams, lobbied against oversight. Supported = invested in safety or accepted regulation.',
    icon: '🤖',
    color: 'indigo'
  },
  worker_treatment: {
    id: 'worker_treatment',
    name: 'Worker Treatment',
    description: 'Opposed = documented mistreatment of workers. Supported = documented good practice.',
    icon: '👷',
    color: 'amber'
  },
  exec_compensation: {
    id: 'exec_compensation',
    name: 'Executive Pay',
    description: 'Opposed = extreme pay disparity against worker pay. Supported = restraint or shared upside.',
    icon: '💰',
    color: 'yellow'
  },
  free_speech: {
    id: 'free_speech',
    name: 'Free Speech',
    description: 'Opposed = censored or suppressed lawful speech, or let harm spread through wilful under-moderation. Supported = protected users and speech responsibly. Age or safety gating to protect minors is NOT a mark against.',
    icon: '📢',
    color: 'sky'
  },
  immigration: {
    id: 'immigration',
    name: 'Immigration',
    description: 'Opposed = worked against immigrants or visa holders. Supported = defended or sponsored them.',
    icon: '🛂',
    color: 'teal'
  },
  epstein: {
    id: 'epstein',
    name: 'Epstein Files',
    description: 'Documented connections in the DOJ files. Only `opposed` indicates a connection and it is the ONLY position that affects the grade. `mixed` is used to record the ABSENCE of a connection and must never imply one.',
    icon: '📁',
    color: 'rose'
  },
  // Founder/Investor Relations
  founder_treatment: {
    id: 'founder_treatment',
    name: 'Founder Treatment',
    description: 'Opposed = pushed out founders, punitive down rounds, board coups. Supported = backed founders through hard times.',
    icon: '🤝',
    color: 'violet'
  },
  term_sheets: {
    id: 'term_sheets',
    name: 'Term Sheets',
    description: 'Opposed = predatory terms — participating preferred, ratchets. Supported = clean, founder-fair terms.',
    icon: '📝',
    color: 'slate'
  },
  // Worker & Ethics
  contractor_classification: {
    id: 'contractor_classification',
    name: 'Contractor Rights',
    description: 'Opposed = misclassified workers to avoid benefits. Supported = classified and paid fairly.',
    icon: '🚗',
    color: 'cyan'
  },
  sexual_harassment: {
    id: 'sexual_harassment',
    name: 'Sexual Harassment',
    description: 'Opposed = mishandled or covered up cases. Supported = handled them properly.',
    icon: '⚠️',
    color: 'pink'
  },
  whistleblower: {
    id: 'whistleblower',
    name: 'Whistleblowers',
    description: 'Opposed = retaliated against internal dissent. Supported = protected it.',
    icon: '🔔',
    color: 'fuchsia'
  },
  government_contracts: {
    id: 'government_contracts',
    name: 'Government Contracts',
    description: 'ICE, military, surveillance and other controversial government work. Opposed = holds that work. Supported = declined or withdrew from it.',
    icon: '🏛️',
    color: 'stone'
  },
  // Business Practices
  data_privacy: {
    id: 'data_privacy',
    name: 'Data Privacy',
    description: 'Opposed = sold out user privacy, breaches through negligence, surveillance. Supported = defended user privacy.',
    icon: '🔒',
    color: 'blue'
  },
  antitrust: {
    id: 'antitrust',
    name: 'Antitrust',
    description: 'Opposed = anti-competitive conduct, killer acquisitions, platform abuse. Supported = competed fairly.',
    icon: '⚖️',
    color: 'red'
  },
  tax_avoidance: {
    id: 'tax_avoidance',
    name: 'Tax Practices',
    description: 'Opposed = aggressive avoidance or tax-haven schemes. Supported = paid without engineering around it.',
    icon: '💸',
    color: 'lime'
  },
  open_source: {
    id: 'open_source',
    name: 'Open Source',
    description: 'Opposed = exploited or rug-pulled the open source community. Supported = contributed to and sustained it.',
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
