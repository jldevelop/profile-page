<script setup>
import { ref } from 'vue'
import { company, contact } from '@/content.js'

const state = ref('idle') // idle | sending | sent | error

async function submit(event) {
  const data = Object.fromEntries(new FormData(event.target))
  if (data._honey) return // spam bot filled the honeypot
  state.value = 'sending'
  try {
    const res = await fetch(company.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        _subject: `jCode — new enquiry from ${data.name}`,
      }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    state.value = 'sent'
  } catch {
    state.value = 'error'
  }
}

const whatsappHref = company.whatsapp ? `https://wa.me/${company.whatsapp}` : null
const phoneHref = company.phone ? `tel:${company.phone}` : null
const socials = Object.entries({
  LinkedIn: company.socials.linkedin,
  GitHub: company.socials.github,
  Instagram: company.socials.instagram,
}).filter(([, url]) => url)
</script>

<template>
  <section class="section page-section contact">
    <div class="container">
      <header class="page-head" v-reveal>
        <p class="eyebrow">Contact</p>
        <h1>{{ contact.title }}</h1>
        <p class="lede">{{ contact.pitch }}</p>
      </header>

      <div class="contact-grid">
        <div class="methods" v-reveal>
          <a class="method" :href="`mailto:${company.email}`">
            <span class="m-label">Email</span>
            <span class="m-value">{{ company.email }}</span>
          </a>

          <a v-if="whatsappHref" class="method" :href="whatsappHref" target="_blank" rel="noopener">
            <span class="m-label">WhatsApp</span>
            <span class="m-value">Message us ↗</span>
          </a>

          <a v-if="phoneHref" class="method" :href="phoneHref">
            <span class="m-label">Phone</span>
            <span class="m-value">{{ company.phone }}</span>
          </a>

          <div class="method static">
            <span class="m-label">Based in</span>
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
            <label>
              <span>Name</span>
              <input name="name" type="text" required autocomplete="name" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" required autocomplete="email" />
            </label>
            <label>
              <span>What can we build for you?</span>
              <textarea name="message" rows="5" required></textarea>
            </label>
            <input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" class="honey" />
            <button class="btn btn-primary" type="submit" :disabled="state === 'sending'">
              {{ state === 'sending' ? 'Sending…' : 'Send message' }}
            </button>
            <p v-if="state === 'error'" class="form-error">
              Something went wrong — please email us directly at
              <a :href="`mailto:${company.email}`">{{ company.email }}</a>.
            </p>
          </form>
          <div v-else class="form-sent">
            <h3>Thanks — message sent.</h3>
            <p>We’ll get back to you within a day.</p>
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
