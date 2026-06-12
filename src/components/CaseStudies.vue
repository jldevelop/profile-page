<script setup>
import { caseStudies } from '@/content.js'
</script>

<template>
  <section id="highlights" class="section highlights">
    <div class="container">
      <div class="section-head" v-reveal>
        <p class="eyebrow">Highlights</p>
        <h2>Work I’m proud of</h2>
      </div>

      <article v-for="study in caseStudies" :key="study.num" class="study" v-reveal>
        <div class="study-meta">
          <span class="study-num" aria-hidden="true">{{ study.num }}</span>
          <h3 class="study-org">{{ study.org }}</h3>
          <p class="study-role">{{ study.role }}</p>
          <p class="study-period">{{ study.period }}</p>
        </div>
        <div class="study-body">
          <p class="study-headline">{{ study.headline }}</p>
          <ul>
            <li v-for="(bullet, i) in study.bullets" :key="i">{{ bullet }}</li>
          </ul>
          <div class="study-tags">
            <span v-for="tag in study.tags" :key="tag" class="pill">{{ tag }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.highlights {
  background: var(--bg-soft);
}

.study {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: clamp(20px, 4vw, 48px);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: clamp(24px, 4vw, 40px);
}

.study + .study {
  margin-top: 22px;
}

.study-num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 44px;
  color: var(--accent-soft);
  -webkit-text-stroke: 1.5px var(--accent);
  line-height: 1;
  display: block;
}

.study-org {
  font-size: 22px;
  margin-top: 14px;
}

.study-role {
  font-weight: 600;
  font-size: 14.5px;
  color: var(--accent);
  margin-top: 6px;
}

.study-period {
  font-size: 13.5px;
  color: var(--muted);
  margin-top: 4px;
}

.study-headline {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 19px;
  letter-spacing: -0.01em;
}

.study-body ul {
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.study-body li {
  position: relative;
  padding-left: 22px;
  font-size: 15.5px;
  color: var(--ink-soft);
}

.study-body li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: 600;
}

.study-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

@media (max-width: 820px) {
  .study {
    grid-template-columns: 1fr;
  }

  .study-org {
    margin-top: 10px;
  }
}
</style>
