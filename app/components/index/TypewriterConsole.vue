<template>
  <!-- Tech Stack typing HUD console -->
  <div class="border-3 border-neoPrimary bg-neoSurface p-4 shadow-brutal max-w-lg">
    <div class="flex items-center justify-between border-b-2 border-neoPrimary pb-2 mb-3">
      <span class="font-mono text-[10px] font-bold text-neoMuted uppercase tracking-wider">Console // Tech_Stack</span>
      <div class="flex gap-1">
        <span class="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-neoPrimary"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-neoPrimary"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-neoPrimary"></span>
      </div>
    </div>
    
    <!-- Typing dynamic display -->
    <div class="font-mono text-base sm:text-lg font-bold flex items-center gap-1 min-h-[32px]">
      <span class="text-neoMuted select-none">$&nbsp;TECH_STACK:</span>
      <span ref="typingText" class="text-neoAccent font-black uppercase"></span>
      <span ref="cursor" class="text-neoPrimary font-black">|</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

const typingText = ref<HTMLElement | null>(null);
const cursor = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  // Register GSAP TextPlugin
  gsap.registerPlugin(TextPlugin);

  ctx = gsap.context(() => {
    // Cursor Blink Animation
    gsap.to(cursor.value, {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      duration: 0.5,
    });

    // Tech Stack Typing Loops
    const words = ["Laravel", "PHP", "GOLANG", "Vue.JS", "Nuxt.JS"];
    const mainTimeline = gsap.timeline({ repeat: -1 });

    words.forEach((word) => {
      // Type Out Word
      mainTimeline.to(typingText.value, {
        duration: Math.max(word.length * 0.08, 0.4),
        text: word,
        ease: "none",
      });
      // Hold/Pause
      mainTimeline.to({}, { duration: 1.5 });
      // Delete Word
      mainTimeline.to(typingText.value, {
        duration: Math.max(word.length * 0.05, 0.3),
        text: "",
        ease: "none",
      });
      // Pause before next keyword
      mainTimeline.to({}, { duration: 0.3 });
    });
  });
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
});
</script>
