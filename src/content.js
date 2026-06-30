// All site copy lives here so content edits never touch components.
// The site is jCode — a web & app studio. `company` drives the public pages;
// `team` drives /team and the per-member /team/:slug profile pages. Josip's
// member object is fully populated (his profile == the original homepage);
// the other four are placeholders to fill in with real people later.

// Years of experience that tick up automatically each year — pass the career
// start year and it renders the current count (e.g. 2014 → "12" in 2026).
const yearsSince = (startYear) => new Date().getFullYear() - startYear
const YEARS = { josip: yearsSince(2014), oleg: yearsSince(2016), danijel: yearsSince(2013) }

/* ------------------------------------------------------------------ company */
export const company = {
  name: 'jCode',
  domain: 'jcode.hr',
  eyebrow: 'Software studio · Barcelona + EU remote',
  tagline: 'Websites, e-commerce, mobile apps & AI automation for growing businesses.',
  lede: 'A senior software studio. We design and build websites, online stores, mobile apps and AI automations for small and medium businesses — from first sketch to launch.',
  // Contact. The form posts to a FormSubmit endpoint tied to this address.
  email: 'info@jcode.hr',
  // WhatsApp / phone are placeholders — drop in real values to light them up.
  whatsapp: '', // digits only, incl. country code, e.g. '34600000000'
  phone: '',
  location: 'Barcelona · EU remote',
  socials: {
    linkedin: 'https://www.linkedin.com/in/jlukacevic/',
    github: 'https://github.com/jldevelop',
    instagram: '', // optional — add a handle URL to show it
  },
  // Legal / registration — shown in the footer only when filled. EU clients
  // expect this from a real company; add your real values.
  legal: {
    entity: '', // e.g. 'jCode d.o.o.' / 'Obrt jCode'
    oib: '', // Croatian OIB / EU VAT
    address: '', // registered address
  },
  formEndpoint: 'https://formsubmit.co/ajax/info@jcode.hr',
}

export const services = [
  {
    key: 'websites',
    title: 'Websites',
    desc: 'Fast, modern marketing and business websites that look the part and turn visitors into customers — engineered for performance and built to convert.',
    points: ['Marketing & brand sites', 'Landing pages', 'Performance & SEO foundations'],
  },
  {
    key: 'ecommerce',
    title: 'E-commerce',
    desc: 'Online stores that are easy to run and easy to buy from — product pages, cart and checkout set up to sell, on Shopify or a custom build.',
    points: ['Shopify & custom stores', 'Product & checkout flows', 'Payments & integrations'],
  },
  {
    key: 'mobile',
    title: 'Mobile apps',
    desc: 'Native iOS and Android apps your business and customers can rely on — point-of-sale, operations and customer-facing products, built to stay reliable day in, day out.',
    points: ['Native iOS & Android', 'API & backend integration', 'App Store & Play Store delivery'],
  },
  {
    key: 'ai-automation',
    title: 'AI automation',
    desc: 'Put AI to work on the busywork — connect your tools and automate repetitive operations and workflows, so your team can focus on the work that matters.',
    points: ['Workflow & process automation', 'AI assistants & integrations', 'Custom internal tools'],
  },
]

export const companyStats = [
  { value: `${YEARS.josip}+`, label: 'years shipping software' },
  { value: '80+', label: 'site designs in our showcase' },
  { value: 'End-to-end', label: 'web, e-commerce, mobile & AI' },
]

