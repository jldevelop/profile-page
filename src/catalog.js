// Website showcase - designs the studio has built, shown as proof of capability
// (not for sale). Two kinds:
//  • simple    - single-page website designs across every industry
//  • ecommerce - full multi-page online storefronts
// Made in-house, not client work. Thumbnails live in /images/catalog/
// (<slug>-card.webp grid, <slug>-full.webp preview).
//
// i18n: title/category/blurb are overlaid from catalog.hr.js (keyed by slug /
// industry) when the active locale is Croatian - see content.js for the same
// approach applied to team bios. webp paths, live-demo URLs and the
// industry→group mapping stay locale-independent.
import { computed } from 'vue'
import { lang } from '@/lang.js'
import catalogHr from '@/catalog.hr.js'

const CAT = '/images/catalog'

// ---------------------------------------------------------------------------
// HIDDEN TEMPLATES
// Add the public code ('WEB-07', 'SHOP-12', 'CLUB-01') or the slug
// ('07-beauty-spa-wellness') of any template you want to take off the site
// for now. Hidden templates disappear from the /work grid, their /work/:id
// deep link, the prerendered pages and the sitemap on the next build/deploy.
// Remove the entry to bring the template back.
// ---------------------------------------------------------------------------
const HIDDEN_TEMPLATES = [
  'WEB-01',
  'WEB-03',
  'WEB-11',
  'WEB-18',
  'WEB-20',
  'WEB-26',
  'WEB-27',
  'WEB-28',
  'WEB-37',
  'WEB-64',
  'WEB-68',
  'SHOP-05',
  'WEB-17',
  'WEB-48'
]

// Live demo sites - deployed to Cloudflare Pages from ../websites-portfolio/templates-wrapper.
// Folder names match each template's slug; simple sites and storefronts live under
// separate top-level folders. See websites-portfolio/wrangler.toml + `npm run deploy:templates`.
const DEMO_BASE = 'https://jcode-templates.pages.dev'
const DEMO_DIR = { simple: 'templates', ecommerce: 'templates-ecommerce' }

// Two top-level sections, keyed to each template's `kind`.
const sectionsBase = [
  { key: 'simple', label: 'Simple Landing Pages' },
  { key: 'ecommerce', label: 'Ecommerce Websites' },
]

// Category options in the filter dropdown of the "Simple Landing Pages" section
// (ecommerce is a small set, shown without sub-filters). Labels stay brief -
// they render in a compact dropdown menu.
const simpleGroupsBase = [
  { key: 'all', label: 'All' },
  { key: 'food-hospitality', label: 'Food & travel' },
  { key: 'health-beauty', label: 'Health & beauty' },
  { key: 'home-pro', label: 'Home & services' },
  { key: 'creative-media', label: 'Creative & events' },
  { key: 'tech-shop-edu', label: 'Tech & shops' },
  { key: 'sports-gaming', label: 'Sports & gaming' },
  { key: 'nightlife', label: 'Nightlife' },
  { key: 'personal-community', label: 'Personal' },
]

function localizeLabels(base, dict) {
  if (lang.value !== 'hr') return base
  return base.map((entry) => ({ ...entry, label: dict[entry.key] ?? entry.label }))
}

export const sections = computed(() => localizeLabels(sectionsBase, catalogHr.sections))
export const simpleGroups = computed(() => localizeLabels(simpleGroupsBase, catalogHr.simpleGroups))

const GROUP_OF = {
  'Food & Drink': 'food-hospitality',
  'Hospitality & Travel': 'food-hospitality',
  'Beauty & Wellness': 'health-beauty',
  'Health & Medical': 'health-beauty',
  Fitness: 'health-beauty',
  Pets: 'health-beauty',
  'Home & Trades': 'home-pro',
  'Professional Services': 'home-pro',
  'Real Estate': 'home-pro',
  Automotive: 'home-pro',
  'Creative & Design': 'creative-media',
  'Media & Creators': 'creative-media',
  Events: 'creative-media',
  'Tech & Digital': 'tech-shop-edu',
  'Retail & E-commerce': 'tech-shop-edu',
  Retail: 'tech-shop-edu',
  'Education & Coaching': 'tech-shop-edu',
  Sports: 'sports-gaming',
  'Games & Esports': 'sports-gaming',
  Nightlife: 'nightlife',
  Personal: 'personal-community',
  'Community & Nonprofit': 'personal-community',
}

