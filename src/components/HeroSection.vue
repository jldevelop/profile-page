<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { profile, stats } from '@/content.js'

// Touch devices have no hover: colorize the portrait while it is FULLY in the
// viewport instead, and desaturate again as soon as any edge starts leaving.
const portraitEl = ref(null)
let portraitObserver = null

onMounted(() => {
  console.log('mounted!')
  if (!profile.photo || !window.matchMedia('(hover: none)').matches) return
  portraitObserver = new IntersectionObserver(
    ([entry]) => {
      portraitEl.value?.classList.toggle('in-view', entry.intersectionRatio >= 0.98)
    },
    { threshold: [0.98] },
  )
  portraitObserver.observe(portraitEl.value)
})

onUnmounted(() => portraitObserver?.disconnect())
</script>

<template>
  <section id="top" class="hero">
    <div class="container hero-grid">
      <div class="hero-text" v-reveal>
        <p class="eyebrow">{{ profile.eyebrow }}</p>
        <h1>{{ profile.name }}</h1>
        <p class="tagline">“{{ profile.tagline }}”</p>
        <p class="intro">{{ profile.intro }}</p>
        <div class="cta-row">
          <a class="btn btn-primary" :href="profile.cvPath" :download="profile.cvFileName">
            Download CV
          </a>
          <a class="btn btn-ghost" href="#contact">Get in touch</a>
        </div>
        <div class="quick-links">
          <a class="link-arrow" :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a class="link-arrow" :href="profile.upwork" target="_blank" rel="noopener">Upwork ↗</a>
          <a class="link-arrow" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </div>
      </div>

      <div class="hero-visual" v-reveal>
        <div class="portrait" ref="portraitEl">
          <img
            v-if="profile.photo"
            :src="profile.photo"
            :alt="`Portrait of ${profile.name}`"
            fetchpriority="high"
            decoding="async"
          />
          <span v-else class="portrait-mark" aria-hidden="true">{{ profile.monogram }}</span>
          <span class="portrait-bar" aria-hidden="true"></span>
        </div>
      </div>
    </div>

    <div class="container">
      <dl class="stats" v-reveal>
        <div v-for="stat in stats" :key="stat.label" class="stat">
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
  border-radius: 22px;
  margin-inline: auto;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(160deg, #1d2127 0%, #14171b 100%);
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
  /* shown desaturated by default; gains color on hover in step with the straightening */
  filter: grayscale(1);
  transition: filter 0.35s ease;
}

@media (hover: hover) {
  .portrait:hover {
    transform: rotate(0deg);
  }

  .portrait:hover img {
    filter: grayscale(0);
  }
}

/* touch devices: straighten + colorize while fully in view (class managed by IntersectionObserver) */
@media (hover: none) {
  .portrait.in-view {
    transform: rotate(0deg);
  }

  .portrait.in-view img {
    filter: grayscale(0);
  }
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
