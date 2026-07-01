// Flat UI-copy dictionary lookup, driven by src/lang.js. Structured/data-shaped
// copy (team bios, catalog blurbs) lives closer to its data in content.js /
// content.hr.js / catalog.js / catalog.hr.js instead — this file is only for
// the strings hardcoded in component templates (nav, buttons, headings, a11y).
import { lang } from '@/lang.js'
import en from '@/locales/en.js'
import hr from '@/locales/hr.js'

const DICT = { en, hr }

function resolve(dict, path) {
  return path.split('.').reduce((node, key) => (node == null ? node : node[key]), dict)
}

// t('nav.work') -> string | array | object at that path, from the active locale,
// falling back to English if missing there (and to the key itself as a last resort
// so a missing translation is visible/obvious instead of blank).
export function t(path) {
  const value = resolve(DICT[lang.value], path)
  if (value !== undefined) return value
  const fallback = resolve(DICT.en, path)
  return fallback !== undefined ? fallback : path
}

// Croatian plural categories (CLDR "hr" rule): 1, 21, 31... -> one;
// 2-4, 22-24, 32-34... -> few; everything else (incl. 11-14) -> other.
// English only ever needs one/other; few naturally collapses into other.
const PLURAL_RULES = {
  en: (n) => (n === 1 ? 'one' : 'other'),
  hr: (n) => {
    const mod10 = n % 10
    const mod100 = n % 100
    if (mod10 === 1 && mod100 !== 11) return 'one'
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return 'few'
    return 'other'
  },
}

// plural(n, {one, few, other}) -> the form matching n in the active locale.
// `few` is optional (English callers can omit it — falls back to `other`).
export function plural(n, forms) {
  const rule = PLURAL_RULES[lang.value] || PLURAL_RULES.en
  const category = rule(Math.abs(n))
  return forms[category] ?? forms.other
}
