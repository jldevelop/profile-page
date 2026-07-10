<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { t } from '@/i18n.js'

const props = defineProps({ item: { type: Object, default: null } })
const emit = defineEmits(['close'])

const panelEl = ref(null)
let trigger = null // element to restore focus to on close

// Share the preview's deep link (/work/<id>): native share sheet where
// available, otherwise copy to clipboard with a brief confirmation.
const shared = ref(false)
let sharedTimer = null

async function share() {
  const url = window.location.href
  if (navigator.share) {
    try {
      await navigator.share({ title: document.title, url })
      return
    } catch (e) {
      if (e?.name === 'AbortError') return // user closed the share sheet
      // fall through to clipboard
    }
  }
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = url
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  shared.value = true
  clearTimeout(sharedTimer)
  sharedTimer = setTimeout(() => (shared.value = false), 2000)
}

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
    shared.value = false
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
          :aria-label="t('dialog.previewAria')(item.title)"
          tabindex="-1"
        >
          <header class="panel-head">
            <div class="titles">
              <h2>{{ item.title }}</h2>
              <p class="cat">
                {{ item.category }}
                <span v-if="item.code" class="code">{{ item.code }}</span>
              </p>
            </div>
            <div class="actions">
              <button
                class="btn btn-ghost btn-small"
                type="button"
                :class="{ shared }"
                :aria-label="t('dialog.shareAria')"
                @click="share"
              >
                <svg v-if="!shared" class="share-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="6" cy="12" r="2.6" /><circle cx="17.5" cy="5.5" r="2.6" /><circle cx="17.5" cy="18.5" r="2.6" />
                  <path d="M8.4 10.8 15 6.9M8.4 13.2l6.6 3.9" />
                </svg>
                {{ shared ? t('dialog.shareCopied') : t('dialog.share') }}
              </button>
              <a
                v-if="item.live"
                class="btn btn-primary btn-small"
                :href="item.live"
                target="_blank"
                rel="noopener"
              >
                {{ t('dialog.openLive') }}
              </a>
              <!-- No @click close here: closing now navigates (back/replace) and would
                   race this link's own navigation. Leaving /work unmounts the dialog,
                   and browser-Back returns to the open preview. -->
              <router-link
                class="btn btn-ghost btn-small"
                :to="{ path: '/contact', query: { type: item.kind === 'ecommerce' ? 'ecommerce' : 'website', ref: item.code } }"
              >
                {{ t('dialog.buildLike') }}
              </router-link>
              <button class="close" type="button" :aria-label="t('dialog.closePreviewAria')" @click="emit('close')">✕</button>
            </div>
          </header>

          <div class="scroll">
            <img
              v-if="item.full"
              :src="item.full"
              :alt="t('dialog.fullPreviewAlt')(item.title)"
              decoding="async"
            />
            <p v-else class="noimg">{{ t('dialog.noImg') }}</p>
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
  /* four actions + title won't always fit on one line — wrap instead of
     overflowing the panel (overflow:hidden was clipping the buttons) */
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 16px;
  padding: 14px clamp(16px, 2.5vw, 24px);
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  flex-shrink: 0;
}

.titles {
  min-width: 0;
}

.titles h2 {
  font-size: clamp(18px, 2.4vw, 23px);
}

.cat {
  font-size: 13px;
  color: var(--muted);
  margin-top: 3px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.code {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 11.5px;
  letter-spacing: 0.05em;
  color: var(--accent-deep);
  background: var(--accent-soft);
  border-radius: 6px;
  padding: 2px 8px;
  font-variant-numeric: tabular-nums;
}

.share-ico {
  width: 15px;
  height: 15px;
}

.actions .btn.shared {
  border-color: var(--accent);
  color: var(--accent-deep);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
  min-width: 0;
  margin-left: auto;
}

.actions .btn {
  white-space: nowrap;
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

@media (max-width: 560px) {
  .panel-head {
    flex-wrap: wrap;
  }

  .actions {
    flex-wrap: wrap;
    gap: 8px;
  }

  .actions .btn {
    flex: 1 1 auto;
    justify-content: center;
  }
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
