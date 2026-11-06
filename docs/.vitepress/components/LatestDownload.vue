<script setup>
import release from '../data/release.json'

const fileName = release.downloadUrl.split('/').pop() || ''
const hasLink = Boolean(release.downloadUrl)
</script>

<template>
  <a v-if="hasLink" class="latest-download" :href="release.downloadUrl" rel="noopener">
    <span class="latest-download__label">下载 v{{ release.version }}</span>
    <span class="latest-download__meta">{{ fileName }}</span>
  </a>
  <span v-else class="latest-download latest-download--empty">
    暂未获取到下载地址，请前往发布页
  </span>
</template>

<style scoped>
.latest-download {
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.2s, background-color 0.2s;
}

.latest-download:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-mute);
}

.latest-download__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.latest-download__meta {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

.latest-download--empty {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
