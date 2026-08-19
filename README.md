# jCode - company website

The public website for **jCode** ([jcode.hr](https://www.jcode.hr/)), a software studio building
websites, online stores, mobile apps and AI automation for small and mid-sized companies.

Vue 3 SPA, bilingual (Croatian and English), prerendered to static HTML at build time for SEO.
No UI framework: a small hand-rolled design system on CSS custom properties.

> This repo was originally Josip Lukačević's personal profile site. It is now the company's
> site; the old single-page profile lives on as one of the team profile pages under `/team/:slug`.

## Stack

- [Vue 3](https://vuejs.org/) (`<script setup>`) + [vue-router 4](https://router.vuejs.org/)
- [Vite 8](https://vite.dev/) (`@` aliases `src/`)
- Design tokens + base styles in [`src/assets/main.css`](src/assets/main.css); everything else is scoped component CSS
- [FormSubmit](https://formsubmit.co/)-backed contact form (static-host friendly, no backend)
- Node `^20.19.0 || >=22.12.0`

## Development

```sh
npm install
npm run dev      # dev server with HMR
npm run build    # vite build into dist/, then prerender every route
npm run preview  # serve the built dist/ (use this to check prerendered output)
```

## Routing and language

Croatian is the primary market (`.hr` domain) and sits at the root; English lives under `/en`.
Both languages are real, separately indexable URLs with hreflang pairs.

| Route | Croatian | English |
| --- | --- | --- |
| Home | `/` | `/en` |
| Template showcase | `/work`, `/work/:id` | `/en/work`, `/en/work/:id` |
| Team | `/team`, `/team/:slug` | `/en/team`, `/en/team/:slug` |
| Contact | `/contact` | `/en/contact` |

`/templates` and `/catalog` redirect to `/work`; anything unmatched redirects to `/`.

**The URL decides the locale.** `router.beforeEach` derives it from the path and calls `setLang()`
before the routed component renders, so `t()` and every computed resolve correctly on first paint.
`localStorage` only records the visitor's preference; it never overrides the URL.

Translation layers:

- [`src/i18n.js`](src/i18n.js) - `t('nav.work')` flat-path lookup with English fallback, plus
  `plural()` implementing the Croatian one/few/other CLDR rule.
- [`src/locales/en.js`](src/locales/en.js) / [`hr.js`](src/locales/hr.js) - UI strings hardcoded in
  component templates (nav, buttons, headings, a11y labels).
- Data-shaped copy stays next to its data instead: [`content.hr.js`](src/content.hr.js) overlays
  team bios by slug, [`catalog.hr.js`](src/catalog.hr.js) overlays template titles/blurbs by slug
  and categories by industry. Structural fields (photos, stack icons, demo URLs, group mapping)
  are single-source in the English files so they cannot drift between locales.

## Content

**All copy lives in data files. Text edits never touch components.**

- [`src/content.js`](src/content.js) - company facts (email, socials, legal block, form endpoint),
  the four service pillars, stats, process, client logos, tech stack, and the team. Three real
  members (Josip, Oleg, Danijel) plus two `placeholderMember()` entries ("Your name here", with
  dummy copy and a visible placeholder note on the profile page). Years of experience tick up
  automatically from a start year.
- [`src/catalog.js`](src/catalog.js) - the `/work` showcase: **91 visible designs** (70 landing
  pages, 21 storefronts). Three knobs at the top of the file:
  - `HIDDEN_TEMPLATES` - add a code (`WEB-07`) or slug to pull a design from the grid, its deep
    link, the prerendered pages and the sitemap on the next build.
  - `DISPLAY_ORDER` - hand-picked grid order, produced with the `/sort-templates` tool below.
  - `FEATURED_IDS` - the small set teased on the homepage.

  `codeOf(slug)` derives the public reference code (`WEB-14`, `SHOP-03`, `CLUB-02`) that a visitor
  can quote back to you; it is forwarded to the contact form as `?ref=`.

### The designs themselves are a different repo

`/work` only ships **screenshots and metadata**. The actual template source lives in the sibling
`websites-portfolio` project, which also deploys the live demos to Cloudflare Pages at
`jcode-templates.pages.dev` (`DEMO_BASE` in `catalog.js` links to them). Screenshots are generated
there and copied into `public/images/catalog/`. Nothing in this repo builds or serves a template.

## SEO and prerendering

[`scripts/prerender.mjs`](scripts/prerender.mjs) runs after `vite build` and writes **196 static
pages** (one per route per locale) plus `dist/sitemap.xml`. Each page gets a unique title and
description, canonical, hreflang pair, per-page Open Graph and Twitter tags, and real crawlable
body content with internal links inside `<div id="app">` (the Vue app replaces it on mount, so
crawlers and first paint both get HTML).

App modules are loaded through Vite's SSR module loader, so the prerenderer and the running app
share one source of copy.

Two things to keep intact:

- The `<!-- seo:start -->` / `<!-- seo:end -->` markers in [`index.html`](index.html). The
  prerenderer replaces everything between them per page and throws if they are missing.
- The `Organization` JSON-LD block in `index.html`. It is carried onto the two home pages only,
  and holds the company's `sameAs` social profile.

`public/robots.txt` points at the sitemap. `/sort-templates` is excluded from prerender and sitemap
and sets `noindex, nofollow` itself.

## Contact form

`ContactPage.vue` POSTs JSON to the FormSubmit endpoint in `content.js` (`formEndpoint`) - no
backend, no build secret. It carries a `_honey` honeypot field, and reads two query params:

- `?type=website|ecommerce|mobile|ai|other` preselects the project type (service cards link this in)
- `?ref=WEB-14` attaches a design reference, rendered as a screenshot card beside the form

## Assets

- `public/images/catalog/` - showcase screenshots, two tiers per design:
  `<slug>-card.webp` (grid) and `<slug>-full.webp` (click-through preview), with Croatian captures
  alongside as `<slug>-card.hr.webp` / `<slug>-full.hr.webp`.
- `public/images/tech/` - monochrome technology icons. `public/images/clients/` - client logos,
  normalized to uniform silhouettes. `public/images/logo/` - brand marks.
- Images are lazy-loaded; the `v-reveal` directive (registered in `src/main.js`) drives a single
  shared IntersectionObserver for scroll-in animation and is disabled under `prefers-reduced-motion`.

## Deployment

Vercel, from `origin` (`github.com/jldevelop/profile-page`). [`vercel.json`](vercel.json) rewrites
non-asset paths to `index.html` so client-side routing works; the prerendered `dist/<path>/index.html`
files are served first where they exist. Canonical origin is `https://www.jcode.hr`.

## Known gaps

- **The footer legal block is empty** (`company.legal` - entity, OIB, address). It renders only
  when filled. A Croatian d.o.o. is legally required to display its OIB.
- `company.whatsapp` and `company.phone` are empty, so those contact methods stay hidden.
- Two of the five team entries are placeholders.
- `/sort-templates` is a temporary internal tool, not linked from anywhere. Delete it when the
  grid order is settled.
- `public/` still carries leftovers from the personal-profile era that nothing references:
  `images/portfolio-web/`, `images/portfolio-full/`, `images/retouched/`, the CV PDFs, and a few
  stray portrait files.
