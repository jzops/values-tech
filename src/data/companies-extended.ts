// Extended company database - Part 2
import { Company } from '../lib/types'

// EdTech
const edtech: Company[] = [
  { id: '126', name: 'Coursera', slug: 'coursera', logo_url: 'https://logo.clearbit.com/coursera.org', website: 'https://coursera.org', founded_year: 2012, headcount_range: '1,500+', funding_stage: 'Public', total_raised: null, industry: 'EdTech', description: 'Online learning platform.' },
  { id: '127', name: 'Duolingo', slug: 'duolingo', logo_url: 'https://logo.clearbit.com/duolingo.com', website: 'https://duolingo.com', founded_year: 2011, headcount_range: '700+', funding_stage: 'Public', total_raised: null, industry: 'EdTech', description: 'Language learning app.' },
  { id: '128', name: 'Udemy', slug: 'udemy', logo_url: 'https://logo.clearbit.com/udemy.com', website: 'https://udemy.com', founded_year: 2010, headcount_range: '2,000+', funding_stage: 'Public', total_raised: null, industry: 'EdTech', description: 'Online course marketplace.' },
  { id: '129', name: 'MasterClass', slug: 'masterclass', logo_url: 'https://logo.clearbit.com/masterclass.com', website: 'https://masterclass.com', founded_year: 2015, headcount_range: '700+', funding_stage: 'Series F', total_raised: 460000000, industry: 'EdTech', description: 'Celebrity-taught online classes.' },
  { id: '130', name: 'Chegg', slug: 'chegg', logo_url: 'https://logo.clearbit.com/chegg.com', website: 'https://chegg.com', founded_year: 2005, headcount_range: '2,000+', funding_stage: 'Public', total_raised: null, industry: 'EdTech', description: 'Student services and homework help.' },
  { id: '131', name: 'Guild Education', slug: 'guild-education', logo_url: 'https://logo.clearbit.com/guild.com', website: 'https://guild.com', founded_year: 2015, headcount_range: '1,500+', funding_stage: 'Series F', total_raised: 650000000, industry: 'EdTech', description: 'Employee education benefits.' },
  { id: '132', name: 'Handshake', slug: 'handshake', logo_url: 'https://logo.clearbit.com/joinhandshake.com', website: 'https://joinhandshake.com', founded_year: 2014, headcount_range: '700+', funding_stage: 'Series F', total_raised: 430000000, industry: 'EdTech', description: 'Career platform for students.' },
  { id: '133', name: 'Kahoot!', slug: 'kahoot', logo_url: 'https://logo.clearbit.com/kahoot.com', website: 'https://kahoot.com', founded_year: 2012, headcount_range: '500+', funding_stage: 'Public', total_raised: null, industry: 'EdTech', description: 'Game-based learning platform.' },
  { id: '134', name: 'Outschool', slug: 'outschool', logo_url: 'https://logo.clearbit.com/outschool.com', website: 'https://outschool.com', founded_year: 2015, headcount_range: '400+', funding_stage: 'Series D', total_raised: 230000000, industry: 'EdTech', description: 'Live online classes for kids.' },
  { id: '135', name: 'Lambda School', slug: 'lambda-school', logo_url: 'https://logo.clearbit.com/lambdaschool.com', website: 'https://lambdaschool.com', founded_year: 2017, headcount_range: '300+', funding_stage: 'Series C', total_raised: 130000000, industry: 'EdTech', description: 'Online coding bootcamp (now Bloom Institute).' },
]