const sites = [
  ['01-restaurant', 'Restaurant', 'Food & Drink', 'Showcase ambiance & cuisine and drive reservations.'],
  ['02-coffee-shop', 'Coffee Shop', 'Food & Drink', 'A cozy brand intro that drives foot traffic.'],
  ['03-real-estate-agency', 'Real Estate Agency', 'Real Estate', 'Generate buyer and seller leads for an agency.'],
  ['04-single-property-listing', 'Single Property Listing', 'Real Estate', 'Sell one specific property with rich detail.'],
  ['05-hair-salon', 'Hair Salon', 'Beauty & Wellness', 'Promote services & stylists and take bookings.'],
  ['06-barbershop', 'Barbershop', 'Beauty & Wellness', 'A bold brand intro that drives appointments.'],
  ['07-beauty-spa-wellness', 'Beauty Spa & Wellness', 'Beauty & Wellness', 'Sell relaxation packages and bookings.'],
  ['08-nail-salon', 'Nail Salon', 'Beauty & Wellness', 'Show designs and convert to bookings.'],
  ['09-dental-clinic', 'Dental Clinic', 'Health & Medical', 'Build trust and book new patients.'],
  ['10-medical-practice', 'Medical Practice', 'Health & Medical', 'Introduce a practice and capture appointments.'],
  ['11-law-firm', 'Law Firm', 'Professional Services', 'Establish authority and capture consultations.'],
  ['12-financial-advisor', 'Financial Advisor', 'Professional Services', 'Build credibility and book consultations.'],
  ['13-construction-company', 'Construction Company', 'Home & Trades', 'Showcase projects and request quotes.'],
  ['14-home-services-plumbing-electric', 'Home Services', 'Home & Trades', 'Convert urgent local searches to calls.'],
  ['15-cleaning-service', 'Cleaning Service', 'Home & Trades', 'Sell packages and capture bookings.'],
  ['16-landscaping-gardening', 'Landscaping & Gardening', 'Home & Trades', 'Display transformations and get leads.'],
  ['17-interior-design-studio', 'Interior Design Studio', 'Creative & Design', 'Showcase a portfolio and book projects.'],
  ['18-architecture-firm', 'Architecture Firm', 'Creative & Design', 'Present flagship projects and capabilities.'],
  ['19-photography-studio', 'Photography Studio', 'Creative & Design', 'Display work and sell shoot packages.'],
  ['20-wedding-planner', 'Wedding Planner', 'Events', 'Sell dream weddings and capture inquiries.'],
  ['21-personal-profile-portfolio', 'Personal Portfolio', 'Personal', 'A personal brand & work showcase.'],
  ['22-freelancer-consultant', 'Freelancer / Consultant', 'Personal', 'Sell expertise and convert to leads.'],
  ['23-personal-trainer', 'Personal Trainer', 'Fitness', 'Sell coaching programs and sessions.'],
  ['24-gym-fitness-studio', 'Gym & Fitness Studio', 'Fitness', 'Drive memberships and trials.'],
  ['25-yoga-pilates-studio', 'Yoga & Pilates Studio', 'Fitness', 'A calm brand intro that drives trial classes.'],
  ['26-travel-agency', 'Travel Agency', 'Hospitality & Travel', 'Inspire trips and capture inquiries.'],
  ['27-boutique-hotel', 'Boutique Hotel', 'Hospitality & Travel', 'Showcase rooms and drive bookings.'],
  ['28-vacation-rental-b-b', 'Vacation Rental / B&B', 'Hospitality & Travel', 'Present a property and take bookings.'],
  ['29-tour-operator', 'Tour Operator', 'Hospitality & Travel', 'Sell experiences and tours.'],
  ['30-saas-product', 'SaaS Product', 'Tech & Digital', 'Convert visitors into trials and signups.'],
  ['31-mobile-app', 'Mobile App Landing', 'Tech & Digital', 'Drive app downloads.'],
  ['32-tech-startup', 'Tech Startup', 'Tech & Digital', 'Tell the story and capture interest.'],
  ['33-digital-marketing-agency', 'Digital Marketing Agency', 'Tech & Digital', 'Prove results and book discovery calls.'],
  ['34-online-store-multi-product', 'Online Store', 'Retail & E-commerce', 'Promote a shop and featured products.'],
  ['35-single-product-dtc', 'Single Product (DTC)', 'Retail & E-commerce', 'Sell one hero product persuasively.'],
  ['36-online-course-e-learning', 'Online Course', 'Education & Coaching', 'Enroll students into a course.'],
  ['37-life-coach', 'Life Coach', 'Education & Coaching', 'Book discovery calls and programs.'],
  ['38-podcast', 'Podcast', 'Media & Creators', 'Grow listeners and subscribers.'],
  ['39-author-book-launch', 'Author / Book Launch', 'Media & Creators', 'Sell a book and build a reader list.'],
  ['40-musician-band', 'Musician / Band', 'Media & Creators', 'Promote music and grow a following.'],
  ['41-nonprofit-charity', 'Nonprofit / Charity', 'Community & Nonprofit', 'Drive donations and volunteers.'],
  ['42-church-faith-community', 'Church / Faith Community', 'Community & Nonprofit', 'Welcome visitors and share service times.'],
  ['43-pet-grooming', 'Pet Grooming', 'Pets', 'Show care quality and take bookings.'],
  ['44-veterinary-clinic', 'Veterinary Clinic', 'Pets', 'Build trust and capture appointments.'],
  ['45-auto-repair-shop', 'Auto Repair Shop', 'Automotive', 'Convert local searches into appointments.'],
  ['46-car-dealership', 'Car Dealership', 'Automotive', 'Showcase inventory and drive test drives.'],
  ['47-bakery', 'Bakery', 'Food & Drink', 'Show products and drive orders & visits.'],
  ['48-florist', 'Florist', 'Retail & E-commerce', 'Sell arrangements for every occasion.'],
  ['49-catering-service', 'Catering Service', 'Food & Drink', 'Sell event catering and capture quotes.'],
  ['50-daycare-preschool', 'Daycare & Preschool', 'Education & Coaching', 'Reassure parents and drive enrollments.'],
  ['51-crm-saas', 'CRM Platform', 'Tech & Digital', 'Convert teams to a smarter CRM with a free trial.'],
  ['52-project-management-saas', 'Project Management App', 'Tech & Digital', 'Show the workflow and drive trial signups.'],
  ['53-ai-productivity-saas', 'AI Productivity Tool', 'Tech & Digital', 'Sell an AI assistant and capture early users.'],
  ['54-analytics-dashboard-saas', 'Analytics Platform', 'Tech & Digital', 'Turn data into a demo and a signup.'],
  ['55-developer-tool-api-platform', 'Developer / API Platform', 'Tech & Digital', 'Win developers with docs-first messaging.'],
  ['56-cybersecurity-software', 'Cybersecurity Software', 'Tech & Digital', 'Build trust and book a security demo.'],
  ['57-video-game-game-studio', 'Game Studio', 'Games & Esports', 'Hype a title and grow the wishlist.'],
  ['58-desktop-creative-software', 'Creative Software', 'Tech & Digital', 'Showcase the app and drive downloads.'],
  ['59-sports-club-team', 'Sports Club / Team', 'Sports', 'Rally fans with fixtures, news and tickets.'],
  ['60-esports-team-org', 'Esports Organization', 'Games & Esports', 'Showcase the roster and grow the fanbase.'],
  ['61-sports-academy-coaching', 'Sports Academy', 'Sports', 'Fill programs and capture sign-ups.'],
  ['62-marathon-sporting-event', 'Sporting Event', 'Sports', 'Drive race registrations and sponsors.'],
  ['63-insurance-agency', 'Insurance Agency', 'Professional Services', 'Build trust and capture quote requests.'],
  ['64-accounting-tax-firm', 'Accounting & Tax Firm', 'Professional Services', 'Establish authority and book consultations.'],
  ['65-recruitment-staffing-agency', 'Recruitment Agency', 'Professional Services', 'Attract clients and candidates alike.'],
  ['66-coworking-space', 'Coworking Space', 'Professional Services', 'Show the space and drive tours & memberships.'],
  ['67-conference-summit', 'Conference / Summit', 'Events', 'Sell tickets and showcase the speakers.'],
  ['68-jewelry-store', 'Jewelry Store', 'Retail', 'Showcase pieces and drive enquiries & visits.'],
  ['69-fashion-boutique', 'Fashion Boutique', 'Retail', 'Present collections and pull shoppers in.'],
  ['70-brewery-winery', 'Brewery & Winery', 'Food & Drink', 'Tell the craft story and drive tastings.'],
  ['71-hairdressing-salon', 'Hair Atelier', 'Beauty & Wellness', 'Flagship salon site: gallery, Instagram feed & online booking.'],
  ['72-hair-colour-studio', 'Hair Colour Studio', 'Beauty & Wellness', 'Loud colour-studio site: before/after slider & price estimator.'],
  ['73-nail-studio', 'Nail Studio', 'Beauty & Wellness', 'Playful nail-studio site: shape picker, gallery filters & slot booking.'],
]

