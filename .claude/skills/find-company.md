# Find VC-Backed Tech Company

Research and add a VC-backed tech company to the receipts.tech database.

## When to Use This Skill

Use this skill when you need to:
- Add a new tech company to the database
- Research company information for receipts.tech
- Find publicly viewable logo and company details

## Data Structure

Each company entry requires:

```typescript
interface Company {
  id: string                    // Unique ID (use next available number)
  name: string                  // Official company name
  slug: string                  // URL-friendly slug (lowercase, hyphens)
  logo_url: string | null       // Clearbit logo: https://logo.clearbit.com/{domain}
  website: string | null        // Company website URL
  founded_year: number | null   // Year company was founded
  headcount_range: string | null // Employee count range (e.g., "500+", "1,000-5,000")
  funding_stage: string | null  // Seed, Series A-F, Public, Acquired, Bootstrapped
  total_raised: number | null   // Total funding in USD (null for public companies)
  industry: string | null       // Primary industry category
  description: string | null    // Brief description (1-2 sentences)
}
```

## Research Process

### Step 1: Check for Duplicates

Before adding a new company, search the existing database:

1. Read `src/data/companies.ts`, `src/data/companies-extended.ts`, and `src/data/companies-more.ts`
2. Search for the company name and common variations
3. Check if the company website/domain already exists
4. If duplicate found, update existing entry instead of creating new one

### Step 2: Gather Company Information

Research the following from public sources:

**Primary Sources (in order of preference):**
1. Company website (About page, Press page)
2. Crunchbase
3. LinkedIn company page
4. PitchBook (if accessible)
5. News articles and press releases

**Required Information:**
- [ ] Official company name
- [ ] Company website URL
- [ ] Year founded
- [ ] Current employee count (approximate range)
- [ ] Funding stage and total raised
- [ ] Primary industry/category
- [ ] Brief description

### Step 3: Get Logo URL

Use Clearbit's logo API for consistent, high-quality logos:

```
https://logo.clearbit.com/{company-domain}
```

Examples:
- `https://logo.clearbit.com/stripe.com`
- `https://logo.clearbit.com/openai.com`
- `https://logo.clearbit.com/vercel.com`

**Verify the logo loads** before adding to database.

### Step 4: Generate Slug

Create URL-friendly slug:
- Lowercase
- Replace spaces with hyphens
- Remove special characters
- Examples: `stripe`, `openai`, `scale-ai`, `y-combinator`

### Step 5: Determine Next Available ID

Read existing data files and find the highest ID number used, then use the next number.

### Step 6: Categorize by Industry

Standard industry categories:
- Technology
- AI
- Fintech
- SaaS
- Developer Tools
- E-commerce
- Infrastructure
- Enterprise Software
- Crypto
- Healthcare Tech
- Consumer Tech
- Social Media
- Cybersecurity
- EdTech
- Proptech
- Climate Tech

### Step 7: Add to Database

Add the company to the appropriate data file based on category:
- `src/data/companies.ts` - Core companies (Big Tech, AI, Fintech, Dev Tools, SaaS, E-commerce)
- `src/data/companies-extended.ts` - Additional categories
- `src/data/companies-more.ts` - Overflow and newer additions

## Example Entry

```typescript
{
  id: '200',
  name: 'Acme Corp',
  slug: 'acme-corp',
  logo_url: 'https://logo.clearbit.com/acme.com',
  website: 'https://acme.com',
  founded_year: 2020,
  headcount_range: '200+',
  funding_stage: 'Series B',
  total_raised: 75000000,
  industry: 'AI',
  description: 'AI-powered enterprise automation platform.'
}
```

## Quality Checklist

Before adding entry:
- [ ] Verified no duplicate exists
- [ ] Logo URL loads correctly
- [ ] Website URL is valid and current
- [ ] Description is factual and neutral (no marketing speak)
- [ ] Funding information is from reliable source
- [ ] ID is unique and sequential
- [ ] Slug is URL-friendly

## VC-Backed Verification

Ensure the company is VC-backed by checking:
1. Crunchbase funding rounds
2. Company press releases about funding
3. News articles about investments
4. LinkedIn "Funding" section

If bootstrapped or unknown, set `funding_stage: 'Bootstrapped'` and `total_raised: null`.
