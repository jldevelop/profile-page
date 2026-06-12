// All site copy lives here so content edits never touch components.

export const profile = {
  name: 'Josip Lukačević',
  monogram: 'JL',
  role: 'Engineering Manager',
  eyebrow: 'Engineering Manager · Full-Stack Developer · Barcelona',
  tagline: 'My job is making teams ship.',
  intro:
    '12+ years in web engineering — first as a developer, then leading teams at FaZe Clan, most recently as Co-Founder & CTO of cloaq.ai. Based in Barcelona, open to on-site, hybrid or remote roles across the EU.',
  email: 'josip.lukacevic@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jlukacevic/',
  upwork: 'https://www.upwork.com/freelancers/josiplukacevic',
  cvPath: '/Josip-Lukacevic-CV.pdf',
  cvFileName: 'Josip-Lukacevic-CV.pdf',
  // Color headshot (PNG original in ../profile-page-assets-originals/), rendered
  // grayscale via CSS and colorized on hover. Set to null for the monogram tile.
  photo: '/images/profile_photo_color2.webp',
}

export const stats = [
  { value: '12+', label: 'years in web engineering' },
  { value: '5.5', label: 'years running engineering at FaZe Clan' },
  { value: '$1.6M', label: 'single-day merch drop — zero downtime' },
  { value: '22 × 5★', label: 'freelance contracts, every review five stars' },
]

export const about = {
  title: 'An engineering manager who never stopped being an engineer',
  paragraphs: [
    'I’ve shipped production code in JavaScript/Vue, Node.js, PHP/Laravel and on AWS for over a decade — so I can review a PR, unblock a developer, challenge an estimate, and talk credibly to both the CEO and the junior dev. I manage by understanding the work, not by managing the ticket board.',
    'At FaZe Clan I joined as a developer; within two years I was running the dev and QA teams — hiring, planning, code reviews and delivery for web properties serving a fanbase of millions. Since then I’ve been on the founder side as Co-Founder & CTO of cloaq.ai, where I learned what shipping looks like when there’s no one above you to escalate to.',
    'One thing I care about: arguments, not egos. I don’t need to be right — I need the best-supported idea to win. I’ll defend a decision with data and reasoning, and change my mind just as quickly when someone brings better ones.',
  ],
  lookingFor:
    'My sweet spot is engineering leadership — Engineering Manager or Technical Project Manager work — based in Barcelona, on-site, hybrid or remote across the EU. I gravitate toward products that improve people’s lives: health, wellbeing, education, quality of life. Every product we ship nudges the world somewhere; I like shipping the ones that nudge it in the right direction.',
}

export const strengths = [
  {
    title: 'Team leadership',
    desc: 'Hiring, sprint planning, code reviews, QA management and on-time delivery — owned end-to-end.',
  },
  {
    title: 'Stakeholder management',
    desc: 'Single technical point of contact between leadership, creative teams and external partners.',
  },
  {
    title: 'Hands-on engineering',
    desc: 'Vue.js, Node.js, PHP/Laravel, Shopify, AWS/Cloudflare — I can unblock a developer and challenge an estimate.',
  },
  {
    title: 'Remote delivery',
    desc: '7+ years leading and shipping with distributed teams across US and EU time zones.',
  },
  {
    title: 'Founder experience',
    desc: 'Built and launched an AI SaaS product end-to-end as CTO — roadmap, architecture, security, delivery.',
  },
  {
    title: 'AI in production',
    desc: 'Integrating AI models into real products, and using AI tooling daily in my own workflow.',
  },
]

