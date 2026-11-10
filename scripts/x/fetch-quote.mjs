// Pull the verbatim text of an X post, for the `quote` field.
//
// What X allows, as of testing:
//   api.x.com/2          401 — needs a paid key
//   x.com/<user>/status  404 — logged-out reads are blocked
//   publish.x.com/oembed 200 — no key, no auth, officially for embedding
//
// So X cannot be SEARCHED for free: there is no way to discover posts by topic
// or by account. But oEmbed returns the exact text, author name and handle of
// any post whose URL we already have, which is the half that matters — a quote
// must be verbatim, and retyping one from a screenshot in an article is how
// quotes drift.
//
//   node scripts/x/fetch-quote.mjs <post-url> [more urls...]
//
// A deleted post returns 404. That is itself worth recording: cite the article
// that preserved it and say in the summary that the post was removed.
const urls = process.argv.slice(2)
if (!urls.length) {
  console.error('usage: node scripts/x/fetch-quote.mjs https://x.com/<user>/status/<id> ...')
  process.exit(1)
}

const strip = html => html
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&mdash;/g, '—')
  .replace(/\u00a0/g, ' ')
  .trim()

for (const url of urls) {
  const api = `https://publish.x.com/oembed?url=${encodeURIComponent(url)}&omit_script=1&dnt=1`
  try {
    const r = await fetch(api, { headers: { 'User-Agent': 'reciepts.tech research robin@reciepts.tech' } })
    if (!r.ok) { console.log(`\n${url}\n  HTTP ${r.status} — deleted, private, or the account is gone.`); continue }
    const d = await r.json()
    // The embed HTML is the post body, a trailing "— Name (@handle) Date" line,
    // and the permalink. Split the body off the attribution.
    const text = strip(d.html).split(/—\s*[^—]*\(@[^)]+\)/)[0].trim()
    const handle = (d.author_url || '').split('/').filter(Boolean).pop()
    console.log(`\n${url}`)
    console.log(`  author : ${d.author_name} (@${handle})`)
    console.log(`  text   : ${text.replace(/\n/g, '\n           ')}`)
    console.log(`  field  : quote: { text: '${text.replace(/'/g, "\\'").split('\n')[0]}', speaker: '${d.author_name} (@${handle})' }`)
  } catch (e) {
    console.log(`\n${url}\n  failed: ${e.message}`)
  }
}
