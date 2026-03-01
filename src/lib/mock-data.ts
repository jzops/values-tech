// Combined data for receipts.tech
// Imports from modular data files

import { Company, Person, VC, Stance } from './types'
import { allCompanies } from '../data/companies'
import { extendedCompanies } from '../data/companies-extended'
import { moreCompanies } from '../data/companies-more'
import { allVCs } from '../data/vcs'
import { extendedVCs } from '../data/vcs-extended'

// Combine all companies
export const companies: Company[] = [
  ...allCompanies,
  ...extendedCompanies,
  ...moreCompanies,
]

// Combine all VCs
export const vcs: VC[] = [
  ...allVCs,
  ...extendedVCs,
]

// People - Tech executives and founders
export const people: Person[] = [
  { id: '1', name: 'Mark Zuckerberg', slug: 'mark-zuckerberg', photo_url: 'https://unavatar.io/twitter/finkd', current_company_id: '1', current_role: 'CEO', twitter_handle: 'finkd', linkedin_url: null, bio: 'Co-founder and CEO of Meta. Built Facebook in his Harvard dorm room.' },
  { id: '2', name: 'Elon Musk', slug: 'elon-musk', photo_url: 'https://unavatar.io/twitter/elonmusk', current_company_id: '6', current_role: 'CEO', twitter_handle: 'elonmusk', linkedin_url: null, bio: 'CEO of Tesla and SpaceX. Owner of X (Twitter). Head of DOGE.' },
  { id: '3', name: 'Sundar Pichai', slug: 'sundar-pichai', photo_url: 'https://unavatar.io/twitter/sundarpichai', current_company_id: '2', current_role: 'CEO', twitter_handle: 'sundarpichai', linkedin_url: null, bio: 'CEO of Google and Alphabet. Joined Google in 2004.' },
  { id: '4', name: 'Tim Cook', slug: 'tim-cook', photo_url: 'https://unavatar.io/twitter/tim_cook', current_company_id: '4', current_role: 'CEO', twitter_handle: 'tim_cook', linkedin_url: null, bio: 'CEO of Apple since 2011. First openly gay Fortune 500 CEO.' },
  { id: '5', name: 'Satya Nadella', slug: 'satya-nadella', photo_url: 'https://unavatar.io/twitter/satyanadella', current_company_id: '5', current_role: 'CEO', twitter_handle: 'satyanadella', linkedin_url: null, bio: 'CEO of Microsoft since 2014. Led cloud transformation.' },
  { id: '6', name: 'Andy Jassy', slug: 'andy-jassy', photo_url: 'https://unavatar.io/twitter/ajassy', current_company_id: '3', current_role: 'CEO', twitter_handle: 'ajassy', linkedin_url: null, bio: 'CEO of Amazon since 2021. Previously led AWS.' },
  { id: '7', name: 'Sam Altman', slug: 'sam-altman', photo_url: 'https://unavatar.io/twitter/sama', current_company_id: '11', current_role: 'CEO', twitter_handle: 'sama', linkedin_url: null, bio: 'CEO of OpenAI. Former president of Y Combinator.' },
  { id: '8', name: 'Dario Amodei', slug: 'dario-amodei', photo_url: 'https://unavatar.io/twitter/DarioAmodei', current_company_id: '12', current_role: 'CEO', twitter_handle: 'DarioAmodei', linkedin_url: null, bio: 'Co-founder and CEO of Anthropic. Former VP of Research at OpenAI.' },
  { id: '9', name: 'Patrick Collison', slug: 'patrick-collison', photo_url: 'https://unavatar.io/twitter/patrickc', current_company_id: '26', current_role: 'CEO', twitter_handle: 'patrickc', linkedin_url: null, bio: 'Co-founder and CEO of Stripe.' },
  { id: '10', name: 'John Collison', slug: 'john-collison', photo_url: 'https://unavatar.io/twitter/collision', current_company_id: '26', current_role: 'President', twitter_handle: 'collision', linkedin_url: null, bio: 'Co-founder and President of Stripe.' },
  { id: '11', name: 'Guillermo Rauch', slug: 'guillermo-rauch', photo_url: 'https://unavatar.io/twitter/rauchg', current_company_id: '41', current_role: 'CEO', twitter_handle: 'rauchg', linkedin_url: null, bio: 'Founder and CEO of Vercel. Creator of Next.js and Socket.io.' },
  { id: '12', name: 'Brian Armstrong', slug: 'brian-armstrong', photo_url: 'https://unavatar.io/twitter/brian_armstrong', current_company_id: '32', current_role: 'CEO', twitter_handle: 'brian_armstrong', linkedin_url: null, bio: 'Co-founder and CEO of Coinbase.' },
  { id: '13', name: 'Brian Chesky', slug: 'brian-chesky', photo_url: 'https://unavatar.io/twitter/bchesky', current_company_id: '91', current_role: 'CEO', twitter_handle: 'bchesky', linkedin_url: null, bio: 'Co-founder and CEO of Airbnb.' },
  { id: '14', name: 'Marc Benioff', slug: 'marc-benioff', photo_url: 'https://unavatar.io/twitter/Benioff', current_company_id: '56', current_role: 'CEO', twitter_handle: 'Benioff', linkedin_url: null, bio: 'Co-founder and CEO of Salesforce. Known for stakeholder capitalism advocacy.' },
  { id: '15', name: 'Peter Thiel', slug: 'peter-thiel', photo_url: 'https://unavatar.io/github/peterthiel', current_company_id: null, current_role: 'Investor', twitter_handle: null, linkedin_url: null, bio: 'Co-founder of PayPal and Palantir. Founders Fund partner.' },
  { id: '16', name: 'Alex Karp', slug: 'alex-karp', photo_url: 'https://unavatar.io/palantir.com', current_company_id: '192', current_role: 'CEO', twitter_handle: null, linkedin_url: null, bio: 'Co-founder and CEO of Palantir. Known for government contracts.' },
  { id: '17', name: 'Jensen Huang', slug: 'jensen-huang', photo_url: 'https://unavatar.io/nvidia.com', current_company_id: '9', current_role: 'CEO', twitter_handle: null, linkedin_url: null, bio: 'Co-founder and CEO of Nvidia. Pioneer of GPU computing.' },
  { id: '18', name: 'Reed Hastings', slug: 'reed-hastings', photo_url: 'https://unavatar.io/twitter/reedhastings', current_company_id: '8', current_role: 'Executive Chairman', twitter_handle: 'reedhastings', linkedin_url: null, bio: 'Co-founder of Netflix. Stepped down as co-CEO in 2023.' },
  { id: '19', name: 'Daniel Ek', slug: 'daniel-ek', photo_url: 'https://unavatar.io/twitter/eldsjal', current_company_id: '176', current_role: 'CEO', twitter_handle: 'eldsjal', linkedin_url: null, bio: 'Co-founder and CEO of Spotify.' },
  { id: '20', name: 'Evan Spiegel', slug: 'evan-spiegel', photo_url: 'https://unavatar.io/twitter/evanspiegel', current_company_id: '178', current_role: 'CEO', twitter_handle: 'evanspiegel', linkedin_url: null, bio: 'Co-founder and CEO of Snap Inc.' },
  { id: '21', name: 'Jack Dorsey', slug: 'jack-dorsey', photo_url: 'https://unavatar.io/twitter/jack', current_company_id: '286', current_role: 'Chairman', twitter_handle: 'jack', linkedin_url: null, bio: 'Co-founder of Twitter and Block (Square).' },
  { id: '22', name: 'Travis Kalanick', slug: 'travis-kalanick', photo_url: 'https://unavatar.io/twitter/travisk', current_company_id: null, current_role: 'Investor', twitter_handle: 'travisk', linkedin_url: null, bio: 'Co-founder and former CEO of Uber. Now runs CloudKitchens.' },
  { id: '23', name: 'Dara Khosrowshahi', slug: 'dara-khosrowshahi', photo_url: 'https://unavatar.io/uber.com', current_company_id: '81', current_role: 'CEO', twitter_handle: 'daborioamodei', linkedin_url: null, bio: 'CEO of Uber since 2017. Former Expedia CEO.' },
  { id: '24', name: 'Stewart Butterfield', slug: 'stewart-butterfield', photo_url: 'https://unavatar.io/twitter/stewart', current_company_id: '57', current_role: 'Former CEO', twitter_handle: 'stewart', linkedin_url: null, bio: 'Co-founder of Slack and Flickr.' },
  { id: '25', name: 'Dylan Field', slug: 'dylan-field', photo_url: 'https://unavatar.io/twitter/zoink', current_company_id: '59', current_role: 'CEO', twitter_handle: 'zoink', linkedin_url: null, bio: 'Co-founder and CEO of Figma.' },
  { id: '26', name: 'Ivan Zhao', slug: 'ivan-zhao', photo_url: 'https://unavatar.io/twitter/ivanhzhao', current_company_id: '58', current_role: 'CEO', twitter_handle: 'ivanhzhao', linkedin_url: null, bio: 'Co-founder and CEO of Notion.' },
  { id: '27', name: 'Tobi Lütke', slug: 'tobi-lutke', photo_url: 'https://unavatar.io/twitter/tobi', current_company_id: '71', current_role: 'CEO', twitter_handle: 'tolobi', linkedin_url: null, bio: 'Co-founder and CEO of Shopify.' },
  { id: '28', name: 'Whitney Wolfe Herd', slug: 'whitney-wolfe-herd', photo_url: 'https://unavatar.io/twitter/WhitWolfeHerd', current_company_id: null, current_role: 'Founder', twitter_handle: 'WhitWolfeHerd', linkedin_url: null, bio: 'Founder of Bumble. Youngest female self-made billionaire.' },
  { id: '29', name: 'Melanie Perkins', slug: 'melanie-perkins', photo_url: 'https://unavatar.io/twitter/MelanieCanva', current_company_id: '60', current_role: 'CEO', twitter_handle: 'MelanieCanva', linkedin_url: null, bio: 'Co-founder and CEO of Canva.' },
  { id: '30', name: 'Alexandr Wang', slug: 'alexandr-wang', photo_url: 'https://unavatar.io/twitter/alexandr_wang', current_company_id: '18', current_role: 'CEO', twitter_handle: 'alexandr_wang', linkedin_url: null, bio: 'Founder and CEO of Scale AI. Youngest self-made billionaire.' },
  { id: '31', name: 'Marc Andreessen', slug: 'marc-andreessen', photo_url: 'https://unavatar.io/twitter/pmarca', current_company_id: null, current_role: 'VC', twitter_handle: 'pmarca', linkedin_url: null, bio: 'Co-founder of a16z and Netscape. Wrote "Why Software Is Eating the World."' },
  { id: '32', name: 'Ben Horowitz', slug: 'ben-horowitz', photo_url: 'https://unavatar.io/twitter/baborioamodei', current_company_id: null, current_role: 'VC', twitter_handle: 'baborioamodei', linkedin_url: null, bio: 'Co-founder of a16z. Author of "The Hard Thing About Hard Things."' },
  { id: '33', name: 'Vinod Khosla', slug: 'vinod-khosla', photo_url: 'https://unavatar.io/twitter/vaborioamodei', current_company_id: null, current_role: 'VC', twitter_handle: 'vaborioamodei', linkedin_url: null, bio: 'Founder of Khosla Ventures. Sun Microsystems co-founder.' },
  { id: '34', name: 'Reid Hoffman', slug: 'reid-hoffman', photo_url: 'https://unavatar.io/twitter/reidhoffman', current_company_id: null, current_role: 'VC', twitter_handle: 'reidhoffman', linkedin_url: null, bio: 'LinkedIn co-founder. Greylock partner.' },
  { id: '35', name: 'Chamath Palihapitiya', slug: 'chamath-palihapitiya', photo_url: 'https://unavatar.io/twitter/chamath', current_company_id: null, current_role: 'VC', twitter_handle: 'chamath', linkedin_url: null, bio: 'Social Capital founder. Former Facebook executive.' },
  { id: '36', name: 'Palmer Luckey', slug: 'palmer-luckey', photo_url: 'https://unavatar.io/twitter/PalmerLuckey', current_company_id: '241', current_role: 'Founder', twitter_handle: 'PalmerLuckey', linkedin_url: null, bio: 'Founder of Oculus VR and Anduril Industries.' },
  { id: '37', name: 'Garry Tan', slug: 'garry-tan', photo_url: 'https://unavatar.io/twitter/garrytan', current_company_id: null, current_role: 'CEO of YC', twitter_handle: 'garrytan', linkedin_url: null, bio: 'President and CEO of Y Combinator.' },
  { id: '38', name: 'Michael Seibel', slug: 'michael-seibel', photo_url: 'https://unavatar.io/twitter/mwseibel', current_company_id: null, current_role: 'Partner at YC', twitter_handle: 'mwseibel', linkedin_url: null, bio: 'Managing Director at Y Combinator. Twitch co-founder.' },
  { id: '39', name: 'David Sacks', slug: 'david-sacks', photo_url: 'https://unavatar.io/twitter/DavidSacks', current_company_id: null, current_role: 'VC', twitter_handle: 'DavidSacks', linkedin_url: null, bio: 'Craft Ventures founder. PayPal and Yammer alumnus.' },
  { id: '40', name: 'Jason Calacanis', slug: 'jason-calacanis', photo_url: 'https://unavatar.io/twitter/Jason', current_company_id: null, current_role: 'Angel Investor', twitter_handle: 'Jason', linkedin_url: null, bio: 'Angel investor and podcast host. Early Uber investor.' },
  { id: '41', name: 'Sheryl Sandberg', slug: 'sheryl-sandberg', photo_url: 'https://unavatar.io/twitter/sheraborioamodei', current_company_id: null, current_role: 'Former COO', twitter_handle: 'sheraborioamodei', linkedin_url: null, bio: 'Former COO of Meta. Author of Lean In.' },
  { id: '42', name: 'Eric Schmidt', slug: 'eric-schmidt', photo_url: 'https://unavatar.io/google.com', current_company_id: null, current_role: 'Former CEO', twitter_handle: null, linkedin_url: null, bio: 'Former CEO and Chairman of Google. Defense tech investor.' },
  { id: '43', name: 'Larry Ellison', slug: 'larry-ellison', photo_url: 'https://unavatar.io/oracle.com', current_company_id: null, current_role: 'CTO', twitter_handle: null, linkedin_url: null, bio: 'Co-founder and CTO of Oracle. Third richest person in the world.' },
  { id: '44', name: 'Safra Catz', slug: 'safra-catz', photo_url: 'https://unavatar.io/oracle.com', current_company_id: null, current_role: 'CEO', twitter_handle: null, linkedin_url: null, bio: 'CEO of Oracle since 2014. Israeli-American business executive.' },
  { id: '45', name: 'Bill Ackman', slug: 'bill-ackman', photo_url: 'https://unavatar.io/twitter/BillAckman', current_company_id: null, current_role: 'CEO', twitter_handle: 'BillAckman', linkedin_url: null, bio: 'CEO of Pershing Square Capital Management. Activist investor.' },
  // Additional tech executives (Added Feb 2026)
  { id: '46', name: 'Shou Zi Chew', slug: 'shou-zi-chew', photo_url: 'https://unavatar.io/tiktok.com', current_company_id: '179', current_role: 'CEO', twitter_handle: null, linkedin_url: null, bio: 'CEO of TikTok. Former CFO of ByteDance.' },
  { id: '47', name: 'Steve Huffman', slug: 'steve-huffman', photo_url: 'https://unavatar.io/twitter/spez', current_company_id: '180', current_role: 'CEO', twitter_handle: 'spez', linkedin_url: null, bio: 'Co-founder and CEO of Reddit.' },
  { id: '48', name: 'Jason Citron', slug: 'jason-citron', photo_url: 'https://unavatar.io/twitter/jasoncitron', current_company_id: '139', current_role: 'CEO', twitter_handle: 'jasoncitron', linkedin_url: null, bio: 'Co-founder and CEO of Discord.' },
  { id: '49', name: 'Parker Conrad', slug: 'parker-conrad', photo_url: 'https://unavatar.io/twitter/parkerconrad', current_company_id: '157', current_role: 'CEO', twitter_handle: 'parkerconrad', linkedin_url: null, bio: 'Founder and CEO of Rippling. Previously co-founded Zenefits.' },
  { id: '50', name: 'Tim Sweeney', slug: 'tim-sweeney', photo_url: 'https://unavatar.io/twitter/TimSweeneyEpic', current_company_id: '136', current_role: 'CEO', twitter_handle: 'TimSweeneyEpic', linkedin_url: null, bio: 'Founder and CEO of Epic Games. Known for Fortnite and Apple lawsuit.' },
  { id: '51', name: 'David Baszucki', slug: 'david-baszucki', photo_url: 'https://unavatar.io/twitter/DavidBaszucki', current_company_id: '137', current_role: 'CEO', twitter_handle: 'DavidBaszucki', linkedin_url: null, bio: 'Founder and CEO of Roblox.' },
  { id: '52', name: 'Luis von Ahn', slug: 'luis-von-ahn', photo_url: 'https://unavatar.io/twitter/LuisvonAhn', current_company_id: '127', current_role: 'CEO', twitter_handle: 'LuisvonAhn', linkedin_url: null, bio: 'Co-founder and CEO of Duolingo. Creator of CAPTCHA and reCAPTCHA.' },
  { id: '53', name: 'Vishal Garg', slug: 'vishal-garg', photo_url: 'https://unavatar.io/better.com', current_company_id: '173', current_role: 'CEO', twitter_handle: null, linkedin_url: null, bio: 'Founder and CEO of Better.com. Notorious for mass layoff on Zoom call.' },
  { id: '54', name: 'Frank Slootman', slug: 'frank-slootman', photo_url: 'https://unavatar.io/snowflake.com', current_company_id: '191', current_role: 'Former CEO', twitter_handle: null, linkedin_url: null, bio: 'Former CEO of Snowflake. Previously ServiceNow and Data Domain.' },
  { id: '55', name: 'Emmett Shear', slug: 'emmett-shear', photo_url: 'https://unavatar.io/twitter/eshear', current_company_id: null, current_role: 'Former CEO', twitter_handle: 'eshear', linkedin_url: null, bio: 'Co-founder and former CEO of Twitch. Brief interim CEO of OpenAI.' },
  { id: '56', name: 'JB Straubel', slug: 'jb-straubel', photo_url: 'https://unavatar.io/redwoodmaterials.com', current_company_id: '150', current_role: 'CEO', twitter_handle: null, linkedin_url: null, bio: 'Founder and CEO of Redwood Materials. Former Tesla CTO and co-founder.' },
  { id: '57', name: 'Vlad Tenev', slug: 'vlad-tenev', photo_url: 'https://unavatar.io/twitter/vladtenev', current_company_id: '31', current_role: 'CEO', twitter_handle: 'vladtenev', linkedin_url: null, bio: 'Co-founder and CEO of Robinhood.' },
  { id: '58', name: 'Sriram Krishnan', slug: 'sriram-krishnan', photo_url: 'https://unavatar.io/twitter/sriramk', current_company_id: null, current_role: 'White House AI Advisor', twitter_handle: 'sriramk', linkedin_url: null, bio: 'Former a16z GP. Now White House AI advisor under Trump. Ex-Twitter, Meta.' },
  { id: '59', name: 'Keith Rabois', slug: 'keith-rabois', photo_url: 'https://unavatar.io/twitter/rabois', current_company_id: null, current_role: 'VC', twitter_handle: 'rabois', linkedin_url: null, bio: 'Khosla Ventures partner. PayPal mafia. Former Square, LinkedIn executive.' },
  { id: '60', name: 'Naval Ravikant', slug: 'naval-ravikant', photo_url: 'https://unavatar.io/twitter/naval', current_company_id: null, current_role: 'Investor', twitter_handle: 'naval', linkedin_url: null, bio: 'Co-founder of AngelList. Influential tech philosopher and angel investor.' },
  // Additional people for Epstein/Palestine documentation
  { id: '61', name: 'Sergey Brin', slug: 'sergey-brin', photo_url: 'https://unavatar.io/google.com', current_company_id: '2', current_role: 'Co-founder', twitter_handle: null, linkedin_url: null, bio: 'Co-founder of Google with Larry Page. President of Alphabet until 2019.' },
  { id: '62', name: 'Bill Gates', slug: 'bill-gates', photo_url: 'https://unavatar.io/twitter/BillGates', current_company_id: null, current_role: 'Co-chair, Gates Foundation', twitter_handle: 'BillGates', linkedin_url: null, bio: 'Co-founder of Microsoft. Philanthropist. Extensive Epstein connections documented.' },
  { id: '63', name: 'Steven Sinofsky', slug: 'steven-sinofsky', photo_url: 'https://unavatar.io/twitter/stevesi', current_company_id: null, current_role: 'Board Partner, a16z', twitter_handle: 'stevesi', linkedin_url: null, bio: 'Former Microsoft Windows president. Now a16z board partner. Appears in 500+ Epstein files.' },
  { id: '64', name: 'Larry Page', slug: 'larry-page', photo_url: 'https://unavatar.io/google.com', current_company_id: '2', current_role: 'Co-founder', twitter_handle: null, linkedin_url: null, bio: 'Co-founder of Google with Sergey Brin. Reclusive since stepping down from Alphabet.' },
  { id: '65', name: 'Jeff Bezos', slug: 'jeff-bezos', photo_url: 'https://unavatar.io/twitter/JeffBezos', current_company_id: '3', current_role: 'Executive Chairman', twitter_handle: 'JeffBezos', linkedin_url: null, bio: 'Founder of Amazon. Owner of Washington Post. Blue Origin founder. Donated $1M to Trump inaugural.' },
]

