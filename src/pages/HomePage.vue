<script setup>
import { computed } from 'vue'
import { company, services, companyStats, companyProcess, techStack, clients, team } from '@/content.js'
import { featuredTemplates } from '@/catalog.js'
import { t } from '@/i18n.js'
import { localePath } from '@/lang.js'

// Template screenshots for the layered hero showcase.
const showMain = '/images/catalog/30-saas-product-full.webp'
const showFloat = '/images/catalog/e04-luxury-fashion-house-full.webp'

// Only real members on the teaser - placeholder seats are hidden until filled.
const teamMembers = computed(() => team.value.filter((m) => !m.placeholder))
</script>

<template>
  <!-- Hero -->
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-text" v-reveal>
        <p class="eyebrow">{{ company.eyebrow }}</p>
        <h1>{{ t('home.hero.h1') }}</h1>
        <p class="lede">{{ t('home.hero.lede') }}</p>
        <div class="cta-row">
          <router-link class="btn btn-primary" :to="localePath('/contact')">{{ t('home.hero.ctaStart') }}</router-link>
          <router-link class="btn btn-ghost" :to="localePath('/work')">{{ t('home.hero.ctaWork') }}</router-link>
        </div>
        <ul class="hero-stats">
          <li v-for="(stat, i) in companyStats" :key="i">
            <strong>{{ stat.value }}</strong> {{ stat.label }}
          </li>
        </ul>
      </div>

      <div class="hero-visual" v-reveal aria-hidden="true">
        <figure class="shot main">
          <span class="bar"><i></i><i></i><i></i></span>
          <img :src="showMain" alt="" decoding="async" />
        </figure>
        <figure class="shot float">
          <span class="bar"><i></i><i></i><i></i></span>
          <img :src="showFloat" alt="" loading="lazy" decoding="async" />
        </figure>
      </div>
    </div>
  </section>

  <!-- Clients / built-for strip -->
  <section class="clients">
    <div class="container">
      <p class="clients-lead">{{ t('home.clients.lead') }}</p>
      <ul class="client-row" v-reveal>
        <li v-for="c in clients" :key="c.name">
          <img :src="c.logo" :alt="c.name" loading="lazy" decoding="async" />
        </li>
      </ul>
    </div>
  </section>

  <!-- Services -->
  <section class="section services">
    <div class="container">
      <div class="section-head" v-reveal>
        <p class="eyebrow">{{ t('home.services.eyebrow') }}</p>
        <h2>{{ t('home.services.h2') }}</h2>
      </div>
      <div class="svc-grid">
        <article v-for="svc in services" :key="svc.key" class="svc" v-reveal>
          <h3>{{ svc.title }}</h3>
          <p class="svc-desc">{{ svc.desc }}</p>
          <ul>
            <li v-for="p in svc.points" :key="p">{{ p }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- Featured website templates -->
  <section class="section featured">
    <div class="container">
      <div class="section-head with-link" v-reveal>
        <div>
          <p class="eyebrow">{{ t('home.work.eyebrow') }}</p>
          <h2>{{ t('home.work.h2') }}</h2>
        </div>
        <router-link class="link-arrow" :to="localePath('/work')">{{ t('home.work.seeAll') }}</router-link>
      </div>
      <div class="work-grid">
        <router-link
          v-for="tpl in featuredTemplates"
          :key="tpl.id"
          :to="localePath('/work')"
          class="work-card"
          v-reveal
        >
          <div class="thumb">
            <img :src="tpl.card" alt="" loading="lazy" decoding="async" />
            <span class="kind">{{ tpl.category }}</span>
          </div>
          <div class="work-meta">
            <h3>{{ tpl.title }}</h3>
            <p>{{ tpl.blurb }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>

  <!-- Tech stack -->
  <section class="section stack">
    <div class="container">
      <div class="section-head" v-reveal>
        <p class="eyebrow">{{ t('home.stack.eyebrow') }}</p>
        <h2>{{ t('home.stack.h2') }}</h2>
      </div>
      <div class="stack-rows">
        <div v-for="grp in techStack" :key="grp.key" class="stack-row" v-reveal>
          <h3>{{ grp.group }}</h3>
          <ul class="logos">
            <li v-for="tool in grp.items" :key="tool.name">
              <img :src="tool.icon" :alt="tool.name" :title="tool.name" loading="lazy" decoding="async" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="section process">
    <div class="container">
      <div class="section-head" v-reveal>
        <p class="eyebrow">{{ t('home.process.eyebrow') }}</p>
        <h2>{{ t('home.process.h2') }}</h2>
      </div>
      <ol class="proc-grid">
        <li v-for="step in companyProcess" :key="step.num" class="proc" v-reveal>
          <span class="proc-num">{{ step.num }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- Team teaser -->
  <section class="section team-teaser">
    <div class="container">
      <div class="section-head with-link" v-reveal>
        <div>
          <p class="eyebrow">{{ t('home.team.eyebrow') }}</p>
          <h2 v-html="t('home.team.headingHtml')"></h2>
        </div>
        <router-link class="link-arrow" :to="localePath('/team')">{{ t('home.team.meetAll') }}</router-link>
      </div>
      <div class="faces" v-reveal>
        <router-link v-for="m in teamMembers" :key="m.slug" :to="localePath(`/team/${m.slug}`)" class="face">
          <div class="avatar" :class="{ mono: !m.photo }">
            <img v-if="m.photo" :src="m.photo" alt="" loading="lazy" decoding="async" />
            <span v-else aria-hidden="true">{{ m.monogram }}</span>
          </div>
          <p class="face-name">{{ m.name }}</p>
          <p class="face-role">{{ m.role }}</p>
        </router-link>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-band">
    <div class="container cta-inner" v-reveal>
      <h2>{{ t('home.cta.h2') }}</h2>
      <p>{{ t('home.cta.p') }}</p>
      <router-link class="btn btn-primary" :to="localePath('/contact')">{{ t('home.hero.ctaStart') }}</router-link>
    </div>
  </section>
</template>

<style scoped>
/* ---- hero ---- */
.hero {
  padding-top: clamp(124px, 17vh, 176px);
  padding-bottom: clamp(48px, 7vw, 80px);
  background: radial-gradient(115% 80% at 85% 0%, var(--accent-soft) 0%, rgba(233, 238, 252, 0) 52%);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(36px, 6vw, 80px);
  align-items: center;
}

.hero h1 {
  font-size: clamp(38px, 5.6vw, 62px);
  margin-top: 16px;
  max-width: 12ch;
}

.hero .lede {
  margin-top: 20px;
  font-size: clamp(17px, 2.1vw, 19.5px);
  color: var(--ink-soft);
  max-width: 540px;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 28px;
  list-style: none;
  margin: 32px 0 0;
  padding-top: 26px;
  border-top: 1px solid var(--line);
}

.hero-stats li {
  font-size: 14.5px;
  color: var(--muted);
}

.hero-stats strong {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 22px;
  color: var(--ink);
  margin-right: 7px;
  letter-spacing: -0.02em;
}

/* ---- hero visual: layered browser windows ---- */
.hero-visual {
  position: relative;
  padding: 6% 4% 12% 6%;
}

.shot {
  margin: 0;
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: 0 30px 60px -28px rgba(15, 26, 56, 0.5);
}

.shot .bar {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 13px;
  background: var(--bg-soft);
  border-bottom: 1px solid var(--line);
}

.shot .bar i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #c2cbe0;
}

.shot img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
}

.shot.main {
  transform: rotate(1.5deg);
}

.shot.float {
  position: absolute;
  width: 56%;
  left: -2%;
  bottom: 0;
  transform: rotate(-3.5deg);
  z-index: 2;
}

/* ---- clients strip ---- */
.clients {
  padding-block: clamp(28px, 4vw, 40px);
  border-bottom: 1px solid var(--line);
}

.clients-lead {
  text-align: center;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.client-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 5vw, 52px);
  list-style: none;
  margin: 22px 0 0;
  padding: 0;
}

