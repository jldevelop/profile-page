// Prerenders every route of the SPA into static HTML for SEO.
//
// Runs after `vite build` (see package.json "build"). For each URL — English at
// the root and Croatian under /hr — it writes dist/<path>/index.html with:
//   • a unique <title>, meta description, canonical and hreflang pair,
//   • per-page Open Graph/Twitter tags (template pages use their screenshot),
//   • real, crawlable body content + internal links inside <div id="app">
//     (the Vue app replaces it on mount — crawlers and first paint get HTML).
// It also emits dist/sitemap.xml. robots.txt ships from public/.
//
// App modules are loaded through Vite's SSR module loader so the same data
// (locales, catalog, team) drives both the app and the prerendered pages —
// no duplicated copy, no drift.
import { createServer } from 'vite'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(ROOT, 'dist')
const ORIGIN = 'https://www.jcode.hr'

const esc = (s = '') =>
  String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

// Trim to a sensible description length at a word boundary.
const clip = (s, max = 158) => {
  const t = String(s).trim()
  if (t.length <= max) return t
  return `${t.slice(0, max).replace(/\s+\S*$/, '')}…`
}

const vite = await createServer({ root: ROOT, server: { middlewareMode: true }, appType: 'custom' })

try {
  const { lang } = await vite.ssrLoadModule('/src/lang.js')
  const { t } = await vite.ssrLoadModule('/src/i18n.js')
  const catalog = await vite.ssrLoadModule('/src/catalog.js')
  const content = await vite.ssrLoadModule('/src/content.js')

  const template = readFileSync(resolve(DIST, 'index.html'), 'utf8')
  if (!/<!-- seo:start\b[^>]*-->/.test(template) || !template.includes('<!-- seo:end -->')) {
    throw new Error('dist/index.html is missing the <!-- seo:start/end --> markers')
  }

  // ---- page factories (run once per locale; `lang` drives every computed/t()) ----
  const buildPages = (locale) => {
    lang.value = locale
    const hr = locale === 'hr'
    const p = (path) => (hr ? (path === '/' ? '/hr' : `/hr${path}`) : path) // locale path
    const templates = catalog.templates.value
    const sections = catalog.sections.value
    const members = content.team.value.filter((m) => !m.placeholder)
    const kindLabel = (tpl) => t(tpl.kind === 'ecommerce' ? 'work.badge.ecommerce' : 'work.badge.landing')

    const contactCta = hr ? 'Zatražite ponudu' : 'Get a free quote'
    const backToWork = hr ? '← Svi dizajni' : '← All designs'
    const liveLabel = hr ? 'Otvori uživo demo' : 'Open the live demo'
    const relatedLabel = hr ? 'Slični dizajni' : 'Related designs'

    const pages = []

    // ---------- home ----------
    pages.push({
      path: p('/'),
      title: t('meta.base.title'),
      desc: t('meta.base.desc'),
      body: `
        <section class="section"><div class="container">
          <h1>${esc(t('home.hero.h1'))}</h1>
          <p>${esc(t('home.hero.lede'))}</p>
          <h2>${esc(t('home.services.h2'))}</h2>
          <ul>${content.services.value.map((s) => `<li><strong>${esc(s.title)}</strong> — ${esc(s.desc)}</li>`).join('')}</ul>
          <h2>${esc(t('home.work.h2'))}</h2>
          <ul>${catalog.featuredTemplates.value.map((tpl) => `<li><a href="${p(`/work/${tpl.id}`)}">${esc(tpl.title)} — ${esc(tpl.category)}</a></li>`).join('')}</ul>
          <p><a href="${p('/work')}">${esc(t('home.work.seeAll'))}</a></p>
          <h2>${esc(t('home.team.eyebrow'))}</h2>
          <ul>${members.map((m) => `<li><a href="${p(`/team/${m.slug}`)}">${esc(m.name)} — ${esc(m.role)}</a></li>`).join('')}</ul>
          <p><a href="${p('/contact')}">${esc(contactCta)}</a></p>
        </div></section>`,
    })

    // ---------- work index ----------
    const listFor = (kind) =>
      templates
        .filter((tpl) => tpl.kind === kind)
        .map((tpl) => `<li><a href="${p(`/work/${tpl.id}`)}">${esc(tpl.title)} — ${esc(tpl.category)} (${tpl.code})</a></li>`)
        .join('')
    pages.push({
      path: p('/work'),
      title: t('meta.work.title'),
      desc: t('meta.work.desc'),
      body: `
        <section class="section"><div class="container">
          <h1>${esc(t('work.h1'))}</h1>
          <p>${esc(t('work.lede').before)} ${templates.length} ${esc(t('work.lede').after)}</p>
          <h2>${esc(sections.find((s) => s.key === 'simple')?.label)}</h2>
          <ul>${listFor('simple')}</ul>
          <h2>${esc(sections.find((s) => s.key === 'ecommerce')?.label)}</h2>
          <ul>${listFor('ecommerce')}</ul>
          <p><a href="${p('/contact')}">${esc(contactCta)}</a></p>
        </div></section>`,
    })

    // ---------- one page per template ----------
    for (const tpl of templates) {
      const isStore = tpl.kind === 'ecommerce'
      const title = hr
        ? `${tpl.title} — ${isStore ? 'dizajn web shopa' : 'dizajn web stranice'} (${tpl.code}) | jCode`
        : `${tpl.title} — ${isStore ? 'Online Store Design' : 'Website Design'} (${tpl.code}) | jCode`
      const related = templates
        .filter((other) => other.group === tpl.group && other.id !== tpl.id)
        .slice(0, 3)
      pages.push({
        path: p(`/work/${tpl.id}`),
        title,
        desc: clip(`${tpl.blurb} ${tpl.about}`),
        ogImage: `${ORIGIN}${tpl.card}`,
        body: `
          <section class="section"><div class="container">
            <h1>${esc(tpl.title)} <small>(${tpl.code})</small></h1>
            <p>${esc(tpl.category)} · ${esc(kindLabel(tpl))}</p>
            <p>${esc(tpl.blurb)}</p>
            <p>${esc(tpl.about)}</p>
            <p><img src="${esc(tpl.card)}" alt="${esc(tpl.title)} — ${esc(kindLabel(tpl))}" width="800" height="600"></p>
            <ul>
              ${tpl.live ? `<li><a href="${esc(tpl.live)}" rel="noopener">${esc(liveLabel)}</a></li>` : ''}
              <li><a href="${p('/contact')}?type=${isStore ? 'ecommerce' : 'website'}&amp;ref=${tpl.code}">${esc(t('dialog.buildLike'))}</a></li>
              <li><a href="${p('/work')}">${esc(backToWork)}</a></li>
            </ul>
            ${related.length ? `<h2>${esc(relatedLabel)}</h2><ul>${related.map((other) => `<li><a href="${p(`/work/${other.id}`)}">${esc(other.title)} (${other.code})</a></li>`).join('')}</ul>` : ''}
          </div></section>`,
      })
    }

    // ---------- team ----------
    pages.push({
      path: p('/team'),
      title: t('meta.team.title'),
      desc: t('meta.team.desc'),
      body: `
        <section class="section"><div class="container">
          <h1>${esc(t('team.eyebrow'))}</h1>
          <p>${esc(t('team.lede'))}</p>
          <ul>${members.map((m) => `<li><a href="${p(`/team/${m.slug}`)}">${esc(m.name)}</a> — ${esc(m.role)}. ${esc(m.bio || m.intro || '')}</li>`).join('')}</ul>
        </div></section>`,
    })

    for (const m of members) {
      pages.push({
        path: p(`/team/${m.slug}`),
        title: `${m.name} — ${m.role} | jCode`,
        desc: clip(m.bio || m.intro || ''),
        body: `
          <section class="section"><div class="container">
            <h1>${esc(m.name)}</h1>
            <p>${esc(m.role)}${m.tagline ? ` — “${esc(m.tagline)}”` : ''}</p>
            <p>${esc(m.intro || '')}</p>
            <p>${esc(m.bio || '')}</p>
            <p><a href="${p('/team')}">${esc(t('profile.back'))}</a></p>
          </div></section>`,
      })
    }

    // ---------- contact ----------
    pages.push({
      path: p('/contact'),
      title: t('meta.contact.title'),
      desc: t('meta.contact.desc'),
      body: `
        <section class="section"><div class="container">
          <h1>${esc(content.contact.value.title)}</h1>
          <p>${esc(content.contact.value.pitch)}</p>
          <p><a href="mailto:info@jcode.hr">info@jcode.hr</a> · ${esc(content.company.value.location)}</p>
        </div></section>`,
    })

    return pages
  }

  const pagesEn = buildPages('en')
  const pagesHr = buildPages('hr')
  const all = [...pagesEn, ...pagesHr]

  // ---- write each page ----
  const hrPathOf = (enPath) => (enPath === '/' ? '/hr' : `/hr${enPath}`)
  const enPathOf = (hrPath) => hrPath.replace(/^\/hr(?=\/|$)/, '') || '/'

  for (const page of all) {
    const isHr = page.path === '/hr' || page.path.startsWith('/hr/')
    const enUrl = `${ORIGIN}${isHr ? enPathOf(page.path) : page.path}`
    const hrUrl = `${ORIGIN}${isHr ? page.path : hrPathOf(page.path)}`
    const canonical = `${ORIGIN}${page.path}`
    const ogImage = page.ogImage || `${ORIGIN}/og-image.jpg`

    const head = `
    <title>${esc(page.title)}</title>
    <meta name="description" content="${esc(page.desc)}">
    <link rel="canonical" href="${canonical}">
    <link rel="alternate" hreflang="en" href="${enUrl}">
    <link rel="alternate" hreflang="hr" href="${hrUrl}">
    <link rel="alternate" hreflang="x-default" href="${enUrl}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="jCode">
    <meta property="og:locale" content="${isHr ? 'hr_HR' : 'en_US'}">
    <meta property="og:title" content="${esc(page.title)}">
    <meta property="og:description" content="${esc(page.desc)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${esc(ogImage)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(page.title)}">
    <meta name="twitter:description" content="${esc(page.desc)}">
    <meta name="twitter:image" content="${esc(ogImage)}">
    ${page.path === '/' ? template.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/)?.[0] ?? '' : ''}`

    let html = template.replace(/<!-- seo:start\b[^>]*-->[\s\S]*?<!-- seo:end -->/, `<!-- seo:start -->${head}\n    <!-- seo:end -->`)
    html = html.replace('<html lang="en">', `<html lang="${isHr ? 'hr' : 'en'}">`)
    html = html.replace('<div id="app"></div>', `<div id="app">${page.body}\n    </div>`)

    const outDir = page.path === '/' ? DIST : resolve(DIST, `.${page.path}`)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(resolve(outDir, 'index.html'), html)
  }

  // ---- sitemap.xml with hreflang alternates ----
  const today = new Date().toISOString().slice(0, 10)
  const urlEntry = (page) => {
    const isHr = page.path === '/hr' || page.path.startsWith('/hr/')
    const enUrl = `${ORIGIN}${isHr ? enPathOf(page.path) : page.path}`
    const hrUrl = `${ORIGIN}${isHr ? page.path : hrPathOf(page.path)}`
    return `  <url>
    <loc>${ORIGIN}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="hr" href="${hrUrl}"/>
  </url>`
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${all.map(urlEntry).join('\n')}
</urlset>
`
  writeFileSync(resolve(DIST, 'sitemap.xml'), sitemap)

  console.log(`prerendered ${all.length} pages (+ sitemap.xml with ${all.length} URLs)`)
} finally {
  await vite.close()
}