// Full multi-page e-commerce storefronts (home · collection · product · cart).
const stores = [
  ['e01-womens-fashion-boutique', "Women's Fashion Boutique", "Women's fashion", 'A full online store for a women’s fashion label.'],
  ['e02-mens-tailored-clothing', "Men's Tailored Clothing", 'Menswear', 'Sell tailored menswear with a refined storefront.'],
  ['e03-streetwear', 'Streetwear Store', 'Streetwear', 'A bold, drop-driven store for a streetwear brand.'],
  ['e04-luxury-fashion-house', 'Luxury Fashion House', 'Luxury fashion', 'An editorial storefront for a luxury label.'],
  ['e05-sustainable-apparel', 'Sustainable Apparel', 'Sustainable fashion', 'Sell conscious clothing with a story-led shop.'],
  ['e06-activewear-athleisure', 'Activewear & Athleisure', 'Activewear', 'Sell performance activewear with a high-energy store.'],
  ['e07-lingerie-intimates', 'Lingerie & Intimates', 'Lingerie', 'An elegant, intimate storefront for a lingerie label.'],
  ['e08-premium-denim', 'Premium Denim', 'Denim', 'Sell premium selvedge denim with a craft-led shop.'],
  ['e09-vintage-thrift', 'Vintage & Thrift', 'Vintage', 'A characterful store for one-of-one vintage finds.'],
  ['e10-kids-clothing', "Kids' Clothing", 'Kidswear', 'A playful, parent-friendly store for kids’ clothing.'],
  ['e11-sneakers-footwear', 'Sneakers & Footwear', 'Footwear', 'A high-energy store for a sneaker & footwear brand.'],
  ['e12-eyewear-sunglasses', 'Eyewear & Sunglasses', 'Eyewear', 'Sell frames and shades with a sharp, visual store.'],
  ['e13-handbags-leather-goods', 'Handbags & Leather Goods', 'Leather goods', 'A refined store for handbags and leather goods.'],
  ['e14-swimwear', 'Swimwear', 'Swimwear', 'A sun-soaked store for a swimwear label.'],
  ['e15-eco-sneakers', 'Eco Sneakers', 'Eco footwear', 'Sell sustainable sneakers with a story-led shop.'],
  ['e16-accessories-scarves-hats', 'Accessories, Scarves & Hats', 'Accessories', 'A versatile store for fashion accessories.'],
  ['e17-skincare', 'Skincare', 'Skincare', 'Sell clean skincare with a calm, clinical store.'],
  ['e18-makeup', 'Makeup', 'Makeup', 'A vibrant store for a colour-cosmetics brand.'],
  ['e19-natural-organic-beauty', 'Natural & Organic Beauty', 'Natural beauty', 'Sell natural beauty with a botanical, story-led shop.'],
  ['e20-perfume-fragrance', 'Perfume & Fragrance', 'Fragrance', 'An evocative store for a perfume house.'],
]

