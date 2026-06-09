<template>
  <div class="space-y-32 py-16 max-w-7xl mx-auto px-4 overflow-hidden mb-24">
    <!-- Header -->
    <div class="text-center mb-16">
      <span class="bg-neoPrimary text-white px-3 py-1.5 border-3 border-neoPrimary font-mono text-xs font-bold uppercase tracking-wider shadow-brutal inline-block mb-4">
        // SYSTEM_ARCHITECTURE_PROFILES
      </span>
      <h1 class="text-4xl md:text-6xl font-black uppercase text-neoPrimary tracking-tight">
        Tech Stack <span class="text-neoAccent">Showcase</span>
      </h1>
      <p class="font-mono text-neoPrimary mt-4 uppercase font-bold tracking-wider">
        Comparing Minimalist Neo-Brutalist Layouts
      </p>
    </div>

    <!-- Variation A: The Bento Grid -->
    <section ref="bentoSection" class="variation-section">
      <h2 class="text-3xl font-black uppercase text-neoPrimary mb-8 border-b-3 border-neoPrimary pb-2">
        A. The Bento Grid
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[250px]">
        <div v-for="(category, index) in techStack" :key="'bento-'+category.title" 
             class="bento-card bg-white border-3 border-neoPrimary p-6 shadow-brutal flex flex-col justify-between"
             :class="{'md:col-span-2': index === 0, 'md:row-span-2': index === 1}">
          <h3 class="text-2xl md:text-3xl font-black uppercase text-neoPrimary mb-4 border-b-2 border-dashed border-neoPrimary pb-2 inline-block">
            {{ category.title }}
          </h3>
          <div class="flex-1 flex flex-wrap gap-3 content-end">
            <span v-for="tech in category.tools" :key="'bento-tech-'+tech" 
                  class="font-mono text-sm md:text-base font-bold text-neoPrimary bg-neoBg px-3 py-1.5 border-2 border-neoPrimary shadow-brutal-accent hover:-translate-y-1 transition-transform cursor-default">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Variation B: The Infinite Marquee -->
    <section ref="marqueeSection" class="variation-section">
      <div class="mb-8">
        <h2 class="text-3xl font-black uppercase text-neoPrimary border-b-3 border-neoPrimary pb-2">
          B. The Infinite Marquee
        </h2>
      </div>
      <div class="py-12 relative">
        <!-- Row 1: moves left -->
        <div class="flex whitespace-nowrap py-4 bg-neoAccent border-y-3 border-neoPrimary transform rotate-2 origin-center shadow-brutal absolute top-10 left-[-5vw] right-[-5vw] w-[110vw] z-10">
          <div class="marquee-left flex items-center w-max">
            <div class="flex items-center" v-for="i in 3" :key="'row1-'+i">
              <span v-for="tech in allTech" :key="'m1-'+tech+i" class="text-white text-4xl font-black uppercase tracking-widest px-8">
                {{ tech }} <span class="text-neoPrimary ml-8">✦</span>
              </span>
            </div>
          </div>
        </div>
        <!-- Row 2: moves right -->
        <div class="flex whitespace-nowrap py-4 bg-neoPrimary border-y-3 border-neoPrimary transform -rotate-2 origin-center shadow-brutal-accent absolute top-20 left-[-5vw] right-[-5vw] w-[110vw] z-0">
          <div class="marquee-right flex items-center w-max">
            <div class="flex items-center" v-for="i in 3" :key="'row2-'+i">
              <span v-for="tech in [...allTech].reverse()" :key="'m2-'+tech+i" class="text-white text-4xl font-black uppercase tracking-widest px-8">
                {{ tech }} <span class="text-neoAccent ml-8">✦</span>
              </span>
            </div>
          </div>
        </div>
        <!-- Spacer for absolute positioning -->
        <div class="h-48"></div>
      </div>
    </section>

    <!-- Variation C: The Sticker Pack -->
    <section ref="stickerSection" class="variation-section">
      <h2 class="text-3xl font-black uppercase text-neoPrimary mb-8 border-b-3 border-neoPrimary pb-2">
        C. The Sticker Pack
      </h2>
      <div class="flex flex-wrap gap-4 justify-center items-center py-16 px-6 bg-white border-3 border-neoPrimary shadow-brutal bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNDQ0NDQ0MiLz48L3N2Zz4=')]">
        <div v-for="(tech, index) in allTech" :key="'sticker-'+tech"
             class="tech-sticker cursor-pointer font-black text-xl md:text-3xl uppercase tracking-tight px-6 py-3 border-3 border-neoPrimary shadow-brutal absolute-center-origin"
             :style="{ 
               backgroundColor: getStickerColor(index), 
               color: getStickerTextColor(index),
               transform: `rotate(${getStickerRotation(index)}deg)` 
             }">
          {{ tech }}
        </div>
      </div>
    </section>

    <!-- Variation D: Mechanical Drawers (Accordion) -->
    <section ref="drawerSection" class="variation-section max-w-4xl mx-auto">
      <h2 class="text-3xl font-black uppercase text-neoPrimary mb-8 border-b-3 border-neoPrimary pb-2">
        D. Mechanical Drawers
      </h2>
      <div class="border-3 border-neoPrimary bg-white shadow-brutal">
        <div v-for="(category, index) in techStack" :key="'drawer-'+category.title" 
             class="drawer-item border-b-3 border-neoPrimary last:border-b-0">
          <button @click="toggleDrawer(index)" 
                  class="w-full flex justify-between items-center px-6 py-6 md:py-8 hover:bg-neoAccent hover:text-white transition-colors duration-200 text-left group">
            <h3 class="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              {{ category.title }}
            </h3>
            <span class="text-5xl font-mono group-hover:rotate-180 transition-transform duration-300">
              {{ activeDrawer === index ? '-' : '+' }}
            </span>
          </button>
          <div class="drawer-content overflow-hidden h-0 bg-neoBg" :ref="el => setDrawerRef(el, index)">
            <div class="p-6 md:p-8 border-t-3 border-neoPrimary">
              <div class="flex flex-wrap gap-4">
                <span v-for="tech in category.tools" :key="'drawer-tech-'+tech" 
                      class="px-5 py-2.5 bg-white border-3 border-neoPrimary font-bold text-lg md:text-xl shadow-brutal uppercase text-neoPrimary hover:shadow-brutal-accent hover:-translate-x-1 hover:-translate-y-1 transition-all cursor-default">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const techStack = [
  {
    title: 'Backend',
    tools: ['Laravel', 'PHP', 'Go', 'Node.js', 'PostgreSQL']
  },
  {
    title: 'Frontend',
    tools: ['Vue.js', 'Nuxt 3', 'Tailwind CSS', 'GSAP', 'TypeScript']
  },
  {
    title: 'DevOps / Cloud',
    tools: ['Docker', 'AWS', 'GitHub Actions', 'Vercel', 'Linux']
  }
]