// Technologies the team works with — shown as logos on the homepage. Logos live
// in /images/tech (real brand SVGs). Legacy/dated tech is kept but placed last.
const TI = '/images/tech'
const tech = (name, file) => ({ name, icon: `${TI}/${file}.svg` })
export const techStack = [
  {
    group: 'Frontend',
    items: [tech('Vue.js', 'vuejs'), tech('TypeScript', 'typescript'), tech('JavaScript', 'javascript'), tech('Nuxt', 'nuxt'), tech('Tailwind CSS', 'tailwindcss'), tech('Three.js', 'threejs')],
  },
  {
    group: 'Backend',
    items: [tech('Node.js', 'nodejs'), tech('NestJS', 'nestjs'), tech('Laravel', 'laravel'), tech('PHP', 'php'), tech('GraphQL', 'graphql')],
  },
  {
    group: 'Mobile',
    items: [tech('Kotlin', 'kotlin'), tech('Swift', 'swift'), tech('Java', 'java'), tech('Android', 'android'), tech('iOS', 'apple'), tech('Electron', 'electron')],
  },
  {
    group: 'Cloud & DevOps',
    items: [tech('AWS', 'aws'), tech('Google Cloud', 'googlecloud'), tech('Docker', 'docker'), tech('Kubernetes', 'kubernetes'), tech('Cloudflare', 'cloudflare')],
  },
  {
    group: 'Data',
    items: [tech('PostgreSQL', 'postgresql'), tech('MySQL', 'mysql'), tech('MongoDB', 'mongodb'), tech('Redis', 'redis'), tech('Firebase', 'firebase')],
  },
  {
    group: 'Commerce & CMS',
    items: [tech('Shopify', 'shopify'), tech('WordPress', 'wordpress')],
  },
  {
    group: 'Also in our toolkit',
    items: [tech('jQuery', 'jquery'), tech('Bootstrap', 'bootstrap'), tech('AngularJS', 'angularjs')],
  },
]

// Brands & products the team has built / shipped (logo strip — all real).
// Logos are normalized to uniform monochrome silhouettes in /images/clients.
const CL = '/images/clients'
export const clients = [
  { name: 'FaZe Clan', logo: `${CL}/faze-clan.png` },
  { name: 'cloaq.ai', logo: `${CL}/cloaq.png` },
  { name: 'fylm.ai', logo: `${CL}/fylm.png` },
  { name: 'AWW', logo: `${CL}/aww.png` },
  { name: 'Guidekick', logo: `${CL}/guidekick.png` },
  { name: "less'n'more", logo: `${CL}/lessnmore.png` },
  { name: 'Toilet Board Coalition', logo: `${CL}/toilet-board.png` },
]

export const companyProcess = [
  { num: '01', title: 'Discover & architect', desc: 'We learn your business, users and constraints, then design the architecture and scope the work — so there are no surprises later.' },
  { num: '02', title: 'Design', desc: 'Wireframes to polished, accessible UI. You see and shape the product before a line of production code is written.' },
  { num: '03', title: 'Engineer', desc: 'Senior engineers ship in tight iterations — code review, automated tests and CI on every change. You always have something real to click.' },
  { num: '04', title: 'Ship & support', desc: 'We deploy, monitor and harden for production — performance, security and reliability — and stick around after go-live.' },
]

export const contact = {
  title: 'Let’s build something.',
  pitch:
    'Tell us about your project — a website, an online store, a mobile app, an AI automation, or just an idea you want to pressure-test. We read every message and reply within a day.',
}

