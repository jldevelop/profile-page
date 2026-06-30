<script setup>
import { computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { teamById } from '@/content.js'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'

const props = defineProps({ slug: { type: String, required: true } })
const router = useRouter()
const member = computed(() => teamById[props.slug])

// Unknown slug → send back to the team page; otherwise set a per-member title.
watchEffect(() => {
  if (!member.value) {
    router.replace('/team')
    return
  }
  document.title = `${member.value.name} — jCode`
})
</script>

<template>
  <div v-if="member" class="profile-page">
    <div class="container profile-top">
      <router-link to="/team" class="back">← The team</router-link>
      <p v-if="member.placeholder" class="placeholder-note">
        Placeholder profile — replace with real content for this teammate.
      </p>
    </div>

    <HeroSection :member="member" />
    <AboutSection
      v-if="member.about"
      :about="member.about"
      :strengths="member.strengths || []"
    />
    <SkillsSection v-if="member.skillGroups?.length" :skill-groups="member.skillGroups" />
  </div>
</template>

<style scoped>
.profile-top {
  padding-top: clamp(96px, 12vh, 128px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.back {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14.5px;
  text-decoration: none;
  color: var(--muted);
  transition: color 0.15s ease;
}

.back:hover {
  color: var(--accent);
}

.placeholder-note {
  font-size: 13px;
  font-weight: 500;
  color: var(--accent-deep);
  background: var(--accent-soft);
  padding: 5px 12px;
  border-radius: 999px;
}

/* The hero is no longer the first element on the page, so trim its top padding. */
.profile-page :deep(.hero) {
  padding-top: 28px;
}
</style>