// Gaming
const gaming: Company[] = [
  { id: '136', name: 'Epic Games', slug: 'epic-games', logo_url: 'https://logo.clearbit.com/epicgames.com', website: 'https://epicgames.com', founded_year: 1991, headcount_range: '4,000+', funding_stage: 'Private', total_raised: 5500000000, industry: 'Gaming', description: 'Fortnite and Unreal Engine maker.' },
  { id: '137', name: 'Roblox', slug: 'roblox', logo_url: 'https://logo.clearbit.com/roblox.com', website: 'https://roblox.com', founded_year: 2004, headcount_range: '2,500+', funding_stage: 'Public', total_raised: null, industry: 'Gaming', description: 'Gaming platform and game creation.' },
  { id: '138', name: 'Unity', slug: 'unity', logo_url: 'https://logo.clearbit.com/unity.com', website: 'https://unity.com', founded_year: 2004, headcount_range: '7,500+', funding_stage: 'Public', total_raised: null, industry: 'Gaming', description: 'Game engine and development platform.' },
  { id: '139', name: 'Discord', slug: 'discord', logo_url: 'https://logo.clearbit.com/discord.com', website: 'https://discord.com', founded_year: 2015, headcount_range: '1,000+', funding_stage: 'Series J', total_raised: 995000000, industry: 'Social/Gaming', description: 'Voice and text chat platform.' },
  { id: '140', name: 'Twitch', slug: 'twitch', logo_url: 'https://logo.clearbit.com/twitch.tv', website: 'https://twitch.tv', founded_year: 2011, headcount_range: '2,000+', funding_stage: 'Acquired', total_raised: null, industry: 'Gaming', description: 'Live streaming platform. Owned by Amazon.' },
  { id: '141', name: 'Niantic', slug: 'niantic', logo_url: 'https://logo.clearbit.com/nianticlabs.com', website: 'https://nianticlabs.com', founded_year: 2010, headcount_range: '800+', funding_stage: 'Series D', total_raised: 770000000, industry: 'Gaming', description: 'AR gaming company. Pokémon GO.' },
  { id: '142', name: 'Scopely', slug: 'scopely', logo_url: 'https://logo.clearbit.com/scopely.com', website: 'https://scopely.com', founded_year: 2011, headcount_range: '2,000+', funding_stage: 'Acquired', total_raised: null, industry: 'Gaming', description: 'Mobile game developer.' },
  { id: '143', name: 'Supercell', slug: 'supercell', logo_url: 'https://logo.clearbit.com/supercell.com', website: 'https://supercell.com', founded_year: 2010, headcount_range: '400+', funding_stage: 'Private', total_raised: null, industry: 'Gaming', description: 'Mobile game developer. Clash of Clans.' },
  { id: '144', name: 'Riot Games', slug: 'riot-games', logo_url: 'https://logo.clearbit.com/riotgames.com', website: 'https://riotgames.com', founded_year: 2006, headcount_range: '4,500+', funding_stage: 'Acquired', total_raised: null, industry: 'Gaming', description: 'League of Legends developer. Owned by Tencent.' },
  { id: '145', name: 'Zynga', slug: 'zynga', logo_url: 'https://logo.clearbit.com/zynga.com', website: 'https://zynga.com', founded_year: 2007, headcount_range: '3,000+', funding_stage: 'Acquired', total_raised: null, industry: 'Gaming', description: 'Mobile game developer. Acquired by Take-Two.' },
]

