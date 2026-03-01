# Find VC Firm

Research and add a venture capital firm to the receipts.tech database.

## When to Use This Skill

Use this skill when you need to:
- Add a new VC firm to the database
- Research VC firm information for receipts.tech
- Document a firm that invests in B2B tech

## Data Structure

Each VC entry requires:

```typescript
interface VC {
  id: string                 // Unique ID (use next available number)
  name: string               // Official firm name
  slug: string               // URL-friendly slug (lowercase, hyphens)
  logo_url: string | null    // Clearbit logo: https://logo.clearbit.com/{domain}
  website: string | null     // Firm website URL
  description: string | null // Brief description (1-2 sentences)
  aum: string | null         // Assets under management (e.g., "$10B+")
}
```

## Research Process

### Step 1: Check for Duplicates

Before adding a new VC, search the existing database:

1. Read `src/data/vcs.ts` and `src/data/vcs-extended.ts`
2. Search for the firm name and common abbreviations (e.g., "a16z" for Andreessen Horowitz)
3. Check if the firm website/domain already exists
4. If duplicate found, update existing entry instead

### Step 2: Verify B2B Tech Focus

Confirm the VC invests in B2B tech by checking:
- Portfolio company list on their website
- Crunchbase investor profile
- PitchBook data
- Recent investment announcements

The VC should have investments in at least some of these categories:
- Enterprise software (SaaS)
- Developer tools / infrastructure
- Fintech (B2B focused)
- AI/ML companies
- Cybersecurity
- Cloud infrastructure
- Data platforms

### Step 3: Gather VC Information

Research the following from public sources:

**Primary Sources (in order of preference):**
1. VC firm website (About page, Team page)
2. Crunchbase investor profile
3. PitchBook (if accessible)
4. LinkedIn company page
5. News articles and press releases

**Required Information:**
- [ ] Official firm name
- [ ] Firm website URL
- [ ] Assets under management (AUM)
- [ ] Brief description with notable investments

### Step 4: Get Logo URL

Use Clearbit's logo API:

```
https://logo.clearbit.com/{vc-domain}
```

Examples:
- `https://logo.clearbit.com/a16z.com`
- `https://logo.clearbit.com/sequoia.com`
- `https://logo.clearbit.com/ycombinator.com`

**Verify the logo loads** before adding to database.

### Step 5: Generate Slug

Create URL-friendly slug:
- Lowercase
- Replace spaces with hyphens
- Use common abbreviations where appropriate
- Examples: `a16z`, `sequoia`, `y-combinator`, `founders-fund`

### Step 6: Determine AUM

Format Assets Under Management:
- Use billions format: `$10B+`, `$35B+`, `$100B+`
- Use millions for smaller funds: `$500M+`, `$200M+`
- Include `+` to indicate approximate/minimum
- If unknown, use `null` or research further

AUM tiers:
- Mega funds: $50B+
- Large funds: $10B-$50B
- Mid-size funds: $1B-$10B
- Smaller funds: <$1B

### Step 7: Write Description

Description guidelines:
- 1-2 sentences maximum
- Include founding story or notable characteristic
- Mention 2-4 notable portfolio companies
- Neutral and factual tone

Examples:
- "Major Silicon Valley VC firm founded by Marc Andreessen and Ben Horowitz. Known for crypto and AI investments."
- "One of the most successful venture capital firms. Early investors in Apple, Google, WhatsApp, Stripe."
- "Peter Thiel's VC firm. Known for SpaceX, Palantir, Stripe investments. Contrarian approach."

### Step 8: Determine Next Available ID

Check `src/data/vcs.ts` and `src/data/vcs-extended.ts` for the highest ID, then use the next number.

### Step 9: Add to Database

Add the VC to the appropriate file:
- `src/data/vcs.ts` - Core VCs (Tier 1, Tiger/Crossover, SoftBank, Early Stage, Fintech, Enterprise, Crypto, Healthcare, European, Asian)
- `src/data/vcs-extended.ts` - Additional VCs and regional funds

## Example Entry

```typescript
{
  id: '100',
  name: 'NewVC Partners',
  slug: 'newvc',
  logo_url: 'https://logo.clearbit.com/newvc.com',
  website: 'https://newvc.com',
  description: 'Enterprise software focused fund. Early investor in notable B2B companies.',
  aum: '$2B+'
}
```

## Quality Checklist

Before adding entry:
- [ ] Verified no duplicate exists
- [ ] Confirmed B2B tech investment focus
- [ ] Logo URL loads correctly
- [ ] Website URL is valid and current
- [ ] AUM is from reliable source
- [ ] Description mentions notable investments
- [ ] ID is unique and sequential
- [ ] Slug is URL-friendly

## VC Categories

Organize VCs by focus/tier:

**Tier 1 Silicon Valley:**
- a16z, Sequoia, Accel, Benchmark, etc.

**Crossover/Hedge Funds:**
- Tiger Global, Coatue, D1 Capital, etc.

**Mega Funds:**
- SoftBank Vision Fund, DST Global, etc.

**Early Stage Specialists:**
- First Round, Initialized, Floodgate, etc.

**Sector Focused:**
- Fintech: Ribbit, QED
- Enterprise: Sapphire, ICONIQ
- Crypto: Paradigm, Polychain
- Healthcare: ARCH, Flagship

**Regional:**
- European: Atomico, Balderton, Northzone
- Asian: Hillhouse, Temasek, GIC

## Notable Investments to Mention

When writing descriptions, prioritize mentioning investments in:
- Companies that are household names
- Unicorns ($1B+ valuation)
- Companies that had successful IPOs
- Companies relevant to the B2B tech space

Examples of strong mentions:
- "Stripe, Airbnb, Coinbase investor"
- "Early Facebook and Instagram investor"
- "Backed Slack, Discord, and Figma"
