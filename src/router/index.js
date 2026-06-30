import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const BASE_TITLE = 'jCode — Software studio for websites, apps & AI automation'
const BASE_DESC =
  'jCode is a senior software studio building websites, online stores, mobile apps and AI automations for small and medium businesses — from first sketch to launch.'

const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { title: BASE_TITLE, desc: BASE_DESC } },
  {
    path: '/work',
    name: 'work',
    component: () => import('@/pages/TemplatesPage.vue'),
    meta: { title: 'Our work — jCode', desc: 'A showcase of websites and online stores designed and built by jCode — the kind of sites and apps we make for small and medium businesses.' },
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('@/pages/TeamPage.vue'),
    meta: { title: 'The team — jCode', desc: 'Meet the senior engineers behind jCode — full-stack, real-time and native mobile specialists.' },
  },
  // Profile route sets its own title inside the page component.
  { path: '/team/:slug', name: 'profile', component: () => import('@/pages/ProfilePage.vue'), props: true },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue'),
    meta: { title: 'Contact — jCode', desc: 'Tell us about your project — a website, a web app, a mobile app, or an idea you want to pressure-test. We reply within a day.' },
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
router.afterEach((to) => {
  if (to.meta.title !== undefined) document.title = to.meta.title
  if (to.meta.desc !== undefined) setMeta('description', to.meta.desc)
})
