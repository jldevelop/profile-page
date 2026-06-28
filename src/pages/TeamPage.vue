<script setup>
import { team } from '@/content.js'

// Trim each bio to a short teaser for the card.
function teaser(text) {
  if (!text) return ''
  return text.length > 130 ? text.slice(0, 127).trimEnd() + '…' : text
}
</script>

<template>
  <section class="section page-section">
    <div class="container">
      <header class="page-head" v-reveal>
        <p class="eyebrow">The team</p>
        <h1>A small <em class="text-accent">team</em> - big <em class="text-accent">experience</em></h1>
        <p class="lede">
          The people behind jCode. Senior generalists who design, build and ship — fewer
          handoffs, more ownership. Click any profile for the full story.
        </p>
      </header>

      <div class="team-grid">
        <router-link
          v-for="m in team"
          :key="m.slug"
          :to="`/team/${m.slug}`"
          class="member"
          v-reveal
        >
          <div class="member-photo" :class="{ mono: !m.photo }">
            <img v-if="m.photo" :src="m.photo" alt="" loading="lazy" decoding="async" />
            <span v-else aria-hidden="true">{{ m.monogram }}</span>
            <span v-if="m.placeholder" class="badge">Open seat</span>
          </div>
          <h3>{{ m.name }}</h3>
          <p class="member-role">{{ m.role }}</p>
          <p class="member-bio">{{ teaser(m.intro) }}</p>
          <span class="view">View profile →</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.member {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 18px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.member:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
  border-color: var(--accent);
}

.member-photo {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  /* overflow: hidden; */
  background: linear-gradient(160deg, var(--dark-soft) 0%, var(--dark) 100%);
  display: grid;
  place-items: center;
}

.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.member-photo.mono span {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 52px;
  color: var(--on-dark);
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #fff;
  background: rgba(15, 26, 56, 0.74);
  padding: 3px 9px;
  border-radius: 999px;
}

.member h3 {
  font-size: 18px;
  margin-top: 16px;
}

.member-role {
  font-weight: 600;
  font-size: 14px;
  color: var(--accent-deep);
  margin-top: 5px;
}

.member-bio {
  margin-top: 10px;
  font-size: 14px;
  color: var(--muted);
  flex: 1;
}

.view {
  margin-top: 16px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  color: var(--ink);
}

.member:hover .view {
  color: var(--accent);
}

@media (max-width: 900px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
