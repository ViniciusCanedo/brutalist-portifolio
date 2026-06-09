<template>
  <div class="max-w-7xl mx-auto px-4 py-12 md:py-20 select-none">
    
    <!-- Section Header (Uppercase bold typography, Neo-Brutalist styling) -->
    <div class="text-center mb-12 md:mb-16">
      <span class="bg-neoAccent text-white px-3 py-1.5 border-3 border-neoPrimary font-mono text-xs font-bold uppercase tracking-wider shadow-brutal inline-block mb-4">
        // PORTFOLIO_CORE_COMPETENCIES
      </span>
      <h2 class="text-4xl md:text-6xl font-black uppercase text-neoPrimary tracking-tight">
        Tech <span class="text-neoAccent">Stack</span>
      </h2>
      <p class="font-mono text-sm text-neoPrimary mt-2 uppercase font-bold tracking-widest">
        Skills, Frameworks & Toolsets
      </p>
    </div>

    <!-- LAYOUT 1: Desktop - Sticker Pack on Dotted Board (hidden md:block) -->
    <div 
      ref="desktopBoard"
      class="hidden md:block border-3 border-neoPrimary bg-white shadow-brutal p-12 relative dotted-board overflow-hidden min-h-[400px]"
    >
      <!-- Scattered stickers using flex-wrap and gap -->
      <div class="flex flex-wrap gap-5 justify-center items-center py-8">
        <div 
          v-for="(sticker, index) in allStickers" 
          :key="'desktop-sticker-' + sticker.name"
          class="sticker-item sticker-hover cursor-pointer font-black text-2xl md:text-3xl uppercase tracking-tight px-6 py-3 border-3 border-neoPrimary shadow-brutal transform origin-center select-none"
          :class="getStickerColorClass(index)"
          :style="{
            transform: `rotate(${getStickerRotation(index)}deg)`
          }"
        >
          {{ sticker.name }}
        </div>
      </div>
    </div>

    <!-- LAYOUT 2: Mobile - Mechanical Drawers (block md:hidden) -->
    <div 
      ref="mobileAccordion"
      class="block md:hidden border-3 border-neoPrimary bg-white shadow-brutal divide-y-3 divide-neoPrimary"
    >
      <div 
        v-for="category in categories" 
        :key="'mobile-category-' + category.id"
        class="mobile-drawer-item flex flex-col"
      >
        <!-- Header Button -->
        <button 
          @click="toggleDrawer(category.id)"
          class="w-full flex justify-between items-center px-6 py-6 active:bg-neoAccent active:text-white transition-colors duration-200 text-left group select-none"
          :class="activeDrawer === category.id ? 'bg-neoAccent text-white' : 'bg-white text-neoPrimary'"
        >
          <h3 class="text-2xl font-black uppercase tracking-tight">
            {{ category.title }}
          </h3>
          <!-- Toggle Indicator Icon with bold, thick border -->
          <span 
            class="w-10 h-10 flex items-center justify-center border-3 border-neoPrimary bg-white text-neoPrimary shadow-brutal transition-all duration-200 transform group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none"
          >
            <span 
              class="font-black text-2xl font-mono inline-block transition-transform duration-200"
              :class="activeDrawer === category.id ? 'rotate-180' : ''"
            >
              {{ activeDrawer === category.id ? '−' : '＋' }}
            </span>
          </span>
        </button>

        <!-- Drawer Content -->
        <div 
          :ref="el => setDrawerRef(el, category.id)"
          class="overflow-hidden h-0 bg-neoBg"
        >
          <div class="p-6 border-t-3 border-neoPrimary">
            <div class="flex flex-wrap gap-3">
              <span 
                v-for="item in category.items" 
                :key="'mobile-item-' + item.name"
                class="px-4 py-2 bg-white border-2 border-neoPrimary font-bold text-sm shadow-brutal uppercase text-neoPrimary cursor-default select-none"
              >
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface TechItem {
  name: string
}

interface TechCategory {
  id: string
  title: string
  items: TechItem[]
}

