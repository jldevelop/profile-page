import { watch } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import { lang, setLang } from '@/lang.js'
import { t } from '@/i18n.js'

// Routes store a meta *key* (into locales/{en,hr}.js meta.<key>), not the literal
// title/desc, so afterEach + the lang watcher below can resolve it per locale.
//
// Every page exists in two URL variants: Croatian at the root (/, /work, …) -
// the primary market on a .hr domain - and English under /en (/en, /en/work, …).
// The URL is the source of truth for the locale (see beforeEach below) so each
// language is separately indexable, with hreflang pairs emitted by the
// prerenderer (scripts/prerender.mjs).
const pages = [
  { path: '', name: 'home', component: HomePage, meta: { metaKey: 'base' } },
  {
    // Optional :id deep-links straight to a template's screenshot preview
    // (e.g. /work/01-restaurant) - shareable URLs for every design.
    path: 'work/:id?',
    name: 'work',
    component: () => import('@/pages/TemplatesPage.vue'),
    props: true,
    meta: { metaKey: 'work' },
  },
  {
    path: 'team',
    name: 'team',
    component: () => import('@/pages/TeamPage.vue'),
    meta: { metaKey: 'team' },
  },
  // Profile route sets its own title inside the page component.
  { path: 'team/:slug', name: 'profile', component: () => import('@/pages/ProfilePage.vue'), props: true },
  {
    path: 'contact',
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue'),
    meta: { metaKey: 'contact' },
  },
]

const routes = [
  { path: '/:locale(en)?', children: pages },
  // Old template/catalog URLs → the work showcase (kept for any existing links).
  { path: '/templates', redirect: '/work' },
  { path: '/catalog', redirect: '/work' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Opening/closing a template preview only changes /work's :id param -
    // keep the grid where it is instead of jumping to the top.
    if (to.name === 'work' && from.name === 'work') return false
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
    return { top: 0 }
  },
})

// The URL decides the locale: /en/... is English, everything else is Croatian.
// This runs before the routed component renders, so t()/computeds resolve in
// the right language on first paint (localStorage keeps the choice only as a
// preference record - it never overrides the URL).
router.beforeEach((to) => {
  const urlLang = to.params.locale === 'en' ? 'en' : 'hr'
  if (lang.value !== urlLang) setLang(urlLang)
})

function setMeta(name, content) {
  if (content == null) return
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Per-route document title + description (profile routes set their own; an open
// template preview on /work/:id also owns the title - see TemplatesPage).
function applyMeta(route) {
  const key = route.meta.metaKey
  if (!key) return
  if (route.name === 'work' && route.params.id) return
  document.title = t(`meta.${key}.title`)
  setMeta('description', t(`meta.${key}.desc`))
}

router.afterEach(applyMeta)
// Switching language without navigating (e.g. sitting on / and flipping EN→HR)
// doesn't fire afterEach, so re-apply the current route's meta on locale change too.
watch(lang, () => applyMeta(router.currentRoute.value))
