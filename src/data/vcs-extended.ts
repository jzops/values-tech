// Extended VC database - Part 2
import { VC } from '../lib/types'

export const extendedVCs: VC[] = [
  // More International VCs
  { id: '201', name: 'Founders Factory', slug: 'founders-factory', logo_url: 'https://logo.clearbit.com/foundersfactory.com', website: 'https://foundersfactory.com', description: 'London corporate-backed studio.', aum: '$300M+' },
  { id: '202', name: 'Seedcamp', slug: 'seedcamp', logo_url: 'https://logo.clearbit.com/seedcamp.com', website: 'https://seedcamp.com', description: 'European pre-seed.', aum: '$500M+' },
  { id: '203', name: 'LocalGlobe', slug: 'localglobe', logo_url: 'https://logo.clearbit.com/localglobe.vc', website: 'https://localglobe.vc', description: 'UK seed fund.', aum: '$1B+' },
  { id: '204', name: 'Cherry Ventures', slug: 'cherry', logo_url: 'https://logo.clearbit.com/cherry.vc', website: 'https://cherry.vc', description: 'Berlin seed fund.', aum: '$500M+' },
  { id: '205', name: 'Target Global', slug: 'target-global', logo_url: 'https://logo.clearbit.com/targetglobal.vc', website: 'https://targetglobal.vc', description: 'European multi-stage.', aum: '$3B+' },
  { id: '206', name: 'Felix Capital', slug: 'felix', logo_url: 'https://logo.clearbit.com/felixcap.com', website: 'https://felixcap.com', description: 'London consumer tech.', aum: '$600M+' },
  { id: '207', name: 'Passion Capital', slug: 'passion', logo_url: 'https://logo.clearbit.com/passioncapital.com', website: 'https://passioncapital.com', description: 'London seed fund.', aum: '$200M+' },
  { id: '208', name: 'Hoxton Ventures', slug: 'hoxton', logo_url: 'https://logo.clearbit.com/hoxtonventures.com', website: 'https://hoxtonventures.com', description: 'European early-stage.', aum: '$150M+' },
  { id: '209', name: 'Sunstone Capital', slug: 'sunstone', logo_url: 'https://logo.clearbit.com/sunstone.eu', website: 'https://sunstone.eu', description: 'Nordic technology VC.', aum: '$1B+' },
  { id: '210', name: 'Verdane', slug: 'verdane', logo_url: 'https://logo.clearbit.com/verdane.com', website: 'https://verdane.com', description: 'Nordic growth equity.', aum: '$5B+' },

  // More Asia VCs
  { id: '211', name: 'Lightspeed China', slug: 'lightspeed-china', logo_url: 'https://logo.clearbit.com/lightspeedcp.com', website: 'https://lightspeedcp.com', description: 'China focused fund.', aum: '$3B+' },
  { id: '212', name: 'Shunwei Capital', slug: 'shunwei', logo_url: 'https://logo.clearbit.com/shunweicapital.com', website: 'https://shunweicapital.com', description: 'Lei Jun fund. Xiaomi investor.', aum: '$3B+' },
  { id: '213', name: '5Y Capital', slug: '5y-capital', logo_url: 'https://logo.clearbit.com/5ycap.com', website: 'https://5ycap.com', description: 'China early-stage.', aum: '$3B+' },
  { id: '214', name: 'Qiming Venture Partners', slug: 'qiming', logo_url: 'https://logo.clearbit.com/qimingvc.com', website: 'https://qimingvc.com', description: 'China multi-stage.', aum: '$10B+' },
  { id: '215', name: 'Source Code Capital', slug: 'source-code', logo_url: 'https://logo.clearbit.com/sourcecodecap.com', website: 'https://sourcecodecap.com', description: 'China tech investor.', aum: '$5B+' },
  { id: '216', name: 'Rakuten Ventures', slug: 'rakuten', logo_url: 'https://logo.clearbit.com/global.rakuten.com', website: 'https://global.rakuten.com/corp/ventures', description: 'Rakuten corporate VC.', aum: '$500M+' },
  { id: '217', name: 'SBI Investment', slug: 'sbi', logo_url: 'https://logo.clearbit.com/sbigroup.co.jp', website: 'https://sbigroup.co.jp', description: 'Japan financial VC.', aum: '$5B+' },
  { id: '218', name: 'JAFCO', slug: 'jafco', logo_url: 'https://logo.clearbit.com/jafco.co.jp', website: 'https://jafco.co.jp', description: 'Japan oldest VC.', aum: '$3B+' },
  { id: '219', name: 'Global Brain', slug: 'global-brain', logo_url: 'https://logo.clearbit.com/globalbrains.com', website: 'https://globalbrains.com', description: 'Japan tech investor.', aum: '$2B+' },
  { id: '220', name: 'East Ventures', slug: 'east-ventures', logo_url: 'https://logo.clearbit.com/east.vc', website: 'https://east.vc', description: 'Southeast Asia seed.', aum: '$500M+' },

  // More Specialized
  { id: '221', name: 'Andreessen Horowitz Cultural Leadership', slug: 'a16z-cultural', logo_url: 'https://logo.clearbit.com/a16z.com', website: 'https://a16z.com', description: 'Media and entertainment.', aum: '$1B+' },
  { id: '222', name: 'Initialized Capital II', slug: 'initialized-2', logo_url: 'https://logo.clearbit.com/initialized.com', website: 'https://initialized.com', description: 'Garry Tan second fund.', aum: '$1B+' },
  { id: '223', name: 'Global Founders Capital', slug: 'gfc', logo_url: 'https://logo.clearbit.com/globalfounderscapital.com', website: 'https://globalfounderscapital.com', description: 'Rocket Internet fund.', aum: '$1B+' },
  { id: '224', name: 'PEAK6 Investments', slug: 'peak6', logo_url: 'https://logo.clearbit.com/peak6.com', website: 'https://peak6.com', description: 'Chicago trading firm VC.', aum: '$2B+' },
  { id: '225', name: 'Hyde Park Venture Partners', slug: 'hyde-park', logo_url: 'https://logo.clearbit.com/hydeparkvp.com', website: 'https://hydeparkvp.com', description: 'Chicago early-stage.', aum: '$300M+' },
  { id: '226', name: 'Pritzker Group VC', slug: 'pritzker', logo_url: 'https://logo.clearbit.com/pritzkergroup.com', website: 'https://pritzkergroup.com', description: 'Chicago family office VC.', aum: '$2B+' },
  { id: '227', name: 'Revolution', slug: 'revolution', logo_url: 'https://logo.clearbit.com/revolution.com', website: 'https://revolution.com', description: 'Steve Case fund. Rise of Rest.', aum: '$3B+' },
  { id: '228', name: 'Drive Capital', slug: 'drive-capital', logo_url: 'https://logo.clearbit.com/drivecapital.com', website: 'https://drivecapital.com', description: 'Midwest tech investor.', aum: '$1B+' },
  { id: '229', name: 'Mercury Fund', slug: 'mercury-fund', logo_url: 'https://logo.clearbit.com/mercuryfund.com', website: 'https://mercuryfund.com', description: 'Houston enterprise tech.', aum: '$200M+' },
  { id: '230', name: 'LiveOak Venture Partners', slug: 'liveoak', logo_url: 'https://logo.clearbit.com/liveoakvp.com', website: 'https://liveoakvp.com', description: 'Texas B2B software.', aum: '$500M+' },

  // More Growth Equity
  { id: '231', name: 'Summit Partners', slug: 'summit', logo_url: 'https://logo.clearbit.com/summitpartners.com', website: 'https://summitpartners.com', description: 'Growth equity since 1984.', aum: '$23B+' },
  { id: '232', name: 'JMI Equity', slug: 'jmi', logo_url: 'https://logo.clearbit.com/jmi.com', website: 'https://jmi.com', description: 'Growth software investor.', aum: '$5B+' },
  { id: '233', name: 'Technology Crossover Ventures', slug: 'tcv', logo_url: 'https://logo.clearbit.com/tcv.com', website: 'https://tcv.com', description: 'Growth equity. Spotify, Netflix investor.', aum: '$20B+' },
  { id: '234', name: 'Spectrum Equity', slug: 'spectrum', logo_url: 'https://logo.clearbit.com/spectrumequity.com', website: 'https://spectrumequity.com', description: 'Growth equity B2B.', aum: '$6B+' },
  { id: '235', name: 'Providence Equity', slug: 'providence', logo_url: 'https://logo.clearbit.com/provequity.com', website: 'https://provequity.com', description: 'Media and tech PE.', aum: '$50B+' },
  { id: '236', name: 'Warburg Pincus', slug: 'warburg', logo_url: 'https://logo.clearbit.com/warburgpincus.com', website: 'https://warburgpincus.com', description: 'Global PE with tech focus.', aum: '$85B+' },
  { id: '237', name: 'Welsh Carson', slug: 'welsh-carson', logo_url: 'https://logo.clearbit.com/welshcarson.com', website: 'https://welshcarson.com', description: 'Healthcare and tech PE.', aum: '$28B+' },
  { id: '238', name: 'Apax Partners', slug: 'apax', logo_url: 'https://logo.clearbit.com/apax.com', website: 'https://apax.com', description: 'Global PE.', aum: '$65B+' },
  { id: '239', name: 'Permira', slug: 'permira', logo_url: 'https://logo.clearbit.com/permira.com', website: 'https://permira.com', description: 'European PE with tech focus.', aum: '$80B+' },
  { id: '240', name: 'Hellman & Friedman', slug: 'hf', logo_url: 'https://logo.clearbit.com/hf.com', website: 'https://hf.com', description: 'Tech and media PE.', aum: '$100B+' },

  // More Crypto
  { id: '241', name: 'Castle Island Ventures', slug: 'castle-island', logo_url: 'https://logo.clearbit.com/castleisland.vc', website: 'https://castleisland.vc', description: 'Bitcoin-focused fund.', aum: '$400M+' },
  { id: '242', name: 'CoinFund', slug: 'coinfund', logo_url: 'https://logo.clearbit.com/coinfund.io', website: 'https://coinfund.io', description: 'Crypto and web3 investor.', aum: '$1B+' },
  { id: '243', name: '1confirmation', slug: '1confirmation', logo_url: 'https://logo.clearbit.com/1confirmation.com', website: 'https://1confirmation.com', description: 'Crypto thesis fund.', aum: '$500M+' },
  { id: '244', name: 'Nascent', slug: 'nascent', logo_url: 'https://logo.clearbit.com/nascent.xyz', website: 'https://nascent.xyz', description: 'Crypto native fund.', aum: '$500M+' },
  { id: '245', name: 'Jump Crypto', slug: 'jump-crypto', logo_url: 'https://logo.clearbit.com/jumpcrypto.com', website: 'https://jumpcrypto.com', description: 'Jump Trading crypto arm.', aum: '$2B+' },
  { id: '246', name: 'Delphi Digital', slug: 'delphi', logo_url: 'https://logo.clearbit.com/delphidigital.io', website: 'https://delphidigital.io', description: 'Crypto research and investing.', aum: '$200M+' },
  { id: '247', name: 'Mechanism Capital', slug: 'mechanism', logo_url: 'https://logo.clearbit.com/mechanism.capital', website: 'https://mechanism.capital', description: 'DeFi focused fund.', aum: '$300M+' },
  { id: '248', name: 'ParaFi Capital', slug: 'parafi', logo_url: 'https://logo.clearbit.com/parafi.com', website: 'https://parafi.com', description: 'DeFi and digital assets.', aum: '$600M+' },
  { id: '249', name: 'Distributed Global', slug: 'distributed-global', logo_url: 'https://logo.clearbit.com/distributedglobal.com', website: 'https://distributedglobal.com', description: 'Crypto and blockchain.', aum: '$500M+' },
  { id: '250', name: 'Hack VC', slug: 'hack-vc', logo_url: 'https://logo.clearbit.com/hack.vc', website: 'https://hack.vc', description: 'Crypto and AI investing.', aum: '$500M+' },

  // AI Focused
  { id: '251', name: 'Air Street Capital', slug: 'air-street', logo_url: 'https://logo.clearbit.com/airstreet.com', website: 'https://airstreet.com', description: 'AI-first fund by Nathan Benaich.', aum: '$200M+' },
  { id: '252', name: 'Radical Ventures', slug: 'radical', logo_url: 'https://logo.clearbit.com/radical.vc', website: 'https://radical.vc', description: 'AI focused fund. Cohere investor.', aum: '$1B+' },
  { id: '253', name: 'Lux Capital', slug: 'lux', logo_url: 'https://logo.clearbit.com/luxcapital.com', website: 'https://luxcapital.com', description: 'Deep tech and AI.', aum: '$5B+' },
  { id: '254', name: 'Amplify AI Fund', slug: 'amplify-ai', logo_url: 'https://logo.clearbit.com/amplifypartners.com', website: 'https://amplifypartners.com', description: 'Enterprise AI investing.', aum: '$500M+' },
  { id: '255', name: 'Gradient Ventures', slug: 'gradient', logo_url: 'https://logo.clearbit.com/gradient.com', website: 'https://gradient.com', description: 'Google AI fund.', aum: '$1B+' },
  { id: '256', name: 'Data Collective', slug: 'dcvc-2', logo_url: 'https://logo.clearbit.com/dcvc.com', website: 'https://dcvc.com', description: 'Deep tech and AI.', aum: '$3B+' },
  { id: '257', name: 'Conviction Partners', slug: 'conviction', logo_url: 'https://logo.clearbit.com/conviction.com', website: 'https://conviction.com', description: 'Sarah Tavel AI fund.', aum: '$300M+' },
  { id: '258', name: 'Playground Global', slug: 'playground', logo_url: 'https://logo.clearbit.com/playground.global', website: 'https://playground.global', description: 'Andy Rubin deep tech fund.', aum: '$500M+' },
  { id: '259', name: 'Coatue AI Fund', slug: 'coatue-ai', logo_url: 'https://logo.clearbit.com/coatue.com', website: 'https://coatue.com', description: 'Coatue AI-focused vehicle.', aum: '$2B+' },
  { id: '260', name: 'AI Grant', slug: 'ai-grant', logo_url: 'https://logo.clearbit.com/aigrant.co', website: 'https://aigrant.co', description: 'AI founders fund by Nat Friedman.', aum: '$200M+' },

  // More Healthcare
  { id: '261', name: 'Andreessen Bio+Health', slug: 'a16z-biohealth', logo_url: 'https://logo.clearbit.com/a16z.com', website: 'https://a16z.com/bio', description: 'a16z bio and health.', aum: '$2B+' },
  { id: '262', name: 'Venrock Healthcare', slug: 'venrock-hc', logo_url: 'https://logo.clearbit.com/venrock.com', website: 'https://venrock.com', description: 'Venrock healthcare arm.', aum: '$2B+' },
  { id: '263', name: 'F-Prime Capital', slug: 'f-prime', logo_url: 'https://logo.clearbit.com/fprimecapital.com', website: 'https://fprimecapital.com', description: 'Fidelity healthcare VC.', aum: '$3B+' },
  { id: '264', name: 'RA Capital', slug: 'ra-capital', logo_url: 'https://logo.clearbit.com/racap.com', website: 'https://racap.com', description: 'Life sciences crossover.', aum: '$10B+' },
  { id: '265', name: 'Polaris Partners', slug: 'polaris', logo_url: 'https://logo.clearbit.com/polarispartners.com', website: 'https://polarispartners.com', description: 'Healthcare and tech.', aum: '$4B+' },
  { id: '266', name: 'Atlas Venture', slug: 'atlas', logo_url: 'https://logo.clearbit.com/atlasventure.com', website: 'https://atlasventure.com', description: 'Life sciences early-stage.', aum: '$2B+' },
  { id: '267', name: 'Third Rock Ventures', slug: 'third-rock', logo_url: 'https://logo.clearbit.com/thirdrockventures.com', website: 'https://thirdrockventures.com', description: 'Biotech company builder.', aum: '$4B+' },
  { id: '268', name: 'General Catalyst Health', slug: 'gc-health', logo_url: 'https://logo.clearbit.com/generalcatalyst.com', website: 'https://generalcatalyst.com', description: 'GC healthcare investing.', aum: '$3B+' },
  { id: '269', name: 'Kinnevik', slug: 'kinnevik', logo_url: 'https://logo.clearbit.com/kinnevik.com', website: 'https://kinnevik.com', description: 'European health and consumer.', aum: '$10B+' },
  { id: '270', name: 'GV Healthcare', slug: 'gv-health', logo_url: 'https://logo.clearbit.com/gv.com', website: 'https://gv.com', description: 'Google healthcare investing.', aum: '$2B+' },

  // More Fintech
  { id: '271', name: 'Flourish Ventures', slug: 'flourish', logo_url: 'https://logo.clearbit.com/flourishventures.com', website: 'https://flourishventures.com', description: 'Fintech for good.', aum: '$1B+' },
  { id: '272', name: 'Nyca Partners II', slug: 'nyca-2', logo_url: 'https://logo.clearbit.com/nyca.com', website: 'https://nyca.com', description: 'Fintech fund II.', aum: '$500M+' },
  { id: '273', name: 'Clocktower II', slug: 'clocktower-2', logo_url: 'https://logo.clearbit.com/clocktower.io', website: 'https://clocktower.io', description: 'Fintech and enterprise.', aum: '$300M+' },
  { id: '274', name: 'Anthemis', slug: 'anthemis', logo_url: 'https://logo.clearbit.com/anthemis.com', website: 'https://anthemis.com', description: 'Fintech venture and studio.', aum: '$1B+' },
  { id: '275', name: 'Financial Venture Studio', slug: 'fvs', logo_url: 'https://logo.clearbit.com/fvs.studio', website: 'https://fvs.studio', description: 'Fintech studio.', aum: '$200M+' },
  { id: '276', name: 'QED Investors II', slug: 'qed-2', logo_url: 'https://logo.clearbit.com/qedinvestors.com', website: 'https://qedinvestors.com', description: 'QED latest fund.', aum: '$1B+' },
  { id: '277', name: 'Portage Ventures', slug: 'portage', logo_url: 'https://logo.clearbit.com/portagefintech.com', website: 'https://portagefintech.com', description: 'Canada fintech fund.', aum: '$700M+' },
  { id: '278', name: 'Fin Capital', slug: 'fin-capital', logo_url: 'https://logo.clearbit.com/fin.capital', website: 'https://fin.capital', description: 'Fintech B2B seed.', aum: '$200M+' },
  { id: '279', name: 'Tusk Venture Partners', slug: 'tusk', logo_url: 'https://logo.clearbit.com/tuskventures.com', website: 'https://tuskventures.com', description: 'Regulated industries.', aum: '$400M+' },
  { id: '280', name: 'Commerce Ventures', slug: 'commerce-ventures', logo_url: 'https://logo.clearbit.com/commerce.vc', website: 'https://commerce.vc', description: 'Payments and fintech.', aum: '$300M+' },

  // More Consumer
  { id: '281', name: 'Forerunner III', slug: 'forerunner-3', logo_url: 'https://logo.clearbit.com/forerunnerventures.com', website: 'https://forerunnerventures.com', description: 'Consumer latest fund.', aum: '$1B+' },
  { id: '282', name: 'Imaginary Ventures', slug: 'imaginary', logo_url: 'https://logo.clearbit.com/imaginary.co', website: 'https://imaginary.co', description: 'Fashion and consumer.', aum: '$500M+' },
  { id: '283', name: 'Lightspeed Consumer', slug: 'lightspeed-consumer', logo_url: 'https://logo.clearbit.com/lsvp.com', website: 'https://lsvp.com', description: 'Lightspeed consumer investing.', aum: '$3B+' },
  { id: '284', name: 'Volition Capital', slug: 'volition', logo_url: 'https://logo.clearbit.com/volitioncapital.com', website: 'https://volitioncapital.com', description: 'Consumer growth equity.', aum: '$2B+' },
  { id: '285', name: 'Prelude Growth Partners', slug: 'prelude-growth', logo_url: 'https://logo.clearbit.com/preludegrowth.com', website: 'https://preludegrowth.com', description: 'Consumer growth investor.', aum: '$500M+' },
  { id: '286', name: 'Coefficient Capital', slug: 'coefficient', logo_url: 'https://logo.clearbit.com/coefficient.io', website: 'https://coefficient.io', description: 'Consumer CPG investor.', aum: '$300M+' },
  { id: '287', name: 'VMG Partners', slug: 'vmg', logo_url: 'https://logo.clearbit.com/vmgpartners.com', website: 'https://vmgpartners.com', description: 'Consumer brands growth.', aum: '$3B+' },
  { id: '288', name: 'CAVU Venture Partners', slug: 'cavu', logo_url: 'https://logo.clearbit.com/cavuventures.com', website: 'https://cavuventures.com', description: 'Consumer food and beverage.', aum: '$500M+' },
  { id: '289', name: 'AccelFoods', slug: 'accelfoods', logo_url: 'https://logo.clearbit.com/accelfoods.com', website: 'https://accelfoods.com', description: 'Food and beverage early-stage.', aum: '$50M+' },
  { id: '290', name: 'CircleUp', slug: 'circleup', logo_url: 'https://logo.clearbit.com/circleup.com', website: 'https://circleup.com', description: 'Consumer brands platform.', aum: '$400M+' },

  // More Defense & Space
  { id: '291', name: 'Lux Capital II', slug: 'lux-2', logo_url: 'https://logo.clearbit.com/luxcapital.com', website: 'https://luxcapital.com', description: 'Deep tech and defense.', aum: '$2B+' },
  { id: '292', name: 'Shield Capital', slug: 'shield-capital', logo_url: 'https://logo.clearbit.com/shieldcap.com', website: 'https://shieldcap.com', description: 'Defense tech investing.', aum: '$200M+' },
  { id: '293', name: 'In-Q-Tel', slug: 'in-q-tel', logo_url: 'https://logo.clearbit.com/iqt.org', website: 'https://iqt.org', description: 'CIA venture arm.', aum: '$500M+' },
  { id: '294', name: 'Lockheed Martin Ventures', slug: 'lm-ventures', logo_url: 'https://logo.clearbit.com/lockheedmartin.com', website: 'https://lockheedmartin.com/ventures', description: 'Lockheed corporate VC.', aum: '$500M+' },
  { id: '295', name: 'Boeing HorizonX', slug: 'boeing-hx', logo_url: 'https://logo.clearbit.com/boeing.com', website: 'https://boeing.com/ventures', description: 'Boeing corporate VC.', aum: '$300M+' },
  { id: '296', name: 'Space Capital', slug: 'space-capital', logo_url: 'https://logo.clearbit.com/spacecapital.com', website: 'https://spacecapital.com', description: 'Space tech investing.', aum: '$200M+' },
  { id: '297', name: 'Seraphim Capital', slug: 'seraphim', logo_url: 'https://logo.clearbit.com/seraphim.vc', website: 'https://seraphim.vc', description: 'Space tech VC.', aum: '$400M+' },
  { id: '298', name: 'Type One Ventures', slug: 'type-one', logo_url: 'https://logo.clearbit.com/typeoneventures.com', website: 'https://typeoneventures.com', description: 'Space infrastructure.', aum: '$100M+' },
  { id: '299', name: 'E2MC Ventures', slug: 'e2mc', logo_url: 'https://logo.clearbit.com/e2mc.vc', website: 'https://e2mc.vc', description: 'Earth observation tech.', aum: '$50M+' },
  { id: '300', name: 'Karman Ventures', slug: 'karman', logo_url: 'https://logo.clearbit.com/karman.vc', website: 'https://karman.vc', description: 'Space tech seed.', aum: '$80M+' },
]
