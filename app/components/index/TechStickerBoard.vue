<template>
  <!-- LAYOUT 1: Desktop - Sticker Pack on Dotted Board -->
  <div
    ref="desktopBoard"
    class="border-3 border-neoPrimary bg-neoSurface shadow-brutal p-12 relative dotted-board overflow-hidden min-h-[400px]"
  >
    <!-- Scattered stickers using flex-wrap and gap -->
    <div class="flex flex-wrap gap-5 justify-center items-center py-8">
      <div
        v-for="(sticker, index) in stickers"
        :key="'desktop-sticker-' + sticker.name"
        class="sticker-item sticker-hover cursor-pointer font-black text-2xl md:text-3xl uppercase tracking-tight px-6 py-3 border-3 border-neoPrimary shadow-brutal transform origin-center select-none"
        :class="getStickerColorClass(index)"
        :style="{
          transform: `rotate(${getStickerRotation(index)}deg)`,
        }"
      >
        {{ sticker.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

defineProps<{
  stickers: Array<{ name: string; categoryId: string }>;
}>();

// Colors: Accent (bg-neoAccent), Muted (bg-neoMutedSticker), Surface (bg-neoSurface)
const colors = [
  "bg-neoAccent text-white",
  "bg-neoMutedSticker text-neoPrimary",
  "bg-neoSurface text-neoPrimary",
];

const getStickerColorClass = (index: number) => {
  return colors[index % colors.length];
};

// Rotation angles: alternating/random between -3deg and +3deg
const getStickerRotation = (index: number) => {
  const angles = [-3, 1.5, -2, 3, -1.5, 2, -2.5, 2.5];
  return angles[index % angles.length];
};

let ctx: gsap.Context | null = null;
const desktopBoard = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick();
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    if (desktopBoard.value) {
      gsap.fromTo(
        ".sticker-item",
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: desktopBoard.value,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
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
.dotted-board {
  background-color: var(--neo-bg);
  background-image: radial-gradient(
    var(--neo-muted-sticker) 2.5px,
    transparent 2.5px
  );
  background-size: 24px 24px;
}
.sticker-hover {
  transition:
    transform 0.2s cubic-bezier(0.3, 1.5, 0.4, 1),
    box-shadow 0.2s cubic-bezier(0.3, 1.5, 0.4, 1);
  will-change: transform, box-shadow;
}
.sticker-hover:hover {
  transform: scale(1.1) rotate(0deg) !important;
  box-shadow: 6px 6px 0px var(--neo-shadow) !important;
  z-index: 10;
}
</style>