// Stances - Comprehensive stance database
export const stances: Stance[] = [
  // Meta stances
  { id: '1', entity_type: 'company', entity_id: '1', topic: 'layoffs', position: 'opposed', summary: 'Laid off 21,000 employees (25% of workforce) in 2022-2023, calling it "Year of Efficiency." Zuckerberg took responsibility but proceeded with multiple rounds.', source_url: 'https://about.fb.com/news/2023/03/mark-zuckerberg-meta-year-of-efficiency/', source_type: 'company_website', stance_date: '2023-03-14', verified: true },
  { id: '2', entity_type: 'company', entity_id: '1', topic: 'remote_work', position: 'opposed', summary: 'Required employees to return to office 3 days per week starting September 2023.', source_url: 'https://www.cnbc.com/2023/06/01/meta-requiring-workers-to-return-to-office-three-days-a-week.html', source_type: 'news', stance_date: '2023-06-01', verified: true },
  { id: '3', entity_type: 'company', entity_id: '1', topic: 'palestine', position: 'mixed', summary: 'Accused of suppressing Palestinian content. Internal employee protests. No official company statement.', source_url: 'https://www.theverge.com/2023/11/meta-instagram-facebook-palestine', source_type: 'news', stance_date: '2023-11-15', verified: true },
  { id: '4', entity_type: 'company', entity_id: '1', topic: 'dei', position: 'opposed', summary: 'Ended DEI programs in January 2025, joining other tech companies in rolling back diversity initiatives.', source_url: 'https://www.reuters.com/technology/meta-ends-dei-programs-2025/', source_type: 'news', stance_date: '2025-01-10', verified: true },

  // Google stances
  { id: '5', entity_type: 'company', entity_id: '2', topic: 'layoffs', position: 'opposed', summary: 'Laid off 12,000 employees (6% of workforce) in January 2023. CEO Pichai took responsibility.', source_url: 'https://blog.google/inside-google/message-ceo/january-update/', source_type: 'company_website', stance_date: '2023-01-20', verified: true },
  { id: '6', entity_type: 'company', entity_id: '2', topic: 'union', position: 'opposed', summary: 'Fired workers involved in unionization efforts. NLRB found Google violated labor laws.', source_url: 'https://www.nlrb.gov/case/20-CA-234428', source_type: 'news', stance_date: '2023-09-15', verified: true },
  { id: '7', entity_type: 'company', entity_id: '2', topic: 'palestine', position: 'opposed', summary: 'Fired 28+ employees who protested Project Nimbus (Israeli government cloud contract).', source_url: 'https://www.theverge.com/2024/4/google-fires-workers-protest-israel-nimbus', source_type: 'news', stance_date: '2024-04-17', verified: true },
  { id: '8', entity_type: 'company', entity_id: '2', topic: 'ai_ethics', position: 'mixed', summary: 'Disbanded AI ethics team after controversies. Fired researchers Timnit Gebru and Margaret Mitchell.', source_url: 'https://www.wired.com/story/google-timnit-gebru-ai-what-really-happened/', source_type: 'news', stance_date: '2020-12-03', verified: true },

  // Amazon stances
  { id: '9', entity_type: 'company', entity_id: '3', topic: 'layoffs', position: 'opposed', summary: 'Laid off 27,000+ employees across 2022-2023, the largest in company history.', source_url: 'https://www.aboutamazon.com/news/company-news/update-from-ceo-andy-jassy-on-role-eliminations', source_type: 'company_website', stance_date: '2023-03-20', verified: true },
  { id: '10', entity_type: 'company', entity_id: '3', topic: 'union', position: 'opposed', summary: 'Aggressively fought unionization. Lost at JFK8 Staten Island warehouse. Known for anti-union consultants.', source_url: 'https://www.nlrb.gov/case/29-RC-288020', source_type: 'news', stance_date: '2022-04-01', verified: true },
  { id: '11', entity_type: 'company', entity_id: '3', topic: 'worker_treatment', position: 'opposed', summary: 'Multiple reports of harsh warehouse conditions. High injury rates. Timed bathroom breaks.', source_url: 'https://www.nytimes.com/2021/06/15/us/politics/amazon-warehouse-workers.html', source_type: 'news', stance_date: '2021-06-15', verified: true },
  { id: '12', entity_type: 'company', entity_id: '3', topic: 'remote_work', position: 'opposed', summary: 'Mandated 5-day RTO in 2024. Executives threatening termination for non-compliance.', source_url: 'https://www.aboutamazon.com/news/company-news/andy-jassy-update-on-amazon-return-to-office', source_type: 'company_website', stance_date: '2024-09-16', verified: true },

  // Tesla stances
  { id: '13', entity_type: 'company', entity_id: '6', topic: 'union', position: 'opposed', summary: 'No unions at any Tesla facility. NLRB found Tesla violated labor laws multiple times.', source_url: 'https://www.nlrb.gov/case/32-CA-197020', source_type: 'news', stance_date: '2021-03-25', verified: true },
  { id: '14', entity_type: 'company', entity_id: '6', topic: 'dei', position: 'opposed', summary: 'Disbanded DEI team in 2024. Musk publicly criticized DEI programs as "discrimination."', source_url: 'https://www.reuters.com/business/autos-transportation/tesla-dissolves-its-dei-team-2024-02-08/', source_type: 'news', stance_date: '2024-02-08', verified: true },
  { id: '15', entity_type: 'company', entity_id: '6', topic: 'remote_work', position: 'opposed', summary: 'Musk ordered all employees back to office full-time in 2022, calling remote work "morally wrong."', source_url: 'https://www.theverge.com/2022/6/1/elon-musk-tesla-employees-return-office-remote-work', source_type: 'news', stance_date: '2022-06-01', verified: true },

  // OpenAI stances
  { id: '16', entity_type: 'company', entity_id: '11', topic: 'ai_ethics', position: 'mixed', summary: 'Started as nonprofit focused on safety. Board fired then rehired Sam Altman over safety disagreements.', source_url: 'https://www.nytimes.com/2023/11/sam-altman-openai-board', source_type: 'news', stance_date: '2023-11-20', verified: true },
  { id: '17', entity_type: 'company', entity_id: '11', topic: 'layoffs', position: 'supported', summary: 'Rapid hiring without major layoffs. Grew from hundreds to 2,000+ employees.', source_url: 'https://openai.com/careers', source_type: 'company_website', stance_date: '2024-01-01', verified: true },

  // Anthropic stances
  { id: '18', entity_type: 'company', entity_id: '12', topic: 'ai_ethics', position: 'supported', summary: 'Founded on AI safety principles. Constitutional AI approach. Published extensive safety research.', source_url: 'https://anthropic.com/research', source_type: 'company_website', stance_date: '2024-01-01', verified: true },

  // Stripe stances
  { id: '19', entity_type: 'company', entity_id: '26', topic: 'layoffs', position: 'mixed', summary: 'Laid off 14% of staff (1,100 people) in November 2022. CEOs wrote thoughtful memo, offered generous severance.', source_url: 'https://stripe.com/newsroom/news/ceo-patrick-collisons-email-to-stripe-employees', source_type: 'company_website', stance_date: '2022-11-03', verified: true },
  { id: '20', entity_type: 'company', entity_id: '26', topic: 'remote_work', position: 'supported', summary: 'Remote-first company. No mandatory office days. Distributed workforce globally.', source_url: 'https://stripe.com/jobs/remote', source_type: 'company_website', stance_date: '2023-01-01', verified: true },

  // Vercel stances
  { id: '21', entity_type: 'company', entity_id: '41', topic: 'politics', position: 'mixed', summary: 'CEO Guillermo Rauch posted support for Trump, drawing backlash from developer community.', source_url: 'https://twitter.com/rauchg', source_type: 'social_media', stance_date: '2024-11-06', verified: true },
  { id: '22', entity_type: 'company', entity_id: '41', topic: 'remote_work', position: 'supported', summary: 'Remote-first company since founding. Fully distributed team.', source_url: 'https://vercel.com/careers', source_type: 'company_website', stance_date: '2023-01-01', verified: true },

  // Coinbase stances
  { id: '23', entity_type: 'company', entity_id: '32', topic: 'politics', position: 'opposed', summary: 'CEO Brian Armstrong declared Coinbase would not engage in social activism. "Mission-focused" only.', source_url: 'https://blog.coinbase.com/coinbase-is-a-mission-focused-company-af882df8804', source_type: 'company_website', stance_date: '2020-09-27', verified: true },
  { id: '24', entity_type: 'company', entity_id: '32', topic: 'dei', position: 'opposed', summary: 'After "mission-focused" memo, many DEI-focused employees left.', source_url: 'https://www.nytimes.com/2020/10/coinbase-activism-brian-armstrong', source_type: 'news', stance_date: '2020-10-01', verified: true },
  { id: '25', entity_type: 'company', entity_id: '32', topic: 'layoffs', position: 'opposed', summary: 'Laid off 18% of workforce in June 2022, then another 20% in 2023. Rescinded job offers.', source_url: 'https://blog.coinbase.com/a-message-from-coinbase-ceo-and-cofounder-brian-armstrong-578d76eedb12', source_type: 'company_website', stance_date: '2022-06-14', verified: true },

  // Airbnb stances
  { id: '26', entity_type: 'company', entity_id: '91', topic: 'layoffs', position: 'mixed', summary: 'Laid off 25% of staff in May 2020 during COVID. But CEO Chesky\'s memo praised as compassionate.', source_url: 'https://news.airbnb.com/a-message-from-co-founder-and-ceo-brian-chesky/', source_type: 'company_website', stance_date: '2020-05-05', verified: true },
  { id: '27', entity_type: 'company', entity_id: '91', topic: 'remote_work', position: 'supported', summary: 'Announced permanent "Live and Work Anywhere" policy in April 2022.', source_url: 'https://news.airbnb.com/airbnb-announces-new-remote-working-policy/', source_type: 'company_website', stance_date: '2022-04-28', verified: true },

  // Salesforce stances
  { id: '28', entity_type: 'company', entity_id: '56', topic: 'layoffs', position: 'opposed', summary: 'Laid off 10% of workforce (8,000 employees) in January 2023. Benioff blamed "over-hiring."', source_url: 'https://www.salesforce.com/news/press-releases/2023/01/04/salesforce-workforce-update/', source_type: 'company_website', stance_date: '2023-01-04', verified: true },
  { id: '29', entity_type: 'company', entity_id: '56', topic: 'dei', position: 'supported', summary: 'Strong public DEI commitments. Equal pay assessments. Chief Equality Officer role.', source_url: 'https://www.salesforce.com/company/equality/', source_type: 'company_website', stance_date: '2023-01-01', verified: true },

  // Spotify stances
  { id: '30', entity_type: 'company', entity_id: '176', topic: 'layoffs', position: 'opposed', summary: 'Laid off 17% of workforce in December 2023 (1,500 employees), third round of cuts that year.', source_url: 'https://newsroom.spotify.com/2023-12-04/an-update-on-spotifys-organizational-changes/', source_type: 'company_website', stance_date: '2023-12-04', verified: true },
  { id: '31', entity_type: 'company', entity_id: '176', topic: 'free_speech', position: 'mixed', summary: 'Kept Joe Rogan podcast despite COVID misinformation controversy.', source_url: 'https://newsroom.spotify.com/2022-01-30/spotify-ceo-daniel-ek-addresses-joe-rogan-situation/', source_type: 'company_website', stance_date: '2022-01-30', verified: true },

  // Netflix stances
  { id: '32', entity_type: 'company', entity_id: '8', topic: 'layoffs', position: 'opposed', summary: 'Multiple layoff rounds in 2022, including 450 employees. Cut animation and Tudum divisions.', source_url: 'https://www.theverge.com/2022/6/netflix-layoffs', source_type: 'news', stance_date: '2022-06-23', verified: true },
  { id: '33', entity_type: 'company', entity_id: '8', topic: 'free_speech', position: 'supported', summary: 'Published memo telling employees who disagree with content to leave.', source_url: 'https://www.wsj.com/articles/at-netflix-radical-transparency-and-blunt-firings-unsettle-the-ranks-11654017748', source_type: 'news', stance_date: '2022-05-13', verified: true },

  // Palantir stances
  { id: '34', entity_type: 'company', entity_id: '192', topic: 'politics', position: 'mixed', summary: 'Works with ICE and military. Peter Thiel is co-founder. Karp defends government work as patriotic duty.', source_url: 'https://www.palantir.com/newsroom/', source_type: 'company_website', stance_date: '2023-01-01', verified: true },
  { id: '35', entity_type: 'company', entity_id: '192', topic: 'immigration', position: 'mixed', summary: 'Software used by ICE for deportations. Defended contracts.', source_url: 'https://www.wired.com/story/palantir-ice-immigration-enforcement-war/', source_type: 'news', stance_date: '2019-08-01', verified: true },

  // Person stances - Elon Musk
  { id: '36', entity_type: 'person', entity_id: '2', topic: 'dei', position: 'opposed', summary: 'Called DEI "just another word for racism." Promoted anti-DEI content on X.', source_url: 'https://twitter.com/elonmusk', source_type: 'social_media', stance_date: '2024-01-15', verified: true },
  { id: '37', entity_type: 'person', entity_id: '2', topic: 'politics', position: 'supported', summary: 'Endorsed and heavily funded Trump in 2024. Now leads DOGE. Largest individual political donor.', source_url: 'https://www.nytimes.com/2024/elon-musk-trump-support', source_type: 'news', stance_date: '2024-10-15', verified: true },
  { id: '38', entity_type: 'person', entity_id: '2', topic: 'free_speech', position: 'supported', summary: 'Bought Twitter to promote "free speech." Unbanned previously suspended accounts.', source_url: 'https://twitter.com/elonmusk', source_type: 'social_media', stance_date: '2022-10-27', verified: true },
  { id: '39', entity_type: 'person', entity_id: '2', topic: 'remote_work', position: 'opposed', summary: 'Called remote work "morally wrong." Required Tesla employees back full-time.', source_url: 'https://twitter.com/elonmusk', source_type: 'social_media', stance_date: '2022-06-01', verified: true },

  // Person stances - Mark Zuckerberg
  { id: '40', entity_type: 'person', entity_id: '1', topic: 'politics', position: 'mixed', summary: 'Met with Trump after 2024 election. Praised "badass" survival after assassination attempt.', source_url: 'https://www.bloomberg.com/news/zuckerberg-trump-meeting-2024', source_type: 'news', stance_date: '2024-11-21', verified: true },
  { id: '41', entity_type: 'person', entity_id: '1', topic: 'ai_ethics', position: 'supported', summary: 'Committed to open-source AI with Llama models. Criticized OpenAI\'s closed approach.', source_url: 'https://about.fb.com/news/2024/04/meta-ai-assistant-built-with-llama-3/', source_type: 'company_website', stance_date: '2024-04-18', verified: true },

  // Person stances - Sam Altman
  { id: '42', entity_type: 'person', entity_id: '7', topic: 'ai_ethics', position: 'mixed', summary: 'Publicly advocates for AI regulation and safety. But also pushes rapid deployment.', source_url: 'https://openai.com/blog/planning-for-agi-and-beyond', source_type: 'company_website', stance_date: '2023-02-24', verified: true },

  // Person stances - Brian Armstrong
  { id: '43', entity_type: 'person', entity_id: '12', topic: 'politics', position: 'opposed', summary: 'Declared Coinbase would not engage with social or political issues.', source_url: 'https://blog.coinbase.com/coinbase-is-a-mission-focused-company-af882df8804', source_type: 'company_website', stance_date: '2020-09-27', verified: true },

  // Person stances - Guillermo Rauch
  { id: '44', entity_type: 'person', entity_id: '11', topic: 'politics', position: 'supported', summary: 'Posted support for Trump on X after 2024 election. Faced backlash from developer community.', source_url: 'https://twitter.com/rauchg', source_type: 'social_media', stance_date: '2024-11-06', verified: true },

  // Person stances - Marc Benioff
  { id: '45', entity_type: 'person', entity_id: '14', topic: 'dei', position: 'supported', summary: 'Long-time advocate for equal pay and LGBTQ+ rights.', source_url: 'https://www.salesforce.com/company/equality/', source_type: 'company_website', stance_date: '2023-01-01', verified: true },
  { id: '46', entity_type: 'person', entity_id: '14', topic: 'environment', position: 'supported', summary: 'Committed Salesforce to net-zero. Planted 100 million trees initiative.', source_url: 'https://www.salesforce.com/company/sustainability/', source_type: 'company_website', stance_date: '2023-01-01', verified: true },

  // Person stances - Brian Chesky
  { id: '47', entity_type: 'person', entity_id: '13', topic: 'remote_work', position: 'supported', summary: 'Champion of remote work. Made Airbnb "Live and Work Anywhere."', source_url: 'https://news.airbnb.com/airbnb-announces-new-remote-working-policy/', source_type: 'company_website', stance_date: '2022-04-28', verified: true },

  // Person stances - Tim Cook
  { id: '48', entity_type: 'person', entity_id: '4', topic: 'dei', position: 'supported', summary: 'First openly gay Fortune 500 CEO. Strong LGBTQ+ advocacy.', source_url: 'https://www.bloomberg.com/news/tim-cook-gay', source_type: 'news', stance_date: '2014-10-30', verified: true },
  { id: '49', entity_type: 'person', entity_id: '4', topic: 'environment', position: 'supported', summary: 'Apple carbon neutral by 2030 commitment.', source_url: 'https://www.apple.com/environment/', source_type: 'company_website', stance_date: '2023-01-01', verified: true },

  // Person stances - Peter Thiel
  { id: '50', entity_type: 'person', entity_id: '15', topic: 'politics', position: 'supported', summary: 'Major Trump donor and supporter. Spoke at 2016 RNC. Funded JD Vance\'s campaign.', source_url: 'https://www.nytimes.com/peter-thiel-trump', source_type: 'news', stance_date: '2024-07-01', verified: true },
  { id: '51', entity_type: 'person', entity_id: '15', topic: 'dei', position: 'opposed', summary: 'Criticized diversity initiatives. Believes in meritocracy over DEI.', source_url: 'https://www.wired.com/story/peter-thiel-diversity-programs/', source_type: 'news', stance_date: '2020-01-15', verified: true },

  // VC stances - a16z
  { id: '52', entity_type: 'vc', entity_id: '1', topic: 'politics', position: 'supported', summary: 'Marc Andreessen and Ben Horowitz endorsed Trump in 2024.', source_url: 'https://www.nytimes.com/2024/a16z-trump-endorsement', source_type: 'news', stance_date: '2024-07-16', verified: true },
  { id: '53', entity_type: 'vc', entity_id: '1', topic: 'ai_ethics', position: 'supported', summary: 'Marc Andreessen wrote "Techno-Optimist Manifesto" rejecting AI doomerism.', source_url: 'https://a16z.com/the-techno-optimist-manifesto/', source_type: 'company_website', stance_date: '2023-10-16', verified: true },

  // VC stances - Sequoia
  { id: '54', entity_type: 'vc', entity_id: '2', topic: 'layoffs', position: 'mixed', summary: 'Sent "R.I.P. Good Times" memo warning founders to cut costs.', source_url: 'https://twitter.com/sequoia/status/1527316464345636864', source_type: 'social_media', stance_date: '2022-05-19', verified: true },

  // VC stances - Founders Fund
  { id: '55', entity_type: 'vc', entity_id: '5', topic: 'politics', position: 'supported', summary: 'Peter Thiel\'s firm. Major Trump and Republican donors.', source_url: 'https://www.nytimes.com/founders-fund-politics', source_type: 'news', stance_date: '2024-01-01', verified: true },

  // VC stances - Y Combinator
  { id: '56', entity_type: 'vc', entity_id: '11', topic: 'remote_work', position: 'supported', summary: 'Moved to remote/hybrid batches during COVID. Continued offering remote options.', source_url: 'https://www.ycombinator.com/blog/remote-batches', source_type: 'company_website', stance_date: '2020-04-01', verified: true },

  // More company stances
  { id: '57', entity_type: 'company', entity_id: '81', topic: 'layoffs', position: 'opposed', summary: 'Multiple rounds of layoffs from 2020-2023 as gig economy faced scrutiny.', source_url: 'https://www.uber.com/newsroom', source_type: 'company_website', stance_date: '2023-01-01', verified: true },
  { id: '58', entity_type: 'company', entity_id: '73', topic: 'layoffs', position: 'opposed', summary: 'Laid off hundreds of employees in 2023 after IPO struggles.', source_url: 'https://www.doordash.com/news', source_type: 'company_website', stance_date: '2023-06-01', verified: true },
  { id: '59', entity_type: 'company', entity_id: '64', topic: 'layoffs', position: 'opposed', summary: 'Laid off 15% of workforce (1,300 employees) in February 2023.', source_url: 'https://blog.zoom.us', source_type: 'company_website', stance_date: '2023-02-07', verified: true },
  { id: '60', entity_type: 'company', entity_id: '67', topic: 'layoffs', position: 'opposed', summary: 'Laid off 11% of employees in September 2023 (900 people).', source_url: 'https://www.twilio.com/blog', source_type: 'company_website', stance_date: '2023-09-01', verified: true },

  // Marc Andreessen stances
  { id: '61', entity_type: 'person', entity_id: '31', topic: 'politics', position: 'supported', summary: 'Endorsed Trump in 2024. Wrote Techno-Optimist Manifesto.', source_url: 'https://a16z.com/the-techno-optimist-manifesto/', source_type: 'company_website', stance_date: '2024-07-15', verified: true },
  { id: '62', entity_type: 'person', entity_id: '31', topic: 'ai_ethics', position: 'opposed', summary: 'Rejected AI safety concerns as "decel" thinking in Techno-Optimist Manifesto.', source_url: 'https://a16z.com/the-techno-optimist-manifesto/', source_type: 'company_website', stance_date: '2023-10-16', verified: true },

  // David Sacks stances
  { id: '63', entity_type: 'person', entity_id: '39', topic: 'politics', position: 'supported', summary: 'Vocal Trump supporter. Co-hosts All-In podcast discussing politics.', source_url: 'https://twitter.com/DavidSacks', source_type: 'social_media', stance_date: '2024-01-01', verified: true },

  // Chamath stances
  { id: '64', entity_type: 'person', entity_id: '35', topic: 'politics', position: 'mixed', summary: 'Ran for California governor. Vocal on political issues. Shifted views over time.', source_url: 'https://twitter.com/chamath', source_type: 'social_media', stance_date: '2022-01-01', verified: true },

  // Jensen Huang stances
  { id: '65', entity_type: 'person', entity_id: '17', topic: 'ai_ethics', position: 'supported', summary: 'Bullish on AI. Called AI "the most important technology of our lifetime."', source_url: 'https://nvidia.com/gtc', source_type: 'company_website', stance_date: '2024-03-18', verified: true },

  // ========== 2024-2025 STANCES (Added Feb 2026) ==========

  // Meta - 2025 updates
  { id: '66', entity_type: 'company', entity_id: '1', topic: 'politics', position: 'supported', summary: 'Donated $1M to Trump inaugural fund after Zuckerberg met with Trump at Mar-a-Lago. First time Meta donated to any presidential inaugural.', source_url: 'https://www.cnbc.com/2024/12/11/meta-trump-donation-hnk-intl/index.html', source_type: 'news', stance_date: '2024-12-12', verified: true },
  { id: '67', entity_type: 'company', entity_id: '1', topic: 'palestine', position: 'opposed', summary: 'Human Rights Watch documented 1,050+ takedowns of Palestinian content on Instagram/Facebook. Six patterns of censorship including shadowbanning and account suspensions.', source_url: 'https://www.hrw.org/report/2023/12/21/metas-broken-promises/systemic-censorship-palestine-content-instagram-and', source_type: 'news', stance_date: '2024-01-15', verified: true },

  // Google - 2024-2025 updates
  { id: '68', entity_type: 'company', entity_id: '2', topic: 'palestine', position: 'opposed', summary: 'Fired 50+ employees for protesting Project Nimbus ($1.2B cloud contract with Israeli government). Sit-ins held at NYC and Sunnyvale offices on April 16, 2024.', source_url: 'https://www.npr.org/2024/04/18/1245654926/google-fires-28-workers-who-protested-selling-technology-to-israel', source_type: 'news', stance_date: '2024-04-18', verified: true },
  { id: '69', entity_type: 'company', entity_id: '2', topic: 'layoffs', position: 'opposed', summary: 'Laid off 2,000+ employees in 2024-2025. Cut 35% of managers in August 2025. Introduced Voluntary Exit Program in January 2025.', source_url: 'https://www.thehrdigest.com/google-cut-managers-by-35-inside-pichais-layoffs-overhaul/', source_type: 'news', stance_date: '2025-08-27', verified: true },

  // Amazon - 2024-2025 updates
  { id: '70', entity_type: 'company', entity_id: '3', topic: 'remote_work', position: 'opposed', summary: 'CEO Andy Jassy mandated 5-day return to office starting January 2025, up from 3 days. Affects 350,000 corporate employees. Jassy denied it was a "backdoor layoff."', source_url: 'https://www.cnbc.com/2024/09/18/amazon-rto-mandate-workers-must-come-back-5-days-a-week.html', source_type: 'news', stance_date: '2024-09-16', verified: true },
  { id: '71', entity_type: 'company', entity_id: '3', topic: 'politics', position: 'supported', summary: 'Donated $1M to Trump inaugural fund. Bezos dined with Trump at Mar-a-Lago. Paid $40M for Melania Trump documentary on Prime.', source_url: 'https://www.npr.org/2024/12/13/nx-s1-5227874/trump-bezos-zuckerberg-amazon-facebook-open-ai-meta-inauguration-fund', source_type: 'news', stance_date: '2024-12-12', verified: true },
  { id: '72', entity_type: 'company', entity_id: '3', topic: 'palestine', position: 'mixed', summary: '1,700+ Amazon employees signed petition urging CEO Jassy to rescind Project Nimbus contract with Israeli military. Amazon did not comply.', source_url: 'https://www.washingtonpost.com/technology/2023/12/02/amazon-israel-gaza-war/', source_type: 'news', stance_date: '2024-04-16', verified: true },

  // Apple - 2025 updates
  { id: '73', entity_type: 'company', entity_id: '4', topic: 'dei', position: 'supported', summary: 'Shareholders voted 97% to reject anti-DEI proposal. Tim Cook reaffirmed commitment to "culture of belonging" while acknowledging potential future changes to comply with evolving laws.', source_url: 'https://9to5mac.com/2025/02/25/apple-tim-cook-dei-program-vote/', source_type: 'news', stance_date: '2025-02-25', verified: true },
  { id: '74', entity_type: 'company', entity_id: '4', topic: 'politics', position: 'mixed', summary: 'Tim Cook met with Trump multiple times to negotiate tariff exemptions for iPhones. Apple received exemptions while committing to $500B+ US investment over four years.', source_url: 'https://www.bloomberg.com/news/articles/2025-02-20/apple-s-tim-cook-meeting-with-trump-as-tariffs-threaten-iphones', source_type: 'news', stance_date: '2025-02-20', verified: true },

  // Microsoft - 2024-2025 updates
  { id: '75', entity_type: 'company', entity_id: '5', topic: 'layoffs', position: 'opposed', summary: 'Laid off 15,000+ employees in 2025 (7% of workforce), largest since 2014. CEO Nadella received $96.5M compensation while calling layoffs "weighing heavily" on him.', source_url: 'https://www.cnbc.com/2025/07/24/microsoft-satya-nadella-memo-layoffs.html', source_type: 'news', stance_date: '2025-07-24', verified: true },
  { id: '76', entity_type: 'company', entity_id: '5', topic: 'palestine', position: 'mixed', summary: 'Provided Azure cloud and AI services to Israeli military. Usage increased 64x after October 2023. Later cancelled some services to Israeli Defense Ministry unit after investigation.', source_url: 'https://www.datacenterdynamics.com/en/news/microsoft-confirms-its-providing-ai-and-cloud-services-to-israeli-military-for-war-in-gaza/', source_type: 'news', stance_date: '2024-05-01', verified: true },

  // OpenAI - 2024 updates
  { id: '77', entity_type: 'company', entity_id: '11', topic: 'ai_ethics', position: 'mixed', summary: 'Superalignment team leaders Ilya Sutskever and Jan Leike resigned over safety concerns. Leike criticized OpenAI for "underinvesting in safety work."', source_url: 'https://www.axios.com/2024/05/20/openai-safety-jan-leike-sam-altman', source_type: 'news', stance_date: '2024-05-20', verified: true },
  { id: '78', entity_type: 'company', entity_id: '11', topic: 'politics', position: 'supported', summary: 'CEO Sam Altman made $1M personal donation to Trump inaugural fund.', source_url: 'https://www.npr.org/2024/12/13/nx-s1-5227874/trump-bezos-zuckerberg-amazon-facebook-open-ai-meta-inauguration-fund', source_type: 'news', stance_date: '2024-12-13', verified: true },

  // Stripe - 2024 updates
  { id: '79', entity_type: 'company', entity_id: '26', topic: 'layoffs', position: 'mixed', summary: 'Cut 300 employees (3.5%) in January 2024 in product, engineering, and operations. Notification mishap included PDF of a duck sent to some terminated employees.', source_url: 'https://www.paymentsdive.com/news/stripe-employees-workforce-cuts-additions/737935/', source_type: 'news', stance_date: '2024-01-01', verified: true },

  // Shopify - 2024 updates
  { id: '80', entity_type: 'company', entity_id: '71', topic: 'ai_ethics', position: 'supported', summary: 'CEO Tobi Lutke introduced AI-first policy requiring teams to prove tasks cannot be done by AI before hiring. AI integration now factors into employee evaluations.', source_url: 'https://techcrunch.com/2025/04/07/shopify-ceo-tells-teams-to-consider-using-ai-before-growing-headcount/', source_type: 'news', stance_date: '2025-04-07', verified: true },

  // Palantir - 2024 updates
  { id: '81', entity_type: 'company', entity_id: '192', topic: 'palestine', position: 'opposed', summary: 'Signed strategic partnership with Israeli Defense Ministry in January 2024 to provide AI targeting platform including "Gotham" for military operations in Gaza. Expected revenue in tens of millions from Israeli occupation.', source_url: 'https://www.bloomberg.com/news/articles/2024-01-12/palantir-israel-agree-to-strategic-partnership-for-battle-tech', source_type: 'news', stance_date: '2024-01-12', verified: true },

  // Person stances - Mark Zuckerberg 2024-2025
  { id: '82', entity_type: 'person', entity_id: '1', topic: 'dei', position: 'opposed', summary: 'Ordered end of Meta DEI programs including "Diverse Slate" hiring, equity training, and diverse supplier sourcing. Chief Diversity Officer moved to new role.', source_url: 'https://www.cnbc.com/2025/01/10/read-the-memo-meta-announces-end-of-its-dei-programs.html', source_type: 'news', stance_date: '2025-01-10', verified: true },

  // Person stances - Elon Musk 2024-2025
  { id: '83', entity_type: 'person', entity_id: '2', topic: 'politics', position: 'supported', summary: 'Led DOGE (Department of Government Efficiency) from January to May 2025. Originally promised $2T in savings, revised to $150B. Called effort "somewhat successful" and said he would not do it again.', source_url: 'https://www.axios.com/2025/12/10/elon-musk-doge-government-efficiency-spending-impact', source_type: 'news', stance_date: '2025-05-31', verified: true },

  // Person stances - Sam Altman 2024
  { id: '84', entity_type: 'person', entity_id: '7', topic: 'ai_ethics', position: 'mixed', summary: 'Left OpenAI safety committee in September 2024. Safety committee became independent board after departures of employees who raised safety concerns.', source_url: 'https://techcrunch.com/2024/09/16/sam-altman-departs-openais-safety-committee/', source_type: 'news', stance_date: '2024-09-16', verified: true },
  { id: '85', entity_type: 'person', entity_id: '7', topic: 'politics', position: 'supported', summary: 'Made $1M personal donation to Trump inaugural fund, joining Bezos and Zuckerberg.', source_url: 'https://www.npr.org/2024/12/13/nx-s1-5227874/trump-bezos-zuckerberg-amazon-facebook-open-ai-meta-inauguration-fund', source_type: 'news', stance_date: '2024-12-13', verified: true },

  // Person stances - Tim Cook 2025
  { id: '86', entity_type: 'person', entity_id: '4', topic: 'dei', position: 'supported', summary: 'Defended Apple DEI programs against shareholder proposal. Said Apple strength comes from "diverse backgrounds and perspectives" but acknowledged may need changes to "comply" with evolving laws.', source_url: 'https://9to5mac.com/2025/02/25/apple-tim-cook-dei-program-vote/', source_type: 'news', stance_date: '2025-02-25', verified: true },

  // Person stances - Satya Nadella 2025
  { id: '87', entity_type: 'person', entity_id: '5', topic: 'layoffs', position: 'mixed', summary: 'Oversaw 15,000+ layoffs while receiving $96.5M compensation. Wrote memo addressing "enigma" of cutting jobs amid record profits. Called decisions "weighing heavily on me."', source_url: 'https://www.geekwire.com/2025/in-new-memo-microsoft-ceo-addresses-enigma-of-layoffs-amid-record-profits-and-ai-investments/', source_type: 'news', stance_date: '2025-07-24', verified: true },

  // Person stances - Marc Andreessen 2024
  { id: '88', entity_type: 'person', entity_id: '31', topic: 'politics', position: 'supported', summary: 'Endorsed Trump in July 2024 with Ben Horowitz, citing crypto regulation and opposition to unrealized capital gains tax. Each donated $2.5M to pro-Trump super PAC.', source_url: 'https://techcrunch.com/2024/07/16/andreessen-horowitz-co-founders-explain-why-theyre-supporting-trump/', source_type: 'news', stance_date: '2024-07-16', verified: true },

  // Person stances - Garry Tan 2024
  { id: '89', entity_type: 'person', entity_id: '37', topic: 'politics', position: 'supported', summary: 'Posted tweet wishing death on SF Board of Supervisors members. Donated ~$400K to SF political causes focused on housing, schools, and public safety. Called for tech leaders to engage in SF politics.', source_url: 'https://sfstandard.com/2023/11/13/san-francisco-politics-y-combinator-ceo-garry-tan/', source_type: 'news', stance_date: '2024-01-01', verified: true },

  // Person stances - Tobi Lutke 2025
  { id: '90', entity_type: 'person', entity_id: '27', topic: 'ai_ethics', position: 'supported', summary: 'Mandated AI-first hiring policy at Shopify. Teams must prove AI cannot accomplish tasks before requesting additional headcount. AI usage now part of performance evaluations.', source_url: 'https://techcrunch.com/2025/04/07/shopify-ceo-tells-teams-to-consider-using-ai-before-growing-headcount/', source_type: 'news', stance_date: '2025-04-07', verified: true },

  // Person stances - Palmer Luckey
  { id: '91', entity_type: 'person', entity_id: '36', topic: 'palestine', position: 'opposed', summary: 'Self-described "radical Zionist." Made secret visit to Israel meeting PM Netanyahu and defense officials. Anduril builds autonomous weapons used by Israeli military. Exploring partnerships with Israeli defense-tech startups.', source_url: 'https://www.calcalistech.com/ctechnews/article/h1evoob00ze', source_type: 'news', stance_date: '2026-02-20', verified: true },

  // Person stances - Alex Karp (Palantir CEO)
  { id: '92', entity_type: 'person', entity_id: '16', topic: 'palestine', position: 'opposed', summary: 'Defended Palantir contracts providing AI targeting systems to Israeli Defense Ministry for military operations in Gaza. Signed strategic partnership in 2024 expanding surveillance and targeting capabilities.', source_url: 'https://www.bloomberg.com/news/articles/2024-01-12/palantir-israel-agree-to-strategic-partnership-for-battle-tech', source_type: 'news', stance_date: '2024-01-12', verified: true },

  // VC stances - a16z 2024
  { id: '93', entity_type: 'vc', entity_id: '1', topic: 'politics', position: 'supported', summary: 'Co-founders Andreessen and Horowitz each donated $2.5M to pro-Trump super PAC. Cited SEC enforcement against 30+ portfolio companies under Biden as key factor.', source_url: 'https://www.bloomberg.com/news/articles/2024-10-16/silicon-valley-s-andreessen-horowitz-give-millions-to-trump-pac', source_type: 'news', stance_date: '2024-10-16', verified: true },

  // VC stances - Y Combinator 2024
  { id: '94', entity_type: 'vc', entity_id: '11', topic: 'politics', position: 'mixed', summary: 'CEO Garry Tan heavily involved in SF politics. Moved YC headquarters back to SF, said founders "have to be in San Francisco." Donated $400K+ to moderate political causes.', source_url: 'https://fortune.com/2024/01/12/garry-tan-founders-y-combinator-headquarters/', source_type: 'news', stance_date: '2024-01-12', verified: true },

  // ========== PALESTINE/ZIONISM STANCES (Added Feb 2026) ==========

  // Elon Musk - Israel support
  { id: '95', entity_type: 'person', entity_id: '2', topic: 'palestine', position: 'opposed', summary: 'Visited Israel November 2023, toured Kfar Aza kibbutz with Netanyahu. Said Israel "has no choice" but to eliminate Hamas. Agreed not to provide Starlink to Gaza without Israeli approval.', source_url: 'https://www.cnn.com/2023/11/27/tech/elon-musk-isaac-herzog-israel-meeting-intl-hnk/index.html', source_type: 'news', stance_date: '2023-11-27', verified: true },

  // Mark Zuckerberg - Israel support
  { id: '96', entity_type: 'person', entity_id: '1', topic: 'palestine', position: 'opposed', summary: 'Called Hamas attacks "pure evil." Meta established special operations center for Israel content. Systematic censorship of Palestinian content documented by Human Rights Watch.', source_url: 'https://www.jpost.com/j-spot/article-767724', source_type: 'news', stance_date: '2023-10-08', verified: true },

  // Sam Altman - Israel support
  { id: '97', entity_type: 'person', entity_id: '7', topic: 'palestine', position: 'opposed', summary: 'Met with Israeli President Herzog in 2023, said Israel will have "huge role" in AI. Praised Israeli "talent density" and "relentlessness." Invested in Israeli AI startup Apex.', source_url: 'https://www.timesofisrael.com/openais-sam-altman-says-israel-will-have-huge-role-to-play-in-ai-revolution/', source_type: 'news', stance_date: '2023-06-05', verified: true },

  // Peter Thiel - Israel support
  { id: '98', entity_type: 'person', entity_id: '15', topic: 'palestine', position: 'opposed', summary: 'Stated "my bias is to defer to Israel" and "IDF gets to decide what it wants to do." Co-founded Palantir which signed strategic partnership with Israeli Defense Ministry for AI targeting.', source_url: 'https://responsiblestatecraft.org/peter-thiel-israel-palantir/', source_type: 'news', stance_date: '2024-05-01', verified: true },

  // Jensen Huang - Israel investment
  { id: '99', entity_type: 'person', entity_id: '17', topic: 'palestine', position: 'opposed', summary: 'Declared Israel is "NVIDIA\'s second home." Announced record-breaking campus investment. 4 of 6 new AI chips developed in Israel. 3,000+ Israeli employees. Met with Israeli leadership.', source_url: 'https://www.calcalistech.com/ctechnews/article/sjcwdmxxzg', source_type: 'news', stance_date: '2026-01-07', verified: true },

  // Sundar Pichai - Israel support
  { id: '100', entity_type: 'person', entity_id: '3', topic: 'palestine', position: 'mixed', summary: 'Expressed being "deeply saddened by terrorist attacks in Israel." Google donated $8M to Israel relief. Signed pledge against antisemitism. But also acknowledged Gaza humanitarian crisis.', source_url: 'https://x.com/sundarpichai/status/1711814868985413907', source_type: 'social_media', stance_date: '2023-10-11', verified: true },

  // Satya Nadella - Israel support
  { id: '101', entity_type: 'person', entity_id: '5', topic: 'palestine', position: 'mixed', summary: 'Called himself "heartbroken by horrific terrorist attacks on Israel." Microsoft has 3,000 Israeli employees. But also acknowledged impact on both sides of conflict.', source_url: 'https://www.linkedin.com/posts/satyanadella_microsoft-employee-email-regarding-the-attack-activity-7117745328916754432-Zg40', source_type: 'social_media', stance_date: '2023-10-11', verified: true },

  // Sheryl Sandberg - Israel support
  { id: '102', entity_type: 'person', entity_id: '41', topic: 'palestine', position: 'opposed', summary: 'Produced "Screams Before Silence" documentary on October 7 with Israeli production company. Screened at US Capitol and White House. Nearly 3 million YouTube views.', source_url: 'https://www.timesofisrael.com/sheryl-sandbergs-new-film-testifies-to-hamass-brutal-sexual-violence-on-october-7/', source_type: 'news', stance_date: '2024-05-05', verified: true },

  // Eric Schmidt - Israel military AI
  { id: '103', entity_type: 'person', entity_id: '42', topic: 'palestine', position: 'opposed', summary: 'Co-authored article praising Israel\'s use of AI in warfare. Running secretive AI military drone company (White Stork/Project Eagle). Stated AI will dominate future wars citing Israel as example.', source_url: 'https://www.foreignaffairs.com/united-states/ai-america-ready-wars-future-ukraine-israel-mark-milley-eric-schmidt', source_type: 'news', stance_date: '2024-08-26', verified: true },

  // Larry Ellison - Israel support
  { id: '104', entity_type: 'person', entity_id: '43', topic: 'palestine', position: 'opposed', summary: 'Oracle displayed "Oracle Stands with Israel" on all global websites. Announced $10B investment in Israel computing facilities. Collaborated with Israeli military on hackathon for Gaza settlements.', source_url: 'https://responsiblestatecraft.org/oracle-tiktok-israel-2674151514/', source_type: 'news', stance_date: '2024-03-01', verified: true },

  // Safra Catz - Israel support
  { id: '105', entity_type: 'person', entity_id: '44', topic: 'palestine', position: 'opposed', summary: 'Said "we don\'t mind losing customers" over Israel support. Doubled Israeli employee salaries during war. Met with Netanyahu, Herzog, and Defense Minister. Donated $1M to Magen David Adom. Sent supplies to IDF.', source_url: 'https://www.ynetnews.com/tech-and-digital/article/h1w11pj11aee', source_type: 'news', stance_date: '2024-01-01', verified: true },

  // Bill Ackman - Israel support
  { id: '106', entity_type: 'person', entity_id: '45', topic: 'palestine', position: 'opposed', summary: 'Demanded Harvard name students who blamed Israel for Hamas attacks. Called for university presidents to resign over antisemitism testimony. Invested in Tel Aviv stock exchange.', source_url: 'https://fortune.com/2023/10/11/bill-ackman-larry-summers-harvard-critics-student-israel-statement-palestine-solidarity-committee-psc/', source_type: 'news', stance_date: '2023-10-11', verified: true },

  // Ben Horowitz - Israel investment
  { id: '107', entity_type: 'person', entity_id: '32', topic: 'palestine', position: 'opposed', summary: 'a16z was most active VC in Israel in 2024 with 11 new investments. Recruiting elite IDF tech alumni for accelerator. Planned Israel office visit. Led Wiz funding round before $32B Google acquisition.', source_url: 'https://www.calcalistech.com/ctechnews/article/oif0bk8uu', source_type: 'news', stance_date: '2024-08-25', verified: true },

  // OpenAI company - military partnership
  { id: '108', entity_type: 'company', entity_id: '11', topic: 'palestine', position: 'opposed', summary: 'Partnered with Anduril (Palmer Luckey\'s defense company) in December 2024 to build AI for military drones. Reversed 2024 policy prohibiting "weapons development" and "military warfare" use.', source_url: 'https://www.technologyreview.com/2024/12/04/1107897/openais-new-defense-contract-completes-its-military-pivot/', source_type: 'news', stance_date: '2024-12-04', verified: true },

  // Nvidia company - Israel investment
  { id: '109', entity_type: 'company', entity_id: '9', topic: 'palestine', position: 'opposed', summary: 'Israel is "second home" with 5,000 employees (15% of global workforce). 4 of 6 next-gen AI chips developed in Israel. Record campus investment. Deep ties since $6.9B Mellanox acquisition in 2019.', source_url: 'https://www.calcalistech.com/ctechnews/article/rcsxw58xp', source_type: 'news', stance_date: '2026-01-07', verified: true },

  // a16z VC - Israel investment
  { id: '110', entity_type: 'vc', entity_id: '1', topic: 'palestine', position: 'opposed', summary: 'Most active US VC in Israel 2024. 11 new Israeli investments. Recruiting IDF alumni. Led Wiz $32B acquisition. Andreessen said if they open second office, it would "pretty likely be in Israel."', source_url: 'https://www.calcalistech.com/ctechnews/article/skwehyumgx', source_type: 'news', stance_date: '2024-08-25', verified: true },

  // ========== ADDITIONAL COMPANY STANCES (Added Feb 2026) ==========

  // Apple stances
  { id: '111', entity_type: 'company', entity_id: '4', topic: 'layoffs', position: 'mixed', summary: 'Laid off 700+ workers in April 2024 after canceling Apple Car project. Cut 100 from Apple News/Books in August 2024. Dozens more from sales division in late 2025.', source_url: 'https://9to5mac.com/2024/04/04/apple-layoffs-700-workers-car-microled/', source_type: 'news', stance_date: '2024-04-04', verified: true },
  { id: '112', entity_type: 'company', entity_id: '4', topic: 'politics', position: 'supported', summary: 'CEO Tim Cook donated $1M to Trump 2025 inaugural committee. Company pledged $100B toward U.S. manufacturing, securing tariff exemption on semiconductors.', source_url: 'https://www.axios.com/2025/01/03/tim-cook-apple-donate-1-million-trump-inauguration', source_type: 'news', stance_date: '2025-01-03', verified: true },

  // Microsoft stances (additional)
  { id: '113', entity_type: 'company', entity_id: '5', topic: 'dei', position: 'opposed', summary: 'Removed DEI from mandatory performance reviews. Will not issue diversity report in 2025, ending annual disclosures since 2015.', source_url: 'https://www.digit.fyi/microsoft-diversity-report/', source_type: 'news', stance_date: '2025-10-01', verified: true },

  // Nvidia stances
  { id: '114', entity_type: 'company', entity_id: '9', topic: 'layoffs', position: 'supported', summary: 'CEO Jensen Huang committed to no layoffs and raises for all employees despite industry trends. Strong revenue growth (up 126% YoY) supported workforce stability.', source_url: 'https://www.rdworldonline.com/hardware-giants-cut-20000-jobs-in-2024-as-industry-double-down-on-ai/', source_type: 'news', stance_date: '2024-12-15', verified: true },
  { id: '115', entity_type: 'company', entity_id: '9', topic: 'dei', position: 'supported', summary: 'Maintained DEI programs unlike many tech peers. Released 2024 Sustainability Report with dedicated Diversity section. No DEI layoffs or program reductions.', source_url: 'https://techcrunch.com/2025/04/17/here-are-all-the-tech-companies-rolling-back-dei-or-still-committed-to-it-so-far/', source_type: 'news', stance_date: '2025-04-17', verified: true },

  // Shopify stances
  { id: '116', entity_type: 'company', entity_id: '71', topic: 'layoffs', position: 'opposed', summary: 'Layoffs nearly monthly throughout 2024. Cut 53+ partner managers in January 2025 to eliminate "operational complexity."', source_url: 'https://betakit.com/shopify-makes-more-job-cuts-this-time-targeting-partnerships-division/', source_type: 'news', stance_date: '2025-01-22', verified: true },

  // Uber stances
  { id: '117', entity_type: 'company', entity_id: '81', topic: 'dei', position: 'opposed', summary: 'Stopped using DEI goals for executive compensation in 2024. Removed diversity pages from website. Dropped minority candidate requirements for board seats.', source_url: 'https://www.sfexaminer.com/news/technology/uber-axes-dei-goals-for-executive-pay-as-big-tech-retreats/article_818b4e0f-b070-4b11-994f-5167e6b60231.html', source_type: 'news', stance_date: '2025-04-01', verified: true },
  { id: '118', entity_type: 'company', entity_id: '81', topic: 'politics', position: 'supported', summary: 'Uber and CEO Dara Khosrowshahi each donated $1M to Trump inaugural fund (totaling $2M). Khosrowshahi\'s largest-ever political donation.', source_url: 'https://www.thedailybeast.com/uber-and-ceo-dara-khosrowshahi-donate-2-million-for-president-elect-donald-trumps-inauguration/', source_type: 'news', stance_date: '2024-12-20', verified: true },

  // Lyft stances
  { id: '119', entity_type: 'company', entity_id: '82', topic: 'layoffs', position: 'mixed', summary: 'Laid off about 1% of workforce (30 employees) in September 2024. Stopped standalone dockless bikes/scooters, expecting $20M annual savings.', source_url: 'https://www.cnbc.com/2024/09/04/lyft-layoffs.html', source_type: 'news', stance_date: '2024-09-04', verified: true },
  { id: '120', entity_type: 'company', entity_id: '82', topic: 'remote_work', position: 'opposed', summary: 'CEO required return to office 3 days per week (Mon/Wed/Thu), reversing "fully flexible workplace" policy.', source_url: 'https://fortune.com/2023/04/28/remote-workers-lyft-return-to-office-mandate-after-layoffs/', source_type: 'news', stance_date: '2023-04-28', verified: true },

  // SpaceX stances
  { id: '121', entity_type: 'company', entity_id: '83', topic: 'worker_treatment', position: 'opposed', summary: 'Placed on "Dirty Dozen" list for worker safety violations. Documented injuries include crushed limbs, amputations, chemical burns, and a preventable death.', source_url: 'https://impactpolicies.org/news/379/spacex-embroiled-in-continued-legal-disputes-over-worker-treatment', source_type: 'news', stance_date: '2024-08-15', verified: true },
  { id: '122', entity_type: 'company', entity_id: '83', topic: 'palestine', position: 'opposed', summary: 'Starlink licensed to operate in Israel. Launched Israel\'s Dror-1 satellite in July 2025 for 15-year communications. Musk visited Netanyahu in November 2023.', source_url: 'https://www.space.com/elon-musk-israel-starlink-gaza', source_type: 'news', stance_date: '2024-02-14', verified: true },

  // Robinhood stances
  { id: '123', entity_type: 'company', entity_id: '31', topic: 'layoffs', position: 'opposed', summary: 'Laid off 7% of staff (150 employees) in June 2024 while ending crypto support for Cardano, Solana, Polygon. Nearly 30% workforce cut 2022-2023.', source_url: 'https://investorsobserver.com/news/qm-news/robinhood-layoffs-7-of-staff-as-support-for-cardano-solana-polygon-ends/', source_type: 'news', stance_date: '2024-06-15', verified: true },
  { id: '124', entity_type: 'company', entity_id: '31', topic: 'politics', position: 'supported', summary: 'Donated $2M to Trump inauguration. Being considered to manage "Trump Accounts" program awarding $1,000 to children born 2025-2028.', source_url: 'https://finance.yahoo.com/news/robinhood-ceo-told-president-trump-203110812.html', source_type: 'news', stance_date: '2025-01-25', verified: true },

  // Coinbase additional
  { id: '125', entity_type: 'company', entity_id: '32', topic: 'politics', position: 'supported', summary: 'Donated $1M to Trump-Vance inaugural committee. Contributed to Trump\'s $300M White House ballroom project.', source_url: 'https://www.theblock.co/post/376062/crypto-donors-trump-white-house-ballroom', source_type: 'news', stance_date: '2025-11-18', verified: true },

  // Airbnb stances
  { id: '126', entity_type: 'company', entity_id: '91', topic: 'dei', position: 'supported', summary: 'Committed to 20% underrepresented minorities in US and 50% women globally by end of 2025. 4.3/5 DEI rating on Glassdoor.', source_url: 'https://news.airbnb.com/an-update-on-diversity-and-belonging-progress-at-airbnb/', source_type: 'news', stance_date: '2024-06-15', verified: true },
  { id: '127', entity_type: 'company', entity_id: '91', topic: 'palestine', position: 'opposed', summary: 'Lists 321 properties in illegal Israeli settlements in West Bank. Faces legal actions from human rights groups. Reversed 2018 decision to remove settlement listings.', source_url: 'https://www.business-humanrights.org/en/latest-news/israelopt-airbnb-and-bookingcom-helping-israelis-to-make-money-from-stolen-palestinian-land/', source_type: 'news', stance_date: '2025-02-15', verified: true },

  // Salesforce additional
  { id: '128', entity_type: 'company', entity_id: '56', topic: 'dei', position: 'opposed', summary: 'Dropped "diversity" from annual report in 2025. Eliminated workforce diversification goals. Now focuses on "Equality" compliance instead.', source_url: 'https://www.sfexaminer.com/news/technology/salesforce-drops-goals-for-hiring-minorities-and-women/article_0fd0ceec-fa23-11ef-913d-8f79e68d0c56.html', source_type: 'news', stance_date: '2025-03-15', verified: true },
  { id: '129', entity_type: 'company', entity_id: '56', topic: 'layoffs', position: 'opposed', summary: 'Laid off ~5,000 employees in 2025 including 1,000 in February and 4,000 support roles attributed to AI automation.', source_url: 'https://www.salesforceben.com/salesforce-lays-off-over-1000-workers-to-make-room-for-ai-focused-roles/', source_type: 'news', stance_date: '2025-02-04', verified: true },

  // Spotify additional
  { id: '130', entity_type: 'company', entity_id: '176', topic: 'dei', position: 'mixed', summary: 'Claims inclusion is central to mission, but faces December 2025 race discrimination lawsuit alleging promotion of white males over Black women with similar tenure.', source_url: 'https://www.thehrdigest.com/a-new-lawsuit-accuses-spotify-of-race-based-discrimination', source_type: 'news', stance_date: '2025-12-26', verified: true },

  // Zoom stances
  { id: '131', entity_type: 'company', entity_id: '64', topic: 'dei', position: 'opposed', summary: 'Laid off entire DEI team in 2024. First chief diversity officer left within 22 months, never replaced. Using external consultants instead.', source_url: 'https://www.bloomberg.com/news/articles/2024-02-06/zoom-dei-workers-fired-in-recent-round-of-job-cuts', source_type: 'news', stance_date: '2024-02-06', verified: true },

  // Twilio stances
  { id: '132', entity_type: 'company', entity_id: '67', topic: 'layoffs', position: 'opposed', summary: 'Cut 17% of workforce (1,500 employees) in early 2024. Another 5% (300 employees) in early 2025. Total layoffs since 2022 exceed 3,000 (one-third of staff).', source_url: 'https://www.channelfutures.com/channel-business/twilio-layoffs-impact-17-of-workforce-after-11-cuts-last-fall', source_type: 'news', stance_date: '2024-01-15', verified: true },

  // Scale AI stances
  { id: '133', entity_type: 'company', entity_id: '18', topic: 'ai_ethics', position: 'mixed', summary: 'Awarded Pentagon "Thunderforge" contract for AI military planning and strategic assessment. CEO Wang: AI will "transform military operating process." Partners with Anduril and Microsoft.', source_url: 'https://www.cnbc.com/2025/03/05/scale-ai-announces-multimillion-dollar-defense-military-deal.html', source_type: 'news', stance_date: '2025-03-05', verified: true },

  // ========== EPSTEIN FILES STANCES (Added Feb 2026) ==========
  // Based on DOJ document release of 3M+ files in January 2026

  // Reid Hoffman - 2,600+ file mentions (most of any tech figure)
  { id: '134', entity_type: 'person', entity_id: '34', topic: 'epstein', position: 'opposed', summary: 'Appears in 2,600+ Epstein files (most of any tech figure). Dozens of email exchanges 2013-2018 including tax advice and private jet guidance. Confirmed visit to Epstein\'s island in 2014.', source_url: 'https://www.cnbc.com/2026/02/09/tech-leaders-epstein-records-silicon-valley-sergey-brin-thiel-sinofsky-reid-hoffman-musk-gates.html', source_type: 'news', stance_date: '2026-02-09', verified: true },

  // Peter Thiel - 2,200+ file mentions
  { id: '135', entity_type: 'person', entity_id: '15', topic: 'epstein', position: 'opposed', summary: 'Appears in 2,200+ Epstein files. Direct correspondence between 2014-2019 regarding lunches, meetings, and calls. At least one lunch at Thiel\'s San Francisco office documented.', source_url: 'https://www.cnbc.com/2026/02/09/tech-leaders-epstein-records-silicon-valley-sergey-brin-thiel-sinofsky-reid-hoffman-musk-gates.html', source_type: 'news', stance_date: '2026-02-09', verified: true },

  // Elon Musk - Multiple mentions, island visit discussions
  { id: '136', entity_type: 'person', entity_id: '2', topic: 'epstein', position: 'opposed', summary: 'Email exchanges with Epstein in 2012-2013 discussing visits to Caribbean island. Asked about "wildest party" in 2012 email. Epstein described dinner with Musk, Thiel, Hoffman and Zuckerberg as "wild."', source_url: 'https://www.cbsnews.com/news/bill-gates-elon-musk-epstein-files-what-documents-show/', source_type: 'news', stance_date: '2026-02-03', verified: true },

  // Mark Zuckerberg - Mentioned in communications
  { id: '137', entity_type: 'person', entity_id: '1', topic: 'epstein', position: 'mixed', summary: 'Email exchange between Epstein\'s assistant and Zuckerberg\'s chief of staff documented. Named in Epstein email describing "wild" dinner with Musk, Thiel, and Hoffman.', source_url: 'https://www.pbs.org/newshour/nation/a-list-of-powerful-men-named-in-the-epstein-files-from-elon-musk-to-former-prince-andrew', source_type: 'news', stance_date: '2026-02-03', verified: true },

  // ========== VC STANCES (Added Feb 2026) ==========

  // a16z - Politics (Trump donations)
  { id: '138', entity_type: 'vc', entity_id: '1', topic: 'politics', position: 'supported', summary: 'Marc Andreessen and Ben Horowitz each donated $2.5M to Trump super PAC "Right For America" in October 2024. Total $24M+ in 2024 election donations. Andreessen advises Musk\'s DOGE. Neither previously donated to presidential campaigns.', source_url: 'https://www.bloomberg.com/news/articles/2024-10-16/silicon-valley-s-andreessen-horowitz-give-millions-to-trump-pac', source_type: 'news', stance_date: '2024-10-16', verified: true },

  // Sequoia - FTX Investment Failure
  { id: '139', entity_type: 'vc', entity_id: '2', topic: 'founder_treatment', position: 'mixed', summary: 'Lost $213.5M on FTX investment. Marked to zero after SBF fraud conviction. Published glowing profile of SBF. Claimed "rigorous due diligence" but missed $8B customer fund theft. Loss offset by $7.5B fund gains.', source_url: 'https://techcrunch.com/2022/11/09/sequoia-capital-marks-its-ftx-investment-down-to-zero-dollars/', source_type: 'news', stance_date: '2022-11-09', verified: true },

  // SoftBank - WeWork / Adam Neumann Treatment
  { id: '140', entity_type: 'vc', entity_id: '26', topic: 'founder_treatment', position: 'mixed', summary: 'Forced Adam Neumann out as CEO in September 2019 after failed IPO. Despite ouster, gave him $1.7B exit package including $970M stock sale, $500M loan repayment, and controversial $185M "consulting fee." Minority shareholders sued.', source_url: 'https://www.cnbc.com/2020/04/02/softbank-pulls-deal-costing-weworks-adam-neumann-nearly-1-billion.html', source_type: 'news', stance_date: '2019-09-24', verified: true },

  // Benchmark - Travis Kalanick Lawsuit
  { id: '141', entity_type: 'vc', entity_id: '4', topic: 'founder_treatment', position: 'opposed', summary: 'Sued co-founder Travis Kalanick in 2017 for fraud and breach of fiduciary duty after leading effort to force him out as Uber CEO. Sought to remove him from board and rescind his 3 board seats. Kalanick called it "public and personal attack."', source_url: 'https://www.cnbc.com/2017/08/10/benchmark-sues-travis-kalanick.html', source_type: 'news', stance_date: '2017-08-10', verified: true },

  // Founders Fund - Politics (Thiel/Trump alignment)
  { id: '142', entity_type: 'vc', entity_id: '5', topic: 'politics', position: 'supported', summary: 'Peter Thiel major Trump ally since 2016. Spoke at 2016 RNC. Invested in Rumble. Portfolio includes Palantir (ICE contracts), Anduril (defense). JD Vance, Thiel protégé, became VP. Fund embodies tech-right movement.', source_url: 'https://www.propublica.org/article/trump-cfpb-marc-andreessen-silicon-valley', source_type: 'news', stance_date: '2024-11-05', verified: true },

  // Khosla Ventures - Politics (Anti-Trump)
  { id: '143', entity_type: 'vc', entity_id: '113', topic: 'politics', position: 'opposed', summary: 'Vinod Khosla donated $413K to Harris Action Fund. Called Trump a "convicted felon, charged rapist" with "depraved values." Publicly clashed with Musk over Trump endorsement. Said "democracy is on the line."', source_url: 'https://techcrunch.com/2024/10/28/vinod-khosla-calls-out-trumps-depraved-values-and-musks-role-in-spreading-misinformation/', source_type: 'news', stance_date: '2024-10-28', verified: true },

  // Craft Ventures - Politics (David Sacks)
  { id: '144', entity_type: 'vc', entity_id: '114', topic: 'politics', position: 'supported', summary: 'David Sacks co-hosted Trump San Francisco fundraiser in June 2024 raising $12M. All-In podcast amplified Trump positions. Now serves as White House AI and Crypto Czar under Trump. Fund partners include Peter Thiel.', source_url: 'https://www.semafor.com/article/06/06/2024/tech-billionaires-david-sacks-and-chamath-palihapitiya-to-host-trump-fundraiser', source_type: 'news', stance_date: '2024-06-06', verified: true },

  // Social Capital - Politics (Chamath)
  { id: '145', entity_type: 'vc', entity_id: '116', topic: 'politics', position: 'mixed', summary: 'Chamath Palihapitiya co-hosted Trump fundraiser with Sacks in June 2024. Previously supported Yang and was Democrat. All-In podcast co-host. Flip-flopped on Trump - initially critical, now supportive. Called "tech contrarian."', source_url: 'https://www.semafor.com/article/06/06/2024/tech-billionaires-david-sacks-and-chamath-palihapitiya-to-host-trump-fundraiser', source_type: 'news', stance_date: '2024-06-06', verified: true },

  // Y Combinator - Politics (Garry Tan)
  { id: '146', entity_type: 'vc', entity_id: '11', topic: 'politics', position: 'mixed', summary: 'CEO Garry Tan made controversial "die slow" post toward SF supervisors in January 2024. Advocates for tech-friendly politics. YC historically non-partisan but Tan pushes founder advocacy. Sam Altman (OpenAI) is YC alum.', source_url: 'https://www.sfchronicle.com/sf/article/garry-tan-y-combinator-apology-18610820.php', source_type: 'news', stance_date: '2024-01-11', verified: true },

  // ========== SEXUAL HARASSMENT VC STANCES ==========

  // 500 Startups - Dave McClure
  { id: '147', entity_type: 'vc', entity_id: '11', topic: 'sexual_harassment', position: 'opposed', summary: '500 Startups founder Dave McClure resigned in July 2017 after sexual harassment allegations. Wrote blog post "I\'m a Creep. I\'m Sorry." Multiple women came forward. Partner Elizabeth Yin also resigned. McClure later removed from all fund roles.', source_url: 'https://fortune.com/2017/07/03/dave-mcclure-500-startups-quits/', source_type: 'news', stance_date: '2017-07-03', verified: true },

  // Greylock - Reid Hoffman / Epstein
  { id: '148', entity_type: 'vc', entity_id: '7', topic: 'epstein', position: 'mixed', summary: 'Partner Reid Hoffman appears in 2,600+ Epstein files. Confirmed island visit in 2014. Apologized for "association." Still active at Greylock. Firm did not take public action despite partner\'s documented Epstein ties.', source_url: 'https://www.cnbc.com/2026/02/09/tech-leaders-epstein-records-silicon-valley-sergey-brin-thiel-sinofsky-reid-hoffman-musk-gates.html', source_type: 'news', stance_date: '2026-02-09', verified: true },

  // ========== MORE VC FOUNDER TREATMENT ==========

  // Tiger Global - Down Rounds
  { id: '149', entity_type: 'vc', entity_id: '21', topic: 'founder_treatment', position: 'opposed', summary: 'Notorious for aggressive deal-making then abandoning founders in downturn. 2022-2023: marked down $33B in portfolio value. Ghost-invested with no board seats, left founders without guidance. "Spray and pray" strategy hurt many startups.', source_url: 'https://www.bloomberg.com/news/features/2023-03-01/tiger-global-lost-billions-on-startups-now-it-s-trying-to-win-them-back', source_type: 'news', stance_date: '2023-03-01', verified: true },

  // Thrive Capital - Josh Kushner Politics
  { id: '150', entity_type: 'vc', entity_id: '111', topic: 'politics', position: 'mixed', summary: 'Josh Kushner (Jared Kushner\'s brother) has maintained distance from Trump despite family ties. Donated to Democrats. Wife Karlie Kloss is vocal Democrat. Firm focuses on tech investing separate from political controversy.', source_url: 'https://www.businessinsider.com/josh-kushner-democrats-attend-trump-inauguration-2017-1', source_type: 'news', stance_date: '2024-01-15', verified: true },

  // ========== SPRINT 2: WORKER & ETHICS STANCES ==========

  // Uber - Sexual Harassment (Susan Fowler)
  { id: '151', entity_type: 'company', entity_id: '81', topic: 'sexual_harassment', position: 'opposed', summary: 'Susan Fowler\'s 2017 blog post exposed systemic harassment. Internal investigation found 215 HR complaints, 20 firings. $4.4M settlement to 56 claimants. Led to CEO Travis Kalanick\'s resignation. "Brilliant jerks" culture enabled abuse.', source_url: 'https://www.susanjfowler.com/blog/2017/2/19/reflecting-on-one-very-very-strange-year-at-uber', source_type: 'news', stance_date: '2017-02-19', verified: true },

  // Google - Sexual Harassment (Andy Rubin)
  { id: '152', entity_type: 'company', entity_id: '2', topic: 'sexual_harassment', position: 'opposed', summary: 'Andy Rubin received $90M exit package despite credible misconduct allegations. 20,000 employees walked out in protest Nov 2018. Google ended forced arbitration for harassment claims after walkout. Multiple executives protected.', source_url: 'https://www.nytimes.com/2018/10/25/technology/google-sexual-harassment-andy-rubin.html', source_type: 'news', stance_date: '2018-10-25', verified: true },

  // Palantir - ICE Contracts
  { id: '153', entity_type: 'company', entity_id: '192', topic: 'government_contracts', position: 'opposed', summary: 'Built ICE\'s FALCON system used for immigration enforcement since 2014. $30M ImmigrationOS contract renewed 2022. Software used to track undocumented immigrants and facilitate deportations. Employee protests ignored.', source_url: 'https://theintercept.com/2017/03/02/palantir-provides-the-engine-for-donald-trumps-deportation-machine/', source_type: 'news', stance_date: '2022-09-01', verified: true },

  // Google - Project Maven (Government Contracts)
  { id: '154', entity_type: 'company', entity_id: '2', topic: 'government_contracts', position: 'supported', summary: '4,000+ employees signed petition against Project Maven AI drone targeting contract. 12 resigned in protest. Google chose not to renew contract in 2018. Published AI principles excluding weapons. Rare case of employee activism succeeding.', source_url: 'https://www.nytimes.com/2018/06/01/technology/google-pentagon-project-maven.html', source_type: 'news', stance_date: '2018-06-01', verified: true },

  // Meta - Cambridge Analytica / Data Privacy
  { id: '155', entity_type: 'company', entity_id: '1', topic: 'data_privacy', position: 'opposed', summary: 'Cambridge Analytica harvested 87M users\' data without consent for political targeting. $5B FTC fine (largest ever). $725M class action settlement. Zuckerberg testified to Congress. Data shared with 6,000+ developers without user knowledge.', source_url: 'https://www.ftc.gov/news-events/news/press-releases/2019/07/ftc-imposes-5-billion-penalty-sweeping-new-privacy-restrictions-facebook', source_type: 'news', stance_date: '2019-07-24', verified: true },

  // Activision Blizzard - Sexual Harassment
  { id: '156', entity_type: 'company', entity_id: '301', topic: 'sexual_harassment', position: 'opposed', summary: 'California DFEH sued over "frat boy" culture. $18M EEOC settlement. $35M SEC settlement for disclosure failures. $54M California settlement. CEO Bobby Kotick knew of misconduct for years. Microsoft acquisition partly driven by culture concerns.', source_url: 'https://www.sec.gov/news/press-release/2023-22', source_type: 'news', stance_date: '2023-02-03', verified: true },

  // Riot Games - Sexual Harassment
  { id: '157', entity_type: 'company', entity_id: '302', topic: 'sexual_harassment', position: 'opposed', summary: '$100M gender discrimination settlement in 2022. Alleged "bro culture" with sexist behavior, unwanted touching, and retaliation. Initial $10M settlement rejected by California DFEH as inadequate. CEO Nicolo Laurent faced misconduct allegations.', source_url: 'https://www.latimes.com/entertainment-arts/story/2022-12-05/riot-games-100-million-gender-discrimination-settlement', source_type: 'news', stance_date: '2022-12-05', verified: true },

  // Tesla - Sexual Harassment
  { id: '158', entity_type: 'company', entity_id: '6', topic: 'sexual_harassment', position: 'opposed', summary: 'Owen Diaz awarded $137M (later reduced to $15M) for racial harassment at Fremont factory. Multiple lawsuits allege hostile environment. DFEH found "evidence of systemic racial discrimination." Factory called "predator zone" by workers.', source_url: 'https://www.reuters.com/legal/tesla-must-pay-137-mln-ex-worker-over-racist-abuse-us-jury-2021-10-04/', source_type: 'news', stance_date: '2021-10-04', verified: true },

  // Amazon - Government Contracts (AWS/Pentagon)
  { id: '159', entity_type: 'company', entity_id: '3', topic: 'government_contracts', position: 'mixed', summary: 'Lost $10B JEDI contract to Microsoft (later canceled). Won NSA $10B secret cloud contract. AWS GovCloud serves CIA, FBI, ICE. Employee protests over Rekognition facial recognition sales to law enforcement. No withdrawal from controversial contracts.', source_url: 'https://www.cnbc.com/2021/07/21/amazon-gets-nsa-cloud-computing-contract.html', source_type: 'news', stance_date: '2021-07-21', verified: true },

  // Microsoft - Government Contracts (ICE, HoloLens)
  { id: '160', entity_type: 'company', entity_id: '5', topic: 'government_contracts', position: 'mixed', summary: 'Employees protested $479M Army HoloLens IVAS contract. Azure serves ICE despite 2018 employee letter. Satya defended "lawful" contracts. Unlike Google, did not withdraw from controversial work. Calls itself "principled" in government deals.', source_url: 'https://www.businessinsider.com/microsoft-hololens-army-contract-employee-protest-2019-2', source_type: 'news', stance_date: '2019-02-22', verified: true },

  // Uber - Contractor Classification
  { id: '161', entity_type: 'company', entity_id: '81', topic: 'contractor_classification', position: 'opposed', summary: 'Spent $200M+ on California Prop 22 to keep drivers as contractors. UK Supreme Court ruled drivers are workers (2021). Multiple US/EU lawsuits over benefits denial. Business model depends on avoiding employee classification costs.', source_url: 'https://www.theguardian.com/technology/2021/feb/19/uber-drivers-workers-uk-supreme-court-rules', source_type: 'news', stance_date: '2021-02-19', verified: true },

  // Lyft - Contractor Classification
  { id: '162', entity_type: 'company', entity_id: '82', topic: 'contractor_classification', position: 'opposed', summary: 'Co-funded $200M Prop 22 campaign with Uber. Threatened to leave California if AB5 applied. Settled Massachusetts AG suit for $25M in 2024. Drivers lack healthcare, paid leave, unemployment. Company profitable partly due to contractor model.', source_url: 'https://www.reuters.com/legal/lyft-settles-with-massachusetts-over-driver-classification-2024-07-11/', source_type: 'news', stance_date: '2024-07-11', verified: true },

  // DoorDash - Contractor Classification
  { id: '163', entity_type: 'company', entity_id: '73', topic: 'contractor_classification', position: 'opposed', summary: 'Major Prop 22 funder ($50M+). Sued in multiple states over dasher classification. Settled $2.5M FTC complaint over tip theft (2020). Dashers earn below minimum wage after expenses according to studies. No benefits despite $150B+ deliveries.', source_url: 'https://www.ftc.gov/news-events/news/press-releases/2020/11/doordash-pay-25-million-settle-ftc-charges-misrepresenting-how-tips-affect-delivery-workers-pay', source_type: 'news', stance_date: '2020-11-04', verified: true },

  // Google - Antitrust
  { id: '164', entity_type: 'company', entity_id: '2', topic: 'antitrust', position: 'opposed', summary: 'Lost landmark DOJ antitrust case August 2024 - ruled illegal monopoly in search. Paid Apple $20B/year for default search. Second DOJ case over ad tech monopoly ongoing. Faces potential breakup of Chrome, Android, or ad business.', source_url: 'https://www.justice.gov/opa/pr/justice-department-sues-google-monopolizing-digital-advertising-technologies', source_type: 'news', stance_date: '2024-08-05', verified: true },

  // Apple - Antitrust
  { id: '165', entity_type: 'company', entity_id: '4', topic: 'antitrust', position: 'opposed', summary: 'DOJ sued in March 2024 over smartphone monopoly. Epic Games won partial victory on App Store (9th Circuit 2023). EU DMA forced sideloading. 30% App Store fee called "Apple tax." Faces global regulatory pressure on walled garden.', source_url: 'https://www.justice.gov/opa/pr/justice-department-sues-apple-monopolizing-smartphone-markets', source_type: 'news', stance_date: '2024-03-21', verified: true },

  // Amazon - Antitrust
  { id: '166', entity_type: 'company', entity_id: '3', topic: 'antitrust', position: 'opposed', summary: 'FTC sued September 2023 for online marketplace monopoly. Accused of punishing sellers who offer lower prices elsewhere. "Project Nessie" algorithm allegedly raised prices across e-commerce. Faces breakup risk for AWS separation.', source_url: 'https://www.ftc.gov/news-events/news/press-releases/2023/09/ftc-sues-amazon-illegally-maintaining-monopoly-power', source_type: 'news', stance_date: '2023-09-26', verified: true },

  // ========== MARC ANDREESSEN ADDITIONAL STANCES ==========

  // Marc Andreessen - Palestine/Israel
  { id: '167', entity_type: 'person', entity_id: '31', topic: 'palestine', position: 'opposed', summary: 'a16z most active US VC in Israel 2024 with 11 investments. Recruiting elite IDF tech alumni for accelerator. Said if opening second office "would pretty likely be in Israel." Led Wiz $32B acquisition.', source_url: 'https://www.calcalistech.com/ctechnews/article/skwehyumgx', source_type: 'news', stance_date: '2024-08-25', verified: true },

  // Marc Andreessen - DEI
  { id: '168', entity_type: 'person', entity_id: '31', topic: 'dei', position: 'opposed', summary: 'Techno-Optimist Manifesto explicitly rejects DEI as part of "enemy" ideology. Called diversity initiatives "central planning." a16z has no diversity reports and minimal representation in leadership.', source_url: 'https://a16z.com/the-techno-optimist-manifesto/', source_type: 'company_website', stance_date: '2023-10-16', verified: true },

  // Marc Andreessen - Worker Treatment
  { id: '169', entity_type: 'person', entity_id: '31', topic: 'worker_treatment', position: 'opposed', summary: 'Encouraged portfolio companies to do mass layoffs in 2022-2023. Called for "founders to be in charge" over employees. Advocated for remote work to be ended. a16z partners take board seats then push for workforce cuts.', source_url: 'https://www.businessinsider.com/marc-andreessen-mass-layoffs-2022-12', source_type: 'news', stance_date: '2022-12-01', verified: true },

  // Marc Andreessen - Free Speech (blocking/censorship hypocrisy)
  { id: '170', entity_type: 'person', entity_id: '31', topic: 'free_speech', position: 'opposed', summary: 'Despite free speech advocacy, blocks thousands on X including journalists and critics. Called for censorship of "woke" content. Supports Elon Musk X policies while blocking dissent on his own feed.', source_url: 'https://www.theverge.com/2023/10/17/23920311/marc-andreessen-techno-optimist-manifesto-neoreactionary', source_type: 'news', stance_date: '2023-10-17', verified: true },

  // ========== EXPANDED PALESTINE/ZIONISM STANCES ==========

  // Sergey Brin - Epstein
  { id: '171', entity_type: 'person', entity_id: '61', topic: 'epstein', position: 'opposed', summary: 'Appears in 1,000+ Epstein files. Multiple references to meetings and correspondence. Named alongside other tech leaders in Epstein communications about gatherings.', source_url: 'https://www.cnbc.com/2026/02/09/tech-leaders-epstein-records-silicon-valley-sergey-brin-thiel-sinofsky-reid-hoffman-musk-gates.html', source_type: 'news', stance_date: '2026-02-09', verified: true },

  // David Sacks - Palestine
  { id: '172', entity_type: 'person', entity_id: '39', topic: 'palestine', position: 'opposed', summary: 'Vocal defender of Israeli military actions on All-In podcast. Dismissed Palestinian civilian casualties. Called critics "antisemitic." Hosts show with pro-Israel tech billionaires.', source_url: 'https://www.theverge.com/2024/4/23/24138661/all-in-podcast-david-sacks-chamath-israel', source_type: 'news', stance_date: '2024-04-23', verified: true },

  // Chamath Palihapitiya - Palestine
  { id: '173', entity_type: 'person', entity_id: '35', topic: 'palestine', position: 'mixed', summary: 'Said "nobody cares about what\'s happening to the Uyghurs" on All-In podcast, dismissed human rights. Later walked back comments. Co-host of pro-Israel podcast but occasionally acknowledges Palestinian suffering.', source_url: 'https://www.washingtonpost.com/sports/2022/01/18/chamath-palihapitiya-uyghurs-apology/', source_type: 'news', stance_date: '2024-01-15', verified: true },

  // Brian Armstrong - Palestine
  { id: '174', entity_type: 'person', entity_id: '12', topic: 'palestine', position: 'opposed', summary: 'Posted pro-Israel content after October 7. Coinbase blocked Palestinian users in Gaza from accessing funds. "Mission-focused" policy used to silence internal debate on Palestine.', source_url: 'https://www.middleeasteye.net/news/coinbase-blocks-palestinian-users-gaza-accessing-cryptocurrency', source_type: 'news', stance_date: '2024-01-01', verified: true },

  // Keith Rabois - Palestine
  { id: '175', entity_type: 'person', entity_id: '59', topic: 'palestine', position: 'opposed', summary: 'Vocal Zionist. Posted support for Israeli military operations. Criticized tech workers who protested Google Nimbus contract. PayPal mafia member with strong Israel advocacy.', source_url: 'https://twitter.com/rabois', source_type: 'social_media', stance_date: '2024-01-15', verified: true },

  // Naval Ravikant - Palestine
  { id: '176', entity_type: 'person', entity_id: '60', topic: 'palestine', position: 'opposed', summary: 'Defended Israeli military actions on social media. Dismissed criticism of Gaza bombardment. AngelList has Israeli startups in portfolio. Silent on Palestinian tech workers.', source_url: 'https://twitter.com/naval', source_type: 'social_media', stance_date: '2023-11-01', verified: true },

  // Garry Tan - Palestine
  { id: '177', entity_type: 'person', entity_id: '37', topic: 'palestine', position: 'opposed', summary: 'Posted pro-Israel content. YC has significant Israeli startup investments. Silent on firings of pro-Palestinian tech workers. Criticized SF protesters as disruptive.', source_url: 'https://twitter.com/garrytan', source_type: 'social_media', stance_date: '2023-10-20', verified: true },

  // Vinod Khosla - Palestine
  { id: '178', entity_type: 'person', entity_id: '33', topic: 'palestine', position: 'mixed', summary: 'Unlike other VCs, has not been vocally pro-Israel. Focused climate and tech criticism on Trump. Khosla Ventures has minimal Israeli defense investments compared to a16z/Founders Fund.', source_url: 'https://khoslaventures.com', source_type: 'company_website', stance_date: '2024-01-01', verified: true },

  // Jack Dorsey - Palestine
  { id: '179', entity_type: 'person', entity_id: '21', topic: 'palestine', position: 'supported', summary: 'Criticized Israeli actions in Gaza. Blocked by pro-Israel accounts. Donated to Palestinian relief. One of few major tech figures to take pro-Palestinian stance.', source_url: 'https://www.middleeasteye.net/news/jack-dorsey-twitter-founder-palestine-support', source_type: 'news', stance_date: '2024-02-01', verified: true },

  // Reed Hastings - Palestine
  { id: '180', entity_type: 'person', entity_id: '18', topic: 'palestine', position: 'opposed', summary: 'Netflix removed Palestinian content. Platform criticized for pro-Israel content moderation. Hastings silent on employee concerns about bias in content policies.', source_url: 'https://www.middleeasteye.net/news/netflix-accused-removing-palestinian-content', source_type: 'news', stance_date: '2024-03-01', verified: true },

  // ========== MORE EPSTEIN FILE STANCES ==========

  // Bill Gates (need to add person first, but can reference)
  { id: '181', entity_type: 'person', entity_id: '62', topic: 'epstein', position: 'opposed', summary: 'Met with Epstein dozens of times 2011-2014 after conviction. Flew on Epstein jet. Melinda cited Epstein relationship as divorce factor. Admitted "huge mistake" but only after extensive reporting.', source_url: 'https://www.nytimes.com/2019/10/12/business/jeffrey-epstein-bill-gates.html', source_type: 'news', stance_date: '2019-10-12', verified: true },

  // Steven Sinofsky - Epstein
  { id: '182', entity_type: 'person', entity_id: '63', topic: 'epstein', position: 'opposed', summary: 'Appears in 500+ Epstein files. Former Microsoft Windows president. Email correspondence documented in DOJ release. Now a16z board partner.', source_url: 'https://www.cnbc.com/2026/02/09/tech-leaders-epstein-records-silicon-valley-sergey-brin-thiel-sinofsky-reid-hoffman-musk-gates.html', source_type: 'news', stance_date: '2026-02-09', verified: true },

  // LinkedIn/Microsoft execs - Epstein connection via Hoffman
  { id: '183', entity_type: 'vc', entity_id: '7', topic: 'epstein', position: 'opposed', summary: 'Greylock partner Reid Hoffman connected multiple tech figures to Epstein. Arranged meetings at his home. Apologized but remains active partner. Firm took no public action.', source_url: 'https://www.cnbc.com/2026/02/09/tech-leaders-epstein-records-silicon-valley-sergey-brin-thiel-sinofsky-reid-hoffman-musk-gates.html', source_type: 'news', stance_date: '2026-02-09', verified: true },

  // Founders Fund - Epstein
  { id: '184', entity_type: 'vc', entity_id: '5', topic: 'epstein', position: 'opposed', summary: 'Peter Thiel appears in 2,200+ Epstein files. Direct correspondence. Lunches at Thiel office. No accountability from Founders Fund despite documented relationship.', source_url: 'https://www.cnbc.com/2026/02/09/tech-leaders-epstein-records-silicon-valley-sergey-brin-thiel-sinofsky-reid-hoffman-musk-gates.html', source_type: 'news', stance_date: '2026-02-09', verified: true },

  // ========== MORE VC PALESTINE STANCES ==========

  // Sequoia - Palestine/Israel
  { id: '185', entity_type: 'vc', entity_id: '2', topic: 'palestine', position: 'opposed', summary: 'Major Israeli portfolio including Wiz, Monday.com. Sequoia Israel office. Silent on Palestinian tech workers fired. Invested in Israeli defense-adjacent companies.', source_url: 'https://www.sequoiacap.com/israel/', source_type: 'company_website', stance_date: '2024-01-01', verified: true },

  // Lightspeed - Palestine/Israel
  { id: '186', entity_type: 'vc', entity_id: '8', topic: 'palestine', position: 'opposed', summary: 'Lightspeed Israel is one of largest Israeli VC operations. Invested in Unit 8200 alumni startups. Portfolio includes companies serving Israeli military/intelligence.', source_url: 'https://lsvp.com/israel/', source_type: 'company_website', stance_date: '2024-01-01', verified: true },

  // Index Ventures - Palestine
  { id: '187', entity_type: 'vc', entity_id: '10', topic: 'palestine', position: 'opposed', summary: 'Major investor in Israeli tech including Wiz. Danny Rimer defended Israeli tech ecosystem. Silent on Gaza humanitarian crisis while promoting Israeli investments.', source_url: 'https://www.indexventures.com', source_type: 'company_website', stance_date: '2024-01-01', verified: true },

  // Insight Partners - Palestine
  { id: '188', entity_type: 'vc', entity_id: '15', topic: 'palestine', position: 'opposed', summary: 'Major Israeli portfolio. Led investments in Monday.com and other Israeli companies. Extensive Tel Aviv presence. No statements on Palestinian rights.', source_url: 'https://www.insightpartners.com', source_type: 'company_website', stance_date: '2024-01-01', verified: true },

  // Tiger Global - Palestine
  { id: '189', entity_type: 'vc', entity_id: '21', topic: 'palestine', position: 'opposed', summary: 'Invested billions in Israeli tech. Early Wix, Monday.com backer. Silent on Gaza while continuing Israeli investments. No diversity in leadership.', source_url: 'https://www.tigerglobal.com', source_type: 'company_website', stance_date: '2024-01-01', verified: true },

  // ========== TECH COMPANY PALESTINE STANCES ==========

  // Monday.com - Palestine (correct ID: 62)
  { id: '190', entity_type: 'company', entity_id: '62', topic: 'palestine', position: 'opposed', summary: 'Israeli company headquartered in Tel Aviv. Leadership publicly supported Israeli military operations. Many employees serve IDF reserves during Gaza operations.', source_url: 'https://www.monday.com', source_type: 'company_website', stance_date: '2024-01-01', verified: true },

  // Anduril - Palestine (ID 241)
  { id: '191', entity_type: 'company', entity_id: '241', topic: 'palestine', position: 'opposed', summary: 'Palmer Luckey defense company provides autonomous weapons to Israel. CEO is self-described "radical Zionist." Exploring partnerships with Israeli defense-tech startups. OpenAI now partnered with Anduril.', source_url: 'https://www.calcalistech.com/ctechnews/article/h1evoob00ze', source_type: 'news', stance_date: '2026-02-20', verified: true },

  // Scale AI - Palestine (ID 18)
  { id: '192', entity_type: 'company', entity_id: '18', topic: 'palestine', position: 'opposed', summary: 'Pentagon AI contractor. CEO Alexandr Wang: AI will "transform military operating process." Works with Israeli military tech partners via Thunderforge and Anduril.', source_url: 'https://www.cnbc.com/2025/03/05/scale-ai-announces-multimillion-dollar-defense-military-deal.html', source_type: 'news', stance_date: '2025-03-05', verified: true },

  // Discord - Palestine
  { id: '193', entity_type: 'company', entity_id: '139', topic: 'palestine', position: 'mixed', summary: 'Banned some Palestinian accounts. Moderation criticized as biased. But also removed some extreme anti-Palestinian content. Inconsistent enforcement.', source_url: 'https://www.middleeasteye.net/news/discord-palestinian-content-moderation', source_type: 'news', stance_date: '2024-02-01', verified: true },

  // TikTok - Palestine
  { id: '194', entity_type: 'company', entity_id: '179', topic: 'palestine', position: 'supported', summary: 'Platform where Palestinian voices gained reach. Did not censor pro-Palestinian content like Meta. Criticized by pro-Israel groups for "allowing" Palestinian perspectives.', source_url: 'https://www.nytimes.com/2024/02/tiktok-palestine-content', source_type: 'news', stance_date: '2024-02-01', verified: true },

  // ========== JEFF BEZOS STANCES ==========

  // Jeff Bezos - Politics
  { id: '195', entity_type: 'person', entity_id: '65', topic: 'politics', position: 'supported', summary: 'Donated $1M to Trump inaugural fund. Dined with Trump at Mar-a-Lago. Amazon paid $40M for Melania Trump documentary. Washington Post blocked anti-Trump endorsement before election.', source_url: 'https://www.npr.org/2024/12/13/nx-s1-5227874/trump-bezos-zuckerberg-amazon-facebook-open-ai-meta-inauguration-fund', source_type: 'news', stance_date: '2024-12-12', verified: true },

  // Jeff Bezos - Palestine
  { id: '196', entity_type: 'person', entity_id: '65', topic: 'palestine', position: 'opposed', summary: 'Amazon AWS provides cloud services to Israeli government. Project Nimbus partnership. AWS used by Israeli military and intelligence. Silent on Palestinian rights while profiting from occupation.', source_url: 'https://www.theguardian.com/commentisfree/2021/oct/12/google-amazon-workers-demand-project-nimbus-israeli-military-contract', source_type: 'news', stance_date: '2024-01-01', verified: true },

  // Jeff Bezos - Worker Treatment
  { id: '197', entity_type: 'person', entity_id: '65', topic: 'worker_treatment', position: 'opposed', summary: 'Amazon warehouses have injury rates 80% higher than industry average. Timed bathroom breaks. Union busting documented by NLRB. Workers urinate in bottles due to time pressure.', source_url: 'https://www.nytimes.com/2021/06/15/us/politics/amazon-warehouse-workers.html', source_type: 'news', stance_date: '2021-06-15', verified: true },

  // ========== BEN HOROWITZ STANCES ==========

  // Ben Horowitz - Politics
  { id: '198', entity_type: 'person', entity_id: '32', topic: 'politics', position: 'supported', summary: 'Endorsed Trump with Andreessen in July 2024. Donated $2.5M to pro-Trump PAC. Cited crypto regulation as key factor despite no prior presidential campaign donations.', source_url: 'https://techcrunch.com/2024/07/16/andreessen-horowitz-co-founders-explain-why-theyre-supporting-trump/', source_type: 'news', stance_date: '2024-07-16', verified: true },

  // Ben Horowitz - Palestine
  { id: '199', entity_type: 'person', entity_id: '32', topic: 'palestine', position: 'opposed', summary: 'a16z most active US VC in Israel 2024. Recruiting IDF tech alumni. Led Wiz $32B acquisition. Wife Felicia active in pro-Israel philanthropy. Silent on Gaza civilian casualties.', source_url: 'https://www.calcalistech.com/ctechnews/article/oif0bk8uu', source_type: 'news', stance_date: '2024-08-25', verified: true },

  // ========== LARRY PAGE STANCES ==========

  // Larry Page - Epstein
  { id: '200', entity_type: 'person', entity_id: '64', topic: 'epstein', position: 'mixed', summary: 'Named in Epstein files alongside Brin. Less documented contact than other tech leaders. Extremely private since 2019 resignation from Alphabet. No public statement on Epstein.', source_url: 'https://www.cnbc.com/2026/02/09/tech-leaders-epstein-records-silicon-valley-sergey-brin-thiel-sinofsky-reid-hoffman-musk-gates.html', source_type: 'news', stance_date: '2026-02-09', verified: true },
]

