// Website templates — the studio's productized offering. Two kinds:
//  • simple    — single-page website templates across every industry
//  • ecommerce — full multi-page online storefronts (the e01–e05 set)
// These are ready-to-adapt starting points generated in-house, not client work.
// Thumbnails live in /images/catalog/ (<slug>-card.webp grid, <slug>-full.webp preview).

const CAT = '/images/catalog'

// Broad filter buckets so the full library stays browsable. "Online stores" is
// the e-commerce bucket (full multi-page storefronts); the rest are single-page
// "simple" website templates grouped by industry.
export const templateGroups = [
  { key: 'all', label: 'All templates' },
  { key: 'ecommerce', label: 'Online stores' },
  { key: 'food-hospitality', label: 'Food & hospitality' },
  { key: 'health-beauty', label: 'Health, beauty & fitness' },
  { key: 'home-pro', label: 'Home, trades & professional' },
  { key: 'creative-media', label: 'Creative, media & events' },
  { key: 'tech-shop-edu', label: 'Tech, shops & education' },
  { key: 'sports-gaming', label: 'Sports, gaming & esports' },
  { key: 'personal-community', label: 'Personal & community' },
]

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
]

const toTemplate = (kind, group) => ([slug, title, industry, blurb]) => ({
  id: slug,
  title,
  category: industry,
  group: group || GROUP_OF[industry] || 'all',
  kind,
  blurb,
  card: `${CAT}/${slug}-card.webp`,
  full: `${CAT}/${slug}-full.webp`,
})

export const templates = [
  ...sites.map(toTemplate('simple')),
  ...stores.map(toTemplate('ecommerce', 'ecommerce')),
]

// A small, varied set shown on the homepage "templates" teaser.
export const featuredTemplates = [
  '30-saas-product',
  '18-architecture-firm',
  'e01-womens-fashion-boutique',
  '01-restaurant',
  '53-ai-productivity-saas',
  '27-boutique-hotel',
]
  .map((id) => templates.find((t) => t.id === id))
  .filter(Boolean)
