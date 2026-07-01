<script setup>
import { computed, ref } from 'vue'
import { templates, sections, simpleGroups } from '@/catalog.js'
import { t, plural } from '@/i18n.js'
import CatalogDialog from '@/components/CatalogDialog.vue'

const section = ref('simple') // 'simple' | 'ecommerce'
const sub = ref('all') // industry sub-filter, only used within the simple section
const selected = ref(null)

function selectSection(key) {
  section.value = key
  sub.value = 'all'
}

const items = computed(() => {
  if (section.value === 'ecommerce') return templates.value.filter((tpl) => tpl.kind === 'ecommerce')
  return templates.value.filter(
    (tpl) => tpl.kind === 'simple' && (sub.value === 'all' || tpl.group === sub.value),
  )
})

const countLabel = computed(() => {
  const n = items.value.length
  const forms = section.value === 'ecommerce' ? t('work.countStore') : t('work.countTemplate')
  return `${n} ${plural(n, forms)}`
})
</script>

<template>
  <section class="section page-section">
    <div class="container">
      <header class="page-head" v-reveal>
        <p class="eyebrow">{{ t('work.eyebrow') }}</p>
        <h1>{{ t('work.h1') }}</h1>
        <p class="lede">
          {{ t('work.lede').before }} {{ templates.length }}
          {{ t('work.lede').after }}
        </p>
      </header>

      <div class="section-tabs" role="tablist" :aria-label="t('work.sectionsAria')" v-reveal>
        <button
          v-for="s in sections"
          :key="s.key"
          type="button"
          role="tab"
          :aria-selected="section === s.key"
          :class="{ active: section === s.key }"
          @click="selectSection(s.key)"
        >
          {{ s.label }}
        </button>
      </div>

      <div class="toolbar" v-reveal>
        <div v-if="section === 'simple'" class="filters">
          <button
            v-for="g in simpleGroups"
            :key="g.key"
            type="button"
            :class="{ active: sub === g.key }"
            @click="sub = g.key"
          >
            {{ g.label }}
          </button>
        </div>
        <p v-else class="section-note">
          {{ t('work.sectionNote') }}
        </p>
        <span class="count">{{ countLabel }}</span>
      </div>

      <div class="grid">
        <article v-for="item in items" :key="item.id" class="card">
          <button type="button" class="card-main" @click="selected = item">
            <div class="thumb">
              <img :src="item.card" alt="" loading="lazy" decoding="async" />
              <span class="kind">{{ item.kind === 'ecommerce' ? t('work.badge.ecommerce') : t('work.badge.landing') }}</span>
            </div>
            <div class="meta">
              <h3>{{ item.title }}</h3>
              <p class="cat">{{ item.category }}</p>
              <p class="blurb">{{ item.blurb }}</p>
              <span class="action">{{ t('work.previewAction') }}</span>
            </div>
          </button>
          <a
            v-if="item.live"
            class="live-badge"
            :href="item.live"
            target="_blank"
            rel="noopener"
            :aria-label="t('work.liveAria')(item.title)"
          >
            {{ t('work.liveBadge') }}
          </a>
        </article>
      </div>

      <div class="tpl-cta" v-reveal>
        <p>{{ t('work.ctaText') }}</p>
        <router-link class="btn btn-primary" to="/contact">{{ t('nav.cta') }}</router-link>
      </div>
    </div>

    <CatalogDialog :item="selected" @close="selected = null" />
  </section>
</template>

<style scoped>
/* primary section toggle */
.section-tabs {
  display: inline-flex;
  gap: 4px;
  padding: 5px;
  margin-bottom: 22px;
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: 999px;
}

.section-tabs button {
  padding: 10px 22px;
  border: none;
  background: transparent;
  border-radius: 999px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14.5px;
  color: var(--ink-soft);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}

.section-tabs button:hover {
  color: var(--ink);
}

.section-tabs button.active {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 6px 16px -8px rgba(30, 70, 196, 0.7);
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
}

.section-note {
  font-size: 14px;
  color: var(--muted);
  max-width: 56ch;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.filters button {
  padding: 9px 18px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-soft);
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}

.filters button:hover {
  border-color: var(--ink);
}

.filters button.active {
  border-color: var(--accent);
  background: var(--accent);
  color: #fff;
}

.count {
  margin-left: auto;
  font-size: 13.5px;
  color: var(--muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 20px;
}

.card {
  position: relative;
  display: flex;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

/* The whole card (minus the Live badge) opens the screenshot preview. */
.card-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
  border-color: var(--accent);
}

/* Opens the actual deployed template in a new tab — sibling of the preview
   button (not nested) so the markup stays valid and both stay focusable. */
.live-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #fff;
  background: var(--accent);
  padding: 4px 10px;
  border-radius: 999px;
  text-decoration: none;
  box-shadow: 0 4px 12px -4px rgba(30, 70, 196, 0.75);
  transition: background 0.15s ease, transform 0.15s ease;
}

.live-badge:hover {
  background: var(--accent-deep);
  transform: translateY(-1px);
}

.thumb {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg-soft);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.4s ease;
}

.card:hover .thumb img {
  transform: scale(1.04);
}

.kind {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #fff;
  background: rgba(15, 26, 56, 0.74);
  padding: 3px 9px;
  border-radius: 999px;
}

.meta {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 18px 18px;
}

.meta h3 {
  font-size: 17px;
}

.meta .cat {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--accent-deep);
  margin-top: 5px;
}

.meta .blurb {
  margin-top: 9px;
  font-size: 14px;
  color: var(--muted);
  flex: 1;
}

.meta .action {
  margin-top: 14px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13.5px;
  color: var(--ink);
}

.card:hover .action {
  color: var(--accent);
}

.tpl-cta {
  margin-top: clamp(40px, 6vw, 60px);
  padding-top: clamp(28px, 4vw, 40px);
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.tpl-cta p {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(18px, 2.4vw, 22px);
}

@media (max-width: 560px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .count {
    flex-basis: 100%;
    margin-left: 0;
  }

  .section-tabs {
    display: flex;
    width: 100%;
  }

  .section-tabs button {
    flex: 1;
    padding: 10px 8px;
    font-size: 13px;
  }
}
</style>
