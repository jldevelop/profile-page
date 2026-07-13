<script setup>
// TEMPORARY internal tool (not linked anywhere, noindex): drag & drop the
// template thumbnails into the desired /work order, then copy the resulting
// array of ids to hardcode as the fixed grid order. Delete when done.
// Progress persists to localStorage on every drop, so the page can be
// refreshed / revisited mid-sort without losing the order.
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { templates, simpleGroups } from '@/catalog.js'

const STORAGE_KEY = 'jcode-sort-templates-order'

// The final order (hardcoded in catalog.js on 2026-07-13) - the tool now
// starts from the live order, in case another pass is ever needed.
const DRAFT_ORDER = [
  '56-cybersecurity-software',
  '73-nail-studio',
  '13-construction-company',
  '52-project-management-saas',
  '72-hair-colour-studio',
  '21-personal-profile-portfolio',
  '09-dental-clinic',
  '77-luxury-real-estate',
  '78-fine-dining-restaurant',
  '30-saas-product',
  '40-musician-band',
  '31-mobile-app',
  '55-developer-tool-api-platform',
  '41-nonprofit-charity',
  '33-digital-marketing-agency',
  '06-barbershop',
  '70-brewery-winery',
  '50-daycare-preschool',
  'nc02-volt',
  '38-podcast',
  '54-analytics-dashboard-saas',
  '32-tech-startup',
  '10-medical-practice',
  '59-sports-club-team',
  '14-home-services-plumbing-electric',
  '46-car-dealership',
  'e03-streetwear',
  '19-photography-studio',
  '08-nail-salon',
  '05-hair-salon',
  '23-personal-trainer',
  '15-cleaning-service',
  '66-coworking-space',
  '39-author-book-launch',
  '43-pet-grooming',
  '35-single-product-dtc',
  '76-corporate-law',
  '65-recruitment-staffing-agency',
  'nc01-beton',
  '53-ai-productivity-saas',
  '22-freelancer-consultant',
  'e08-premium-denim',
  '42-church-faith-community',
  '24-gym-fitness-studio',
  '60-esports-team-org',
  '25-yoga-pilates-studio',
  '57-video-game-game-studio',
  '58-desktop-creative-software',
  '61-sports-academy-coaching',
  'e17-skincare',
  '62-marathon-sporting-event',
  '36-online-course-e-learning',
  '45-auto-repair-shop',
  '29-tour-operator',
  '47-bakery',
  '51-crm-saas',
  '69-fashion-boutique',
  '75-startup-law',
  '63-insurance-agency',
  '04-single-property-listing',
  '67-conference-summit',
  '49-catering-service',
  '34-online-store-multi-product',
  'nc03-aurora',
  'e11-sneakers-footwear',
  'e07-lingerie-intimates',
  'e14-swimwear',
  'e02-mens-tailored-clothing',
  'e01-womens-fashion-boutique',
  'e04-luxury-fashion-house',
  'e09-vintage-thrift',
  'e06-activewear-athleisure',
  'e10-kids-clothing',
  '02-coffee-shop',
  'e12-eyewear-sunglasses',
  'e13-handbags-leather-goods',
  'e15-eco-sneakers',
  'e16-accessories-scarves-hats',
  'e18-makeup',
  'e19-natural-organic-beauty',
  'e20-perfume-fragrance',
  '07-beauty-spa-wellness',
  '44-veterinary-clinic',
  '71-hairdressing-salon',
  '16-landscaping-gardening',
  '12-financial-advisor',
  '74-law-firm',
]

const pick = ({ id, code, title, card, kind, group }) => ({ id, code, title, card, kind, group })

// Order of precedence: localStorage (work in progress) → the saved draft
// above → catalog order. Ids that no longer exist (e.g. newly hidden) are
// dropped; templates missing from the saved order (e.g. newly unhidden)
// are appended at the end so nothing ever disappears from the tool.
function seedList() {
  const all = templates.value.map(pick)
  const byId = new Map(all.map((t) => [t.id, t]))
  let saved = null
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  } catch { /* corrupted state - fall back to the draft */ }
  const source = Array.isArray(saved) && saved.length ? saved : DRAFT_ORDER
  const ordered = source.map((id) => byId.get(id)).filter(Boolean)
  const seen = new Set(ordered.map((t) => t.id))
  for (const t of all) if (!seen.has(t.id)) ordered.push(t)
  return ordered
}

