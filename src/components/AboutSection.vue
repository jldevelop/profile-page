<script setup>
import { about, strengths } from '@/content.js'
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <div class="section-head" v-reveal>
        <p class="eyebrow">About</p>
        <h2>{{ about.title }}</h2>
      </div>

      <div class="about-body" v-reveal>
        <p v-for="(paragraph, i) in about.paragraphs" :key="i">{{ paragraph }}</p>
      </div>

      <aside class="looking-for" v-reveal>
        <p>{{ about.lookingFor }}</p>
      </aside>

      <ul class="strengths" v-reveal>
        <li v-for="item in strengths" :key="item.title" class="strength">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.about-body {
  max-width: 760px;
  display: grid;
  gap: 18px;
  color: var(--ink-soft);
  font-size: 17px;
}

.looking-for {
  max-width: 760px;
  margin-top: 34px;
  padding: 22px 26px;
  background: var(--accent-soft);
  border-left: 4px solid var(--accent);
  border-radius: 0 var(--radius) var(--radius) 0;
  font-size: 16.5px;
}

.strengths {
  list-style: none;
  margin: clamp(40px, 6vw, 60px) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.strength {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 24px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.strength:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card);
}

.strength h3 {
  font-size: 17px;
}

.strength h3::after {
  content: '';
  display: block;
  width: 26px;
  height: 3px;
  margin-top: 10px;
  border-radius: 2px;
  background: var(--accent);
}

.strength p {
  margin-top: 12px;
  font-size: 14.5px;
  color: var(--muted);
}

@media (max-width: 880px) {
  .strengths {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 881px) and (max-width: 1024px) {
  .strengths {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
