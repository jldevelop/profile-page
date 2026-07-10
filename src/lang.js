// Language selection state — drives src/i18n.js. Read `lang` to get the active
// locale; call setLang() to change it. Only en/hr are translated for now — the
// other flags stay in FlagIcon.vue, ready to re-enable once translated.
//
// Resolution order: localStorage (once the visitor has picked a language) →
// browser language → English.
import { ref } from 'vue'

export const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hr', label: 'Hrvatski', short: 'HR' },
]
const DEFAULT_LANG = 'hr'
const STORAGE_KEY = 'lang'

function browserLang() {
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const tag of candidates) {
    const code = tag?.slice(0, 2).toLowerCase()
    if (languages.some((l) => l.code === code)) return code
  }
  return DEFAULT_LANG
}

function initialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (languages.some((l) => l.code === stored)) return stored
  } catch {
    /* ignore */
  }
  try {
    return browserLang()
  } catch {
    return DEFAULT_LANG
  }
}

export const lang = ref(initialLang())

export function setLang(code) {
  if (!languages.some((l) => l.code === code)) return
  lang.value = code
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    /* ignore */
  }
  if (typeof document !== 'undefined') document.documentElement.lang = code
}

// Locale-aware path for internal links: Croatian is the default language at
// the root; English pages live under /en/... so each language has real,
// indexable URLs (SEO/hreflang). Reads `lang`, so template bindings using it
// re-render on locale change.
export function localePath(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  if (lang.value !== 'en') return p
  return p === '/' ? '/en' : `/en${p}`
}

// keep <html lang> in sync from the start
if (typeof document !== 'undefined') document.documentElement.lang = lang.value
