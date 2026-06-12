<script setup>
import { computed, onUnmounted, ref } from 'vue'
import { portfolio } from '@/content.js'

const activeIndex = ref(0)
const project = computed(() => portfolio.projects[activeIndex.value])

// Click-through opens the full-resolution q90 tier of the same image.
const fullSrc = (src) => src.replace('/portfolio-web/', '/portfolio-full/')

// Videos autoplay (muted) while in view and pause when scrolled out.
// With preload="none", the first play() in view is also what triggers loading.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const videoObserver = reduceMotion
  ? null
  : new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.muted = true
            entry.target.play().catch(() => {})
          } else {
            entry.target.pause()
          }
        }
      },
      { threshold: 0.35 },
    )

const vAutoplayInView = {
  mounted(el) {
    videoObserver?.observe(el)
  },
  unmounted(el) {
    el.pause()
    videoObserver?.unobserve(el)
  },
}

onUnmounted(() => videoObserver?.disconnect())
</script>

<template>
  <section id="portfolio" class="section">
    <div class="container">
      <div class="section-head" v-reveal>
        <p class="eyebrow">Portfolio</p>
        <h2>{{ portfolio.title }}</h2>
        <p class="note">{{ portfolio.note }}</p>
      </div>

      <div class="tabs" role="tablist" aria-label="Portfolio projects" v-reveal>
        <button
          v-for="(p, i) in portfolio.projects"
          :key="p.slug"
          type="button"
          role="tab"
          :aria-selected="i === activeIndex"
          :class="{ active: i === activeIndex }"
          @click="activeIndex = i"
        >
          <img :src="p.logo" alt="" loading="lazy" decoding="async" />
          <span>{{ p.name }}</span>
        </button>
      </div>

      <Transition name="swap" mode="out-in">
        <div class="gallery" :key="project.slug">
          <template v-for="m in project.media" :key="m.src">
            <div v-if="m.type === 'video'" class="media video">
              <video
                v-autoplay-in-view
                :src="m.src"
                controls
                muted
                loop
                playsinline
                preload="none"
              ></video>
            </div>
            <a
              v-else
              class="media"
              :class="{ tall: m.tall }"
              :href="fullSrc(m.src)"
              target="_blank"
              rel="noopener"
              :aria-label="`${project.name} — open full-size screenshot`"
            >
              <img :src="m.src" loading="lazy" decoding="async" :alt="`${project.name} screenshot`" />
            </a>
          </template>
        </div>
      </Transition>

      <p v-if="project.desc" class="proj-desc">{{ project.desc }}</p>
    </div>
  </section>
</template>

<style scoped>
.note {
  margin-top: 12px;
  color: var(--muted);
  font-size: 15px;
}

/* ---- tabs ---- */
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tabs button {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 9px 16px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-soft);
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}

.tabs button:hover {
  border-color: var(--ink);
}

.tabs button.active {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--ink);
}

.tabs img {
  height: 20px;
  width: auto;
  max-width: 56px;
  object-fit: contain;
}

/* ---- gallery ---- */
.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-top: 30px;
}

.media {
  display: block;
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  cursor: zoom-in;
}

.media:first-child {
  grid-column: 1 / -1;
  aspect-ratio: 16 / 9;
}

/* a lone trailing item (even total count) spans the full row instead of leaving a gap */
.media:last-child:nth-child(even) {
  grid-column: 1 / -1;
  aspect-ratio: 16 / 9;
}

.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

/* tall page-captures pan down on hover */
.media.tall::after {
  content: 'full page ↕';
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(22, 25, 29, 0.78);
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.03em;
  pointer-events: none;
}

@media (hover: hover) {
  .media.tall img {
    transition: object-position 5s linear;
  }

  .media.tall:hover img {
    object-position: bottom center;
  }

  .media:not(.video):hover {
    border-color: var(--accent);
  }
}

.media.video {
  background: var(--dark);
  cursor: default;
}

.media.video video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.proj-desc {
  margin-top: 18px;
  max-width: 720px;
  color: var(--ink-soft);
  font-size: 15.5px;
}

/* ---- swap transition ---- */
.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (prefers-reduced-motion: reduce) {
  .swap-enter-active,
  .swap-leave-active {
    transition: none;
  }

  .media.tall img,
  .media.tall:hover img {
    transition: none;
  }
}

/* ---- mobile ---- */
@media (max-width: 760px) {
  .tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 8px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }

  .tabs button {
    flex-shrink: 0;
  }

  .gallery {
    grid-template-columns: 1fr;
  }

  .media:first-child {
    aspect-ratio: 16 / 10;
  }
}
</style>