// Climate Tech
const climateTech: Company[] = [
  { id: '146', name: 'Stripe Climate', slug: 'stripe-climate', logo_url: 'https://logo.clearbit.com/stripe.com', website: 'https://stripe.com/climate', founded_year: 2020, headcount_range: '50+', funding_stage: 'Division', total_raised: null, industry: 'Climate Tech', description: 'Carbon removal purchasing.' },
  { id: '147', name: 'Climeworks', slug: 'climeworks', logo_url: 'https://logo.clearbit.com/climeworks.com', website: 'https://climeworks.com', founded_year: 2009, headcount_range: '500+', funding_stage: 'Series G', total_raised: 800000000, industry: 'Climate Tech', description: 'Direct air capture of CO2.' },
  { id: '148', name: 'Form Energy', slug: 'form-energy', logo_url: 'https://logo.clearbit.com/formenergy.com', website: 'https://formenergy.com', founded_year: 2017, headcount_range: '600+', funding_stage: 'Series E', total_raised: 800000000, industry: 'Climate Tech', description: 'Long-duration energy storage.' },
  { id: '149', name: 'Commonwealth Fusion', slug: 'commonwealth-fusion', logo_url: 'https://logo.clearbit.com/cfs.energy', website: 'https://cfs.energy', founded_year: 2018, headcount_range: '500+', funding_stage: 'Series B', total_raised: 2000000000, industry: 'Climate Tech', description: 'Nuclear fusion energy.' },
  { id: '150', name: 'Redwood Materials', slug: 'redwood-materials', logo_url: 'https://logo.clearbit.com/redwoodmaterials.com', website: 'https://redwoodmaterials.com', founded_year: 2017, headcount_range: '800+', funding_stage: 'Series D', total_raised: 1000000000, industry: 'Climate Tech', description: 'Battery recycling company.' },
  { id: '151', name: 'Impossible Foods', slug: 'impossible-foods', logo_url: 'https://logo.clearbit.com/impossiblefoods.com', website: 'https://impossiblefoods.com', founded_year: 2011, headcount_range: '700+', funding_stage: 'Series H', total_raised: 2000000000, industry: 'Climate Tech', description: 'Plant-based meat company.' },
  { id: '152', name: 'Beyond Meat', slug: 'beyond-meat', logo_url: 'https://logo.clearbit.com/beyondmeat.com', website: 'https://beyondmeat.com', founded_year: 2009, headcount_range: '1,000+', funding_stage: 'Public', total_raised: null, industry: 'Climate Tech', description: 'Plant-based meat company.' },
  { id: '153', name: 'Sila Nanotechnologies', slug: 'sila-nano', logo_url: 'https://logo.clearbit.com/silanano.com', website: 'https://silanano.com', founded_year: 2011, headcount_range: '600+', funding_stage: 'Series F', total_raised: 930000000, industry: 'Climate Tech', description: 'Advanced battery materials.' },
  { id: '154', name: 'QuantumScape', slug: 'quantumscape', logo_url: 'https://logo.clearbit.com/quantumscape.com', website: 'https://quantumscape.com', founded_year: 2010, headcount_range: '800+', funding_stage: 'Public', total_raised: null, industry: 'Climate Tech', description: 'Solid-state battery company.' },
  { id: '155', name: 'Northvolt', slug: 'northvolt', logo_url: 'https://logo.clearbit.com/northvolt.com', website: 'https://northvolt.com', founded_year: 2016, headcount_range: '5,000+', funding_stage: 'Series E', total_raised: 8000000000, industry: 'Climate Tech', description: 'European battery manufacturer.' },
]

// HR Tech & Future of Work
const hrTech: Company[] = [
  { id: '156', name: 'Gusto', slug: 'gusto', logo_url: 'https://logo.clearbit.com/gusto.com', website: 'https://gusto.com', founded_year: 2011, headcount_range: '2,500+', funding_stage: 'Series E', total_raised: 746000000, industry: 'HR Tech', description: 'Payroll and HR platform for small businesses.' },
  { id: '157', name: 'Rippling', slug: 'rippling', logo_url: 'https://logo.clearbit.com/rippling.com', website: 'https://rippling.com', founded_year: 2016, headcount_range: '2,500+', funding_stage: 'Series E', total_raised: 1200000000, industry: 'HR Tech', description: 'Workforce management platform.' },
  { id: '158', name: 'Deel', slug: 'deel', logo_url: 'https://logo.clearbit.com/deel.com', website: 'https://deel.com', founded_year: 2019, headcount_range: '3,000+', funding_stage: 'Series D', total_raised: 680000000, industry: 'HR Tech', description: 'Global payroll and compliance.' },
  { id: '159', name: 'Remote', slug: 'remote', logo_url: 'https://logo.clearbit.com/remote.com', website: 'https://remote.com', founded_year: 2019, headcount_range: '1,500+', funding_stage: 'Series C', total_raised: 490000000, industry: 'HR Tech', description: 'Global HR platform for remote teams.' },
  { id: '160', name: 'Lattice', slug: 'lattice', logo_url: 'https://logo.clearbit.com/lattice.com', website: 'https://lattice.com', founded_year: 2016, headcount_range: '600+', funding_stage: 'Series F', total_raised: 328000000, industry: 'HR Tech', description: 'People management platform.' },
  { id: '161', name: 'Culture Amp', slug: 'culture-amp', logo_url: 'https://logo.clearbit.com/cultureamp.com', website: 'https://cultureamp.com', founded_year: 2009, headcount_range: '800+', funding_stage: 'Series F', total_raised: 267000000, industry: 'HR Tech', description: 'Employee experience platform.' },
  { id: '162', name: 'BambooHR', slug: 'bamboohr', logo_url: 'https://logo.clearbit.com/bamboohr.com', website: 'https://bamboohr.com', founded_year: 2008, headcount_range: '1,200+', funding_stage: 'Series C', total_raised: 233000000, industry: 'HR Tech', description: 'HR software for SMBs.' },
  { id: '163', name: 'Greenhouse', slug: 'greenhouse', logo_url: 'https://logo.clearbit.com/greenhouse.io', website: 'https://greenhouse.io', founded_year: 2012, headcount_range: '800+', funding_stage: 'Series E', total_raised: 528000000, industry: 'HR Tech', description: 'Hiring and onboarding platform.' },
  { id: '164', name: 'Lever', slug: 'lever', logo_url: 'https://logo.clearbit.com/lever.co', website: 'https://lever.co', founded_year: 2012, headcount_range: '400+', funding_stage: 'Acquired', total_raised: 122000000, industry: 'HR Tech', description: 'Applicant tracking system.' },
  { id: '165', name: 'Workday', slug: 'workday', logo_url: 'https://logo.clearbit.com/workday.com', website: 'https://workday.com', founded_year: 2005, headcount_range: '18,000+', funding_stage: 'Public', total_raised: null, industry: 'HR Tech', description: 'Enterprise HR and finance software.' },
]

