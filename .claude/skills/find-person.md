# Find Tech Executive/Founder

Research and add a tech executive, founder, or prominent figure to the receipts.tech database.

## When to Use This Skill

Use this skill when you need to:
- Add a new person (CEO, founder, executive, investor) to the database
- Research an individual's professional information
- Document someone's current role and company affiliation

## Data Structure

Each person entry requires:

```typescript
interface Person {
  id: string                      // Unique ID (use next available number)
  name: string                    // Full name
  slug: string                    // URL-friendly slug (lowercase, hyphens)
  photo_url: string | null        // Photo URL (use unavatar.io service)
  current_company_id: string | null // ID of current company (from companies data)
  current_role: string | null     // Current job title
  twitter_handle: string | null   // Twitter/X handle (without @)
  linkedin_url: string | null     // LinkedIn profile URL
  bio: string | null              // Brief bio (1-2 sentences, factual)
}
```

## Research Process

### Step 1: Check for Duplicates

Before adding a new person, search the existing database:

1. Read the `people` array in `src/lib/mock-data.ts`
2. Search for exact name matches and common variations
3. Check for same Twitter handle or LinkedIn URL
4. If duplicate found, update existing entry instead

### Step 2: Gather Person Information

Research the following from public sources:

**Primary Sources (in order of preference):**
1. LinkedIn profile
2. Twitter/X profile
3. Company website (Team/Leadership page)
4. Wikipedia (for notable figures)
5. News articles and interviews

**Required Information:**
- [ ] Full legal name
- [ ] Current company and role
- [ ] Twitter/X handle (if available)
- [ ] LinkedIn URL (if available)
- [ ] Brief factual bio

### Step 3: Get Photo URL

Use the `unavatar.io` service for consistent profile photos:

**Twitter-based (preferred if they have Twitter):**
```
https://unavatar.io/twitter/{twitter_handle}
```

**GitHub-based:**
```
https://unavatar.io/github/{github_username}
```

**Company domain fallback:**
```
https://unavatar.io/{company_domain}
```

Examples:
- `https://unavatar.io/twitter/elonmusk`
- `https://unavatar.io/twitter/sama`
- `https://unavatar.io/github/rauchg`
- `https://unavatar.io/anthropic.com`

**Verify the photo loads** before adding to database.

### Step 4: Generate Slug

Create URL-friendly slug from name:
- Lowercase
- Replace spaces with hyphens
- Remove special characters
- Examples: `elon-musk`, `sam-altman`, `marc-andreessen`

### Step 5: Link to Company

If the person is affiliated with a company in the database:
1. Search `src/data/companies.ts` and related files for the company
2. Get the company's ID
3. Set `current_company_id` to that ID

If company not in database:
- First add the company using the find-company skill
- Then reference its ID

If person is an investor/not at a specific company:
- Set `current_company_id: null`
- Set `current_role` to their investor role (e.g., "VC", "Investor", "Angel Investor")

### Step 6: Determine Next Available ID

Check the `people` array in `src/lib/mock-data.ts` and find the highest ID, then use the next number.

### Step 7: Write Bio

Bio guidelines:
- 1-2 sentences maximum
- Factual and neutral tone
- Include: current role, notable achievements, relevant history
- No promotional language or opinions
- Focus on publicly verifiable information

Examples:
- "CEO of Tesla and SpaceX. Owner of X (Twitter). Head of DOGE."
- "Co-founder and CEO of Stripe."
- "LinkedIn co-founder. Greylock partner."

### Step 8: Add to Database

Add the person to the `people` array in `src/lib/mock-data.ts`.

## Example Entry

```typescript
{
  id: '50',
  name: 'Jane Smith',
  slug: 'jane-smith',
  photo_url: 'https://unavatar.io/twitter/janesmith',
  current_company_id: '200',  // Links to company ID
  current_role: 'CEO',
  twitter_handle: 'janesmith',
  linkedin_url: 'https://linkedin.com/in/janesmith',
  bio: 'Founder and CEO of Acme Corp. Previously VP of Engineering at Google.'
}
```

## Quality Checklist

Before adding entry:
- [ ] Verified no duplicate exists
- [ ] Photo URL loads correctly
- [ ] Name spelling verified from official source
- [ ] Twitter handle is correct and active
- [ ] LinkedIn URL is valid
- [ ] Company ID exists in database (or is null)
- [ ] Bio is factual and neutral
- [ ] ID is unique and sequential
- [ ] Slug is URL-friendly

## Categories of People to Track

**High Priority:**
- CEOs of major tech companies
- Founders of VC-backed startups
- Prominent VCs and investors
- Board members with influence
- Executives who have taken public stances

**Include if notable:**
- CTOs and key technical leaders
- Chief People/HR Officers (relevant for DEI stances)
- General Counsel (relevant for legal stances)
- Investor relations or PR leaders

## Privacy Considerations

Only include:
- Publicly known figures in tech
- Information from public sources
- Professional information (not personal)

Do not include:
- Private individuals
- Personal contact information
- Non-public personal details
