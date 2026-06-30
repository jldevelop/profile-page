<script setup>
import { company } from '@/content.js'

const year = new Date().getFullYear()
const socials = Object.entries({
  LinkedIn: company.socials.linkedin,
  GitHub: company.socials.github,
  Instagram: company.socials.instagram,
}).filter(([, url]) => url)

const pages = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
]

// Shown only when filled (no fabricated legal info).
const legalLine = [
  company.legal.entity,
  company.legal.oib && `OIB ${company.legal.oib}`,
  company.legal.address,
]
  .filter(Boolean)
  .join(' · ')
</script>

<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="foot-brand">
        <img class="foot-logo" src="/images/logo/jcode-logo-light-new.png" :alt="company.name" />
        <p class="foot-tag">{{ company.tagline }}</p>
        <p class="foot-loc">{{ company.location }}</p>
      </div>

      <nav class="foot-nav" aria-label="Footer">
        <h4>Pages</h4>
        <router-link v-for="link in pages" :key="link.to" :to="link.to">{{ link.label }}</router-link>
      </nav>

      <div class="foot-nav">
        <h4>Get in touch</h4>
        <a :href="`mailto:${company.email}`">{{ company.email }}</a>
        <a v-for="[label, url] in socials" :key="label" :href="url" target="_blank" rel="noopener">{{ label }} ↗</a>
      </div>
    </div>

    <div class="container footer-bottom">
      <p>© {{ year }} {{ company.name }} — {{ company.domain }}<span v-if="legalLine"> · {{ legalLine }}</span></p>
      <router-link to="/contact">Start a project →</router-link>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--dark);
  color: var(--on-dark-muted);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: clamp(28px, 5vw, 64px);
  padding-block: clamp(48px, 7vw, 72px) 36px;
}

.foot-logo {
  height: 34px;
  width: auto;
  border-radius: 8px;
}

.foot-tag {
  margin-top: 16px;
  max-width: 320px;
  color: var(--on-dark);
  font-size: 15px;
}

.foot-loc {
  margin-top: 10px;
  font-size: 13.5px;
}

.foot-nav {
  display: grid;
  align-content: start;
  gap: 11px;
}

.foot-nav h4 {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--on-dark);
  margin-bottom: 4px;
}

.foot-nav a {
  color: var(--on-dark-muted);
  text-decoration: none;
  font-size: 14.5px;
  width: fit-content;
  transition: color 0.15s ease;
}

.foot-nav a:hover {
  color: var(--accent);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-block: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 13.5px;
}

.footer-bottom a {
  color: var(--on-dark-muted);
  text-decoration: none;
}

.footer-bottom a:hover {
  color: var(--accent);
}

@media (max-width: 720px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .foot-brand {
    grid-column: 1 / -1;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