.client-row img {
  height: 28px;
  width: auto;
  max-width: 128px;
  object-fit: contain;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.client-row li:hover img {
  opacity: 0.85;
}

/* ---- section heads with a trailing link ---- */
.with-link {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  max-width: none;
}

.with-link .link-arrow {
  flex-shrink: 0;
  white-space: nowrap;
}

/* ---- services ---- */
.svc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.svc {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 28px 26px;
  border-top: 4px solid var(--accent);
}

.svc h3 {
  font-size: 22px;
}

.svc-desc {
  margin-top: 12px;
  font-size: 15px;
  color: var(--ink-soft);
}

.svc ul {
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}

.svc li {
  position: relative;
  padding-left: 20px;
  font-size: 14px;
  color: var(--muted);
}

.svc li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: 600;
}

/* ---- featured work ---- */
.featured {
  background: var(--bg-soft);
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.work-card {
  display: block;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.work-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
  border-color: var(--accent);
}

.thumb {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg-soft);
  display: grid;
  place-items: center;
}

.thumb.mono {
  background: linear-gradient(160deg, var(--dark-soft) 0%, var(--dark) 100%);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.4s ease;
}

.work-card:hover .thumb img {
  transform: scale(1.04);
}

.thumb-mono {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 52px;
  color: var(--on-dark);
}

