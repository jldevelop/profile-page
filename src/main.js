import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Single shared observer drives the v-reveal scroll-in animation across all pages.
const observer = reduceMotion
  ? null
  : new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )

const app = createApp(App)

app.directive('reveal', {
  mounted(el) {
    if (!observer) return
    el.classList.add('reveal')
    // Elements already in view on mount (e.g. after a route change) reveal
    // immediately - avoids a one-frame opacity:0 flash before the async observer fires.
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add('is-visible')
      return
    }
    observer.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
})

app.use(router)
// Wait for the initial navigation so the URL-derived locale (/hr/...) is
// resolved before first paint - avoids an English flash on Croatian URLs.
router.isReady().then(() => app.mount('#app'))
