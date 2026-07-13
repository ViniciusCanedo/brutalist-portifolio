<template>
  <div class="py-16 max-w-7xl mx-auto px-4 space-y-24 overflow-hidden mb-24">
    <!-- Header -->
    <div class="text-center mb-16">
      <span class="bg-neoPrimary text-white px-3 py-1.5 border-3 border-neoPrimary font-mono text-xs font-bold uppercase tracking-wider shadow-brutal inline-block mb-4">
        // MOBILE_RESPONSIVE_LAB
      </span>
      <h1 class="text-4xl md:text-6xl font-black uppercase text-neoPrimary tracking-tight">
        Sticker Pack <span class="text-neoAccent">A/B Test</span>
      </h1>
      <p class="font-mono text-neoPrimary mt-4 uppercase font-bold tracking-wider">
        Testing Neo-Brutalist Mobile Patterns
      </p>
    </div>

    <!-- Variation A: Native Horizontal Scroll -->
    <section class="variation-section">
      <h2 class="text-2xl md:text-3xl font-black uppercase text-neoPrimary mb-8 border-b-3 border-neoPrimary pb-2">
        A. Native Horizontal Swipe
      </h2>
      <p class="font-mono text-sm text-neoPrimary mb-6">
        <span class="font-bold">Desktop:</span> Flex-wrap ✦ <span class="font-bold">Mobile:</span> Hidden Scrollbar, Horizontal Swipe
      </p>
      
      <!-- Mobile: flex-nowrap + overflow-x-auto, hide scrollbar. Desktop: flex-wrap -->
      <div class="flex gap-4 md:flex-wrap flex-nowrap overflow-x-auto hide-scrollbar pb-6 -mx-4 px-4 md:mx-0 md:px-0">
        <div v-for="(tech, index) in techStack" :key="'var-a-'+tech"
             class="whitespace-nowrap px-5 py-2.5 border-[3px] border-neoPrimary shadow-sticker font-black text-lg md:text-xl uppercase tracking-tight hover:-translate-y-1 hover:-translate-x-1 transition-transform cursor-default"
             :style="{ backgroundColor: getBgColor(index), color: getTextColor(index) }">
          {{ tech }}
        </div>
      </div>
    </section>

    <!-- Variation B: "Show More" Expandable -->
    <section class="variation-section">
      <h2 class="text-2xl md:text-3xl font-black uppercase text-neoPrimary mb-8 border-b-3 border-neoPrimary pb-2 mt-12">
        B. Expandable "Show More"
      </h2>
      <p class="font-mono text-sm text-neoPrimary mb-6">
        <span class="font-bold">Desktop:</span> Full Wrap ✦ <span class="font-bold">Mobile:</span> Show 6 + GSAP Animated Expansion
      </p>

      <div class="relative">
        <div ref="expandableContainer" class="flex flex-wrap gap-4 items-start">
          <!-- All stickers are in the DOM. On mobile, indexes >= 6 are hidden unless isExpanded is true. -->
          <div v-for="(tech, index) in techStack" :key="'var-b-'+tech"
               class="tech-sticker-var-b px-5 py-2.5 border-[3px] border-neoPrimary shadow-sticker font-black text-lg md:text-xl uppercase tracking-tight hover:-translate-y-1 hover:-translate-x-1 transition-transform cursor-default"
               :class="{ 'hidden md:block': index >= 6 && !isExpanded }"
               :style="{ backgroundColor: getBgColor(index), color: getTextColor(index) }">
            {{ tech }}
          </div>
          
          <!-- View All Button -->
          <button v-show="!isExpanded" @click="expand" 
                  class="md:hidden px-6 py-2.5 border-[3px] border-neoPrimary shadow-sticker font-black text-lg uppercase tracking-tight bg-neoAccent text-white hover:-translate-y-1 hover:-translate-x-1 transition-transform cursor-pointer">
            + View All
          </button>
        </div>
        
        <!-- Collapse Button -->
        <div v-show="isExpanded" class="mt-8 text-center md:hidden">
          <button @click="collapse" 
                  class="px-6 py-2.5 border-[3px] border-neoPrimary shadow-sticker font-black text-lg uppercase tracking-tight bg-neoSurface text-neoPrimary hover:-translate-y-1 hover:-translate-x-1 transition-transform cursor-pointer">
            - Show Less
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const techStack = [
  'Laravel', 'Vue.js', 'Nuxt 3', 'Docker', 'AWS', 'Tailwind CSS',
  'PostgreSQL', 'Redis', 'TypeScript', 'Go', 'GitHub Actions', 'Vercel',
  'Node.js', 'React', 'Kubernetes'
]

import { useState } from '#imports'

const isDark = useState('theme-dark', () => false)

// Alternating palette specified by requirements
const getBgColor = (index: number) => {
  const list = isDark.value
    ? ['#202325', '#3A3F41', '#6808A7']
    : ['#F1F1F1', '#BEC3C7', '#FF6F20']
  return list[index % list.length]
}

const getTextColor = (index: number) => {
  const list = isDark.value
    ? ['#CBC6C0', '#CBC6C0', '#CBC6C0']
    : ['#2E2E2E', '#2E2E2E', '#2E2E2E']
  return list[index % list.length]
}

// Variation B Logic
const isExpanded = ref(false)
const expandableContainer = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const expand = async () => {
  if (!expandableContainer.value) return
  isExpanded.value = true // Removes the "hidden" class from the extra stickers
  
  await nextTick() // Wait for DOM to register visibility
  
  ctx = gsap.context(() => {
    // Select the stickers that were just revealed (index >= 6)
    const stickers = gsap.utils.toArray(".tech-sticker-var-b") as HTMLElement[]
    const newStickers = stickers.slice(6)
    
    gsap.from(newStickers, {
      scale: 0,
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.05,
      ease: "back.out(1.5)"
    })
  }, expandableContainer.value)
}

const collapse = () => {
  if (!expandableContainer.value) return
  
  ctx = gsap.context(() => {
    const stickers = gsap.utils.toArray(".tech-sticker-var-b") as HTMLElement[]
    const extras = stickers.slice(6)
    
    // Animate out
    gsap.to(extras, {
      scale: 0,
      opacity: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        isExpanded.value = false // Reapplies the "hidden" class
        // Reset properties so they are visible correctly on desktop or next expansion
        gsap.set(extras, { clearProps: "all" })
      }
    })
  }, expandableContainer.value)
}

onUnmounted(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>

<style scoped>
/* Native swipe hidden scrollbar styling */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}
.hide-scrollbar::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
}

/* Custom Brutalist Shadow matching requirements */
.shadow-sticker {
  box-shadow: 4px 4px 0px var(--neo-shadow);
}
.shadow-sticker:hover {
  box-shadow: 6px 6px 0px var(--neo-shadow);
}
</style>