const list = ref(seedList())
const savedFlash = ref(false)
let savedTimer = null

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.value.map((t) => t.id)))
    savedFlash.value = true
    clearTimeout(savedTimer)
    savedTimer = setTimeout(() => (savedFlash.value = false), 1200)
  } catch { /* storage full/blocked - dragging still works, just no persistence */ }
}

/* ---------- Category filter ----------
   "All" behaves exactly as before. A category view shows only that group and
   reordering inside it is SLOT-STABLE: the group's members swap around the
   global positions the group already occupies, so templates from other
   categories never move. E-commerce is matched by kind (its group is 'all'). */
const filter = ref('all')

const chips = computed(() => [
  { key: 'all', label: 'All' },
  ...simpleGroups.value.filter((g) => g.key !== 'all'),
  { key: 'ecommerce', label: 'E-commerce' },
])

function matches(t, key) {
  if (key === 'all') return true
  if (key === 'ecommerce') return t.kind === 'ecommerce'
  return t.group === key && t.kind !== 'ecommerce'
}

const chipCounts = computed(() => {
  const counts = {}
  for (const c of chips.value) counts[c.key] = list.value.filter((t) => matches(t, c.key)).length
  return counts
})

const view = computed(() =>
  filter.value === 'all' ? list.value : list.value.filter((t) => matches(t, filter.value)),
)

function setFilter(key) {
  filter.value = key
  dragIndex.value = null
}

/* Global 1-based position of a tile, shown on the badge even when filtered. */
function globalPos(item) {
  return list.value.indexOf(item) + 1
}

const dragIndex = ref(null)

function onDragStart(i, e) {
  dragIndex.value = i
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', String(i))
  startAutoScroll()
}

function onDragOver(i, e) {
  e.preventDefault()
  if (dragIndex.value === null || dragIndex.value === i) return
  const l = list.value
  if (filter.value === 'all') {
    const [moved] = l.splice(dragIndex.value, 1)
    l.splice(i, 0, moved)
  } else {
    // Reorder within the filtered subset, then write the subset back into
    // the same global slots it already occupied.
    const slots = []
    l.forEach((t, gi) => {
      if (matches(t, filter.value)) slots.push(gi)
    })
    const subset = slots.map((gi) => l[gi])
    const [moved] = subset.splice(dragIndex.value, 1)
    subset.splice(i, 0, moved)
    slots.forEach((gi, k) => {
      l[gi] = subset[k]
    })
  }
  dragIndex.value = i
}

function onDrop(e) {
  e.preventDefault()
}

function onDragEnd() {
  dragIndex.value = null
  stopAutoScroll()
  persist()
}

/* ---------- Edge auto-scroll while dragging ----------
   Native HTML5 drag blocks wheel scrolling, so the page scrolls itself when
   the pointer nears the top or bottom edge of the viewport. */
const EDGE = 140
const MAX_SPEED = 26
let rafId = null
let lastClientY = null

function onDocDragOver(e) {
  lastClientY = e.clientY
}

function autoScrollTick() {
  if (lastClientY !== null) {
    const vh = window.innerHeight
    let dy = 0
    if (lastClientY < EDGE) dy = -MAX_SPEED * (1 - lastClientY / EDGE)
    else if (lastClientY > vh - EDGE) dy = MAX_SPEED * (1 - (vh - lastClientY) / EDGE)
    if (dy) window.scrollBy(0, dy)
  }
  rafId = requestAnimationFrame(autoScrollTick)
}

function startAutoScroll() {
  document.addEventListener('dragover', onDocDragOver)
  if (rafId === null) rafId = requestAnimationFrame(autoScrollTick)
}

function stopAutoScroll() {
  document.removeEventListener('dragover', onDocDragOver)
  if (rafId !== null) cancelAnimationFrame(rafId)
  rafId = null
  lastClientY = null
}

const output = ref('')
const copied = ref(false)
let copiedTimer = null

async function copyOrder() {
  output.value = JSON.stringify(list.value.map((t) => t.id), null, 2)
  try {
    await navigator.clipboard.writeText(output.value)
    copied.value = true
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => (copied.value = false), 2500)
  } catch {
    /* clipboard blocked - the textarea below still shows the array */
  }
}

function resetOrder() {
  if (!window.confirm('Reset to the saved draft order? Your current arrangement in this browser will be discarded.')) return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch { /* ignore */ }
  list.value = seedList()
  output.value = ''
}

