// Language selection state. UI only for now — no translations are wired up yet
// (content is still changing; i18n comes later). When ready, read `lang` to pick
// the active locale. The choice persists in localStorage and updates <html lang>.
import { ref } from 'vue'

export const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hr', label: 'Hrvatski', short: 'HR' },
  { code: 'es', label: 'Español', short: 'ES' },
  // Ukrainian: ISO 639-1 language code is `uk`; shown as UA to match the flag and
  // avoid visual confusion with the UK (English) entry.
  { code: 'uk', label: 'Українська', short: 'UA' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
]

function initialLang() {
  try {
    const stored = localStorage.getItem('lang')
    if (languages.some((l) => l.code === stored)) return stored
  } catch {
    /* ignore */
  }
  return 'en'
}

export const lang = ref(initialLang())

export function setLang(code) {
  if (!languages.some((l) => l.code === code)) return
  lang.value = code
  try {
    localStorage.setItem('lang', code)
  } catch {
    /* ignore */
  }
  if (typeof document !== 'undefined') document.documentElement.lang = code
}

// keep <html lang> in sync from the start
if (typeof document !== 'undefined') document.documentElement.lang = lang.value