// 1. Define categorized mock data
const categories: TechCategory[] = [
  {
    id: 'backend',
    title: 'Backend',
    items: [
      { name: 'Laravel' },
      { name: 'PHP' },
      { name: 'Go' },
      { name: 'NodeJS' },
      { name: 'PostgreSQL' },
      { name: 'MySQL' }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend',
    items: [
      { name: 'VueJS' },
      { name: 'NuxtJS' },
      { name: 'Tailwind CSS' },
      { name: 'GSAP' },
      { name: 'TypeScript' },
      { name: 'JavaScript' }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps',
    items: [
      { name: 'Docker' },
      { name: 'AWS' },
      { name: 'CI/CD' },
      { name: 'Nginx' },
      { name: 'Git' }
    ]
  }
]

// Flatten all items for the desktop sticker pack
const allStickers = categories.flatMap((cat) => 
  cat.items.map((item) => ({
    name: item.name,
    categoryId: cat.id
  }))
)

// Background color distribution matching the Neo-Brutalist palette
// Colors: Accent (bg-neoAccent), Muted (bg-neoMuted), White (bg-white)
const colors = ['bg-neoAccent text-white', 'bg-neoMuted text-neoPrimary', 'bg-white text-neoPrimary']

const getStickerColorClass = (index: number) => {
  return colors[index % colors.length]
}

// Rotation angles: alternating/random between -3deg and +3deg
const getStickerRotation = (index: number) => {
  const angles = [-3, 1.5, -2, 3, -1.5, 2, -2.5, 2.5]
  return angles[index % angles.length]
}

// GSAP context and references
let ctx: gsap.Context | null = null
const desktopBoard = ref<HTMLElement | null>(null)
const mobileAccordion = ref<HTMLElement | null>(null)

// Accordion Logic for Mobile
const activeDrawer = ref<string | null>(null)
const drawerRefs = ref<{ [key: string]: HTMLElement }>({})

const setDrawerRef = (el: any, categoryId: string) => {
  if (el) drawerRefs.value[categoryId] = el
}

const toggleDrawer = (categoryId: string) => {
  const content = drawerRefs.value[categoryId]
  if (!content) return

  if (activeDrawer.value === categoryId) {
    // Close current
    gsap.to(content, { height: 0, duration: 0.35, ease: 'power2.out' })
    activeDrawer.value = null
  } else {
    // Close previous
    if (activeDrawer.value && drawerRefs.value[activeDrawer.value]) {
      gsap.to(drawerRefs.value[activeDrawer.value], { height: 0, duration: 0.35, ease: 'power2.out' })
    }
    // Open new
    gsap.set(content, { height: 'auto' })
    const targetHeight = content.offsetHeight
    gsap.fromTo(content, 
      { height: 0 },
      { height: targetHeight, duration: 0.4, ease: 'power2.out' }
    )
    activeDrawer.value = categoryId
  }
}

onMounted(async () => {
  await nextTick()
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    // Desktop: ScrollTrigger staggered fade-in + pop-up
    if (desktopBoard.value) {
      gsap.fromTo('.sticker-item', 
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: desktopBoard.value,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }

    // Mobile: ScrollTrigger staggered fade-in for headers
    if (mobileAccordion.value) {
      gsap.fromTo('.mobile-drawer-item', 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mobileAccordion.value,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      )
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
.dotted-board {
  background-color: #F1F1F1;
  background-image: radial-gradient(#BEC3C7 2.5px, transparent 2.5px);
  background-size: 24px 24px;
}
.sticker-hover {
  transition: transform 0.2s cubic-bezier(0.3, 1.5, 0.4, 1), box-shadow 0.2s cubic-bezier(0.3, 1.5, 0.4, 1);
  will-change: transform, box-shadow;
}
.sticker-hover:hover {
  transform: scale(1.1) rotate(0deg) !important;
  box-shadow: 6px 6px 0px #2E2E2E !important;
  z-index: 10;
}
</style>