// Top navigation (the logo links home).
export const siteNav = [
  { label: 'Work', to: '/work' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
]

/* --------------------------------------------------------- team: Josip (full) */
// Josip's profile == the original homepage, reframed for the company context.
const josip = {
  slug: 'josip-lukacevic',
  name: 'Josip Lukačević',
  monogram: 'JL',
  // Listing title (homepage teaser + team page). The founder title intentionally
  // lives only on his profile page, which renders `eyebrow` below.
  role: 'Senior Software Developer',
  eyebrow: 'Founder & Engineering Lead · Full-Stack · Barcelona',
  tagline: 'My job is making teams ship.',
  intro:
    `${YEARS.josip}+ years in web engineering — first as a developer, then as an engineering manager leading a web team, most recently as co-founder & CTO of a startup. Through jCode I take on websites, web apps and mobile apps end-to-end.`,
  photo: '/images/josip-lukacevic.webp',
  email: 'info@jcode.hr',
  linkedin: 'https://www.linkedin.com/in/jlukacevic/',
  github: 'https://github.com/jldevelop',
  years: `${YEARS.josip}+`,
  bio: 'jCode’s founder. Josip has run web engineering at scale — leading the team behind a global esports brand’s platform and merch store, then co-founding an AI SaaS as its CTO. He stays hands-on across the whole stack and owns delivery end to end.',
  stack: [tech('Vue.js', 'vuejs'), tech('Node.js', 'nodejs'), tech('Laravel', 'laravel'), tech('JavaScript', 'javascript'), tech('AWS', 'aws'), tech('Shopify', 'shopify'), tech('MongoDB', 'mongodb')],

  stats: [
    { value: `${YEARS.josip}+`, label: 'years in web engineering' },
    { value: '5.5', label: 'years leading a web engineering team' },
    { value: 'Millions', label: 'of users reached across the products he’s shipped' },
  ],

  about: {
    title: 'An engineering manager who never stopped being an engineer',
    paragraphs: [
      'Josip is a hands-on engineering leader with more than a decade across the full web stack. He has built his career on staying close to the work — architecture, code reviews, the hard estimates — while owning the bigger picture of roadmap, delivery and the people doing the building. It’s a rare combination that lets him lead a team without losing the engineer’s instinct for how software actually ships.',
      'He has grown from developer to engineering manager to co-founder and CTO, a path that built both a founder’s sense of ownership and a pragmatic, delivery-first way of working. He communicates as easily with executives as with junior developers, backs decisions with evidence rather than ego, and is quick to change his mind the moment someone brings a better idea.',
    ],
    callout:
      `His focus is engineering leadership and shipping — turning a brief into a product that actually works, then keeping it fast and reliable. Across ${YEARS.josip}+ years he’s done it as a developer, an engineering manager, and a founder.`,
  },

  strengths: [
    { title: 'Team leadership', desc: 'Hiring, sprint planning, code reviews, QA management and on-time delivery — owned end-to-end.' },
    { title: 'Stakeholder management', desc: 'Single technical point of contact between leadership, creative teams and external partners.' },
    { title: 'Hands-on engineering', desc: 'Vue.js, Node.js, PHP/Laravel, Shopify, AWS/Cloudflare — I can unblock a developer and challenge an estimate.' },
    { title: 'Remote delivery', desc: '7+ years leading and shipping with distributed teams across US and EU time zones.' },
    { title: 'Founder experience', desc: 'Built and launched an AI SaaS product end-to-end as CTO — roadmap, architecture, security, delivery.' },
    { title: 'AI in production', desc: 'Integrating AI models into real products, and using AI tooling daily in my own workflow.' },
  ],

  experience: [
    { role: 'Co-Founder & CTO', org: 'cloaq.ai', place: 'Remote', period: 'Jul 2025 – present', blurb: 'AI-powered photo retouching SaaS for fashion & e-commerce studios. I own the technical side of the company end-to-end.', stack: 'Vue.js · Laravel · Node.js · AWS · Cloudflare · Vercel', current: true },
    { role: 'Full-Stack Engineer / Project Manager', org: 'Self-employed', place: 'Zagreb', period: 'Jul 2023 – Jun 2025', blurb: 'Client projects, plus project management and dev-team lead on an early-stage live-streaming startup (paused to pursue cloaq.ai).', stack: 'Vue.js · Laravel · PHP · Node.js · AWS (S3, EC2, IVS)' },
    { role: 'Engineering Manager', org: 'FaZe Clan', place: 'Los Angeles · remote', period: 'Jan 2019 – May 2024', blurb: 'Ran web engineering: 4-person dev & QA team, full platform architecture, and the e-commerce operation behind FaZe’s merch business.', stack: 'Vue.js · Node.js · Shopify · MongoDB · AWS' },
    { role: 'Freelance Full-Stack Developer', org: 'Upwork', place: 'Remote', period: 'Apr 2017 – May 2024', blurb: '22 contracts across e-commerce, SaaS, 3D and browser extensions — 100% five-star reviews.', stack: 'JavaScript · PHP · Laravel · Node.js · Three.js' },
    { role: 'Full-Stack Engineer', org: 'Fylm (now fylm.ai)', place: 'Tel Aviv · remote', period: 'Sep 2017 – Dec 2019', blurb: 'Sole developer on a GPU-accelerated, browser-based colour-grading app built on 3D LUTs.', stack: 'Three.js / WebGL · jQuery · PHP · MySQL' },
    { role: 'Frontend Developer', org: 'Guidekick', place: 'San Francisco · remote', period: 'Feb 2018 – Jan 2019', blurb: 'Interactive 3D map UIs with the Ambiarc SDK — airport tablets, museum kiosks, Golden Gate Park.', stack: 'JavaScript · Ambiarc SDK · AWS S3' },
    { role: 'Full-Stack Developer', org: 'Tangital', place: 'Los Angeles · remote', period: 'Mar 2017 – Jun 2018', blurb: 'Chrome extension and companion site enhancing Gmail, built on top of the Subtrack platform.', stack: 'Laravel · MySQL · AWS EC2' },
    { role: 'Full-Stack Developer', org: 'Goodcode', place: 'Zagreb · remote', period: 'Jul 2016 – Feb 2017', blurb: 'AWW (A Web Whiteboard) — a real-time collaborative online whiteboard later acquired by Miro (2021). Built the collaborative canvas at the core of the product, plus authentication & authorization on the backend.', stack: 'Node.js · MongoDB · Jade' },
    { role: 'Web Application Developer', org: 'N-LAB Software', place: 'Zagreb', period: 'Jan 2015 – Jun 2016', blurb: 'N-aos — employee data and working-hours management for business clients.', stack: 'PHP · jQuery · MySQL' },
  ],

  earlierRoles:
    'Clubble — nightlife startup (2014–15) · Zelena Knjižara — web store (2013–15) · Pako N.G. — web shop (2013–14) · S&T Croatia, B.net, Asseco SEE — IT support roles while studying (2012–13)',

  skillGroups: [
    { label: 'Leadership & delivery', featured: true, items: ['Engineering management', 'Hiring & performance', 'Sprint planning', 'Code reviews', 'QA management', 'Agile delivery', 'Stakeholder communication', 'Technical project management'] },
    { label: 'Frontend', items: ['Vue.js', 'JavaScript (ES6+)', 'Three.js / WebGL', 'HTML5', 'CSS3', 'jQuery', 'Bootstrap'] },
    { label: 'Backend', items: ['Node.js', 'PHP', 'Laravel', 'CodeIgniter', 'REST APIs'] },
    { label: 'E-commerce & CMS', items: ['Shopify (Liquid · API · Plus)', 'WordPress'] },
    { label: 'Cloud & DevOps', items: ['AWS (EC2 · S3 · CloudFront · Route53 · IVS · ELB)', 'Cloudflare', 'Vercel', 'Git'] },
    { label: 'Data & integrations', items: ['MySQL', 'MongoDB', 'Google APIs', 'OAuth 2.0', 'Stripe', 'Chrome extensions'] },
    { label: 'AI', items: ['AI model integration (image processing & generation)', 'AI-assisted development workflow'] },
  ],

  education: [
    { school: 'Zagreb University of Applied Sciences', credential: 'Bachelor of Engineering, Information Technology', period: '2010 – 2014' },
    { school: 'University Algebra Bernays, Zagreb', credential: 'Artificial Intelligence — Benefits and Risks of AI · 180 hrs / 6 ECTS', period: '2026 · in progress' },
    { school: 'Netacademy ICT Professionals, Zagreb', credential: 'CISCO CCNA certification', period: '2014 – 2015' },
    { school: 'Netacademy ICT Professionals, Zagreb', credential: 'Java programming course', period: '2015' },
  ],

  languages: [
    { name: 'Croatian', level: 'native' },
    { name: 'English', level: 'fluent' },
    { name: 'German', level: 'basic' },
  ],
}

/* ----------------------------------------------------- team: placeholders */
// Minimal shape — same structure, less data. Fill in real people later.
function placeholderMember({ slug, role, monogram, focus }) {
  return {
    slug,
    name: 'Your name here',
    monogram,
    role,
    placeholder: true,
    eyebrow: `${role} · jCode`,
    tagline: 'A short personal tagline goes here.',
    intro:
      `A two-to-three sentence bio for this teammate — their focus (${focus}), experience, and what they bring to client projects. Replace this placeholder with real copy.`,
    photo: null,
    about: {
      title: 'About this teammate',
      paragraphs: [
        'A short paragraph introducing this person — background, the kind of work they love, and how they approach projects.',
        'A second paragraph with a bit more detail: notable projects, strengths, or a personal note. Keep it human.',
      ],
      callout: null,
    },
    strengths: [
      { title: 'Strength one', desc: 'Describe a core strength this teammate brings to the studio.' },
      { title: 'Strength two', desc: 'Describe another area where they shine.' },
      { title: 'Strength three', desc: 'One more — a tool, a domain, or a way of working.' },
    ],
    skillGroups: [
      { label: 'Core skills', featured: true, items: ['Skill', 'Skill', 'Skill', 'Skill'] },
      { label: 'Also works with', items: ['Tool', 'Tool', 'Tool'] },
    ],
    languages: [{ name: 'Language', level: 'native' }],
  }
}

/* ------------------------------------------------------- team: Oleg (full) */
const oleg = {
  slug: 'oleg-kalysh',
  name: 'Oleg Kalysh',
  monogram: 'OK',
  role: 'Senior Software Developer',
  eyebrow: 'Senior Software Developer · Full-Stack · Vue & Node',
  tagline: 'I build fast, reliable software that scales.',
  intro:
    `${YEARS.oleg}+ years building scalable web platforms, desktop applications and real-time systems — across security & identity, SaaS, marketplaces and real-time communication. Strong in JavaScript/TypeScript, Vue.js and Node.js.`,
  photo: '/images/oleg-kalysh.webp',
  github: 'https://github.com/Miami3',
  years: `${YEARS.oleg}+`,
  bio: 'Oleg takes on the hard parts — real-time systems, cross-platform desktop apps and high-load back-ends. He’s shipped biometric security on deployed hardware and WebSocket-heavy interfaces, and he sweats performance and reliability under load.',
  stack: [tech('Vue.js', 'vuejs'), tech('TypeScript', 'typescript'), tech('Node.js', 'nodejs'), tech('NestJS', 'nestjs'), tech('Electron', 'electron'), tech('PostgreSQL', 'postgresql'), tech('AWS', 'aws')],

  stats: [
    { value: `${YEARS.oleg}+`, label: 'years of commercial experience' },
    { value: '50+', label: 'devices running his desktop client' },
    { value: '41%', label: 'faster page loads after a Vue.js rebuild' },
    { value: '10k+', label: 'API requests/day served, stable' },
  ],

  about: {
    title: 'A full-stack engineer for real-time and high-load systems',
    paragraphs: [
      'Oleg is a full-cycle engineer drawn to the harder parts of software — real-time systems, cross-platform desktop applications and back-ends that have to stay fast and reliable under heavy load. He moves comfortably across the whole stack, from architecture and interface through to APIs, performance tuning and cloud infrastructure.',
      `Across ${YEARS.oleg}+ years in both product companies and engineering teams, he has delivered everything from scalable web platforms to security and biometric systems. He is methodical and outcome-driven, with a habit of measuring his work — and a genuine focus on reliability, speed and the experience of the people who depend on it every day.`,
    ],
    callout:
      'Deep experience in real-time communication (WebSockets), Electron desktop apps, cloud infrastructure and UI performance optimization — delivering measurable gains in reliability, speed and user experience.',
  },

  strengths: [
    { title: 'Full-cycle development', desc: 'Architecture, frontend and backend, performance and cloud deployment — owned end to end.' },
    { title: 'Real-time systems', desc: 'WebSockets, live messaging and high-frequency, high-load communication.' },
    { title: 'Desktop & hardware', desc: 'Cross-platform Electron clients integrating sensor SDKs and biometric devices.' },
    { title: 'Performance optimization', desc: 'Cut page-load time 41%+ with a WordPress→Vue.js rebuild and UI tuning.' },
    { title: 'Backend at scale', desc: 'NestJS services and REST/GraphQL APIs over Postgres and Mongo, serving thousands of requests daily.' },
    { title: 'Security & identity', desc: 'Biometric verification flows and secure data transfer between desktop clients and backend services.' },
  ],

  experience: [
    {
      role: 'Senior Software Developer',
      org: 'KEYO',
      place: 'Remote',
      period: 'Jun 2018 – present',
      blurb:
        'Cross-platform ElectronJS desktop client for palm-scanning hardware on 50+ deployed devices; a NestJS user-management service handling 10,000+ requests/day; admin dashboards; and a WordPress→Vue.js marketing-site rebuild that cut load time 41.2%.',
      stack: 'TypeScript · Node.js · NestJS · ElectronJS · Vue.js · PostgreSQL · WebSockets · Docker · AWS',
      current: true,
    },
    {
      role: 'Frontend Developer',
      org: 'Aparlay Ltd',
      place: 'Remote',
      period: 'Jan 2017 – Jun 2018',
      blurb:
        'Real-time chat interface in AngularJS with live messaging, delivery statuses and WebSocket notifications; responsive layouts that lifted mobile usage share 24.8%.',
      stack: 'AngularJS · HTML · CSS · Bootstrap · WebSockets',
    },
    {
      role: 'Frontend Developer',
      org: 'Transformify Ltd',
      place: 'Remote',
      period: 'Jan 2016 – Jan 2017',
      blurb:
        'Core user-facing pages — listings, profiles and application flows — that cut application drop-off 16.3%; clean, accessible, responsive HTML/CSS.',
      stack: 'HTML · CSS · JavaScript',
    },
  ],

  skillGroups: [
    { label: 'Core', featured: true, items: ['JavaScript', 'TypeScript', 'Vue.js', 'Node.js', 'Real-time / WebSockets', 'Electron', 'Performance optimization'] },
    { label: 'Frontend', items: ['Vue.js', 'Vuex / Pinia', 'Nuxt.js', 'Vuetify', 'Vue Router', 'AngularJS', 'jQuery', 'Tailwind CSS', 'Bootstrap', 'GSAP', 'Chart.js'] },
    { label: 'Backend', items: ['Node.js', 'Express', 'Nest.js', 'Strapi', 'REST', 'GraphQL', 'OpenAPI', 'Prisma ORM', 'Hasura'] },
    { label: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'DynamoDB', 'Redis'] },
    { label: 'Cloud & DevOps', items: ['AWS', 'GCP', 'Firebase', 'Docker', 'Kubernetes', 'NGINX', 'API Gateway', 'Git · GitHub · GitLab'] },
    { label: 'Tooling', items: ['Vite', 'Webpack', 'Rollup', 'Babel', 'ESLint', 'Prettier', 'Figma', 'Jira'] },
  ],

  education: [
    { school: 'Kyiv National University of Trade and Economics', credential: 'Master’s degree, Economics', period: '2008 – 2013' },
  ],

  languages: [
    { name: 'Ukrainian', level: 'native' },
    { name: 'English', level: 'upper-intermediate (B2)' },
  ],
}

