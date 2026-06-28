<script setup>
import { computed, ref } from 'vue'
import { templates, templateGroups } from '@/catalog.js'
import CatalogDialog from '@/components/CatalogDialog.vue'

const active = ref('all')
const selected = ref(null)

const items = computed(() =>
  active.value === 'all' ? templates : templates.filter((t) => t.group === active.value),
)
</script>

<template>
  <section class="section page-section">
    <div class="container">
      <header class="page-head" v-reveal>
        <p class="eyebrow">Website templates</p>
        <h1>Ready-to-adapt website designs</h1>
        <p class="lede">
          A library of {{ templates.length }} production-ready designs — single-page website
          templates across every industry, plus full e-commerce storefronts — a fast, affordable
          starting point that we customise, brand and ship for you. Click any one to preview it
          full-page.
        </p>
      </header>

      <div class="filters" v-reveal>
        <button
          v-for="g in templateGroups"
          :key="g.key"
          type="button"
          :class="{ active: active === g.key }"
          @click="active = g.key"
        >
          {{ g.label }}
        </button>
        <span class="count">{{ items.length }} {{ items.length === 1 ? 'template' : 'templates' }}</span>
      </div>

      <div class="grid">
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          class="card"
          @click="selected = item"
        >
          <div class="thumb">
            <img :src="item.card" alt="" loading="lazy" decoding="async" />
            <span class="kind">Template</span>
          </div>
          <div class="meta">
            <h3>{{ item.title }}</h3>
            <p class="cat">{{ item.category }}</p>
            <p class="blurb">{{ item.blurb }}</p>
            <span class="action">Preview →</span>
          </div>
        </button>
      </div>

      <div class="tpl-cta" v-reveal>
        <p>Found a starting point — or want something fully bespoke?</p>
        <router-link class="btn btn-primary" to="/contact">Start a project</router-link>
      </div>
    </div>

    <CatalogDialog :item="selected" @close="selected = null" />
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
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
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
  border-color: var(--accent);
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
}
</style>
