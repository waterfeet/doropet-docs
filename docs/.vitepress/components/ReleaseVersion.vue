<script setup>
import release from '../data/release.json'
</script>

<template>
  <span class="release-version">{{ release.version }}</span>
</template>

<style scoped>
.release-version {
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
</style>
