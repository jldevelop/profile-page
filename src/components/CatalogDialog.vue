<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({ item: { type: Object, default: null } })
const emit = defineEmits(['close'])

const panelEl = ref(null)
let trigger = null // element to restore focus to on close

function focusables() {
  if (!panelEl.value) return []
  return [
    ...panelEl.value.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
  ]
}

function onKey(e) {
  if (!props.item) return
  if (e.key === 'Escape') {
    emit('close')
    return
  }
  if (e.key === 'Tab') {
    const els = focusables()
    if (!els.length) return
    const first = els[0]
    const last = els[els.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

// Lock body scroll + manage focus while the dialog is open.
watch(
  () => props.item,
  (v, old) => {
    document.body.style.overflow = v ? 'hidden' : ''
    if (v && !old) {
      trigger = document.activeElement
      nextTick(() => (focusables()[0] || panelEl.value)?.focus())
    } else if (!v && old) {
      trigger?.focus?.()
      trigger = null
    }
  },
)

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="item"
        class="overlay"
        @click.self="emit('close')"
      >
        <div
          ref="panelEl"
          class="panel"
          role="dialog"
          aria-modal="true"
          :aria-label="`${item.title} preview`"
          tabindex="-1"
        >
          <header class="panel-head">
            <div class="titles">
              <h2>{{ item.title }}</h2>
              <p class="cat">{{ item.category }}</p>
            </div>
            <div class="actions">
              <a
                v-if="item.live"
                class="btn btn-primary btn-small"
                :href="item.live"
                target="_blank"
                rel="noopener"
              >
                Visit live site ↗
              </a>
              <button class="close" type="button" aria-label="Close preview" @click="emit('close')">✕</button>
            </div>
          </header>

          <div class="scroll">
            <img
              v-if="item.full"
              :src="item.full"
              :alt="`${item.title} — full page preview`"
              decoding="async"
            />
            <p v-else class="noimg">Preview coming soon.</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(8, 13, 33, 0.74);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(12px, 3vw, 36px);
}

.panel {
  display: flex;
  flex-direction: column;
  width: min(100%, 1040px);
  max-height: 92vh;
  background: var(--bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 70px -20px rgba(0, 0, 0, 0.6);
}

.panel:focus {
  outline: none;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px clamp(16px, 2.5vw, 24px);
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  flex-shrink: 0;
}

.titles h2 {
  font-size: clamp(18px, 2.4vw, 23px);
}

.cat {
  font-size: 13px;
  color: var(--muted);
  margin-top: 3px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.close {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--ink);
  font-size: 15px;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.close:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* flex:1 + min-height:0 lets this shrink to the panel height so the tall
   full-page screenshot scrolls inside instead of being clipped. */
.scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  background: var(--bg-soft);
}

.scroll img {
  width: 100%;
  display: block;
}

.noimg {
  padding: 60px 20px;
  text-align: center;
  color: var(--muted);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
