<template>
  <div>
    <!-- Fixed Marquee Ticker Layer (Behind Footer) -->
    <div 
      class="marquee-reveal-container fixed bottom-0 left-0 w-full z-[1] h-[30vh] md:h-[40vh] bg-neoAccent border-t-3 border-neoPrimary flex items-center overflow-hidden"
    >
      <div 
        ref="marqueeRef"
        class="marquee-wrapper flex whitespace-nowrap"
      >
        <!-- Two identical tracks for seamless looping with xPercent: -50 -->
        <span 
          class="text-[20vh] md:text-[28vh] font-black tracking-tighter text-white uppercase flex-shrink-0 select-none px-4"
        >
          VINICIUS CANEDO ✦ SOFTWARE ENGINEER ✦ VINICIUS CANEDO ✦ SOFTWARE ENGINEER ✦ VINICIUS CANEDO ✦ SOFTWARE ENGINEER ✦
        </span>
        <span 
          class="text-[20vh] md:text-[28vh] font-black tracking-tighter text-white uppercase flex-shrink-0 select-none px-4"
        >
          VINICIUS CANEDO ✦ SOFTWARE ENGINEER ✦ VINICIUS CANEDO ✦ SOFTWARE ENGINEER ✦ VINICIUS CANEDO ✦ SOFTWARE ENGINEER ✦
        </span>
      </div>
    </div>

    <!-- Document Spacer: Opens the reveal gap at the absolute page bottom -->
    <div class="h-[30vh] md:h-[40vh] pointer-events-none bg-transparent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const marqueeRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    if (marqueeRef.value) {
      // Endless seamless horizontal marquee loop
      gsap.to(marqueeRef.value, {
        xPercent: -50,
        repeat: -1,
        duration: 50,
        ease: 'none',
      })
    }
  })
})

onUnmounted(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>

<style scoped>
.marquee-wrapper {
  display: flex;
}
</style>