// PropTech & Real Estate
const proptech: Company[] = [
  { id: '166', name: 'Opendoor', slug: 'opendoor', logo_url: 'https://logo.clearbit.com/opendoor.com', website: 'https://opendoor.com', founded_year: 2014, headcount_range: '2,500+', funding_stage: 'Public', total_raised: null, industry: 'PropTech', description: 'iBuying real estate platform.' },
  { id: '167', name: 'Compass', slug: 'compass', logo_url: 'https://logo.clearbit.com/compass.com', website: 'https://compass.com', founded_year: 2012, headcount_range: '4,000+', funding_stage: 'Public', total_raised: null, industry: 'PropTech', description: 'Real estate technology platform.' },
  { id: '168', name: 'Zillow', slug: 'zillow', logo_url: 'https://logo.clearbit.com/zillow.com', website: 'https://zillow.com', founded_year: 2006, headcount_range: '6,000+', funding_stage: 'Public', total_raised: null, industry: 'PropTech', description: 'Real estate marketplace.' },
  { id: '169', name: 'Redfin', slug: 'redfin', logo_url: 'https://logo.clearbit.com/redfin.com', website: 'https://redfin.com', founded_year: 2004, headcount_range: '6,000+', funding_stage: 'Public', total_raised: null, industry: 'PropTech', description: 'Real estate brokerage.' },
  { id: '170', name: 'Divvy Homes', slug: 'divvy-homes', logo_url: 'https://logo.clearbit.com/divvyhomes.com', website: 'https://divvyhomes.com', founded_year: 2017, headcount_range: '400+', funding_stage: 'Series D', total_raised: 735000000, industry: 'PropTech', description: 'Rent-to-own platform.' },
  { id: '171', name: 'Pacaso', slug: 'pacaso', logo_url: 'https://logo.clearbit.com/pacaso.com', website: 'https://pacaso.com', founded_year: 2020, headcount_range: '400+', funding_stage: 'Series D', total_raised: 1600000000, industry: 'PropTech', description: 'Second home co-ownership.' },
  { id: '172', name: 'Latch', slug: 'latch', logo_url: 'https://logo.clearbit.com/latch.com', website: 'https://latch.com', founded_year: 2014, headcount_range: '500+', funding_stage: 'Public', total_raised: null, industry: 'PropTech', description: 'Smart building technology.' },
  { id: '173', name: 'Better', slug: 'better', logo_url: 'https://logo.clearbit.com/better.com', website: 'https://better.com', founded_year: 2016, headcount_range: '1,000+', funding_stage: 'Public', total_raised: null, industry: 'PropTech', description: 'Digital mortgage platform.' },
  { id: '174', name: 'Roofstock', slug: 'roofstock', logo_url: 'https://logo.clearbit.com/roofstock.com', website: 'https://roofstock.com', founded_year: 2015, headcount_range: '400+', funding_stage: 'Series E', total_raised: 365000000, industry: 'PropTech', description: 'Single-family rental marketplace.' },
  { id: '175', name: 'VTS', slug: 'vts', logo_url: 'https://logo.clearbit.com/vts.com', website: 'https://vts.com', founded_year: 2012, headcount_range: '500+', funding_stage: 'Series E', total_raised: 450000000, industry: 'PropTech', description: 'Commercial real estate software.' },
]