export const caseStudies = [
  {
    num: '01',
    org: 'FaZe Clan',
    role: 'Engineering Manager',
    period: 'Jan 2019 – May 2024',
    headline: 'Ran web engineering for one of the world’s biggest esports brands.',
    bullets: [
      'Joined as a developer; within two years I was managing the 4-person dev & QA team end-to-end — hiring, sprint planning, code reviews, performance and delivery.',
      'Architected and delivered the fazeclan.com platform rebuild from scratch, design system to deployment — e-commerce, interactive fan features, partner integrations.',
      'Owned the e-commerce platform behind FaZe’s merch business: the biggest single-day drop processed $1.6M in sales without downtime.',
      'Acted as the single technical point of contact between leadership, marketing/creative teams and external partners — shipping major launches year after year.',
    ],
    tags: ['Vue.js', 'Node.js', 'Shopify', 'MongoDB', 'AWS'],
  },
  {
    num: '02',
    org: 'cloaq.ai',
    role: 'Co-Founder & CTO',
    period: 'Jul 2025 – present',
    headline: 'Building an AI photo-retouching SaaS from zero — as CTO and sole engineer.',
    bullets: [
      'cloaq.ai automates studio photo retouching for fashion and e-commerce studios — batch-processing images in seconds instead of the 10+ minutes a designer spends per photo.',
      'Built the batch pipeline that cut per-image processing from ~10 minutes to ~10 seconds — 100+ images in under 15 minutes.',
      'Architected in-browser, on-device GPU processing, so client images never leave their machine — critical for brands with unreleased imagery.',
      'Set the product and technical roadmap with two co-founders; own architecture, infrastructure, security and delivery. In private beta, launching 2026.',
    ],
    tags: ['Vue.js', 'Laravel', 'Node.js', 'AWS', 'Cloudflare', 'AI models'],
  },
  {
    num: '03',
    org: 'Upwork & direct clients',
    role: 'Senior Freelance Developer',
    period: '2017 – 2024',
    headline: '22 contracts, every single review five stars.',
    bullets: [
      'fylm.ai — sole developer on a browser-based colour-grading app: 3D LUTs, GPU-accelerated, built on Three.js/WebGL.',
      'Guidekick — interactive 3D wayfinding maps, live on Indianapolis Airport tablets, museum kiosks and Golden Gate Park.',
      'E-commerce, SaaS apps, Chrome extensions and charity platforms for clients across the US, EU and Israel.',
      'Average engagement: years, not weeks — clients consistently extended for reliability and delivery quality.',
    ],
    tags: ['JavaScript', 'Three.js / WebGL', 'PHP · Laravel', 'Node.js', 'WordPress', 'AWS'],
  },
]

// Portfolio media: two WebP tiers generated from the raw originals (kept outside the
// repo in ../profile-page-assets-originals/). portfolio-web/ = grid tier (max 1600px, q85);
// portfolio-full/ = click-through tier (original resolution, q90) — same filenames,
// resolved in PortfolioShowcase via fullSrc(). Videos stay in portfolio-web/.
// `desc` fields are intentionally empty for now; fill them in later and they'll render.
const pw = '/images/portfolio-web'

