# Research Public Stances (Receipts)

Research and document public stances taken by tech companies, executives, and VCs on important topics.

## When to Use This Skill

Use this skill when you need to:
- Research an entity's position on a specific topic
- Document a new stance/receipt with proper citation
- Find public records of positions on social issues
- Map stances across multiple topics for an entity

## The Receipts Concept

**receipts.tech** documents publicly verifiable positions ("receipts") that tech entities have taken. The goal is accountability through transparency:
- Every receipt must be sourced from public records
- No speculation or inference - only documented positions
- Neutral documentation, not editorializing

## Data Structure

Each stance entry requires:

```typescript
interface Stance {
  id: string                          // Unique ID (use next available number)
  entity_type: 'company' | 'person' | 'vc'  // Type of entity
  entity_id: string                   // ID of the entity
  topic: string                       // Topic ID from TOPICS constant
  position: 'supported' | 'opposed' | 'silent' | 'mixed'
  summary: string                     // Brief factual summary (1-2 sentences)
  source_url: string                  // URL to primary source
  source_type: 'social_media' | 'press_release' | 'news' | 'sec_filing' | 'donation_record' | 'company_website' | 'interview'
  stance_date: string | null          // Date of stance (YYYY-MM-DD format)
  verified: boolean                   // Has this been verified?
}
```

## Available Topics

Research stances on these topics (use the ID as the `topic` field):

| ID | Topic | Description |
|----|-------|-------------|
| `layoffs` | Layoffs | How they handled layoffs - severance, notice, communication |
| `dei` | DEI | Diversity, equity, and inclusion stances and actions |
| `remote_work` | Remote Work | Remote, hybrid, or return-to-office policies |
| `union` | Unionization | Stance on worker unionization efforts |
| `politics` | Politics | Political donations and endorsements |
| `palestine` | Palestine | Stance on Palestinian rights (opposed = supports Israeli military, supported = defends Palestinian rights) |
| `environment` | Environment | Climate and sustainability actions |
| `ai_ethics` | AI Ethics | AI safety and responsible AI development |
| `worker_treatment` | Worker Treatment | General treatment of employees |
| `exec_compensation` | Executive Pay | CEO pay vs worker pay disparities |
| `free_speech` | Free Speech | Content moderation and speech policies |
| `immigration` | Immigration | Visa sponsorship and immigration policy stances |
| `epstein` | Epstein Files | Connections documented in DOJ files |
| `founder_treatment` | Founder Treatment | How VCs treat founders - down rounds, board coups |
| `term_sheets` | Term Sheets | Predatory vs fair term sheet practices |
| `contractor_classification` | Contractor Rights | Gig economy worker classification |
| `sexual_harassment` | Sexual Harassment | Documented harassment cases and handling |
| `whistleblower` | Whistleblowers | Treatment of internal dissent |
| `government_contracts` | Government Contracts | ICE, military, surveillance partnerships |
| `data_privacy` | Data Privacy | Data breaches, user data sales |
| `antitrust` | Antitrust | Anti-competitive practices |
| `tax_avoidance` | Tax Practices | Offshore schemes, aggressive tax strategies |
| `open_source` | Open Source | Support for or exploitation of open source |

## Research Process

### Step 1: Identify the Entity

Confirm the entity exists in the database:
1. For companies: Check `src/data/companies*.ts`
2. For people: Check `people` array in `src/lib/mock-data.ts`
3. For VCs: Check `src/data/vcs*.ts`

If entity doesn't exist, use the appropriate skill to add them first.

### Step 2: Check for Duplicate Stances

Search existing stances in `src/lib/mock-data.ts`:
1. Filter stances by `entity_type` and `entity_id`
2. Check if stance on same topic already exists
3. If updating, consider if it's a new stance or update to existing

### Step 3: Research Public Sources

Search for evidence across these source types (in order of credibility):

#### Tier 1 - Primary Sources (Highest credibility)
- **Company Website** (`company_website`): Official blog posts, press releases, policy pages
- **SEC Filings** (`sec_filing`): 10-K, 8-K, proxy statements, donation disclosures
- **Press Releases** (`press_release`): Official company announcements

#### Tier 2 - Direct Communication
- **Social Media** (`social_media`): Twitter/X posts, LinkedIn posts from official accounts
- **Interviews** (`interview`): Video interviews, podcast appearances, conference talks

#### Tier 3 - Secondary Sources
- **News** (`news`): Reputable publications (NYT, WSJ, Reuters, Bloomberg, Wired, The Verge, TechCrunch)

#### Tier 4 - Public Records
- **Donation Records** (`donation_record`): FEC filings, OpenSecrets data, state donation records

### Step 4: Search Strategies by Platform

**X (Twitter) Search:**
```
from:{handle} {topic keywords}
from:{handle} layoffs OR fired OR workforce
from:{handle} DEI OR diversity OR inclusion
from:{handle} remote OR RTO OR "return to office"
from:{handle} Trump OR Biden OR election
```

**LinkedIn Search:**
- Check company page posts
- Check executive profile activity
- Search for company + topic keywords

**News Search:**
```
site:nytimes.com "{company name}" {topic}
site:wsj.com "{company name}" {topic}
site:reuters.com "{company name}" {topic}
site:theverge.com "{company name}" {topic}
```

