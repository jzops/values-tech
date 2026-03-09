# values.tech Development Notes

## Completed
- ✅ Deployed to Replit: https://values-tech-fffe-3.replit.app/
- ✅ Added Clearbit logos for all companies and VCs (~450 entities)
- ✅ Added Twitter profile pics for 37 people (via unavatar.io)
- ✅ Updated `gog` CLI to v0.11.0
- ✅ OpenClaw on latest (2026.2.14)

## Pending: X/Twitter Search API

Twitter search requires authenticated access. Guest tokens can fetch:
- Individual tweets by ID
- User profiles by screen name
- User timelines

But **search** requires logged-in session cookies (`auth_token`, `ct0`).

### To enable X search:

**Option 1: Browser Extension Relay**
1. Install OpenClaw Chrome Extension
2. Log into X in Chrome
3. Click extension icon on X tab to attach
4. Run `unbrowse_capture` to capture SearchTimeline API

**Option 2: Manual Cookie Export**
1. Log into X in browser
2. Open DevTools → Application → Cookies → x.com
3. Copy `auth_token` and `ct0` values
4. Add to `/Users/q/.openclaw/skills/x/auth.json`

**Option 3: Playwright with Profile**
Need to close Chrome first, then run Playwright with user data dir.

### Captured X Endpoints (working with guest token)
- `TweetResultByRestId` - Get tweet by ID
- `UserByScreenName` - Get user profile
- `UserTweets` - Get user timeline
- `ExploreSidebar` - Trending topics

### Missing (needs auth)
- `SearchTimeline` - Search tweets
- `HomeTimeline` - Home feed
- DM endpoints
- Post/Like/Retweet actions

## Data Sources

| Data Type | Source | Auth Required |
|-----------|--------|---------------|
| Company logos | Clearbit (`logo.clearbit.com/{domain}`) | No |
| VC logos | Clearbit | No |
| Person photos | unavatar.io (`unavatar.io/x/{handle}`) | No |
| Twitter profiles | X API (guest) | No |
| Twitter search | X API (auth) | **Yes** |

## Files Modified
- `src/data/companies.ts` - Added Clearbit logos
- `src/data/companies-extended.ts` - Added Clearbit logos
- `src/data/companies-more.ts` - Added Clearbit logos
- `src/data/vcs.ts` - Added Clearbit logos
- `src/data/vcs-extended.ts` - Added Clearbit logos
- `src/lib/mock-data.ts` - Added unavatar.io photos for people