// Consumer & Social
const consumer: Company[] = [
  { id: '176', name: 'Spotify', slug: 'spotify', logo_url: 'https://logo.clearbit.com/spotify.com', website: 'https://spotify.com', founded_year: 2006, headcount_range: '10,000+', funding_stage: 'Public', total_raised: null, industry: 'Entertainment', description: 'Audio streaming service.' },
  { id: '177', name: 'Pinterest', slug: 'pinterest', logo_url: 'https://logo.clearbit.com/pinterest.com', website: 'https://pinterest.com', founded_year: 2009, headcount_range: '3,500+', funding_stage: 'Public', total_raised: null, industry: 'Social Media', description: 'Visual discovery platform.' },
  { id: '178', name: 'Snap', slug: 'snap', logo_url: 'https://logo.clearbit.com/snap.com', website: 'https://snap.com', founded_year: 2011, headcount_range: '5,500+', funding_stage: 'Public', total_raised: null, industry: 'Social Media', description: 'Camera and social media company. Snapchat.' },
  { id: '179', name: 'TikTok', slug: 'tiktok', logo_url: 'https://logo.clearbit.com/tiktok.com', website: 'https://tiktok.com', founded_year: 2016, headcount_range: '20,000+', funding_stage: 'Private', total_raised: null, industry: 'Social Media', description: 'Short-form video platform. ByteDance subsidiary.' },
  { id: '180', name: 'Reddit', slug: 'reddit', logo_url: 'https://logo.clearbit.com/reddit.com', website: 'https://reddit.com', founded_year: 2005, headcount_range: '2,000+', funding_stage: 'Public', total_raised: null, industry: 'Social Media', description: 'Social news and discussion platform.' },
  { id: '181', name: 'BeReal', slug: 'bereal', logo_url: 'https://logo.clearbit.com/bereal.com', website: 'https://bereal.com', founded_year: 2020, headcount_range: '50+', funding_stage: 'Series B', total_raised: 90000000, industry: 'Social Media', description: 'Authentic photo-sharing app.' },
  { id: '182', name: 'Clubhouse', slug: 'clubhouse', logo_url: 'https://logo.clearbit.com/clubhouse.com', website: 'https://clubhouse.com', founded_year: 2020, headcount_range: '100+', funding_stage: 'Series C', total_raised: 400000000, industry: 'Social Media', description: 'Audio social network.' },
  { id: '183', name: 'Nextdoor', slug: 'nextdoor', logo_url: 'https://logo.clearbit.com/nextdoor.com', website: 'https://nextdoor.com', founded_year: 2008, headcount_range: '1,500+', funding_stage: 'Public', total_raised: null, industry: 'Social Media', description: 'Neighborhood social network.' },
  { id: '184', name: 'Substack', slug: 'substack', logo_url: 'https://logo.clearbit.com/substack.com', website: 'https://substack.com', founded_year: 2017, headcount_range: '100+', funding_stage: 'Series B', total_raised: 82000000, industry: 'Media', description: 'Newsletter publishing platform.' },
  { id: '185', name: 'Medium', slug: 'medium', logo_url: 'https://logo.clearbit.com/medium.com', website: 'https://medium.com', founded_year: 2012, headcount_range: '200+', funding_stage: 'Series C', total_raised: 132000000, industry: 'Media', description: 'Online publishing platform.' },
]

