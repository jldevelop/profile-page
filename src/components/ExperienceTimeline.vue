<script setup>
defineProps({
  experience: { type: Array, default: () => [] },
  earlierRoles: { type: String, default: '' },
})
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <div class="section-head" v-reveal>
        <p class="eyebrow">Experience</p>
        <h2>Where I’ve worked</h2>
      </div>

      <ol class="timeline">
        <li v-for="job in experience" :key="job.org + job.period" class="entry" v-reveal>
          <p class="entry-period">{{ job.period }}</p>
          <div class="entry-body" :class="{ current: job.current }">
            <h3>
              {{ job.role }}
              <span class="entry-org">— {{ job.org }}</span>
            </h3>
            <p class="entry-place">{{ job.place }}</p>
            <p class="entry-blurb">{{ job.blurb }}</p>
            <p class="entry-stack">{{ job.stack }}</p>
          </div>
        </li>
      </ol>

      <details v-if="earlierRoles" class="earlier" v-reveal>
        <summary>Earlier roles (2012 – 2015)</summary>
        <p>{{ earlierRoles }}</p>
      </details>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
}

.entry {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: clamp(16px, 3vw, 40px);
}

.entry-period {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  color: var(--muted);
  padding-top: 2px;
  text-align: right;
}

.entry-body {
  position: relative;
  border-left: 2px solid var(--line);
  padding: 0 0 38px 28px;
}

.entry:last-child .entry-body {
  padding-bottom: 8px;
}

.entry-body::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--bg);
  border: 2.5px solid var(--muted);
}

.entry-body.current::before {
  border-color: var(--accent);
  background: var(--accent);
}

.entry h3 {
  font-size: 18.5px;
}

.entry-org {
  display: inline-block;
  color: var(--accent);
}

.entry-place {
  font-size: 13.5px;
  color: var(--muted);
  margin-top: 4px;
}

.entry-blurb {
  margin-top: 10px;
  font-size: 15.5px;
  color: var(--ink-soft);
  max-width: 640px;
}

.entry-stack {
  margin-top: 8px;
  font-size: 13.5px;
  color: var(--muted);
}

.earlier {
  margin-top: 28px;
  border: 1px dashed var(--line);
  border-radius: var(--radius);
  padding: 16px 22px;
}

.earlier summary {
  cursor: pointer;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
}

.earlier summary:hover {
  color: var(--accent);
}

.earlier p {
  margin-top: 12px;
  font-size: 14.5px;
  color: var(--muted);
  line-height: 1.8;
}

@media (max-width: 700px) {
  .entry {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .entry-period {
    text-align: left;
    padding-left: 28px;
  }

  .entry-body {
    margin-top: 2px;
  }
}
</style>
