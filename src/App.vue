<script setup>
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import CaseStudies from './components/CaseStudies.vue'
import PortfolioShowcase from './components/PortfolioShowcase.vue'
import ExperienceTimeline from './components/ExperienceTimeline.vue'
import SkillsSection from './components/SkillsSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <SiteNav />
  <main>
    <HeroSection />
    <AboutSection />
    <CaseStudies />
    <PortfolioShowcase />
    <ExperienceTimeline />
    <SkillsSection />
    <EducationSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
