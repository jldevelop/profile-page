<script setup>
import { profile } from '@/content.js'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-row">
      <p>© {{ year }} {{ profile.name }} — Barcelona</p>
      <a href="#top">Back to top ↑</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--dark);
  color: var(--on-dark-muted);
  border-top: 1px solid #2b313a;
}

.footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-block: 22px;
  font-size: 13.5px;
}

.footer a {
  color: var(--on-dark-muted);
  text-decoration: none;
}

.footer a:hover {
  color: var(--accent);
}
</style>
