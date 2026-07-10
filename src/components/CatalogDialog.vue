<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { t } from '@/i18n.js'

const props = defineProps({ item: { type: Object, default: null } })
const emit = defineEmits(['close'])

const panelEl = ref(null)
let trigger = null // element to restore focus to on close

// Share the preview's deep link (/work/<id>) to a specific network via a small
// dropdown: WhatsApp, Instagram, Facebook, Copy URL. Instagram has no web
// share-intent, so that option copies the link and opens Instagram to paste it.
const shareOpen = ref(false)
const shareRoot = ref(null)
const shared = ref(false) // "Link copied ✓" state on the Share button
let sharedTimer = null

async function copyUrl() {
  const url = window.location.href
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

function shareTo(target) {
  const url = window.location.href
  const text = `${props.item.title} (${props.item.code}) — ${url}`
  if (target === 'whatsapp') {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  } else if (target === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,width=640,height=560')
  } else if (target === 'instagram') {
    copyUrl() // no web share-intent — copy the link, then open Instagram to paste
    window.open('https://www.instagram.com/', '_blank', 'noopener')
  } else if (target === 'linkedin') {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,width=640,height=560')
  } else if (target === 'x') {
    window.open(`https://x.com/intent/post?text=${encodeURIComponent(`${props.item.title} (${props.item.code})`)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener')
  } else if (target === 'copy') {
    copyUrl()
  }
  shareOpen.value = false
}

function onDocClick(e) {
  if (shareOpen.value && shareRoot.value && !shareRoot.value.contains(e.target)) shareOpen.value = false
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
    if (shareOpen.value) {
      shareOpen.value = false // close the share menu first, keep the dialog open
      return
    }
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
    shareOpen.value = false
    if (v && !old) {
      trigger = document.activeElement
      nextTick(() => (focusables()[0] || panelEl.value)?.focus())
    } else if (!v && old) {
      trigger?.focus?.()
      trigger = null
    }
  },
)

onMounted(() => {
  document.addEventListener('keydown', onKey)
  document.addEventListener('click', onDocClick)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.removeEventListener('click', onDocClick)
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
              <div class="share" ref="shareRoot">
                <button
                  class="btn btn-ghost btn-small share-btn"
                  type="button"
                  :class="{ shared }"
                  aria-haspopup="menu"
                  :aria-expanded="shareOpen"
                  :aria-label="t('dialog.shareAria')"
                  @click="shareOpen = !shareOpen"
                >
                  <svg v-if="!shared" class="share-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="6" cy="12" r="2.6" /><circle cx="17.5" cy="5.5" r="2.6" /><circle cx="17.5" cy="18.5" r="2.6" />
                    <path d="M8.4 10.8 15 6.9M8.4 13.2l6.6 3.9" />
                  </svg>
                  {{ shared ? t('dialog.shareCopied') : t('dialog.share') }}
                </button>

                <Transition name="share-pop">
                  <ul v-if="shareOpen" class="share-menu" role="menu" :aria-label="t('dialog.shareMenuAria')">
                    <li>
                      <button type="button" role="menuitem" @click="shareTo('whatsapp')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M21 12a9 9 0 0 1-13.2 7.9L3 21l1.2-4.6A9 9 0 1 1 21 12z" />
                          <path d="M9 9.5c.3 2.5 3 5.2 5.5 5.5l1.3-1.3-2-1.2-1 .7c-.8-.4-1.6-1.2-2-2l.7-1-1.2-2L9 9.5z" />
                        </svg>
                        WhatsApp
                      </button>
                    </li>
                    <li>
                      <button type="button" role="menuitem" @click="shareTo('instagram')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                        </svg>
                        Instagram
                      </button>
                    </li>
                    <li>
                      <button type="button" role="menuitem" @click="shareTo('facebook')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M14.5 8.5V7c0-.8.7-1.5 1.5-1.5h1.5V2.8h-2.3a4 4 0 0 0-4 4v1.7H8.9V12h2.3v9h3.3v-9h2.4l.6-3.5h-3z" />
                        </svg>
                        Facebook
                      </button>
                    </li>
                    <li>
                      <button type="button" role="menuitem" @click="shareTo('linkedin')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                          <path d="M8 11v5.5" />
                          <path d="M8 7.6v.1" />
                          <path d="M12 16.5V13a2.2 2.2 0 0 1 4.4 0v3.5" />
                          <path d="M12 11v5.5" />
                        </svg>
                        LinkedIn
                      </button>
                    </li>
                    <li>
                      <button type="button" role="menuitem" @click="shareTo('x')">
                        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
                          <path d="M17.6 3.3h2.9l-6.4 7.3 7.5 10h-5.9l-4.6-6-5.3 6H2.9l6.8-7.8L2.5 3.3h6l4.2 5.5 4.9-5.5z" />
                        </svg>
                        X (Twitter)
                      </button>
                    </li>
                    <li>
                      <button type="button" role="menuitem" @click="shareTo('copy')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <rect x="9" y="9" width="11" height="11" rx="2.5" />
                          <path d="M5.5 14.5A2.5 2.5 0 0 1 4 12.2V6.5A2.5 2.5 0 0 1 6.5 4h5.7A2.5 2.5 0 0 1 14.5 5.5" />
                        </svg>
                        {{ t('dialog.shareCopy') }}
                      </button>
                    </li>
                  </ul>
                </Transition>
              </div>
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

/* share dropdown */
.share {
  position: relative;
}

.share-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 190px;
  margin: 0;
  padding: 6px;
  list-style: none;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 18px 40px -16px rgba(15, 26, 56, 0.45);
  z-index: 10;
}

.share-menu button {
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
  white-space: nowrap;
}

.share-menu button:hover {
  background: var(--bg-soft);
  color: var(--accent-deep);
}

.share-menu svg {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  color: var(--muted);
}

.share-menu button:hover svg {
  color: var(--accent);
}

.share-pop-enter-active,
.share-pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.share-pop-enter-from,
.share-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
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

  .share {
    flex: 1 1 auto;
  }

  .share .btn {
    width: 100%;
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