const allTech = techStack.flatMap(cat => cat.tools)

// Colors mapping matching the required Neo-Brutalist palette
const colors = ['#FF6F20', '#FFFFFF', '#BEC3C7', '#F1F1F1', '#3B3B3B']
const textColors = ['#FFFFFF', '#2E2E2E', '#2E2E2E', '#2E2E2E', '#FFFFFF']

const getStickerColor = (index: number) => colors[index % colors.length]
const getStickerTextColor = (index: number) => textColors[index % textColors.length]
const getStickerRotation = (index: number) => {
  // Random static rotation between -10 and 10 degrees based on index to ensure deterministic rendering for SSR
  return (Math.sin(index * 999) * 10).toFixed(1)
}

// Refs
const bentoSection = ref<HTMLElement | null>(null)
const marqueeSection = ref<HTMLElement | null>(null)
const stickerSection = ref<HTMLElement | null>(null)
const drawerSection = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

// Drawer Logic
const activeDrawer = ref<number | null>(null)
const drawerRefs = ref<HTMLElement[]>([])

const setDrawerRef = (el: any, index: number) => {
  if (el) drawerRefs.value[index] = el
}

const toggleDrawer = (index: number) => {
  const content = drawerRefs.value[index]
  if (!content) return

  if (activeDrawer.value === index) {
    // Close
    gsap.to(content, { height: 0, duration: 0.4, ease: "power3.inOut" })
    activeDrawer.value = null
  } else {
    // Close previous
    if (activeDrawer.value !== null && drawerRefs.value[activeDrawer.value]) {
      gsap.to(drawerRefs.value[activeDrawer.value], { height: 0, duration: 0.4, ease: "power3.inOut" })
    }
    // Open new
    gsap.set(content, { height: 'auto' })
    const targetHeight = content.offsetHeight
    gsap.fromTo(content, 
      { height: 0 }, 
      { height: targetHeight, duration: 0.4, ease: "power3.inOut" }
    )
    activeDrawer.value = index
  }
}

onMounted(async () => {
  await nextTick()
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    // A: Bento Grid Animation
    if (bentoSection.value) {
      gsap.fromTo(".bento-card",
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: bentoSection.value,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // B: Infinite Marquee Animation
    if (marqueeSection.value) {
      // Move exactly one set width (-33.33% because there are 3 identical sets)
      gsap.to(".marquee-left", {
        xPercent: -33.33,
        ease: "none",
        duration: 15,
        repeat: -1
      })
      gsap.fromTo(".marquee-right", 
        { xPercent: -33.33 },
        {
          xPercent: 0,
          ease: "none",
          duration: 15,
          repeat: -1
        }
      )
    }

    // C: Sticker Pack Animation
    if (stickerSection.value) {
      gsap.fromTo(".tech-sticker",
        { scale: 0, opacity: 0, rotation: () => (Math.random() - 0.5) * 40 }, // Random spawn rotation
        {
          scale: 1,
          opacity: 1,
          rotation: (index) => getStickerRotation(index), // Settle into final CSS rotation
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: stickerSection.value,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Hover Interactive effects for stickers
      const stickers = gsap.utils.toArray(".tech-sticker") as HTMLElement[]
      stickers.forEach(sticker => {
        sticker.addEventListener("mouseenter", () => {
          gsap.to(sticker, { scale: 1.15, rotation: 0, zIndex: 50, duration: 0.2, ease: "power1.out", overwrite: "auto" })
        })
        sticker.addEventListener("mouseleave", () => {
          const idx = stickers.indexOf(sticker)
          gsap.to(sticker, { scale: 1, rotation: getStickerRotation(idx), zIndex: 1, duration: 0.2, ease: "power1.out", overwrite: "auto" })
        })
      })
    }

  })
})

onUnmounted(() => {
  // Clean up all ScrollTriggers and animations
  if (ctx) {
    ctx.revert()
  }
})
</script>

<style scoped>
/* Ensure Marquee container wraps tightly */
.marquee-left, .marquee-right {
  will-change: transform;
}
.absolute-center-origin {
  transform-origin: center center;
}
</style>
