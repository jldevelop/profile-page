import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const BASE_TITLE = 'jCode — Software studio for websites, web & mobile apps'
const BASE_DESC =
  'jCode is a small, senior software studio. We design, engineer and ship websites, web apps and mobile apps — plus a library of ready-to-adapt website templates and online stores.'

const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { title: BASE_TITLE, desc: BASE_DESC } },
  {
    path: '/templates',
    name: 'templates',
    component: () => import('@/pages/TemplatesPage.vue'),
    meta: { title: 'Website templates — jCode', desc: '75+ ready-to-adapt website templates and online-store designs across every industry — a fast, affordable starting point for your site, customised and shipped by jCode.' },
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
  // Old catalog/work URLs → templates (kept for any existing links).
  { path: '/catalog', redirect: '/templates' },
  { path: '/work', redirect: '/templates' },
  { path: '/work/:slug', redirect: '/templates' },
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
