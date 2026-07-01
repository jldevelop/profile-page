import { watch } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import { lang } from '@/lang.js'
import { t } from '@/i18n.js'

// Routes store a meta *key* (into locales/{en,hr}.js meta.<key>), not the literal
// title/desc, so afterEach + the lang watcher below can resolve it per locale.
const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { metaKey: 'base' } },
  {
    path: '/work',
    name: 'work',
    component: () => import('@/pages/TemplatesPage.vue'),
    meta: { metaKey: 'work' },
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('@/pages/TeamPage.vue'),
    meta: { metaKey: 'team' },
  },
  // Profile route sets its own title inside the page component.
  { path: '/team/:slug', name: 'profile', component: () => import('@/pages/ProfilePage.vue'), props: true },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue'),
    meta: { metaKey: 'contact' },
  },
  // Old template/catalog URLs → the work showcase (kept for any existing links).
  { path: '/templates', redirect: '/work' },
  { path: '/catalog', redirect: '/work' },
  { path: '/work/:slug', redirect: '/work' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
    return { top: 0 }
  },
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

// Per-route document title + description (profile/case-study routes set their own).
function applyMeta(route) {
  const key = route.meta.metaKey
  if (!key) return
  document.title = t(`meta.${key}.title`)
  setMeta('description', t(`meta.${key}.desc`))
}

router.afterEach(applyMeta)
// Switching language without navigating (e.g. sitting on / and flipping EN→HR)
// doesn't fire afterEach, so re-apply the current route's meta on locale change too.
watch(lang, () => applyMeta(router.currentRoute.value))
