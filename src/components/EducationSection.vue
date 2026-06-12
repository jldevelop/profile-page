<script setup>
import { education, languages } from '@/content.js'
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head" v-reveal>
        <p class="eyebrow">Education & languages</p>
        <h2>Always still learning</h2>
      </div>

      <ul class="edu-list" v-reveal>
        <li v-for="item in education" :key="item.credential" class="edu-item">
          <div>
            <h3>{{ item.credential }}</h3>
            <p class="edu-school">{{ item.school }}</p>
          </div>
          <p class="edu-period">{{ item.period }}</p>
        </li>
      </ul>

      <p class="languages" v-reveal>
        <span v-for="(lang, i) in languages" :key="lang.name">
          <strong>{{ lang.name }}</strong> — {{ lang.level
          }}<span v-if="i < languages.length - 1" class="dot"> · </span>
        </span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.edu-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 760px;
}

.edu-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}

.edu-item:first-child {
  padding-top: 0;
}

.edu-item h3 {
  font-size: 16.5px;
}

.edu-school {
  font-size: 14px;
  color: var(--muted);
  margin-top: 3px;
}

.edu-period {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13.5px;
  color: var(--muted);
  white-space: nowrap;
}

.languages {
  margin-top: 26px;
  font-size: 15.5px;
  color: var(--ink-soft);
}

@media (max-width: 600px) {
  .edu-item {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