.kind {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #fff;
  background: rgba(15, 26, 56, 0.74);
  padding: 3px 9px;
  border-radius: 999px;
}

.work-meta {
  padding: 14px 18px 16px;
}

.work-meta h3 {
  font-size: 17px;
}

.work-meta p {
  margin-top: 4px;
  font-size: 13px;
  color: var(--muted);
}

/* ---- tech stack (logos) ---- */
.stack-rows {
  display: grid;
  gap: 22px;
}

.stack-row {
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 24px;
  align-items: center;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--line);
}

.stack-row:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.stack-row h3 {
  font-size: 15px;
  color: var(--ink);
}

.logos {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.logos img {
  width: 54px;
  height: 54px;
  padding: 11px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 13px;
  object-fit: contain;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.logos li:hover img {
  transform: translateY(-3px);
  border-color: var(--accent);
  box-shadow: var(--shadow-card);
}

@media (max-width: 680px) {
  .stack-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

/* ---- process ---- */
.proc-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.proc-num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 38px;
  color: var(--accent-soft);
  -webkit-text-stroke: 1.5px var(--accent);
  line-height: 1;
  display: block;
}

.proc h3 {
  font-size: 18px;
  margin-top: 14px;
}

.proc p {
  margin-top: 10px;
  font-size: 14.5px;
  color: var(--muted);
}

/* ---- team teaser ---- */
.team-teaser {
  background: var(--bg-soft);
}

.faces {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18px;
}

.face {
  text-decoration: none;
  color: inherit;
  text-align: center;
}

.avatar {
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(160deg, var(--dark-soft) 0%, var(--dark) 100%);
  display: grid;
  place-items: center;
  transition: transform 0.18s ease;
}

.face:hover .avatar {
  transform: translateY(-4px);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.avatar.mono span {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 34px;
  color: var(--on-dark);
}

.face-name {
  margin-top: 12px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
}

.face-role {
  margin-top: 3px;
  font-size: 13px;
  color: var(--muted);
}

/* ---- CTA band ---- */
.cta-band {
  background: var(--dark);
  color: var(--on-dark);
  padding-block: clamp(56px, 8vw, 96px);
}

.cta-inner {
  text-align: center;
}

.cta-band h2 {
  font-size: clamp(28px, 4.4vw, 44px);
}

.cta-band p {
  margin-top: 14px;
  color: var(--on-dark-muted);
  font-size: 17px;
}

.cta-band .btn {
  margin-top: 28px;
}

/* ---- responsive ---- */
@media (max-width: 940px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    max-width: 480px;
    margin-inline: auto;
    padding: 4% 2% 10% 2%;
  }

  .svc-grid,
  .work-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .proc-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .faces {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 560px) {
  .shot.float {
    display: none;
  }

  .shot.main {
    transform: none;
  }

  .hero-visual {
    padding: 0;
    max-width: 420px;
  }

  .svc-grid,
  .work-grid {
    grid-template-columns: 1fr;
  }

  .faces {
    grid-template-columns: repeat(2, 1fr);
  }

  .with-link {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* Wide screens (added 2026-07-13): keep the hero's presence on 27"+ displays.
   Scoped styles out-specify the globals in main.css, so the steps live here. */
@media (min-width: 1600px) {
  .hero h1 {
    font-size: clamp(38px, 5.6vw, 70px);
  }
  .hero .lede {
    font-size: 21px;
    max-width: 600px;
  }
  .cta-band h2 {
    font-size: clamp(28px, 4.4vw, 50px);
  }
}

@media (min-width: 2000px) {
  .hero h1 {
    font-size: 76px;
  }
  .hero .lede {
    font-size: 22px;
  }
}
</style>