// Nightclub tier demos (premium single-page sales demos). Deployed under
// /nightclub-demos/ on Cloudflare Pages (not the templates wrapper dirs), so
// they carry an explicit `live` URL. Bilingual via their own localStorage toggle.
const NC_BASE = `${DEMO_BASE}/nightclub-demos`
const nightclubs = [
  ['nc01-beton', 'Klub BETON', 'Nightlife', 'Underground techno club - a raw, brutalist identity built to get a club found on Google. (Tier 1)', 'demo-tier1-beton.html'],
  ['nc02-volt', 'Klub VOLT', 'Nightlife', 'High-energy commercial club - table bookings, guestlist and ticketing that make the club money. (Tier 2)', 'demo-tier2-volt.html'],
  ['nc03-aurora', 'AURORA Rooftop Club', 'Nightlife', 'Premium rooftop club - an interactive floor plan, membership and an owner’s analytics dashboard. (Tier 3)', 'demo-tier3-aurora.html'],
]
const toNightclub = ([slug, title, industry, blurb, file]) => ({
  id: slug,
  code: codeOf(slug),
  title,
  about: GROUP_ABOUT.nightlife,
  category: industry,
  group: 'nightlife',
  kind: 'simple',
  blurb,
  card: `${CAT}/${slug}-card.webp`,
  full: `${CAT}/${slug}-full.webp`,
  live: `${NC_BASE}/${file}`,
})