// Food Tech
const foodTech: Company[] = [
  { id: '186', name: 'Sweetgreen', slug: 'sweetgreen', logo_url: 'https://logo.clearbit.com/sweetgreen.com', website: 'https://sweetgreen.com', founded_year: 2007, headcount_range: '5,000+', funding_stage: 'Public', total_raised: null, industry: 'Food Tech', description: 'Fast casual salad chain.' },
  { id: '187', name: 'CAVA', slug: 'cava', logo_url: 'https://logo.clearbit.com/cava.com', website: 'https://cava.com', founded_year: 2010, headcount_range: '8,000+', funding_stage: 'Public', total_raised: null, industry: 'Food Tech', description: 'Mediterranean fast casual.' },
  { id: '188', name: 'Wolt', slug: 'wolt', logo_url: 'https://logo.clearbit.com/wolt.com', website: 'https://wolt.com', founded_year: 2014, headcount_range: '8,000+', funding_stage: 'Acquired', total_raised: null, industry: 'Food Tech', description: 'Food delivery (Europe). Acquired by DoorDash.' },
  { id: '189', name: 'Gorillas', slug: 'gorillas', logo_url: 'https://logo.clearbit.com/gorillas.io', website: 'https://gorillas.io', founded_year: 2020, headcount_range: '500+', funding_stage: 'Acquired', total_raised: null, industry: 'Food Tech', description: 'Instant grocery delivery. Acquired by Getir.' },
  { id: '190', name: 'Upside Foods', slug: 'upside-foods', logo_url: 'https://logo.clearbit.com/upsidefoods.com', website: 'https://upsidefoods.com', founded_year: 2015, headcount_range: '200+', funding_stage: 'Series C', total_raised: 608000000, industry: 'Food Tech', description: 'Cultivated meat company.' },
]

// Data & Analytics
const dataAnalytics: Company[] = [
  { id: '191', name: 'Snowflake', slug: 'snowflake', logo_url: 'https://logo.clearbit.com/snowflake.com', website: 'https://snowflake.com', founded_year: 2012, headcount_range: '7,000+', funding_stage: 'Public', total_raised: null, industry: 'Data', description: 'Cloud data platform.' },
  { id: '192', name: 'Palantir', slug: 'palantir', logo_url: 'https://logo.clearbit.com/palantir.com', website: 'https://palantir.com', founded_year: 2003, headcount_range: '3,700+', funding_stage: 'Public', total_raised: null, industry: 'Data Analytics', description: 'Data analytics and software company.' },
  { id: '193', name: 'Tableau', slug: 'tableau', logo_url: 'https://logo.clearbit.com/tableau.com', website: 'https://tableau.com', founded_year: 2003, headcount_range: '5,000+', funding_stage: 'Acquired', total_raised: null, industry: 'Data', description: 'Data visualization. Acquired by Salesforce.' },
  { id: '194', name: 'Looker', slug: 'looker', logo_url: 'https://logo.clearbit.com/looker.com', website: 'https://looker.com', founded_year: 2012, headcount_range: '1,000+', funding_stage: 'Acquired', total_raised: null, industry: 'Data', description: 'Business intelligence. Acquired by Google.' },
  { id: '195', name: 'dbt Labs', slug: 'dbt-labs', logo_url: 'https://logo.clearbit.com/getdbt.com', website: 'https://getdbt.com', founded_year: 2016, headcount_range: '600+', funding_stage: 'Series D', total_raised: 414000000, industry: 'Data', description: 'Analytics engineering platform.' },
  { id: '196', name: 'Fivetran', slug: 'fivetran', logo_url: 'https://logo.clearbit.com/fivetran.com', website: 'https://fivetran.com', founded_year: 2012, headcount_range: '1,200+', funding_stage: 'Series D', total_raised: 730000000, industry: 'Data', description: 'Data integration platform.' },
  { id: '197', name: 'Airbyte', slug: 'airbyte', logo_url: 'https://logo.clearbit.com/airbyte.com', website: 'https://airbyte.com', founded_year: 2020, headcount_range: '200+', funding_stage: 'Series B', total_raised: 181000000, industry: 'Data', description: 'Open source data integration.' },
  { id: '198', name: 'Amplitude', slug: 'amplitude', logo_url: 'https://logo.clearbit.com/amplitude.com', website: 'https://amplitude.com', founded_year: 2012, headcount_range: '1,000+', funding_stage: 'Public', total_raised: null, industry: 'Data', description: 'Product analytics platform.' },
  { id: '199', name: 'Mixpanel', slug: 'mixpanel', logo_url: 'https://logo.clearbit.com/mixpanel.com', website: 'https://mixpanel.com', founded_year: 2009, headcount_range: '400+', funding_stage: 'Series D', total_raised: 280000000, industry: 'Data', description: 'Product analytics platform.' },
  { id: '200', name: 'Segment', slug: 'segment', logo_url: 'https://logo.clearbit.com/segment.com', website: 'https://segment.com', founded_year: 2011, headcount_range: '800+', funding_stage: 'Acquired', total_raised: null, industry: 'Data', description: 'Customer data platform. Acquired by Twilio.' },
]