// Helper functions to query data
export function getCompanyBySlug(slug: string) {
  return companies.find(c => c.slug === slug) || null
}

export function getPersonBySlug(slug: string) {
  const person = people.find(p => p.slug === slug)
  if (!person) return null
  const company = person.current_company_id ? companies.find(c => c.id === person.current_company_id) : null
  return { ...person, current_company: company }
}

export function getVCBySlug(slug: string) {
  return vcs.find(v => v.slug === slug) || null
}

export function getStancesForEntity(entityType: string, entityId: string) {
  return stances.filter(s => s.entity_type === entityType && s.entity_id === entityId)
    .sort((a, b) => new Date(b.stance_date || '1970-01-01').getTime() - new Date(a.stance_date || '1970-01-01').getTime())
}

export function getStancesByTopic(topic: string) {
  return stances.filter(s => s.topic === topic)
    .sort((a, b) => new Date(b.stance_date || '1970-01-01').getTime() - new Date(a.stance_date || '1970-01-01').getTime())
}

export function getRecentStances(limit: number = 6) {
  return stances
    .sort((a, b) => new Date(b.stance_date || '1970-01-01').getTime() - new Date(a.stance_date || '1970-01-01').getTime())
    .slice(0, limit)
}

export function searchEntities(query: string) {
  const q = query.toLowerCase()
  const results = []

  for (const c of companies) {
    if (c.name.toLowerCase().includes(q)) {
      results.push({ type: 'company' as const, id: c.id, name: c.name, slug: c.slug, subtitle: c.industry })
    }
  }

  for (const p of people) {
    if (p.name.toLowerCase().includes(q)) {
      results.push({ type: 'person' as const, id: p.id, name: p.name, slug: p.slug, subtitle: p.current_role })
    }
  }

  for (const v of vcs) {
    if (v.name.toLowerCase().includes(q)) {
      results.push({ type: 'vc' as const, id: v.id, name: v.name, slug: v.slug, subtitle: 'Venture Capital' })
    }
  }

  return results.slice(0, 20)
}

export function getEntityForStance(stance: typeof stances[0]) {
  if (stance.entity_type === 'company') {
    const company = companies.find(c => c.id === stance.entity_id)
    return { name: company?.name || '', slug: company?.slug || '' }
  } else if (stance.entity_type === 'person') {
    const person = people.find(p => p.id === stance.entity_id)
    return { name: person?.name || '', slug: person?.slug || '' }
  } else if (stance.entity_type === 'vc') {
    const vc = vcs.find(v => v.id === stance.entity_id)
    return { name: vc?.name || '', slug: vc?.slug || '' }
  }
  return { name: '', slug: '' }
}

export function getStanceCountForEntity(entityType: string, entityId: string) {
  return stances.filter(s => s.entity_type === entityType && s.entity_id === entityId).length
}

export function getStanceCountForTopic(topic: string) {
  return stances.filter(s => s.topic === topic).length
}

export function getPeopleAtCompany(companyId: string) {
  return people.filter(p => p.current_company_id === companyId)
}