// Short industry paragraph per filter group - shown in the preview dialog and
// on the prerendered /work/:id landing pages (real crawlable copy per design).
// Croatian versions live in catalog.hr.js → groupAbout.
const GROUP_ABOUT = {
  'food-hospitality':
    'A design built for restaurants, cafés, bars, hotels and travel businesses - menus and offers up front, mouth-watering imagery, opening hours, location and a prominent reservation action that turns visitors into guests.',
  'health-beauty':
    'A design made for salons, clinics, spas, trainers and wellness studios - services and pricing presented clearly, trust-building team and review sections, and an always-visible booking action that turns visitors into appointments.',
  'home-pro':
    'A design for trades, agencies and professional services - it leads with the problem you solve, shows proof through projects and reviews, and drives quote requests with clear calls to action and contact details.',
  'creative-media':
    'A design for creative studios, photographers, event professionals and media brands - the work takes centre stage in generous galleries and editorial layouts, backed by packages and a clear enquiry flow.',
  'tech-shop-edu':
    'A design for digital products, shops and education businesses - it explains the offer fast, builds credibility with features, numbers and testimonials, and pushes one conversion goal: sign-up, order or enrolment.',
  'sports-gaming':
    'A design for clubs, academies, events and gaming brands - bold, high-energy layouts with schedules, rosters and news, plus prominent actions for tickets, sign-ups and memberships.',
  nightlife:
    'A high-impact design for clubs and nightlife venues - event programme and lineups front and centre, table booking and guestlist actions, atmosphere-heavy galleries and Instagram baked in.',
  'personal-community':
    'A design for personal brands, nonprofits and communities - a strong introduction, story-driven sections that build trust, and clear actions for contacting, joining or donating.',
  ecommerce:
    'A complete multi-page online store - home, collection, product and cart - with merchandising sections, product storytelling and a checkout-ready flow designed to sell.',
}

// Public reference code shown on cards / in the preview / forwarded to the
// contact form - lets a visitor name the exact design (WEB-14, SHOP-03, CLUB-02).
// Derived from the slug, locale-independent.
export const codeOf = (slug) => {
  const store = slug.match(/^e(\d+)-/)
  if (store) return `SHOP-${store[1]}`
  const club = slug.match(/^nc(\d+)-/)
  if (club) return `CLUB-${club[1]}`
  return `WEB-${slug.slice(0, 2)}`
}

const toTemplate = (kind, group) => ([slug, title, industry, blurb]) => ({
  id: slug,
  code: codeOf(slug),
  title,
  category: industry,
  group: group || GROUP_OF[industry] || 'all',
  kind,
  blurb,
  about: GROUP_ABOUT[group || GROUP_OF[industry]] ?? '',
  card: `${CAT}/${slug}-card.webp`,
  full: `${CAT}/${slug}-full.webp`,
  live: `${DEMO_BASE}/${DEMO_DIR[kind]}/${slug}/`,
})

const hidden = new Set(HIDDEN_TEMPLATES.map((s) => s.trim().toUpperCase()))
const isHidden = (tpl) => hidden.has(tpl.code) || hidden.has(tpl.id.toUpperCase())

