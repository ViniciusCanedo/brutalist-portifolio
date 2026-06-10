<template>
  <div>
    <NuxtPage :transition="pageTransitionConfig" />
    <PageTransitionOverlay ref="overlay" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
