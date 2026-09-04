<template>
  <div>
    <!-- Fixed Marquee Background Layer (Parallax curtain reveal) -->
    <div
      class="fixed bottom-0 left-0 w-full h-48 bg-neoAccent border-t-3 border-neoPrimary flex items-center overflow-hidden z-[-10]"
    >
      <div ref="marqueeRef" class="flex whitespace-nowrap items-center">
        <!-- Three identical tracks for seamless looping with xPercent: -33.33 -->
        <div
          v-for="i in 3"
          :key="'footer-marquee-' + i"
          class="flex items-center whitespace-nowrap"
        >
          <span
            v-for="tech in techList"
            :key="'footer-tech-' + tech + '-' + i"
            class="text-neoSurface text-4xl font-black uppercase tracking-widest px-8"
          >
            {{ tech }} <span class="text-neoDark ml-8">✦</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Transparent Page Spacer to expose the background reveal layer -->
    <div class="h-48 pointer-events-none bg-transparent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

defineProps<{
  techList: string[];
}>();

const marqueeRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    if (marqueeRef.value) {
      gsap.to(marqueeRef.value, {
        xPercent: -33.33,
        repeat: -1,
        duration: 20,
        ease: "none",
      });
    }
  });
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
});
</script>

<style scoped>
.marquee-wrapper {
  display: flex;
}
</style>
