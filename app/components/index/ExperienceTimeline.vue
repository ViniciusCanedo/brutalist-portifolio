<template>
  <section ref="timelineContainer" class="relative max-w-7xl mx-auto w-full px-4 py-16 md:py-24 select-none overflow-hidden">
    <!-- Header -->
    <div class="mb-16 text-center timeline-header">
      <span class="bg-neoAccent text-white px-3 py-1.5 border-3 border-neoPrimary font-mono text-xs font-bold uppercase tracking-wider shadow-brutal">
        // HISTORICAL_OPERATIONAL_LOGS
      </span>
      <h2 class="text-3xl md:text-5xl font-black uppercase text-neoPrimary tracking-tight mt-4">
        Experience & Milestones
      </h2>
    </div>

    <!-- Timeline Wrapper -->
    <div ref="timelineWrapper" class="relative mt-12">
      <!-- Vertical Timeline Axis -->
      <div 
        ref="timelineLine" 
        class="absolute top-0 bottom-0 left-[26px] md:left-1/2 -translate-x-1/2 w-1 md:w-2 bg-neoPrimary border-l-2 md:border-l-3 border-neoPrimary origin-top z-0"
      ></div>

      <!-- Timeline Cards Feed -->
      <div class="relative space-y-12 md:space-y-16">
        <div 
          v-for="(item, index) in items" 
          :key="item.id" 
          class="relative flex flex-col md:flex-row items-start md:items-center justify-between md:odd:flex-row-reverse w-full timeline-item"
        >
          <!-- Left/Right Card Container (pl-12 on mobile to avoid the axis line) -->
          <div class="pl-12 md:pl-0 w-full md:w-[45%] flex md:justify-end md:odd:justify-start z-10">
            <div class="w-full bg-white border-3 border-neoPrimary p-5 shadow-brutal hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-accent transition-all duration-100 ease-brutal-snappy cursor-pointer relative timeline-card">
              <!-- Meta Header -->
              <div class="flex items-center justify-between gap-3 border-b-2 border-dashed border-neoPrimary pb-2 mb-3">
                <span class="font-mono text-xs font-bold text-neoPrimary">{{ item.period }}</span>
                <span 
                  :class="item.type === 'work' ? 'bg-neoAccent text-white' : 'bg-neoBg text-neoPrimary'"
                  class="px-2 py-0.5 border-2 border-neoPrimary text-[9px] font-bold uppercase tracking-wider font-mono shadow-brutal"
                >
                  // {{ item.type }}
                </span>
              </div>
              
              <!-- Content -->
              <h3 class="text-lg md:text-xl font-black uppercase tracking-tight text-neoPrimary">
                {{ item.role }}
              </h3>
              <div class="font-mono text-xs text-neoAccent uppercase font-bold mt-1">
                @ {{ item.organization }}
              </div>
              <p class="text-sm font-medium text-neoPrimary mt-3 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>

          <!-- Spacer for Desktop Layout -->
          <div class="hidden md:block w-[45%]"></div>

          <!-- Central Timeline Node -->
          <div 
            :class="[
              item.type === 'work' ? 'rounded-none' : 'rounded-full',
              'absolute top-8 md:top-1/2 left-[26px] md:left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-6 h-6 bg-neoAccent border-3 border-neoPrimary shadow-brutal-accent timeline-node z-10'
            ]"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export interface TimelineItem {
  id: string | number
  type: 'work' | 'education'
  role: string
  organization: string
  period: string
  description: string
}

defineProps<{
  items: TimelineItem[]
}>()

const timelineContainer = ref<HTMLElement | null>(null)
const timelineWrapper = ref<HTMLElement | null>(null)
const timelineLine = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(async () => {
  await nextTick()

  // Register GSAP ScrollTrigger plugin client-side
  gsap.registerPlugin(ScrollTrigger)

  // Scope all animations to the component ref
  ctx = gsap.context(() => {
    // 1. Reveal Section Header
    gsap.fromTo(".timeline-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-header",
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // 2. Animate Drawing of Timeline Axis Line (Scrubbed on scroll)
    if (timelineLine.value && timelineWrapper.value) {
      gsap.fromTo(timelineLine.value,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineWrapper.value,
            start: "top 75%",
            end: "bottom 75%",
            scrub: true
          }
        }
      )
    }

    // 3. Animate each row (node + card) individually as it scrolls into view
    const items = gsap.utils.toArray(".timeline-item")
    items.forEach((item: any) => {
      const node = item.querySelector(".timeline-node")
      const card = item.querySelector(".timeline-card")
      
      const rowTl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: "center 75%",
          toggleActions: "play none none reverse"
        }
      })

      rowTl.fromTo(node,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          ease: "back.out(2)"
        }
      )
      .fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.5)",
          clearProps: "all"
        }, "-=0.2") // slight overlap
    })

  }, timelineContainer.value || undefined)
})

onUnmounted(() => {
  // Clean up all ScrollTriggers created in context to prevent SPA memory leaks
  if (ctx) {
    ctx.revert()
  }
})
</script>

<style scoped>
/* Scoped custom responsive behaviors if needed */
</style>
