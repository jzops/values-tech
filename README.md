# receipts.tech

**Before they send you their receipts, check theirs.**

Check the receipts on tech companies, VCs, and executives before you take their money, join their company, or use their products. Every receipt is sourced from public records.

## Features

- **Company Profiles** - Check receipts on Meta, Google, Amazon, Tesla, Stripe, OpenAI, and more
- **People Profiles** - Elon Musk, Mark Zuckerberg, Sam Altman, Reid Hoffman, etc.
- **VC Profiles** - a16z, Sequoia, Founders Fund, Y Combinator, etc.
- **Topic Pages** - Browse by topic (layoffs, DEI, remote work, etc.)
- **Search** - Find any company, person, or VC
- **Sources** - Every receipt links to the original source

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (Postgres) - currently using mock data
- **Hosting**: Netlify

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Netlify

1. Push to GitHub
2. Import project in Netlify
3. Deploy

Or use the Netlify CLI:
```bash
npx netlify login
npx netlify deploy --prod
```

### Environment Variables

For production with Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Data

Currently tracking 300+ companies, 45+ people, 300+ VCs, and 166+ documented receipts including:

**Companies**: Meta, Google, Amazon, Apple, Microsoft, Tesla, Twitter/X, Stripe, OpenAI, Anthropic, Uber, Palantir, Activision Blizzard, and more

**People**: Mark Zuckerberg, Elon Musk, Reid Hoffman, Peter Thiel, Marc Andreessen, Travis Kalanick, and more

**VCs**: Andreessen Horowitz, Sequoia Capital, Founders Fund, Y Combinator, Benchmark, SoftBank, Tiger Global

**Topics**: Layoffs, DEI, Remote Work, Politics, Palestine, Sexual Harassment, Government Contracts, Data Privacy, Antitrust, Epstein Files, and more

## Contributing

This is an independent project. Contact: tips@receipts.tech

## License

All data is sourced from public records.
