<script setup>
import { skillGroups } from '@/content.js'

const featured = skillGroups.filter((group) => group.featured)
const rest = skillGroups.filter((group) => !group.featured)
</script>

<template>
  <section id="skills" class="section skills">
    <div class="container">
      <div class="section-head" v-reveal>
        <p class="eyebrow">Skills</p>
        <h2>Leadership first, hands-on always</h2>
      </div>

      <div v-for="group in featured" :key="group.label" class="group group-featured" v-reveal>
        <h3>{{ group.label }}</h3>
        <div class="pills">
          <span v-for="item in group.items" :key="item" class="pill pill-accent">{{ item }}</span>
        </div>
      </div>

      <div class="group-grid">
        <div v-for="group in rest" :key="group.label" class="group" v-reveal>
          <h3>{{ group.label }}</h3>
          <div class="pills">
            <span v-for="item in group.items" :key="item" class="pill">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  background: var(--bg-soft);
}

.group {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 24px 26px;
}

.group-featured {
  border-top: 4px solid var(--accent);
  margin-bottom: 18px;
}

.group h3 {
  font-size: 16px;
  margin-bottom: 14px;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pill-accent {
  background: var(--accent-soft);
  border-color: transparent;
  color: var(--accent-deep);
  font-weight: 600;
}

.group-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

@media (max-width: 760px) {
  .group-grid {
    grid-template-columns: 1fr;
  }
}
</style>