let robotsMeta = null
onMounted(() => {
  document.title = 'Sort templates (private) - jCode'
  robotsMeta = document.createElement('meta')
  robotsMeta.name = 'robots'
  robotsMeta.content = 'noindex, nofollow'
  document.head.appendChild(robotsMeta)
})
onUnmounted(() => {
  robotsMeta?.remove()
  clearTimeout(copiedTimer)
  stopAutoScroll()
})
</script>

<template>
  <main class="sortpage">
    <div class="bar">
      <div class="bar-inner">
        <div class="bar-copy">
          <h1>Template ordering</h1>
          <p>
            <template v-if="filter === 'all'">
              Drag any thumbnail to reorder. {{ list.length }} templates.
            </template>
            <template v-else>
              Showing {{ view.length }} of {{ list.length }}. Reordering here swaps templates
              within this category's existing slots; everything else stays put.
            </template>
            Progress autosaves in this browser on every
            drop<span v-if="savedFlash" class="savedflash"> - saved ✓</span>.
            The copied array is always the full order.
          </p>
        </div>
        <div class="bar-actions">
          <button class="btn ghost" type="button" @click="resetOrder">Reset</button>
          <button class="btn primary" type="button" @click="copyOrder">
            {{ copied ? 'Copied ✓' : 'Copy final order' }}
          </button>
        </div>
      </div>
      <div class="chips" role="group" aria-label="Filter by category">
        <button
          v-for="c in chips"
          :key="c.key"
          class="chip"
          :class="{ active: filter === c.key }"
          type="button"
          @click="setFilter(c.key)"
        >
          {{ c.label }} <span class="chip-n">{{ chipCounts[c.key] }}</span>
        </button>
      </div>
    </div>

    <textarea
      v-if="output"
      class="out"
      readonly
      :value="output"
      rows="10"
      @focus="$event.target.select()"
    ></textarea>

    <ol class="grid">
      <li
        v-for="(item, i) in view"
        :key="item.id"
        class="tile"
        :class="{ dragging: dragIndex === i }"
        draggable="true"
        @dragstart="onDragStart(i, $event)"
        @dragover="onDragOver(i, $event)"
        @drop="onDrop"
        @dragend="onDragEnd"
      >
        <span class="pos">{{ globalPos(item) }}</span>
        <img :src="item.card" :alt="item.title" loading="lazy" draggable="false" />
        <span class="meta">
          <span class="code">{{ item.code }}</span>
          <span class="title">{{ item.title }}</span>
        </span>
      </li>
    </ol>
  </main>
</template>

<style scoped>
.sortpage {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 80px;
}

.bar {
  position: sticky;
  /* sit below the site's sticky header (~65px) instead of underneath it */
  top: 65px;
  z-index: 20;
  background: var(--bg);
  border-bottom: 1px solid var(--line);
  margin: 0 -20px;
  padding: 0 20px;
}

.bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 14px 0;
}

.bar-copy h1 {
  font-size: 20px;
}

.bar-copy p {
  font-size: 13px;
  color: var(--muted);
  margin-top: 2px;
}

.savedflash {
  color: var(--accent-deep, var(--accent));
  font-weight: 700;
}

.bar-actions {
  display: flex;
  gap: 10px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 0 12px;
}

.chip {
  padding: 6px 13px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.chip:hover {
  border-color: var(--accent);
}

.chip.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.chip-n {
  opacity: 0.65;
  font-weight: 500;
  font-size: 12px;
  margin-left: 2px;
}

.btn {
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--ink);
}

.btn.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.btn:hover {
  filter: brightness(1.05);
}

.out {
  width: 100%;
  margin-top: 16px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--bg-soft);
  color: var(--ink);
}

.grid {
  list-style: none;
  padding: 0;
  margin: 20px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 14px;
}

.tile {
  position: relative;
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface);
  cursor: grab;
  user-select: none;
}

.tile:active {
  cursor: grabbing;
}

.tile.dragging {
  opacity: 0.35;
  outline: 2px dashed var(--accent);
  outline-offset: -2px;
}

.tile img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  pointer-events: none;
}

.pos {
  position: absolute;
  top: 8px;
  left: 8px;
  min-width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(8, 13, 33, 0.82);
  color: #fff;
  font-size: 12.5px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.meta {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 8px 10px;
  min-width: 0;
}

.code {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--accent-deep, var(--accent));
}

.title {
  font-size: 12.5px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
