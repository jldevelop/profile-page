import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
    observer.observe(el)
  },
})

app.mount('#app')
