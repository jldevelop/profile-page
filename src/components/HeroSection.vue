<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { t } from '@/i18n.js'

const props = defineProps({ member: { type: Object, required: true } })

// Drive the portrait's colour + tilt from its viewport position on every device:
// full colour and straightened while it is FULLY in view, desaturated and tilted
// again as soon as any edge starts leaving.
const portraitEl = ref(null)
let portraitObserver = null

function teardown() {
  portraitObserver?.disconnect()
  portraitObserver = null
}

function buildObserver() {
  teardown()
  portraitEl.value?.classList.remove('in-view')
  if (!props.member.photo || !portraitEl.value) return
  portraitObserver = new IntersectionObserver(
    ([entry]) => {
      portraitEl.value?.classList.toggle('in-view', entry.intersectionRatio >= 0.98)
    },
    { threshold: [0.98] },
  )
  portraitObserver.observe(portraitEl.value)
}

// Attach once the element exists, then rebuild on member change — vue-router reuses
// this instance across /team/:slug, and flush:'post' guarantees the new portrait is
// in the DOM before we re-observe.
onMounted(buildObserver)
watch(() => props.member.slug, buildObserver, { flush: 'post' })

onUnmounted(teardown)
</script>

<template>
  <section id="top" class="hero">
    <div class="container hero-grid">
      <div class="hero-text" v-reveal>
        <p class="eyebrow">{{ member.eyebrow }}</p>
        <h1>{{ member.name }}</h1>
        <p class="tagline">“{{ member.tagline }}”</p>
        <p class="intro">{{ member.intro }}</p>
        <div class="cta-row">
          <router-link class="btn btn-primary" to="/contact">{{ t('hero.getInTouch') }}</router-link>
        </div>
        <div v-if="member.linkedin || member.github || member.email" class="quick-links">
          <a v-if="member.linkedin" class="link-arrow" :href="member.linkedin" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a v-if="member.github" class="link-arrow" :href="member.github" target="_blank" rel="noopener">GitHub ↗</a>
          <a v-if="member.email" class="link-arrow" :href="`mailto:${member.email}`">{{ member.email }}</a>
        </div>
      </div>

      <div class="hero-visual" v-reveal>
        <div class="portrait" ref="portraitEl">
          <img
            v-if="member.photo"
            :src="member.photo"
            :alt="`${t('hero.portraitAlt')} ${member.name}`"
            fetchpriority="high"
            decoding="async"
          />
          <span v-else class="portrait-mark" aria-hidden="true">{{ member.monogram }}</span>
          <span class="portrait-bar" aria-hidden="true"></span>
        </div>
      </div>
    </div>

    <div v-if="member.stats?.length" class="container">
      <dl class="stats" v-reveal>
        <div v-for="(stat, i) in member.stats" :key="i" class="stat">
          <dt>{{ stat.label }}</dt>
          <dd>{{ stat.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: clamp(120px, 16vh, 170px);
  padding-bottom: clamp(56px, 8vw, 90px);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: clamp(32px, 6vw, 72px);
  align-items: center;
}

h1 {
  font-size: clamp(40px, 6.5vw, 64px);
  margin-top: 14px;
}

.tagline {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(20px, 2.6vw, 26px);
  color: var(--accent);
  margin-top: 18px;
  letter-spacing: -0.01em;
}

.intro {
  margin-top: 16px;
  font-size: 17.5px;
  color: var(--ink-soft);
  max-width: 560px;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 26px;
  font-size: 14.5px;
  color: var(--muted);
}

/* Portrait card — shows the headshot, or the monogram tile as fallback */
.portrait {
  position: relative;
  width: min(100%, 340px);
  aspect-ratio: 4 / 5;
  border: 1px solid #0f1a38;
  border-radius: 22px;
  margin-inline: auto;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(160deg, var(--dark-soft) 0%, var(--dark) 100%);
  box-shadow: var(--shadow-card);
  transform: rotate(-2deg);
  transition: transform 0.35s ease;
}

.portrait img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* desaturated + tilted by default; gains colour and straightens while fully in view */
  filter: grayscale(1);
  transition: filter 0.35s ease;
}

/* All devices: straighten + colorize while the portrait is fully in view, and
   desaturate + tilt again as soon as it starts leaving (class toggled by the
   IntersectionObserver above). */
.portrait.in-view {
  transform: rotate(0deg);
}

.portrait.in-view img {
  filter: grayscale(0);
}

.portrait-mark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(64px, 8vw, 96px);
  color: var(--on-dark);
  letter-spacing: -0.03em;
}

.portrait-bar {
  position: absolute;
  left: 28px;
  right: 28px;
  bottom: 26px;
  height: 6px;
  border-radius: 3px;
  background: var(--accent);
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin: clamp(48px, 7vw, 76px) 0 0;
  padding-top: 36px;
  border-top: 1px solid var(--line);
}

.stat dd {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(26px, 3.4vw, 36px);
  letter-spacing: -0.02em;
}

.stat dt {
  font-size: 13.5px;
  color: var(--muted);
  margin-top: 4px;
}

.stat {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

@media (max-width: 880px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .portrait {
    width: min(78%, 300px);
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 26px 18px;
  }
}
</style>
