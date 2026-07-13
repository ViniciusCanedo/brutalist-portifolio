<template>
  <div>
    <NuxtPage :transition="pageTransitionConfig" />
    <PageTransitionOverlay ref="overlay" />
  </div>
</template>

<script setup lang="ts">
const { isDark, watchSystemTheme } = useTheme()

useHead({
  htmlAttrs: {
    class: computed(() => (isDark.value ? 'dark' : '')),
    'data-theme': computed(() => (isDark.value ? 'dark' : ''))
  }
})

let stopWatchingSystemTheme = () => {}

onMounted(() => {
  stopWatchingSystemTheme = watchSystemTheme()
})

onUnmounted(() => {
  stopWatchingSystemTheme()
})

const { overlay, pageTransitionConfig } = usePageTransition()
</script>