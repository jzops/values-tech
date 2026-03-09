#!/usr/bin/env npx ts-node
/**
 * Fetch images for values.tech entities
 * - Company/VC logos from Clearbit
 * - People photos from Twitter/X
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images');

// Ensure directories exist
['companies', 'vcs', 'people'].forEach(dir => {
  const fullPath = path.join(PUBLIC_DIR, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Download image helper
async function downloadImage(url: string, filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        file.close();
        fs.unlinkSync(filepath);
        resolve(false);
      }
    }).on('error', () => {
      file.close();
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      resolve(false);
    });
  });
}

// Get domain from website URL
function getDomain(website: string | null): string | null {
  if (!website) return null;
  try {
    const url = new URL(website);
    return url.hostname.replace('www.', '');
  } catch {
    return null;
  }
}

// Company data (simplified - just what we need)
const companies = [
  { slug: 'meta', website: 'https://meta.com' },
  { slug: 'google', website: 'https://google.com' },
  { slug: 'amazon', website: 'https://amazon.com' },
  { slug: 'apple', website: 'https://apple.com' },
  { slug: 'microsoft', website: 'https://microsoft.com' },
  { slug: 'tesla', website: 'https://tesla.com' },
  { slug: 'x-twitter', website: 'https://x.com' },
  { slug: 'netflix', website: 'https://netflix.com' },
  { slug: 'nvidia', website: 'https://nvidia.com' },
  { slug: 'adobe', website: 'https://adobe.com' },
  { slug: 'openai', website: 'https://openai.com' },
  { slug: 'anthropic', website: 'https://anthropic.com' },
  { slug: 'stripe', website: 'https://stripe.com' },
  { slug: 'vercel', website: 'https://vercel.com' },
  { slug: 'coinbase', website: 'https://coinbase.com' },
  { slug: 'airbnb', website: 'https://airbnb.com' },
  { slug: 'salesforce', website: 'https://salesforce.com' },
  { slug: 'spotify', website: 'https://spotify.com' },
  { slug: 'slack', website: 'https://slack.com' },
  { slug: 'notion', website: 'https://notion.so' },
  { slug: 'figma', website: 'https://figma.com' },
  { slug: 'canva', website: 'https://canva.com' },
  { slug: 'shopify', website: 'https://shopify.com' },
  { slug: 'uber', website: 'https://uber.com' },
  { slug: 'lyft', website: 'https://lyft.com' },
  { slug: 'doordash', website: 'https://doordash.com' },
  { slug: 'instacart', website: 'https://instacart.com' },
  { slug: 'robinhood', website: 'https://robinhood.com' },
  { slug: 'plaid', website: 'https://plaid.com' },
  { slug: 'github', website: 'https://github.com' },
  { slug: 'gitlab', website: 'https://gitlab.com' },
  { slug: 'datadog', website: 'https://datadoghq.com' },
  { slug: 'cloudflare', website: 'https://cloudflare.com' },
  { slug: 'supabase', website: 'https://supabase.com' },
  { slug: 'linear', website: 'https://linear.app' },
  { slug: 'zoom', website: 'https://zoom.us' },
  { slug: 'twilio', website: 'https://twilio.com' },
  { slug: 'hubspot', website: 'https://hubspot.com' },
  { slug: 'palantir', website: 'https://palantir.com' },
  { slug: 'snowflake', website: 'https://snowflake.com' },
  { slug: 'databricks', website: 'https://databricks.com' },
  { slug: 'discord', website: 'https://discord.com' },
  { slug: 'reddit', website: 'https://reddit.com' },
  { slug: 'snap', website: 'https://snap.com' },
  { slug: 'pinterest', website: 'https://pinterest.com' },
  { slug: 'tiktok', website: 'https://tiktok.com' },
  { slug: 'spacex', website: 'https://spacex.com' },
  { slug: 'rivian', website: 'https://rivian.com' },
  { slug: 'anduril', website: 'https://anduril.com' },
  { slug: 'scale-ai', website: 'https://scale.com' },
];

const vcs = [
  { slug: 'a16z', website: 'https://a16z.com' },
  { slug: 'sequoia', website: 'https://sequoia.com' },
  { slug: 'accel', website: 'https://accel.com' },
  { slug: 'benchmark', website: 'https://benchmark.com' },
  { slug: 'founders-fund', website: 'https://foundersfund.com' },
  { slug: 'kleiner-perkins', website: 'https://kleinerperkins.com' },
  { slug: 'greylock', website: 'https://greylock.com' },
  { slug: 'lightspeed', website: 'https://lsvp.com' },
  { slug: 'general-catalyst', website: 'https://generalcatalyst.com' },
  { slug: 'index-ventures', website: 'https://indexventures.com' },
  { slug: 'y-combinator', website: 'https://ycombinator.com' },
  { slug: 'tiger-global', website: 'https://tigerglobal.com' },
  { slug: 'softbank-vision-fund', website: 'https://visionfund.com' },
  { slug: 'first-round', website: 'https://firstround.com' },
  { slug: 'ribbit-capital', website: 'https://ribbitcap.com' },
  { slug: 'paradigm', website: 'https://paradigm.xyz' },
];

const people = [
  { slug: 'mark-zuckerberg', twitter: 'finkd' },
  { slug: 'elon-musk', twitter: 'elonmusk' },
  { slug: 'sundar-pichai', twitter: 'sundarpichai' },
  { slug: 'tim-cook', twitter: 'tim_cook' },
  { slug: 'satya-nadella', twitter: 'satyanadella' },
  { slug: 'andy-jassy', twitter: 'ajassy' },
  { slug: 'sam-altman', twitter: 'sama' },
  { slug: 'dario-amodei', twitter: 'DarioAmodei' },
  { slug: 'patrick-collison', twitter: 'patrickc' },
  { slug: 'john-collison', twitter: 'collision' },
  { slug: 'guillermo-rauch', twitter: 'rauchg' },
  { slug: 'brian-armstrong', twitter: 'brian_armstrong' },
  { slug: 'brian-chesky', twitter: 'bchesky' },
  { slug: 'marc-benioff', twitter: 'Benioff' },
  { slug: 'jensen-huang', twitter: null },
  { slug: 'reed-hastings', twitter: 'reedhastings' },
  { slug: 'daniel-ek', twitter: 'eldsjal' },
  { slug: 'evan-spiegel', twitter: 'evanspiegel' },
  { slug: 'jack-dorsey', twitter: 'jack' },
  { slug: 'dara-khosrowshahi', twitter: null },
  { slug: 'dylan-field', twitter: 'zoink' },
  { slug: 'ivan-zhao', twitter: 'ivanhzhao' },
  { slug: 'tobi-lutke', twitter: 'tolobi' },
  { slug: 'melanie-perkins', twitter: 'MelanieCanva' },
  { slug: 'alexandr-wang', twitter: 'alexandr_wang' },
  { slug: 'marc-andreessen', twitter: 'pmarca' },
  { slug: 'reid-hoffman', twitter: 'reidhoffman' },
  { slug: 'chamath-palihapitiya', twitter: 'chamath' },
  { slug: 'palmer-luckey', twitter: 'PalmerLuckey' },
  { slug: 'garry-tan', twitter: 'garrytan' },
  { slug: 'david-sacks', twitter: 'DavidSacks' },
  { slug: 'jason-calacanis', twitter: 'Jason' },
];

async function fetchCompanyLogos() {
  console.log('Fetching company logos...');
  for (const company of companies) {
    const domain = getDomain(company.website);
    if (!domain) continue;
    
    const logoUrl = `https://logo.clearbit.com/${domain}`;
    const filepath = path.join(PUBLIC_DIR, 'companies', `${company.slug}.png`);
    
    if (fs.existsSync(filepath)) {
      console.log(`  ✓ ${company.slug} (exists)`);
      continue;
    }
    
    const success = await downloadImage(logoUrl, filepath);
    console.log(`  ${success ? '✓' : '✗'} ${company.slug}`);
    
    // Rate limit
    await new Promise(r => setTimeout(r, 200));
  }
}

async function fetchVCLogos() {
  console.log('\nFetching VC logos...');
  for (const vc of vcs) {
    const domain = getDomain(vc.website);
    if (!domain) continue;
    
    const logoUrl = `https://logo.clearbit.com/${domain}`;
    const filepath = path.join(PUBLIC_DIR, 'vcs', `${vc.slug}.png`);
    
    if (fs.existsSync(filepath)) {
      console.log(`  ✓ ${vc.slug} (exists)`);
      continue;
    }
    
    const success = await downloadImage(logoUrl, filepath);
    console.log(`  ${success ? '✓' : '✗'} ${vc.slug}`);
    
    await new Promise(r => setTimeout(r, 200));
  }
}

async function main() {
  await fetchCompanyLogos();
  await fetchVCLogos();
  
  console.log('\n✅ Done! Images saved to public/images/');
  console.log('\nNote: For people photos, Twitter API requires auth.');
  console.log('Consider using unavatar.io for Twitter profile pics:');
  console.log('  https://unavatar.io/twitter/{handle}');
}

main().catch(console.error);
