<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { languages, lang, setLang } from '@/lang.js'
import FlagIcon from './FlagIcon.vue'

const open = ref(false)
const root = ref(null)
const current = computed(() => languages.find((l) => l.code === lang.value) || languages[0])

function choose(code) {
  setLang(code)
  open.value = false
}

function onDocPointer(e) {
  if (root.value && !root.value.contains(e.target)) open.value = false
}
function onKey(e) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocPointer)
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocPointer)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="lang" ref="root">
    <button
      class="lang-btn"
      type="button"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-label="`Language: ${current.label}`"
      @click="open = !open"
    >
      <FlagIcon :code="current.code" />
      <span class="lang-code">{{ current.short }}</span>
      <svg class="caret" :class="{ up: open }" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M2.5 4.5 L6 8 L9.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <Transition name="lang-pop">
      <ul v-if="open" class="lang-menu" role="listbox" aria-label="Select language">
        <li v-for="l in languages" :key="l.code">
          <button
            type="button"
            role="option"
            :aria-selected="l.code === lang"
            :class="{ active: l.code === lang }"
            @click="choose(l.code)"
          >
            <FlagIcon :code="l.code" />
            <span class="name">{{ l.label }}</span>
            <span v-if="l.code === lang" class="check" aria-hidden="true">✓</span>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.lang {
  position: relative;
  flex-shrink: 0;
}

.lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 36px;
  padding: 0 10px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 10px;
  color: var(--on-dark);
  cursor: pointer;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13px;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.lang-btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.06);
}

.lang-code {
  letter-spacing: 0.04em;
}

.caret {
  width: 11px;
  height: 11px;
  color: var(--on-dark-muted);
  transition: transform 0.18s ease;
}

.caret.up {
  transform: rotate(180deg);
}

.lang-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 170px;
  margin: 0;
  padding: 6px;
  list-style: none;
  background: var(--surface);
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 18px 40px -16px rgba(15, 26, 56, 0.45);
  z-index: 60;
}

.lang-menu button {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 10px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink);
  cursor: pointer;
  text-align: left;
}

.lang-menu button:hover {
  background: var(--bg-soft);
}

.lang-menu button.active {
  color: var(--accent);
  font-weight: 600;
}

.name {
  flex: 1;
}

.check {
  color: var(--accent);
  font-size: 13px;
}

.lang-pop-enter-active,
.lang-pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.lang-pop-enter-from,
.lang-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
