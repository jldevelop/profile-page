<script setup>
defineProps({ code: { type: String, required: true } })
</script>

<template>
  <span class="flag" aria-hidden="true">
    <!-- English → Union Jack (simplified) -->
    <svg v-if="code === 'en'" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" stroke-width="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" stroke-width="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#c8102e" stroke-width="6" />
    </svg>

    <!-- Croatian → red/white/blue tricolour + checkerboard hint -->
    <svg v-else-if="code === 'hr'" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="10" fill="#ff0000" />
      <rect width="60" height="10" y="10" fill="#ffffff" />
      <rect width="60" height="10" y="20" fill="#171796" />
      <rect x="24" y="8" width="12" height="14" fill="#ffffff" />
      <g fill="#ff0000">
        <rect x="24" y="8" width="3" height="3.5" />
        <rect x="30" y="8" width="3" height="3.5" />
        <rect x="27" y="11.5" width="3" height="3.5" />
        <rect x="33" y="11.5" width="3" height="3.5" />
        <rect x="24" y="15" width="3" height="3.5" />
        <rect x="30" y="15" width="3" height="3.5" />
        <rect x="27" y="18.5" width="3" height="3.5" />
        <rect x="33" y="18.5" width="3" height="3.5" />
      </g>
    </svg>

    <!-- Spanish → red / yellow / red horizontal bands (1:2:1) -->
    <svg v-else-if="code === 'es'" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="30" fill="#aa151b" />
      <rect width="60" height="15" y="7.5" fill="#f1bf00" />
    </svg>

    <!-- Ukrainian → blue over yellow -->
    <svg v-else-if="code === 'uk'" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="15" fill="#0057b7" />
      <rect width="60" height="15" y="15" fill="#ffd700" />
    </svg>

    <!-- German → black / red / gold horizontal thirds -->
    <svg v-else-if="code === 'de'" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="10" fill="#000000" />
      <rect width="60" height="10" y="10" fill="#dd0000" />
      <rect width="60" height="10" y="20" fill="#ffce00" />
    </svg>
  </span>
</template>

<style scoped>
.flag {
  display: inline-flex;
  flex-shrink: 0;
}

.flag svg {
  display: block;
  width: 22px;
  height: 15px;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.14);
}
</style>
