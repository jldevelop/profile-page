<script setup>
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
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
