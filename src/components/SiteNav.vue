<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { siteNav } from '@/content.js'
import LanguageSwitcher from './LanguageSwitcher.vue'

const open = ref(false)
const route = useRoute()
// Close the drawer on navigation; lock body scroll while it's open.
watch(() => route.fullPath, () => (open.value = false))
watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <header class="nav">
    <div class="container nav-row">
      <router-link to="/" class="brand" aria-label="jCode — home">
        <img class="brand-logo" src="/images/logo/jcode-logo-light-new.png" alt="jCode" />
      </router-link>

      <nav class="links" aria-label="Main">
        <router-link v-for="link in siteNav" :key="link.to" :to="link.to">{{ link.label }}</router-link>
      </nav>

      <LanguageSwitcher class="nav-lang" />

      <router-link class="btn btn-primary btn-small cta" to="/contact">Start a project</router-link>

      <button
        class="burger"
        type="button"
        :class="{ open }"
        :aria-expanded="open"
        aria-controls="mobile-drawer"
        :aria-label="open ? 'Close menu' : 'Open menu'"
        @click="open = !open"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <Transition name="drawer">
      <nav v-if="open" id="mobile-drawer" class="drawer" aria-label="Mobile">
        <router-link v-for="link in siteNav" :key="link.to" :to="link.to">{{ link.label }}</router-link>
        <router-link class="btn btn-primary" to="/contact">Start a project</router-link>
      </nav>
    </Transition>
  </header>

  <Teleport to="body">
    <Transition name="scrim">
      <div v-if="open" class="nav-scrim" @click="open = false"></div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.nav {
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 50;
  background: rgba(15, 26, 56, 1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
  height: 36px;
  width: auto;
  border-radius: 8px;
}

.links {
  display: flex;
  gap: 24px;
}

.links a {
  text-decoration: none;
  font-size: 14.5px;
  font-weight: 500;
  color: var(--on-dark-muted);
  transition: color 0.15s ease;
}

.links a:hover,
.links a.router-link-active {
  color: #fff;
}

.cta {
  flex-shrink: 0;
}

/* hamburger — hidden on desktop */
.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 42px;
  height: 38px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
}

.burger span {
  display: block;
  width: 18px;
  height: 2px;
  margin-inline: auto;
  background: var(--on-dark);
  border-radius: 2px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.burger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.burger.open span:nth-child(2) {
  opacity: 0;
}
.burger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.drawer {
  display: none;
}

.nav-scrim {
  display: none;
}

@media (max-width: 820px) {
  .links,
  .cta {
    display: none;
  }

  .burger {
    display: flex;
  }

  .drawer {
    display: grid;
    gap: 6px;
    padding: 12px clamp(20px, 4.5vw, 44px) 20px;
    background: var(--dark);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 2;
  }

  .drawer a {
    text-decoration: none;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 16px;
    color: var(--on-dark);
    padding: 12px 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .drawer a.router-link-active {
    color: var(--accent-bright);
  }

  .drawer .btn {
    justify-content: center;
    margin-top: 12px;
    border-bottom: none;
    color: #fff;
  }

  .nav-scrim {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 45;
    background: rgba(8, 13, 33, 0.5);
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
  }
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.scrim-enter-active,
.scrim-leave-active {
  transition: opacity 0.2s ease;
}
.scrim-enter-from,
.scrim-leave-to {
  opacity: 0;
}
</style>
