<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { company, contact } from '@/content.js'
import { templates } from '@/catalog.js'
import { t } from '@/i18n.js'

// Service the enquiry is about. Mirrors the four pillars; the showcase modal and
// service cards can pre-select one via a ?type= query param.
const PROJECT_TYPE_VALUES = ['website', 'ecommerce', 'mobile', 'ai', 'other']
const PROJECT_TYPES = computed(() =>
  PROJECT_TYPE_VALUES.map((value) => ({ value, label: t(`contact.projectTypes.${value}`) })),
)

const route = useRoute()
const projectType = ref(PROJECT_TYPES.value.some((pt) => pt.value === route.query.type) ? route.query.type : '')

// Template reference forwarded from the showcase preview ("Build me one like
// this" passes ?ref=WEB-14 / SHOP-03 / CLUB-02). Shown as a screenshot card
// beside the form (chip fallback if the code doesn't resolve) and included in
// the submitted enquiry.
const templateRef = ref(
  typeof route.query.ref === 'string' && /^[A-Z]{2,6}-\d{1,3}$/.test(route.query.ref) ? route.query.ref : '',
)
// Resolve the code to the (localized) template for the visual reference card.
const refTemplate = computed(() =>
  templateRef.value ? templates.value.find((tpl) => tpl.code === templateRef.value) ?? null : null,
)

const state = ref('idle') // idle | sending | sent | error

async function submit(event) {
  const data = Object.fromEntries(new FormData(event.target))
  if (data._honey) return // spam bot filled the honeypot
  state.value = 'sending'
  const typeLabel = PROJECT_TYPES.value.find((pt) => pt.value === projectType.value)?.label || ''
  let subject = t('contact.buildSubject')(typeLabel || t('contact.subjectFallback'), data.name)
  if (templateRef.value) subject += ` · ${templateRef.value}`
  try {
    const res = await fetch(company.value.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        projectType: typeLabel,
        ...(templateRef.value ? { template: templateRef.value } : {}),
        message: data.message,
        _subject: subject,
      }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    state.value = 'sent'
  } catch {
    state.value = 'error'
  }
}

const whatsappHref = company.value.whatsapp ? `https://wa.me/${company.value.whatsapp}` : null
const phoneHref = company.value.phone ? `tel:${company.value.phone}` : null
const socials = Object.entries({
  LinkedIn: company.value.socials.linkedin,
  GitHub: company.value.socials.github,
  Instagram: company.value.socials.instagram,
}).filter(([, url]) => url)
</script>

<template>
  <section class="section page-section contact">
    <div class="container">
      <header class="page-head" v-reveal>
        <p class="eyebrow">{{ t('nav.contact') }}</p>
        <h1>{{ contact.title }}</h1>
        <p class="lede">{{ contact.pitch }}</p>
      </header>

      <div class="contact-grid">
        <div class="methods" v-reveal>
          <!-- Screenshot of the design this enquiry refers to (?ref=WEB-14) -->
          <aside v-if="refTemplate" class="ref-card">
            <router-link
              class="ref-link"
              :to="`/work/${refTemplate.id}`"
              :aria-label="t('contact.refOpenAria')(refTemplate.title)"
            >
              <span class="ref-thumb">
                <img :src="refTemplate.card" alt="" decoding="async" />
                <span class="ref-code">{{ refTemplate.code }}</span>
              </span>
              <span class="ref-meta">
                <span class="ref-label">{{ t('contact.refLabel') }}</span>
                <span class="ref-title">{{ refTemplate.title }}</span>
                <span v-if="refTemplate.category !== refTemplate.title" class="ref-cat">{{ refTemplate.category }}</span>
              </span>
            </router-link>
            <button
              class="ref-remove"
              type="button"
              :aria-label="t('contact.refRemoveAria')"
              @click="templateRef = ''"
            >
              ✕
            </button>
          </aside>

          <a class="method" :href="`mailto:${company.email}`">
            <span class="m-label">{{ t('contact.methods.email') }}</span>
            <span class="m-value">{{ company.email }}</span>
          </a>

          <a v-if="whatsappHref" class="method" :href="whatsappHref" target="_blank" rel="noopener">
            <span class="m-label">{{ t('contact.methods.whatsapp') }}</span>
            <span class="m-value">{{ t('contact.methods.whatsappCta') }}</span>
          </a>

          <a v-if="phoneHref" class="method" :href="phoneHref">
            <span class="m-label">{{ t('contact.methods.phone') }}</span>
            <span class="m-value">{{ company.phone }}</span>
          </a>

          <div class="method static">
            <span class="m-label">{{ t('contact.methods.basedIn') }}</span>
            <span class="m-value">{{ company.location }}</span>
          </div>

          <div v-if="socials.length" class="socials">
            <a v-for="[label, url] in socials" :key="label" :href="url" target="_blank" rel="noopener">
              {{ label }} ↗
            </a>
          </div>
        </div>

        <div class="form-card" v-reveal>
          <form v-if="state !== 'sent'" @submit.prevent="submit">
            <!-- text fallback, only when the code can't be resolved to a template -->
            <div v-if="templateRef && !refTemplate" class="ref-chip">
              <span>{{ t('contact.refLabel') }} <b>{{ templateRef }}</b></span>
              <button type="button" :aria-label="t('contact.refRemoveAria')" @click="templateRef = ''">✕</button>
            </div>
            <div class="field">
              <span class="field-label">{{ t('contact.helpLabel') }}</span>
              <div class="type-options" role="group" :aria-label="t('contact.helpLabel')">
                <button
                  v-for="pt in PROJECT_TYPES"
                  :key="pt.value"
                  type="button"
                  class="type-btn"
                  :class="{ active: projectType === pt.value }"
                  :aria-pressed="projectType === pt.value"
                  @click="projectType = pt.value"
                >
                  {{ pt.label }}
                </button>
              </div>
            </div>
            <label>
              <span>{{ t('contact.nameLabel') }}</span>
              <input name="name" type="text" required autocomplete="name" />
            </label>
            <label>
              <span>{{ t('contact.emailLabel') }}</span>
              <input name="email" type="email" required autocomplete="email" />
            </label>
            <label>
              <span>{{ t('contact.messageLabel') }}</span>
              <textarea name="message" rows="5" required></textarea>
            </label>
            <input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" class="honey" />
            <button class="btn btn-primary" type="submit" :disabled="state === 'sending'">
              {{ state === 'sending' ? t('contact.sending') : t('contact.send') }}
            </button>
            <p v-if="state === 'error'" class="form-error">
              {{ t('contact.errorPrefix') }}
              <a :href="`mailto:${company.email}`">{{ company.email }}</a>.
            </p>
          </form>
          <div v-else class="form-sent">
            <h3>{{ t('contact.sentTitle') }}</h3>
            <p>{{ t('contact.sentBody') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(28px, 5vw, 64px);
  align-items: start;
}

.methods {
  display: grid;
  gap: 12px;
}

/* ---- referenced-design card (?ref=WEB-14) ---- */
.ref-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--accent);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 12px 32px -18px rgba(30, 70, 196, 0.45);
  margin-bottom: 6px;
}