export const portfolio = {
  title: 'Selected work, in pixels',
  note: 'Eight shipped products. Click any image for the full-size view.',
  projects: [
    {
      slug: 'faze-clan',
      name: 'FaZe Clan',
      logo: `${pw}/faze-clan/logo.png`,
      desc: '',
      media: [
        { type: 'video', src: `${pw}/faze-clan/faze_new_website.mp4` },
        { src: `${pw}/faze-clan/image_homepage_desktop.webp`, tall: true },
        { src: `${pw}/faze-clan/faze-roster-desktop.webp` },
        { src: `${pw}/faze-clan/faze_teams_desktop.webp`, tall: true },
        { src: `${pw}/faze-clan/faze_arcade_1.webp`, tall: true },
        { src: `${pw}/faze-clan/faze_arcade_2.webp`, tall: true },
        { src: `${pw}/faze-clan/faze_about_desktop.webp`, tall: true },
        { src: `${pw}/faze-clan/faze1-confirmation-toolkit.webp` },
        { src: `${pw}/faze-clan/faze_homepage_mobile.webp`, tall: true },
        { src: `${pw}/faze-clan/faze-city-proam.webp`, tall: true },
      ],
    },
    {
      slug: 'cloaq',
      name: 'cloaq.ai',
      logo: `${pw}/cloaq/logo.png`,
      desc: '',
      media: [
        { src: `${pw}/cloaq/retouch_tool.webp` },
        { src: `${pw}/cloaq/cutout_tool.webp` },
        { src: `${pw}/cloaq/exposure_tool.webp` },
        { src: `${pw}/cloaq/crop-tool.webp` },
      ],
    },
    {
      slug: 'fylm',
      name: 'fylm.ai',
      logo: `${pw}/fylm/logo.png`,
      desc: '',
      media: [
        { src: `${pw}/fylm/fylm1.webp` },
        { src: `${pw}/fylm/fylm2.webp` },
        { src: `${pw}/fylm/fylm3.webp` },
        { src: `${pw}/fylm/fylm4.webp` },
        { src: `${pw}/fylm/fylm5.webp` },
        { src: `${pw}/fylm/fylm6.webp` },
      ],
    },
    {
      slug: 'aww',
      name: 'AWW — A Web Whiteboard',
      logo: `${pw}/aww/logo.png`,
      desc: '',
      media: [
        { src: `${pw}/aww/aww-canvas.webp` },
        { src: `${pw}/aww/awwapp-collaboration.webp` },
        { src: `${pw}/aww/awwapp-toolbar.webp` },
        { src: `${pw}/aww/awwapp-website.webp` },
      ],
    },
    {
      slug: 'guidekick',
      name: 'Guidekick',
      logo: `${pw}/guidekick/logo.jpeg`,
      desc: '',
      media: [
        { src: `${pw}/guidekick/visitors_1.webp` },
        { src: `${pw}/guidekick/visitors_2.webp` },
        { src: `${pw}/guidekick/visitors_3.webp` },
        { src: `${pw}/guidekick/visitors_4.webp` },
        { src: `${pw}/guidekick/map-manager-1.webp` },
        { src: `${pw}/guidekick/map-manager-2.webp` },
        { src: `${pw}/guidekick/map-manager-3.webp` },
      ],
    },
    {
      slug: 'lessnmore',
      name: "less'n'more",
      logo: `${pw}/lessnmore/logo.webp`,
      desc: '',
      media: [
        { type: 'video', src: `${pw}/lessnmore/intro_video.mp4` },
        { src: `${pw}/lessnmore/less-n-more1.webp` },
        { src: `${pw}/lessnmore/less-n-more2.webp` },
        { src: `${pw}/lessnmore/less-n-more3.webp` },
      ],
    },
    {
      slug: 'barancek',
      name: 'Baranček House Simulator',
      logo: `${pw}/barancek/logo.png`,
      desc: '',
      media: [
        { src: `${pw}/barancek/simulation-example.webp` },
        { src: `${pw}/barancek/simulation-example2.webp` },
        { src: `${pw}/barancek/simulation-example4.webp` },
        { src: `${pw}/barancek/simulation-example5.webp` },
        { src: `${pw}/barancek/simulation-example6.webp` },
      ],
    },
    {
      slug: 'toilet-board',
      name: 'Toilet Board Coalition',
      logo: `${pw}/toilet-board/logo.jpeg`,
      desc: '',
      media: [
        { src: `${pw}/toilet-board/toiletboard1.webp` },
        { src: `${pw}/toilet-board/toiletboard2.webp` },
        { src: `${pw}/toilet-board/toiletboard3.webp` },
        { src: `${pw}/toilet-board/toiletboard4.webp` },
      ],
    },
  ],
}

