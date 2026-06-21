<script setup>
import { profile, navLinks } from '@/content.js'
</script>

<template>
  <header class="nav">
    <div class="container nav-row">
      <a href="#top" class="brand" aria-label="jCode — home">
        <img class="brand-logo" src="/images/logo/jcode-logotype-transparent.png" alt="jCode" />
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
  text-decoration: none;
  margin-right: auto;
}

.brand-logo {
  display: block;
  height: 38px;
  width: auto;
  border-radius: 9px;
  border: 1px solid;
  color: #15224b;
  background-color: #fff;
}

.brand-logo:hover {
  background-color: #eff5ff;
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
}
</style>