// More Startups - Batch 1
const startupsB1: Company[] = [
  { id: '201', name: 'Anthropic', slug: 'anthropic-2', logo_url: 'https://logo.clearbit.com/anthropic.com', website: 'https://anthropic.com', founded_year: 2021, headcount_range: '500+', funding_stage: 'Series D', total_raised: 7000000000, industry: 'AI', description: 'AI safety company.' },
  { id: '202', name: 'Retool', slug: 'retool', logo_url: 'https://logo.clearbit.com/retool.com', website: 'https://retool.com', founded_year: 2017, headcount_range: '500+', funding_stage: 'Series D', total_raised: 445000000, industry: 'Developer Tools', description: 'Internal tool builder.' },
  { id: '203', name: 'Webflow', slug: 'webflow', logo_url: 'https://logo.clearbit.com/webflow.com', website: 'https://webflow.com', founded_year: 2013, headcount_range: '800+', funding_stage: 'Series C', total_raised: 335000000, industry: 'Developer Tools', description: 'No-code website builder.' },
  { id: '204', name: 'Zapier', slug: 'zapier', logo_url: 'https://logo.clearbit.com/zapier.com', website: 'https://zapier.com', founded_year: 2011, headcount_range: '800+', funding_stage: 'Bootstrapped', total_raised: 1400000, industry: 'SaaS', description: 'Workflow automation platform.' },
  { id: '205', name: 'Calendly', slug: 'calendly', logo_url: 'https://logo.clearbit.com/calendly.com', website: 'https://calendly.com', founded_year: 2013, headcount_range: '700+', funding_stage: 'Series C', total_raised: 350000000, industry: 'SaaS', description: 'Scheduling platform.' },
  { id: '206', name: 'Loom', slug: 'loom', logo_url: 'https://logo.clearbit.com/loom.com', website: 'https://loom.com', founded_year: 2015, headcount_range: '300+', funding_stage: 'Acquired', total_raised: null, industry: 'SaaS', description: 'Video messaging. Acquired by Atlassian.' },
  { id: '207', name: 'Miro', slug: 'miro', logo_url: 'https://logo.clearbit.com/miro.com', website: 'https://miro.com', founded_year: 2011, headcount_range: '1,800+', funding_stage: 'Series C', total_raised: 476000000, industry: 'SaaS', description: 'Online whiteboard platform.' },
  { id: '208', name: 'ClickUp', slug: 'clickup', logo_url: 'https://logo.clearbit.com/clickup.com', website: 'https://clickup.com', founded_year: 2017, headcount_range: '1,000+', funding_stage: 'Series C', total_raised: 537000000, industry: 'SaaS', description: 'Project management platform.' },
  { id: '209', name: 'Coda', slug: 'coda', logo_url: 'https://logo.clearbit.com/coda.io', website: 'https://coda.io', founded_year: 2014, headcount_range: '400+', funding_stage: 'Series D', total_raised: 636000000, industry: 'SaaS', description: 'Doc-based collaboration tool.' },
  { id: '210', name: 'Pitch', slug: 'pitch', logo_url: 'https://logo.clearbit.com/pitch.com', website: 'https://pitch.com', founded_year: 2018, headcount_range: '200+', funding_stage: 'Series C', total_raised: 162000000, industry: 'SaaS', description: 'Collaborative presentation software.' },
]

