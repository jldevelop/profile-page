<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { templates, sections, simpleGroups } from '@/catalog.js'
import { t } from '@/i18n.js'
import { localePath } from '@/lang.js'
import CatalogDialog from '@/components/CatalogDialog.vue'

// /work/:id - an open preview is part of the URL, so every template is shareable
// and loads with its dialog open when visited directly.
const props = defineProps({ id: { type: String, default: '' } })
const router = useRouter()

const section = ref('simple') // 'simple' | 'ecommerce'
const sub = ref('all') // category filter, only used within the simple section

// The dialog is driven by the route param - single source of truth.
const selected = computed(() => (props.id ? templates.value.find((tpl) => tpl.id === props.id) ?? null : null))

// Whether the current preview was opened from the grid (push) - then closing
// goes back(); a direct/shared visit instead replaces to /work.
let openedFromGrid = false

function openPreview(item) {
  openedFromGrid = true
  router.push(localePath(`/work/${item.id}`))
}

function closePreview() {
  if (openedFromGrid) {
    openedFromGrid = false
    router.back()
  } else {
    router.replace(localePath('/work'))
  }
}

watch(
  () => props.id,
  (id) => {
    if (!id) {
      openedFromGrid = false
      return
    }
    const item = templates.value.find((tpl) => tpl.id === id)
    if (!item) {
      router.replace(localePath('/work')) // unknown/expired id - just show the grid
      return
    }
    // make sure the right section is active behind the dialog
    section.value = item.kind === 'ecommerce' ? 'ecommerce' : 'simple'
    if (item.kind !== 'ecommerce' && sub.value !== 'all' && item.group !== sub.value) sub.value = 'all'
  },
  { immediate: true },
)

// An open preview owns the tab title (nice for shared links); restore on close.
watch(
  selected,
  (s) => {
    document.title = s ? `${s.title} (${s.code}) - jCode` : t('meta.work.title')
  },
  { immediate: true, flush: 'post' },
)

// Templates render in the fixed, hand-picked order from catalog.js
// (DISPLAY_ORDER) - the same on every visit.
const items = computed(() => {
  if (section.value === 'ecommerce') return templates.value.filter((tpl) => tpl.kind === 'ecommerce')
  return templates.value.filter(
    (tpl) => tpl.kind === 'simple' && (sub.value === 'all' || tpl.group === sub.value),
  )
})

function selectSection(key) {
  section.value = key
  sub.value = 'all'
  filterOpen.value = false
}

// --- category filter dropdown ---
const filterOpen = ref(false)
const filterRoot = ref(null)
const activeGroup = computed(() => simpleGroups.value.find((g) => g.key === sub.value))

function chooseCategory(key) {
  sub.value = key
  filterOpen.value = false
}

function onDocClick(e) {
  if (filterRoot.value && !filterRoot.value.contains(e.target)) filterOpen.value = false
}
function onKey(e) {
  if (e.key === 'Escape') filterOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <section class="section page-section work-page">
    <div class="container">
      <header class="page-head" v-reveal>
        <p class="eyebrow">{{ t('work.eyebrow') }}</p>
        <h1>{{ t('work.h1') }}</h1>
      </header>

      <div class="toolbar" v-reveal>
        <div class="section-tabs" role="tablist" :aria-label="t('work.sectionsAria')">
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

        <div v-if="section === 'simple'" class="filter" ref="filterRoot">
          <button
            class="filter-btn"
            type="button"
            :class="{ engaged: sub !== 'all' }"
            :aria-expanded="filterOpen"
            aria-haspopup="listbox"
            :aria-label="t('work.filterAria')"
            @click="filterOpen = !filterOpen"
          >
            <svg class="funnel" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 5h18l-7 8.5V19l-4 2v-7.5L3 5z" />
            </svg>
            <span v-if="sub !== 'all'" class="filter-label">{{ activeGroup?.label }}</span>
          </button>

          <Transition name="filter-pop">
            <ul v-if="filterOpen" class="filter-menu" role="listbox" :aria-label="t('work.filterAria')">
              <li v-for="g in simpleGroups" :key="g.key">
                <button
                  type="button"
                  role="option"
                  :aria-selected="sub === g.key"
                  :class="{ active: sub === g.key }"
                  @click="chooseCategory(g.key)"
                >
                  <span class="name">{{ g.label }}</span>
                  <span v-if="sub === g.key" class="check" aria-hidden="true">✓</span>
                </button>
              </li>
            </ul>
          </Transition>
        </div>
      </div>

      <div class="grid">
        <article v-for="item in items" :key="item.id" class="card">
          <button type="button" class="card-main" @click="openPreview(item)">
            <div class="thumb">
              <img :src="item.card" alt="" loading="lazy" decoding="async" />
              <span class="kind">{{ item.kind === 'ecommerce' ? t('work.badge.ecommerce') : t('work.badge.landing') }}</span>
            </div>
            <div class="meta">
              <h3>{{ item.title }}</h3>
              <p class="cat">{{ item.category }}</p>
              <p class="blurb">{{ item.blurb }}</p>
              <span class="meta-foot">
                <span class="action">{{ t('work.previewAction') }}</span>
                <span class="code">{{ item.code }}</span>
              </span>
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
        <router-link class="btn btn-primary" :to="localePath('/contact')">{{ t('nav.cta') }}</router-link>
      </div>
    </div>

    <CatalogDialog :item="selected" @close="closePreview" />
  </section>
</template>

<style scoped>
/* Thumbnails are the hero of this page - clear the fixed nav, nothing more. */
.work-page {
  padding-top: clamp(84px, 10vh, 116px);
}

/* Heading stays compact - no lede paragraph, tighter gap so the grid follows fast. */
.page-head {
  margin-bottom: clamp(22px, 3vw, 30px);
}

/* toolbar: section tabs left, filter icon right */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}

.filter {
  position: relative;
  margin-left: auto;
}

/* primary section toggle */
.section-tabs {
  display: inline-flex;
  gap: 4px;
  padding: 5px;
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

/* category filter icon + dropdown */
.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 13px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  color: var(--ink-soft);
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}

.filter-btn:hover {
  border-color: var(--ink);
  color: var(--ink);
}

.filter-btn.engaged {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent-deep);
}

.funnel {
  width: 19px;
  height: 19px;
  flex-shrink: 0;
}

.filter-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13.5px;
  white-space: nowrap;
}

.filter-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 215px;
  margin: 0;
  padding: 6px;
  list-style: none;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 18px 40px -16px rgba(15, 26, 56, 0.45);
  z-index: 60;
}

.filter-menu button {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 11px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink);
  cursor: pointer;
  text-align: left;
}

.filter-menu button:hover {
  background: var(--bg-soft);
}

.filter-menu button.active {
  color: var(--accent);
  font-weight: 600;
}

.filter-menu .name {
  flex: 1;
}

.filter-menu .check {
  color: var(--accent);
  font-size: 13px;
}

.filter-pop-enter-active,
.filter-pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.filter-pop-enter-from,
.filter-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
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

/* Opens the actual deployed template in a new tab - sibling of the preview
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

.meta-foot {
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.meta .action {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13.5px;
  color: var(--ink);
}

.card:hover .action {
  color: var(--accent);
}

/* public reference code - bottom-right corner of the card */
.meta .code {
  flex-shrink: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 11.5px;
  letter-spacing: 0.05em;
  color: var(--muted);
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 2px 8px;
  font-variant-numeric: tabular-nums;
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

  /* tabs take the full row; the filter drops to its own right-aligned row */
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
