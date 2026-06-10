<template>
  <div 
    ref="overlayEl"
    class="fixed inset-0 w-screen h-screen bg-[var(--neo-accent)] pointer-events-none"
    style="z-index: 9999; transform: scaleY(0); transform-origin: bottom;"
  ></div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const overlayEl = ref<HTMLElement | null>(null)
let currentTimeline: gsap.core.Timeline | null = null

const playLeave = (callback: () => void) => {
  if (!overlayEl.value) return callback()
  
  // Kill any running animations on overlay
  if (currentTimeline) {
    currentTimeline.kill()
  }
  
  // Enable pointer events during transition to block user interactions
  overlayEl.value.style.pointerEvents = 'auto'
  
  // Ensure the transform-origin is set to bottom and initial scaleY is 0
  gsap.set(overlayEl.value, { transformOrigin: 'bottom', scaleY: 0 })
  
  currentTimeline = gsap.timeline({
    onComplete: () => {
      callback()
    }
  })
  
  currentTimeline.to(overlayEl.value, {
    scaleY: 1,
    duration: 0.5,
    ease: 'expo.inOut'
  })
}

const playEnter = (callback?: () => void) => {
  if (!overlayEl.value) {
    if (callback) callback()
    return
  }
  
  // Kill any running animations
  if (currentTimeline) {
    currentTimeline.kill()
  }
  
  // Scroll to top right when overlay is fully covering the screen (opaque)
  window.scrollTo(0, 0)
  
  // Set transform-origin to top for the collapsing animation and ensure scaleY is 1
  gsap.set(overlayEl.value, { transformOrigin: 'top', scaleY: 1 })
  
  currentTimeline = gsap.timeline({
    onComplete: () => {
      // Disable pointer events after transition is complete
      if (overlayEl.value) {
        overlayEl.value.style.pointerEvents = 'none'
        // Reset transform origin to bottom and scaleY to 0 for the next transition
        gsap.set(overlayEl.value, { transformOrigin: 'bottom', scaleY: 0 })
      }
      if (callback) callback()
    }
  })
  
  currentTimeline.to(overlayEl.value, {
    scaleY: 0,
    duration: 0.5,
    ease: 'expo.inOut'
  })
}

onUnmounted(() => {
  if (currentTimeline) {
    currentTimeline.kill()
  }
})

defineExpose({
  playLeave,
  playEnter
})
</script>