/* ---------------------------------------------------- team: Danijel (full) */
// Translated from his Croatian CV (Životopis).
const danijel = {
  slug: 'danijel-popic',
  name: 'Danijel Popić',
  monogram: 'DP',
  role: 'Senior Mobile Developer',
  eyebrow: 'Senior Mobile Developer · Android · iOS · Node.js',
  tagline: 'Mobile apps businesses run on, built to last.',
  intro:
    `${YEARS.danijel}+ years building Android and iOS applications — retail point-of-sale systems, a taxi-services platform and business apps — with team-lead, Node.js back-end and AWS DevOps experience.`,
  photo: '/images/danijel-popic.webp',
  linkedin: 'https://www.linkedin.com/in/dpopic',
  years: `${YEARS.danijel}+`,
  bio: 'Danijel builds native mobile that businesses rely on daily — point-of-sale systems running across Croatia and Slovenia and a complex taxi platform. He’s led Android teams, owned back-end work at a global brand, and taught the craft for five years.',
  stack: [tech('Kotlin', 'kotlin'), tech('Swift', 'swift'), tech('Java', 'java'), tech('Android', 'android'), tech('iOS', 'apple'), tech('Node.js', 'nodejs'), tech('AWS', 'aws')],

  stats: [
    { value: `${YEARS.danijel}+`, label: 'years in mobile development' },
    { value: '3', label: 'engineering teams led' },
    { value: '5.0', label: 'GPA — graduated top of his class' },
    { value: '5 yrs', label: 'lecturing Android development' },
  ],

  about: {
    title: 'A mobile engineer who builds and leads',
    paragraphs: [
      `Danijel is a mobile engineer and team lead who builds the software businesses run on every day. Across ${YEARS.danijel}+ years he has shipped native Android and iOS apps from architecture all the way to the store — point-of-sale and business systems used across retail, hospitality and industry, and a complex taxi-services platform.`,
      'His range extends well beyond the app itself, with hands-on experience in Node.js back-ends and AWS infrastructure, and he has led engineering teams and projects at several companies. Five years lecturing Android development shaped how he works — structured, dependable and generous with knowledge — and it shows in both the code he ships and the teams he runs.',
    ],
    callout:
      'Strong across native mobile (Android & iOS), Node.js back-ends and AWS infrastructure — and experienced leading teams and shipping production apps that businesses depend on daily.',
  },

  strengths: [
    { title: 'Native mobile', desc: 'Android and iOS apps in Kotlin, Java and Swift — architecture through to the App Store and Play Store.' },
    { title: 'Team leadership', desc: 'Led Android teams and projects across several companies; mentors developers and ships on schedule.' },
    { title: 'Back-end & DevOps', desc: 'Node.js back-end services and AWS infrastructure — full delivery beyond the app itself.' },
    { title: 'Business systems', desc: 'POS / register systems and ERP-style apps used in retail, hospitality, procurement and industry.' },
    { title: 'Production reliability', desc: 'Apps relied on daily by businesses across Croatia and Slovenia.' },
    { title: 'Teaching & mentoring', desc: 'Five years lecturing Android development — structured and generous with knowledge.' },
  ],

  experience: [
    {
      role: 'Mobile Developer',
      org: 'ETRANET Grupa',
      place: 'Zagreb · Croatia',
      period: 'Apr 2024 – present',
      blurb: 'Development and maintenance of Android and iOS applications.',
      stack: 'Kotlin · Swift · Android · iOS',
      current: true,
    },
    {
      role: 'Back-end Developer',
      org: 'FaZe Clan',
      place: 'Los Angeles · remote',
      period: 'Oct 2021 – Apr 2024',
      blurb: 'Node.js back-end developer who also owned the DevOps role, maintaining AWS infrastructure, and took on team management.',
      stack: 'Node.js · AWS · DevOps',
    },
    {
      role: 'Android Team Lead',
      org: 'Circleblue',
      place: 'Zagreb · Croatia',
      period: 'Jul 2020 – Oct 2021',
      blurb: 'Led the existing team building a new Android POS register (Kotlin) and maintaining the legacy one (Java).',
      stack: 'Kotlin · Java · Android',
    },
    {
      role: 'Android Developer',
      org: 'Intenda Net',
      place: 'Zagreb · Croatia',
      period: 'Nov 2017 – Jul 2019',
      blurb: 'Development and maintenance of Android apps within a complex taxi-services system.',
      stack: 'Java · Android',
    },
    {
      role: 'Android Team Lead',
      org: 'Sekom',
      place: 'Zagreb · Croatia',
      period: 'Jan 2013 – Nov 2017',
      blurb: 'Designed and built business apps and systems — an employee-task ERP and an Android POS (Croatia & Slovenia) — leading projects and small teams.',
      stack: 'Java · Android',
    },
    {
      role: 'Lecturer — Android development',
      org: 'Algebra',
      place: 'Zagreb · Croatia',
      period: 'Oct 2016 – Aug 2021',
      blurb: 'Taught the Android application development course.',
      stack: 'Android · teaching',
    },
  ],

  skillGroups: [
    { label: 'Core', featured: true, items: ['Android (Kotlin · Java)', 'iOS (Swift)', 'Mobile architecture', 'Node.js', 'AWS / DevOps', 'Team leadership'] },
    { label: 'Mobile', items: ['Kotlin', 'Java', 'Swift', 'Android SDK', 'Jetpack', 'REST APIs', 'SQLite'] },
    { label: 'Backend & cloud', items: ['Node.js', 'AWS', 'REST APIs', 'CI/CD', 'Linux'] },
    { label: 'Also', items: ['Git', 'Agile / team lead', 'POS & ERP systems', 'Networking (CCNA · CCNP)'] },
  ],

  education: [
    { school: 'Zagreb University of Applied Sciences', credential: 'Professional Specialist in IT Engineering (Master’s level) — graduated top of class, 5.0 GPA', period: '2012 – 2015' },
    { school: 'Zagreb University of Applied Sciences', credential: 'Bachelor of IT Engineering', period: '2009 – 2012' },
    { school: 'Netakademija', credential: 'CCNA · CCNP · MCITP certifications', period: '2011 – 2013' },
  ],

  languages: [
    { name: 'Croatian', level: 'native' },
    { name: 'English', level: 'fluent' },
  ],
}

export const team = [
  josip,
  oleg,
  danijel,
  placeholderMember({ slug: 'backend-engineer', role: 'Backend Engineer', monogram: 'B', focus: 'APIs, databases & infrastructure' }),
  placeholderMember({ slug: 'product-designer', role: 'Product Designer', monogram: 'D', focus: 'UX & visual design' }),
]

export const teamById = Object.fromEntries(team.map((m) => [m.slug, m]))
