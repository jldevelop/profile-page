<script setup>
import { ref } from 'vue'
import { profile, contact } from '@/content.js'

const state = ref('idle') // idle | sending | sent | error

async function submit(event) {
  const data = Object.fromEntries(new FormData(event.target))
  if (data._honey) return // spam bot filled the honeypot
  state.value = 'sending'
  try {
    const res = await fetch(contact.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        _subject: `Profile site — message from ${data.name}`,
      }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    state.value = 'sent'
  } catch {
    state.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="section contact">
    <div class="container contact-grid">
      <div v-reveal>
        <p class="eyebrow">Contact</p>
        <h2>{{ contact.title }}</h2>
        <p class="pitch">{{ contact.pitch }}</p>
        <ul class="direct">
          <li>
            <a class="direct-mail" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          </li>
          <li><a :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn ↗</a></li>
          <li><a :href="profile.upwork" target="_blank" rel="noopener">Upwork ↗</a></li>
          <li><a :href="profile.cvPath" :download="profile.cvFileName">Download CV ↓</a></li>
        </ul>
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
            <span>Message</span>
            <textarea name="message" rows="5" required></textarea>
          </label>
          <input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" class="honey" />
          <button class="btn btn-primary" type="submit" :disabled="state === 'sending'">
            {{ state === 'sending' ? 'Sending…' : 'Send message' }}
          </button>
          <p v-if="state === 'error'" class="form-error">
            Something went wrong — please email me directly at
            <a :href="`mailto:${profile.email}`">{{ profile.email }}</a
            >.
          </p>
        </form>
        <div v-else class="form-sent">
          <h3>Thanks — message sent.</h3>
          <p>I’ll get back to you within a day.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--dark);
  color: var(--on-dark);
}

.contact h2 {
  font-size: clamp(34px, 5vw, 52px);
  margin-top: 10px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 6vw, 72px);
  align-items: start;
}

.pitch {
  margin-top: 18px;
  color: var(--on-dark-muted);
  font-size: 16.5px;
  max-width: 460px;
}

.direct {
  list-style: none;
  margin: 30px 0 0;
  padding: 0;
  display: grid;
  gap: 12px;
}

.direct a {
  color: var(--on-dark);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1.5px solid var(--dark-soft);
  padding-bottom: 2px;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.direct a:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.direct-mail {
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 600;
}

.form-card {
  background: var(--dark-soft);
  border: 1px solid #2b313a;
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
  color: var(--on-dark-muted);
}

input,
textarea {
  width: 100%;
  background: var(--dark);
  border: 1px solid #2b313a;
  border-radius: 10px;
  color: var(--on-dark);
  font-family: var(--font-body);
  font-size: 15px;
  padding: 12px 14px;
  transition: border-color 0.15s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
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
  color: #f5a695;
}

.form-error a {
  color: var(--on-dark);
}

.form-sent h3 {
  font-size: 20px;
}

.form-sent p {
  margin-top: 8px;
  color: var(--on-dark-muted);
}

@media (max-width: 820px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
