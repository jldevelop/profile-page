<script setup>
import { computed } from 'vue'
import { team } from '@/content.js'

// The bio bands are for the real, fully-populated members (skip placeholders).
// Explicit display order for this page (Oleg first, Josip last) — independent of
// the source `team` order used elsewhere (e.g. the homepage teaser).
const order = ['oleg-kalysh', 'danijel-popic', 'josip-lukacevic']
const members = computed(() => {
  const real = team.filter((m) => !m.placeholder && m.photo)
  const ordered = order.map((slug) => real.find((m) => m.slug === slug)).filter(Boolean)
  const rest = real.filter((m) => !order.includes(m.slug))
  return [...ordered, ...rest]
})
</script>

<template>
  <section class="section page-section">
    <div class="container">
      <header class="page-head" v-reveal>
        <p class="eyebrow">The team</p>
        <h1>A small <em class="text-accent">team</em> - big <em class="text-accent">experience</em></h1>
        <p class="lede">
          The people behind jCode — senior generalists who design, build and ship. Fewer
          handoffs, more ownership.
        </p>
      </header>

      <div class="members">
        <article
          v-for="(m, i) in members"
          :key="m.slug"
          class="member"
          :class="{ reverse: i % 2 === 1 }"
          v-reveal
        >
          <router-link
            :to="`/team/${m.slug}`"
            class="member-photo"
            :aria-label="`${m.name} — view profile`"
          >
            <img :src="m.photo" :alt="m.name" loading="lazy" decoding="async" />
          </router-link>

          <div class="member-info">
            <p class="role">{{ m.role }}</p>
            <h2>{{ m.name }}</h2>
            <p class="bio">{{ m.bio }}</p>
            <p class="years"><strong>{{ m.years }}</strong> years of experience</p>

            <p class="stack-label">Main stack</p>
            <ul class="stack">
              <li v-for="t in m.stack" :key="t.name">
                <img :src="t.icon" :alt="t.name" :title="t.name" loading="lazy" decoding="async" />
              </li>
            </ul>

            <router-link
              :to="`/team/${m.slug}`"
              class="link-arrow profile-link"
              :aria-label="`View ${m.name}'s full profile`"
            >
              View full profile →
            </router-link>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.members {
  display: grid;
  gap: clamp(48px, 8vw, 96px);
}

.member {
  display: flex;
  align-items: center;
  gap: clamp(28px, 6vw, 72px);
}

.member.reverse {
  flex-direction: row-reverse;
}

/* ---- photo ---- */
.member-photo {
  position: relative;
  display: block;
  flex: 0 0 38%;
  max-width: 320px;
}

.member-photo img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: top center;
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  position: relative;
  z-index: 1;
}

/* soft accent panel peeking behind the photo (mirrors per side) */
.member-photo::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
  background: var(--accent-soft);
  transform: translate(14px, 14px);
  z-index: 0;
}

.member.reverse .member-photo::before {
  transform: translate(-14px, 14px);
}

/* ---- info ---- */
.member-info {
  flex: 1;
  min-width: 0;
}

.member-info .role {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.member-info h2 {
  font-size: clamp(26px, 3.6vw, 38px);
  margin-top: 8px;
}

.member-info .bio {
  margin-top: 16px;
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--ink-soft);
  max-width: 48ch;
}

.years {
  margin-top: 16px;
  font-size: 16px;
  color: var(--ink-soft);
}

.years strong {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 21px;
  color: var(--ink);
  margin-right: 5px;
  letter-spacing: -0.02em;
}

.stack-label {
  margin-top: 24px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
}

.stack img {
  width: 54px;
  height: 54px;
  padding: 11px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 13px;
  object-fit: contain;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.stack li:hover img {
  transform: translateY(-3px);
  border-color: var(--accent);
  box-shadow: var(--shadow-card);
}

.profile-link {
  display: inline-block;
  margin-top: 26px;
}

/* ---- mobile: image first, everything below ---- */
@media (max-width: 820px) {
  .member,
  .member.reverse {
    flex-direction: column;
    align-items: stretch;
    gap: 26px;
  }

  .member-photo {
    flex: none;
    width: 100%;
    max-width: 380px;
    margin-inline: auto;
  }

  .member-photo::before,
  .member.reverse .member-photo::before {
    transform: translate(8px, 8px);
  }
}
</style>
