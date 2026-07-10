// English UI copy — every hardcoded template string in the app (nav, buttons,
// headings, form labels, a11y strings, route meta). Structured/data-shaped copy
// (team bios, catalog blurbs) lives in content.js / catalog.js instead — this
// file is the fallback locale, so every key used anywhere must exist here.
export default {
  a11y: {
    skipToContent: 'Skip to content',
  },

  nav: {
    home: 'Home',
    work: 'Work',
    team: 'Team',
    contact: 'Contact',
    cta: 'Start a project',
    brandLabel: 'jCode — home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  footer: {
    pagesHeading: 'Pages',
    contactHeading: 'Get in touch',
    ctaLink: 'Start a project →',
  },

  langSwitcher: {
    selectLanguage: 'Select language',
    ariaPrefix: 'Language:',
  },

  company: {
    eyebrow: 'Software studio · Barcelona + EU remote',
    tagline: 'Websites, e-commerce, mobile apps & AI automation for growing businesses.',
    lede: 'A senior software studio. We design and build websites, online stores, mobile apps and AI automations for small and medium businesses — from first sketch to launch.',
    location: 'Barcelona · EU remote',
  },

  services: {
    websites: {
      title: 'Websites',
      desc: 'Fast, modern marketing and business websites that look the part and turn visitors into customers — engineered for performance and built to convert.',
      points: ['Marketing & brand sites', 'Landing pages', 'Performance & SEO foundations'],
    },
    ecommerce: {
      title: 'E-commerce',
      desc: 'Online stores that are easy to run and easy to buy from — product pages, cart and checkout set up to sell, on Shopify or a custom build.',
      points: ['Shopify & custom stores', 'Product & checkout flows', 'Payments & integrations'],
    },
    mobile: {
      title: 'Mobile apps',
      desc: 'Native iOS and Android apps your business and customers can rely on — point-of-sale, operations and customer-facing products, built to stay reliable day in, day out.',
      points: ['Native iOS & Android', 'API & backend integration', 'App Store & Play Store delivery'],
    },
    'ai-automation': {
      title: 'AI automation',
      desc: 'Put AI to work on the busywork — connect your tools and automate repetitive operations and workflows, so your team can focus on the work that matters.',
      points: ['Workflow & process automation', 'AI assistants & integrations', 'Custom internal tools'],
    },
  },

  // companyStats[0].value is computed (auto-incrementing years) — content.js
  // fills it in; only `label` comes from here for that entry.
  companyStats: [
    { label: 'years shipping software' },
    { value: '80+', label: 'site designs in our showcase' },
    { value: 'End-to-end', label: 'web, e-commerce, mobile & AI' },
  ],

  companyProcess: [
    { title: 'Discover & architect', desc: 'We learn your business, users and constraints, then design the architecture and scope the work — so there are no surprises later.' },
    { title: 'Design', desc: 'Wireframes to polished, accessible UI. You see and shape the product before a line of production code is written.' },
    { title: 'Engineer', desc: 'Senior engineers ship in tight iterations — code review, automated tests and CI on every change. You always have something real to click.' },
    { title: 'Ship & support', desc: 'We deploy, monitor and harden for production — performance, security and reliability — and stick around after go-live.' },
  ],

  // Tech-stack section group labels — the items themselves (Vue.js, Node.js...)
  // are proper nouns and never translated.
  techGroups: {
    frontend: 'Frontend',
    backend: 'Backend',
    mobile: 'Mobile',
    'cloud-devops': 'Cloud & DevOps',
    data: 'Data',
    'commerce-cms': 'Commerce & CMS',
    also: 'Also in our toolkit',
  },

  home: {
    hero: {
      h1: 'Websites, apps & automation for growing businesses.',
      lede: 'jCode is a senior software studio. We design and build websites, online stores, mobile apps and AI automations for small and medium businesses — from first sketch to launch.',
      ctaStart: 'Start a project',
      ctaWork: 'See our work',
    },
    clients: { lead: 'Brands we’ve worked with' },
    services: { eyebrow: 'Services', h2: 'What we build' },
    work: { eyebrow: 'Our work', h2: 'A look at what we build', seeAll: 'See all our work →' },
    stack: { eyebrow: 'Technologies', h2: 'The stack we build on' },
    process: { eyebrow: 'How we work', h2: 'From first sketch to shipped' },
    team: {
      eyebrow: 'The team',
      headingHtml: 'A small <em class="text-accent">team</em> - big <em class="text-accent">experience</em>',
      meetAll: 'Meet everyone →',
    },
    cta: { h2: 'Have a project in mind?', p: 'Tell us what you’re building. We’ll tell you how we’d ship it.' },
  },

  team: {
    eyebrow: 'The team',
    lede: 'The people behind jCode — senior generalists who design, build and ship. Fewer handoffs, more ownership.',
    mainStack: 'Main stack',
    yearsSuffix: 'years of experience',
    viewProfileLink: 'View full profile →',
    viewProfileAria: 'view profile',
    viewProfileAria2: 'View full profile:',
  },

  hero: {
    getInTouch: 'Get in touch',
    portraitAlt: 'Portrait —',
  },

  about: { eyebrow: 'About' },
  skills: { eyebrow: 'Skills', heading: 'Skills & tools' },

  profile: {
    back: '← The team',
    placeholderNote: 'Placeholder profile — replace with real content for this teammate.',
  },

  contact: {
    title: 'Let’s build something.',
    pitch: 'Tell us about your project — a website, an online store, a mobile app, an AI automation, or just an idea you want to pressure-test. We read every message and reply within a day.',
    projectTypes: {
      website: 'Website',
      ecommerce: 'Online store',
      mobile: 'Mobile app',
      ai: 'AI automation',
      other: 'Something else',
    },
    helpLabel: 'What can we help with?',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Tell us about your project',
    sending: 'Sending…',
    send: 'Send message',
    errorPrefix: 'Something went wrong — please email us directly at',
    sentTitle: 'Thanks — message sent.',
    sentBody: 'We’ll get back to you within a day.',
    methods: {
      email: 'Email',
      whatsapp: 'WhatsApp',
      whatsappCta: 'Message us ↗',
      phone: 'Phone',
      basedIn: 'Based in',
    },
    subjectFallback: 'project',
    buildSubject: (type, name) => `jCode — new ${type} enquiry from ${name}`,
    refLabel: 'Referring to design:',
    refRemoveAria: 'Remove the design reference',
    refOpenAria: (title) => `Open the ${title} design preview`,
  },

  work: {
    eyebrow: 'Our work',
    sectionsAria: 'Template sections',
    filterAria: 'Filter by category',
    h1: 'Websites & stores we’ve designed',
    lede: {
      before: 'A look at the kind of sites and online stores we design and build —',
      after: 'across every industry, from single-page websites to full e-commerce storefronts. See one you like? We’ll build you one like it. Click any design to preview it full-page.',
    },
    sectionNote: 'Full multi-page storefronts — home, collection, product & cart.',
    badge: { ecommerce: 'Online store', landing: 'Landing page' },
    previewAction: 'Preview screenshot →',
    liveBadge: 'Live ↗',
    liveAria: (title) => `Open the live ${title} site in a new tab`,
    ctaText: 'See something you like — or want something fully bespoke?',
    countTemplate: { one: 'template', few: 'templates', other: 'templates' },
    countStore: { one: 'store', few: 'stores', other: 'stores' },
  },

  dialog: {
    share: 'Share',
    shareCopied: 'Link copied ✓',
    shareCopy: 'Copy URL',
    shareMenuAria: 'Share options',
    shareAria: 'Share a link to this design',
    openLive: 'Open live site ↗',
    buildLike: 'Build me one like this →',
    closePreviewAria: 'Close preview',
    previewAria: (title) => `${title} preview`,
    fullPreviewAlt: (title) => `${title} — full page preview`,
    noImg: 'Preview coming soon.',
  },

  meta: {
    base: {
      title: 'jCode — Software studio for websites, apps & AI automation',
      desc: 'jCode is a senior software studio building websites, online stores, mobile apps and AI automations for small and medium businesses — from first sketch to launch.',
    },
    work: {
      title: 'Our work — jCode',
      desc: 'A showcase of websites and online stores designed and built by jCode — the kind of sites and apps we make for small and medium businesses.',
    },
    team: {
      title: 'The team — jCode',
      desc: 'Meet the senior engineers behind jCode — full-stack, real-time and native mobile specialists.',
    },
    contact: {
      title: 'Contact — jCode',
      desc: 'Tell us about your project — a website, a web app, a mobile app, or an idea you want to pressure-test. We reply within a day.',
    },
  },
}