// Fixed display order for the /work grid (hand-picked with the /sort-templates
// tool, updated 2026-07-11). Templates missing from this list - e.g. ones unhidden
// later - simply follow at the end in catalog order.
const DISPLAY_ORDER = [
  '56-cybersecurity-software',
  '21-personal-profile-portfolio',
  '30-saas-product',
  '55-developer-tool-api-platform',
  '09-dental-clinic',
  '40-musician-band',
  '31-mobile-app',
  '36-online-course-e-learning',
  '23-personal-trainer',
  '22-freelancer-consultant',
  '13-construction-company',
  '10-medical-practice',
  '08-nail-salon',
  '38-podcast',
  '33-digital-marketing-agency',
  '69-fashion-boutique',
  '05-hair-salon',
  '71-hairdressing-salon',
  '72-hair-colour-studio',
  '73-nail-studio',
  '57-video-game-game-studio',
  '59-sports-club-team',
  '52-project-management-saas',
  '14-home-services-plumbing-electric',
  '15-cleaning-service',
  'e06-activewear-athleisure',
  '19-photography-studio',
  '24-gym-fitness-studio',
  '06-barbershop',
  '25-yoga-pilates-studio',
  '29-tour-operator',
  '04-single-property-listing',
  '12-financial-advisor',
  '39-author-book-launch',
  '07-beauty-spa-wellness',
  '32-tech-startup',
  '16-landscaping-gardening',
  '45-auto-repair-shop',
  'nc01-beton',
  'nc02-volt',
  '35-single-product-dtc',
  '41-nonprofit-charity',
  '42-church-faith-community',
  '53-ai-productivity-saas',
  '43-pet-grooming',
  '60-esports-team-org',
  '44-veterinary-clinic',
  '54-analytics-dashboard-saas',
  '58-desktop-creative-software',
  '46-car-dealership',
  '47-bakery',
  '49-catering-service',
  '50-daycare-preschool',
  '51-crm-saas',
  '61-sports-academy-coaching',
  'e03-streetwear',
  '62-marathon-sporting-event',
  '63-insurance-agency',
  '65-recruitment-staffing-agency',
  '66-coworking-space',
  '67-conference-summit',
  '70-brewery-winery',
  '34-online-store-multi-product',
  'nc03-aurora',
  'e01-womens-fashion-boutique',
  'e02-mens-tailored-clothing',
  'e04-luxury-fashion-house',
  'e07-lingerie-intimates',
  'e08-premium-denim',
  'e09-vintage-thrift',
  'e10-kids-clothing',
  'e11-sneakers-footwear',
  'e12-eyewear-sunglasses',
  'e13-handbags-leather-goods',
  '02-coffee-shop',
  'e14-swimwear',
  'e15-eco-sneakers',
  'e16-accessories-scarves-hats',
  'e17-skincare',
  'e18-makeup',
  'e19-natural-organic-beauty',
  'e20-perfume-fragrance',
]
const orderIndex = new Map(DISPLAY_ORDER.map((id, i) => [id, i]))

const templatesBase = [
  ...sites.map(toTemplate('simple')),
  ...nightclubs.map(toNightclub),
  ...stores.map(toTemplate('ecommerce', 'ecommerce')),
]
  .filter((tpl) => !isHidden(tpl))
  // stable sort: ids not in DISPLAY_ORDER keep their relative catalog order at the end
  .sort((a, b) => (orderIndex.get(a.id) ?? Infinity) - (orderIndex.get(b.id) ?? Infinity))

export const templates = computed(() => {
  if (lang.value !== 'hr') return templatesBase
  return templatesBase.map((tpl) => {
    const item = catalogHr.items[tpl.id]
    return {
      ...tpl,
      title: item?.title ?? tpl.title,
      category: catalogHr.categories[tpl.category] ?? tpl.category,
      blurb: item?.blurb ?? tpl.blurb,
      about: catalogHr.groupAbout[tpl.group] ?? tpl.about,
      // Croatian screenshots (captured with the site in Croatian) sit next to the
      // English ones as <slug>-card.hr.webp / <slug>-full.hr.webp.
      card: `${CAT}/${tpl.id}-card.hr.webp`,
      full: `${CAT}/${tpl.id}-full.hr.webp`,
    }
  })
})

// A small, varied set shown on the homepage "templates" teaser.
// (2026-07-11: swapped out 18-architecture-firm, 01-restaurant and
// 27-boutique-hotel - now in HIDDEN_TEMPLATES - for top picks from the
// hand-sorted DISPLAY_ORDER, keeping the mix varied.)
const FEATURED_IDS = [
  '30-saas-product',
  '21-personal-profile-portfolio',
  'e01-womens-fashion-boutique',
  '13-construction-company',
  '53-ai-productivity-saas',
  '09-dental-clinic',
]
export const featuredTemplates = computed(() =>
  FEATURED_IDS.map((id) => templates.value.find((t) => t.id === id)).filter(Boolean),
)
