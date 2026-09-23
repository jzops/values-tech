# Populating reciepts.tech

> Single source of truth for the research pipeline. The local
> `/populate-values` command and the scheduled cloud routine both follow this.

Research and add sourced receipts to the reciepts.tech database.

**Repo:** `jzops/values-tech` — you are already inside a checkout.
**Live:** https://reciepts.tech (Netlify, auto-deploys on push to `main`)

> **Run this locally, not in a cloud sandbox.** The Anthropic cloud environment's
> egress policy allows only GitHub and package registries — sec.gov, nlrb.gov,
> reuters, AP, TechCrunch and the rest are all rejected by the proxy, so a cloud
> run cannot verify that a source URL resolves and will correctly refuse to
> publish anything. Scheduled twice daily on the local machine via
> `scripts/populate-local.sh` + `~/Library/LaunchAgents/tech.reciepts.populate.plist`.

## Arguments
`$ARGUMENTS` — optional. An entity name ("Meta"), a type (`--type vc`), or empty
to work the generated worklist. Default: work the worklist.

---

## 0. Get your targets — do this first

```bash
npm ci --silent          # first run in a fresh checkout only
node scripts/worklist.mjs --limit 25
```

The bottleneck is **receipts per entity, not entity count.** 335 entities have
zero receipts; adding more companies without receipts makes the site emptier.
The worklist ranks by how much each entity moves the number of *gradeable*
entities — an entity one receipt short of the threshold is worth far more than a
new company with none.

**Work the worklist top-down.** Do not pick entities at random. Do not add new
entities unless you are also adding 3+ receipts across 2+ topics for them.

An entity becomes gradeable at **3 receipts across 2 distinct topics.**

---

## 1. What a receipt is

```typescript
{ id: '1284', entity_type: 'company', entity_id: '12', topic: 'dei',
  position: 'opposed', summary: '...', source_url: 'https://...',
  source_type: 'news', stance_date: '2025-02-05', verified: true },
```

Append to the `stances` array in `src/lib/mock-data.ts`.

- **`id`** — next integer after the current max. Never reuse. Two batches once
  both started at 1200 and 26 receipts became permanently unreachable.
- **`entity_id`** — must match an existing entity **of that `entity_type`**.
  Company 56 and person 56 are different entities.
- **`topic`** — must exist in `src/lib/constants.ts`.
- **`stance_date`** — the date the thing happened. Never a future date. Avoid
  Jan-1 placeholders; ~40% of the corpus already has fake precision.

---

## 2. Position polarity — read this before coding anything

`opposed` is the mark **against**. `supported` is the mark **in favour**. Each
topic defines what "against" means. Getting this backwards is the single most
damaging error in this database and it has happened twice at scale.

| topic | `opposed` means | `supported` means |
|---|---|---|
| `dei` | rolled back / ended DEI | maintained or expanded it |
| `layoffs` | cut staff, poor handling | avoided cuts, generous severance |
| `union` | fought organising | remained neutral or recognised |
| `palestine` | backed military/occupation, censored Palestinian voices | defended Palestinian rights |
| `government_contracts` | **holds** ICE / military / surveillance work | **declined** it (e.g. Google dropping Project Maven) |
| `politics` | funded or endorsed efforts that **attacked democratic institutions or civil rights** | funded or endorsed efforts defending them |
| `ai_ethics` | shipped unsafe, gutted safety teams | invested in safety, accepted regulation |
| `worker_treatment` | documented mistreatment | documented good practice |

**Every topic in `src/lib/constants.ts` now states its own polarity in its
`description`. Read the description for the topic you are coding and follow it.**
If a topic's description does not state a direction, that is a bug — stop and say
so rather than guessing.

Specific rules learned the hard way:

- **Declining to engage is not an attack.** "We don't do politics" is `mixed`.
- **Inaugural donations are `mixed`,** not `opposed` — currying favour, not an
  attack on institutions. Applies to all of them, company and personal.
- **`epstein` + `opposed` is the ONLY combination that triggers the auto-F.**
  The topic also records the *absence* of a connection — those are `mixed` and
  must never imply one. A `mixed` epstein record once published a named person
  as "Grade F — Epstein Connection" when her record said the opposite.

---

## 3. Attribution — the other error that has happened at scale

97 receipts described a company other than the one they were filed under
("Webflow small layoffs" filed under Docker; "Accel endorsed Trump" was a16z).

- The summary must be **about the filed entity.** If it opens with a different
  company's name, you have almost certainly filed it wrong.
- A firm's record **may** describe its own founder or partner (a16z / Marc
  Andreessen is fine). A firm's record must never describe a *different firm*.
- Partner conduct filed against a firm is acceptable only when the summary makes
  the relationship explicit.

**Company conduct vs the CEO.** A corporate action (an SEC filing, a layoff, a
legal settlement) belongs on the COMPANY. File it against the executive as well
only when they personally drove or publicly owned it, and say so in the summary.
Prefer the company record when in doubt — it is the entity that acted.

---

## 4. Sources

Deep-link to the evidence, never a homepage — 41% of existing receipts link to a
bare domain and the share cards claim "Every line links to a public source."

Priority: SEC/NLRB/FEC filings → major outlets (Reuters, Bloomberg, NYT, The
Verge, TechCrunch, CNBC) → company newsroom → executive's own post.

Verify the URL resolves before writing it. No paywalled-only sources where a
free equivalent exists. No anonymous claims.

---

## 5. Don't restate what's already there

Before adding, check whether that entity already has a receipt on that topic
with that position. 204 receipts currently repeat an existing
entity+topic+position — one story filed several times. Grading rolls up by topic
so it no longer skews scores, but it double-renders on the profile.

Prefer a **new topic** for an entity over a second receipt on one it already has
— new topics are what make an entity gradeable.

---

## 6. Verify before committing — non-negotiable

```bash
npm run check:data     # data integrity gate
npx tsc --noEmit       # types
npx next build         # NOTE: npx, not `npm run build`
```

`npm run build` triggers `prebuild`, which overwrites your local content files
from GitHub `main` and will silently discard your work. Always `npx next build`.

`check:data` fails the build on duplicate ids, duplicate slugs, unresolvable
entity references and future dates. It warns on suspected misattribution,
polarity anomalies, duplicates and shallow sources. **Do not commit while it
reports an error, and read every warning it emits about receipts you just added.**

---

## 7. Commit and deploy

```bash
git add -A -- src
git commit -m "Daily populate: YYYY-MM-DD — N receipts

<entity>: <topic> (<one-line reason>)
..."
git push origin main
```

Push to `main` auto-deploys to Netlify — no manual step. Commits are authored as
`Robin <robin@reciepts.tech>` via the repo-local git config; don't override it.

Then confirm: `curl -sI https://reciepts.tech | head -1` after ~2 minutes.

---

## 8. Report back

- receipts added, per entity
- how many entities crossed into gradeable (re-run `node scripts/worklist.mjs`)
- any entity you researched and found nothing for — say so rather than padding
- any warning `check:data` raised on your additions

**Quality beats volume.** Six well-sourced receipts that make four entities
gradeable is a better day than thirty thin ones. Every wrong receipt is a public
false claim about a named company or person.