// More Startups - Batch 2
const startupsB2: Company[] = [
  { id: '211', name: 'Gong', slug: 'gong', logo_url: 'https://logo.clearbit.com/gong.io', website: 'https://gong.io', founded_year: 2015, headcount_range: '1,500+', funding_stage: 'Series E', total_raised: 584000000, industry: 'SaaS', description: 'Revenue intelligence platform.' },
  { id: '212', name: 'Outreach', slug: 'outreach', logo_url: 'https://logo.clearbit.com/outreach.io', website: 'https://outreach.io', founded_year: 2014, headcount_range: '1,200+', funding_stage: 'Series G', total_raised: 489000000, industry: 'SaaS', description: 'Sales engagement platform.' },
  { id: '213', name: 'ZoomInfo', slug: 'zoominfo', logo_url: 'https://logo.clearbit.com/zoominfo.com', website: 'https://zoominfo.com', founded_year: 2000, headcount_range: '3,500+', funding_stage: 'Public', total_raised: null, industry: 'SaaS', description: 'B2B data and intelligence.' },
  { id: '214', name: 'Highspot', slug: 'highspot', logo_url: 'https://logo.clearbit.com/highspot.com', website: 'https://highspot.com', founded_year: 2012, headcount_range: '800+', funding_stage: 'Series F', total_raised: 645000000, industry: 'SaaS', description: 'Sales enablement platform.' },
  { id: '215', name: 'Seismic', slug: 'seismic', logo_url: 'https://logo.clearbit.com/seismic.com', website: 'https://seismic.com', founded_year: 2010, headcount_range: '1,500+', funding_stage: 'Series G', total_raised: 480000000, industry: 'SaaS', description: 'Sales enablement platform.' },
  { id: '216', name: 'Clari', slug: 'clari', logo_url: 'https://logo.clearbit.com/clari.com', website: 'https://clari.com', founded_year: 2012, headcount_range: '800+', funding_stage: 'Series F', total_raised: 496000000, industry: 'SaaS', description: 'Revenue operations platform.' },
  { id: '217', name: 'People.ai', slug: 'people-ai', logo_url: 'https://logo.clearbit.com/people.ai', website: 'https://people.ai', founded_year: 2016, headcount_range: '400+', funding_stage: 'Series D', total_raised: 200000000, industry: 'SaaS', description: 'Revenue intelligence platform.' },
  { id: '218', name: 'Apollo.io', slug: 'apollo-io', logo_url: 'https://logo.clearbit.com/apollo.io', website: 'https://apollo.io', founded_year: 2015, headcount_range: '400+', funding_stage: 'Series C', total_raised: 250000000, industry: 'SaaS', description: 'Sales intelligence platform.' },
  { id: '219', name: 'Sendbird', slug: 'sendbird', logo_url: 'https://logo.clearbit.com/sendbird.com', website: 'https://sendbird.com', founded_year: 2013, headcount_range: '400+', funding_stage: 'Series C', total_raised: 220000000, industry: 'SaaS', description: 'Chat API platform.' },
  { id: '220', name: 'Stream', slug: 'stream', logo_url: 'https://logo.clearbit.com/getstream.io', website: 'https://getstream.io', founded_year: 2015, headcount_range: '150+', funding_stage: 'Series B', total_raised: 53000000, industry: 'SaaS', description: 'Chat and activity feed APIs.' },
]

// Export extended companies
export const extendedCompanies: Company[] = [
  ...edtech,
  ...gaming,
  ...climateTech,
  ...hrTech,
  ...proptech,
  ...consumer,
  ...foodTech,
  ...dataAnalytics,
  ...startupsB1,
  ...startupsB2,
]