.ref-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.ref-thumb {
  display: block;
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg-soft);
}

.ref-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.4s ease;
}

.ref-link:hover .ref-thumb img {
  transform: scale(1.04);
}

.ref-code {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 11.5px;
  letter-spacing: 0.05em;
  color: #fff;
  background: rgba(15, 26, 56, 0.78);
  padding: 3px 9px;
  border-radius: 999px;
  font-variant-numeric: tabular-nums;
}

.ref-meta {
  display: grid;
  gap: 2px;
  padding: 13px 16px 15px;
}

.ref-label {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-deep);
}

.ref-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16.5px;
  margin-top: 2px;
}

.ref-link:hover .ref-title {
  color: var(--accent);
}

.ref-cat {
  font-size: 13px;
  color: var(--muted);
}

.ref-remove {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--ink);
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(15, 26, 56, 0.25);
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
}

.ref-remove:hover {
  background: #fff;
  color: var(--accent-deep);
  transform: scale(1.06);
}

.method {
  display: grid;
  gap: 3px;
  padding: 16px 20px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease, transform 0.15s ease;
}

a.method:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.m-label {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.m-value {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
}

.m-value.muted {
  color: var(--muted);
  font-weight: 500;
  font-size: 14.5px;
}

.method.static,
.method.is-placeholder {
  cursor: default;
}

.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 6px;
  padding-left: 4px;
  font-size: 14.5px;
}

.socials a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 500;
}

.socials a:hover {
  color: var(--accent);
}

.form-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: clamp(22px, 3.5vw, 34px);
}

form {
  display: grid;
  gap: 16px;
}

/* forwarded template reference (?ref=WEB-14) */
.ref-chip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 14px;
  background: var(--accent-soft);
  border: 1px solid var(--accent);
  border-radius: 10px;
  font-size: 14px;
  color: var(--accent-deep);
}

.ref-chip b {
  font-family: var(--font-display);
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
}

.ref-chip button {
  border: none;
  background: transparent;
  color: var(--accent-deep);
  font-size: 14px;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 6px;
}

.ref-chip button:hover {
  background: rgba(30, 70, 196, 0.12);
}

.field {
  display: grid;
  gap: 9px;
}

.field-label {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink-soft);
}

.type-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.type-btn {
  padding: 8px 14px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 999px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13.5px;
  color: var(--ink-soft);
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}

.type-btn:hover {
  border-color: var(--ink);
}

.type-btn.active {
  border-color: var(--accent);
  background: var(--accent);
  color: #fff;
}

label {
  display: grid;
  gap: 7px;
}

label span {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink-soft);
}

input,
textarea {
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 10px;
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 15px;
  padding: 12px 14px;
  transition: border-color 0.15s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

textarea {
  resize: vertical;
}

button[disabled] {
  opacity: 0.6;
  cursor: wait;
}

.honey {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.form-error {
  font-size: 14px;
  color: var(--accent-deep);
}

.form-sent h3 {
  font-size: 22px;
}

.form-sent p {
  margin-top: 8px;
  color: var(--muted);
}

@media (max-width: 820px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