**Public Records:**
- FEC.gov for political donations
- OpenSecrets.org for donation summaries
- SEC EDGAR for filings

### Step 5: Evaluate Position

Determine the position based on evidence:

| Position | When to Use |
|----------|-------------|
| `supported` | Entity actively supports/promotes the issue (e.g., supports DEI, supports remote work) |
| `opposed` | Entity actively opposes/fights against (e.g., anti-union actions, RTO mandates) |
| `mixed` | Conflicting signals or nuanced position |
| `silent` | Notable absence of position when expected (rarely used) |

**Important:** Position meanings are topic-dependent. Read the topic description to understand context.

### Step 6: Write Summary

Summary guidelines:
- 1-2 sentences maximum
- Factual and neutral - no editorializing
- Include specific numbers/dates when available
- Include key actions taken
- No promotional or inflammatory language

**Good examples:**
- "Laid off 21,000 employees (25% of workforce) in 2022-2023, calling it 'Year of Efficiency.'"
- "Fired 28+ employees who protested Project Nimbus (Israeli government cloud contract)."
- "Remote-first company since founding. Fully distributed team."

**Bad examples:**
- "Cruelly fired thousands of workers" (editorializing)
- "Has some issues with diversity" (vague)
- "May have supported Trump" (speculative)

### Step 7: Verify Source URL

Requirements for source URLs:
- [ ] URL is publicly accessible (no paywall if possible)
- [ ] URL is from reputable source
- [ ] URL content supports the summary
- [ ] URL is not likely to break (prefer permanent URLs)

Preferred URL formats:
- Company blog posts: `https://blog.company.com/2024/01/post-title/`
- News articles: `https://www.nytimes.com/2024/01/15/technology/article.html`
- Twitter: `https://twitter.com/handle/status/123456789`
- SEC filings: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&...`

### Step 8: Date the Stance

Use `YYYY-MM-DD` format for `stance_date`:
- Use exact date if known: `2024-01-15`
- Use first of month if only month known: `2024-01-01`
- Use `null` only if truly undatable

### Step 9: Determine Next Available ID

Check the `stances` array in `src/lib/mock-data.ts` for the highest ID, then use the next number.

### Step 10: Add to Database

Add the stance to the `stances` array in `src/lib/mock-data.ts`.

## Example Entries

**Company Layoff Stance:**
```typescript
{
  id: '150',
  entity_type: 'company',
  entity_id: '1',
  topic: 'layoffs',
  position: 'opposed',
  summary: 'Laid off 21,000 employees (25% of workforce) in 2022-2023, calling it "Year of Efficiency." Zuckerberg took responsibility but proceeded with multiple rounds.',
  source_url: 'https://about.fb.com/news/2023/03/mark-zuckerberg-meta-year-of-efficiency/',
  source_type: 'company_website',
  stance_date: '2023-03-14',
  verified: true
}
```

**Person Political Stance:**
```typescript
{
  id: '151',
  entity_type: 'person',
  entity_id: '2',
  topic: 'politics',
  position: 'supported',
  summary: 'Endorsed and heavily funded Trump in 2024. Now leads DOGE. Largest individual political donor.',
  source_url: 'https://www.nytimes.com/2024/elon-musk-trump-support',
  source_type: 'news',
  stance_date: '2024-10-15',
  verified: true
}
```

**VC AI Ethics Stance:**
```typescript
{
  id: '152',
  entity_type: 'vc',
  entity_id: '1',
  topic: 'ai_ethics',
  position: 'opposed',
  summary: 'Marc Andreessen wrote "Techno-Optimist Manifesto" rejecting AI safety concerns as "decel" thinking.',
  source_url: 'https://a16z.com/the-techno-optimist-manifesto/',
  source_type: 'company_website',
  stance_date: '2023-10-16',
  verified: true
}
```

## Quality Checklist

Before adding a stance:
- [ ] Entity exists in database
- [ ] No duplicate stance on same topic
- [ ] Source URL is accessible and supports claim
- [ ] Summary is factual and neutral
- [ ] Position accurately reflects the evidence
- [ ] Date is accurate
- [ ] ID is unique and sequential
- [ ] Source type is correctly categorized

## Research Tips

**Finding Political Donations:**
1. Search FEC.gov for individual name
2. Check OpenSecrets.org summaries
3. Look for news coverage of donations
4. Check PAC contributions

**Finding Layoff Information:**
1. Company blog/newsroom for announcements
2. SEC 8-K filings (material events)
3. News coverage with numbers
4. LinkedIn data for headcount changes

**Finding Remote Work Policies:**
1. Company careers page
2. CEO communications/memos
3. News coverage of policy changes
4. Employee reviews on Glassdoor (corroborate with official sources)

**Finding DEI Stances:**
1. Company diversity reports
2. CEO public statements
3. News coverage of program changes
4. Social media statements

## Handling Sensitive Topics

For sensitive topics like Epstein connections:
- Only include DOJ-documented connections
- Use official court documents as sources
- Be extremely precise in language
- Do not speculate or infer

For Palestine stances:
- Document specific actions (firings, contracts, statements)
- Use official sources
- Note if position is about company policy vs. individual statements