export const experience = [
  {
    role: 'Co-Founder & CTO',
    org: 'cloaq.ai',
    place: 'Remote',
    period: 'Jul 2025 – present',
    blurb:
      'AI-powered photo retouching SaaS for fashion & e-commerce studios. I own the technical side of the company end-to-end.',
    stack: 'Vue.js · Laravel · Node.js · AWS · Cloudflare · Vercel',
    current: true,
  },
  {
    role: 'Full-Stack Engineer / Project Manager',
    org: 'Self-employed',
    place: 'Zagreb',
    period: 'Jul 2023 – Jun 2025',
    blurb:
      'Client projects, plus project management and dev-team lead on an early-stage live-streaming startup (paused to pursue cloaq.ai).',
    stack: 'Vue.js · Laravel · PHP · Node.js · AWS (S3, EC2, IVS)',
  },
  {
    role: 'Engineering Manager',
    org: 'FaZe Clan',
    place: 'Los Angeles · remote',
    period: 'Jan 2019 – May 2024',
    blurb:
      'Ran web engineering: 4-person dev & QA team, full platform architecture, and the e-commerce operation behind FaZe’s merch business.',
    stack: 'Vue.js · Node.js · Shopify · MongoDB · AWS',
  },
  {
    role: 'Freelance Full-Stack Developer',
    org: 'Upwork',
    place: 'Remote',
    period: 'Apr 2017 – May 2024',
    blurb: '22 contracts across e-commerce, SaaS, 3D and browser extensions — 100% five-star reviews.',
    stack: 'JavaScript · PHP · Laravel · Node.js · Three.js',
  },
  {
    role: 'Full-Stack Engineer',
    org: 'Fylm (now fylm.ai)',
    place: 'Tel Aviv · remote',
    period: 'Sep 2017 – Dec 2019',
    blurb: 'Sole developer on a GPU-accelerated, browser-based colour-grading app built on 3D LUTs.',
    stack: 'Three.js / WebGL · jQuery · PHP · MySQL',
  },
  {
    role: 'Frontend Developer',
    org: 'Guidekick',
    place: 'San Francisco · remote',
    period: 'Feb 2018 – Jan 2019',
    blurb: 'Interactive 3D map UIs with the Ambiarc SDK — airport tablets, museum kiosks, Golden Gate Park.',
    stack: 'JavaScript · Ambiarc SDK · AWS S3',
  },
  {
    role: 'Full-Stack Developer',
    org: 'Tangital',
    place: 'Los Angeles · remote',
    period: 'Mar 2017 – Jun 2018',
    blurb: 'Chrome extension and companion site enhancing Gmail, built on top of the Subtrack platform.',
    stack: 'Laravel · MySQL · AWS EC2',
  },
  {
    role: 'Full-Stack Developer',
    org: 'Goodcode',
    place: 'Zagreb · remote',
    period: 'Jul 2016 – Feb 2017',
    blurb:
      'AWW (A Web Whiteboard) — a real-time collaborative online whiteboard later acquired by Miro (2021). Built the collaborative canvas at the core of the product, plus authentication & authorization on the backend.',
    stack: 'Node.js · MongoDB · Jade',
  },
  {
    role: 'Web Application Developer',
    org: 'N-LAB Software',
    place: 'Zagreb',
    period: 'Jan 2015 – Jun 2016',
    blurb: 'N-aos — employee data and working-hours management for business clients.',
    stack: 'PHP · jQuery · MySQL',
  },
]

export const earlierRoles =
  'Clubble — nightlife startup (2014–15) · Zelena Knjižara — web store (2013–15) · Pako N.G. — web shop (2013–14) · S&T Croatia, B.net, Asseco SEE — IT support roles while studying (2012–13)'

export const skillGroups = [
  {
    label: 'Leadership & delivery',
    featured: true,
    items: [
      'Engineering management',
      'Hiring & performance',
      'Sprint planning',
      'Code reviews',
      'QA management',
      'Agile delivery',
      'Stakeholder communication',
      'Technical project management',
    ],
  },
  {
    label: 'Frontend',
    items: ['Vue.js', 'JavaScript (ES6+)', 'Three.js / WebGL', 'HTML5', 'CSS3', 'jQuery', 'Bootstrap'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'PHP', 'Laravel', 'CodeIgniter', 'REST APIs'],
  },
  {
    label: 'E-commerce & CMS',
    items: ['Shopify (Liquid · API · Plus)', 'WordPress'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS (EC2 · S3 · CloudFront · Route53 · IVS · ELB)', 'Cloudflare', 'Vercel', 'Git'],
  },
  {
    label: 'Data & integrations',
    items: ['MySQL', 'MongoDB', 'Google APIs', 'OAuth 2.0', 'Stripe', 'Chrome extensions'],
  },
  {
    label: 'AI',
    items: ['AI model integration (image processing & generation)', 'AI-assisted development workflow'],
  },
]

export const education = [
  {
    school: 'Zagreb University of Applied Sciences',
    credential: 'Bachelor of Engineering, Information Technology',
    period: '2010 – 2014',
  },
  {
    school: 'University Algebra Bernays, Zagreb',
    credential: 'Artificial Intelligence — Benefits and Risks of AI · 180 hrs / 6 ECTS',
    period: '2026 · in progress',
  },
  {
    school: 'Netacademy ICT Professionals, Zagreb',
    credential: 'CISCO CCNA certification',
    period: '2014 – 2015',
  },
  {
    school: 'Netacademy ICT Professionals, Zagreb',
    credential: 'Java programming course',
    period: '2015',
  },
]

export const languages = [
  { name: 'Croatian', level: 'native' },
  { name: 'English', level: 'fluent' },
  { name: 'German', level: 'basic' },
]

export const contact = {
  title: 'Let’s talk.',
  pitch:
    'Whether you’re building a team, have a project that needs someone to make it ship, or just want to compare notes on engineering leadership — my inbox is open.',
  formEndpoint: 'https://formsubmit.co/ajax/josip.lukacevic@gmail.com',
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
