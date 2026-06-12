<script setup>
import { profile, navLinks } from '@/content.js'
</script>

<template>
  <header class="nav">
    <div class="container nav-row">
      <a href="#top" class="brand">
        <span class="brand-mark">{{ profile.monogram }}</span>
        <span class="brand-name">{{ profile.name }}</span>
      </a>
      <nav class="links" aria-label="Sections">
        <a v-for="link in navLinks" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>
      <a class="btn btn-ghost btn-small" :href="profile.cvPath" :download="profile.cvFileName">
        Download CV
      </a>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 50;
  background: rgba(250, 248, 244, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}

.nav-row {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 64px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-right: auto;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--ink);
  color: var(--bg);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
}

.brand-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
}

.links {
  display: flex;
  gap: 22px;
}

.links a {
  text-decoration: none;
  font-size: 14.5px;
  font-weight: 500;
  color: var(--muted);
  transition: color 0.15s ease;
}

.links a:hover {
  color: var(--accent);
}

@media (max-width: 820px) {
  .links {
    display: none;
  }

  .brand-name {
    display: none;
  }
}
</style>
