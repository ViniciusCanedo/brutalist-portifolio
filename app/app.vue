<template>
  <div>
    <NuxtPage :transition="pageTransitionConfig" />
    <PageTransitionOverlay ref="overlay" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead, useState } from '#imports'

const isDark = useState('theme-dark', () => false)

if (import.meta.client) {
  const stored = localStorage.getItem('brutalist-portfolio-theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = stored === 'dark' || (!stored && prefersDark)
}

useHead({
  htmlAttrs: {
    class: computed(() => isDark.value ? 'dark' : ''),
    'data-theme': computed(() => isDark.value ? 'dark' : '')
  },
  script: [
    {
      children: `(function() {
        try {
          const stored = localStorage.getItem('brutalist-portfolio-theme');
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (stored === 'dark' || (!stored && prefersDark)) {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.removeAttribute('data-theme');
          }
        } catch (_) {}
      })()`,
      type: 'text/javascript'
    }
  ]
})

const overlay = ref<any>(null)

const pageTransitionConfig = {
  name: 'wipe',
  mode: 'out-in',
  css: false,
  onLeave(el: any, done: () => void) {
    if (overlay.value) {
      overlay.value.playLeave(done)
    } else {
      done()
    }
  },
  onEnter(el: any, done: () => void) {
    if (overlay.value) {
      overlay.value.playEnter(done)
    } else {
      done()
    }
  }
}
</script>
