<script setup>
import { t } from '@/i18n.js'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">{{ t('a11y.skipToContent') }}</a>
  <SiteNav />
  <main id="main" class="app-main" tabindex="-1">
    <router-view />
  </main>
  <SiteFooter />
</template>

<style scoped>
.app-main {
  min-height: calc(100vh - 64px);
}
</style>
