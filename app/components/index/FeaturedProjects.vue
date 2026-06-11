<template>
  <section v-if="projects && projects.length > 0" ref="sectionRef" class="relative max-w-7xl mx-auto w-full px-4 py-16 md:py-24 select-none overflow-hidden">
    <!-- Header -->
    <div class="text-center mb-16 featured-header">
      <span class="bg-neoPrimary text-white px-3 py-1.5 border-3 border-neoPrimary font-mono text-xs font-bold uppercase tracking-wider shadow-brutal">
        // CURATED_PRODUCTION_INDEX
      </span>
      <h2 class="text-3xl md:text-5xl font-black uppercase text-neoPrimary tracking-tight mt-4">
        Featured Projects
      </h2>
    </div>

    <!-- Responsive Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 featured-grid">
      <div v-for="proj in featuredProjects" :key="proj.id" class="featured-card-wrapper h-full">
        <ProjectCard :project="proj" />
      </div>
    </div>

    <!-- CTA Button Container -->
    <div class="text-center featured-cta">
      <NuxtLink 
        to="/projects"
        class="inline-block px-8 py-4 bg-neoAccent text-white border-3 border-neoPrimary font-mono text-base font-bold uppercase tracking-wider transition-all duration-100 ease-brutal-snappy shadow-brutal hover:shadow-brutal-accent hover:-translate-x-1 hover:-translate-y-1 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
      >
        VIEW MORE PROJECTS
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = ref([
  {
    id: 'telemetry-engine',
    title: 'Telemetry HUD Engine',
    tag: 'SYSTEMS',
    metric: '< 12ms',
    role: 'Lead Architect',
    desc: 'Developed a high-performance web dashboard displaying real-time server and network hardware telemetry in a low-latency layout.',
    metrics: [
      'LATENCY: < 12ms active render loop',
      'THROUGHPUT: 15,000 updates/sec',
      'SSR_COMPILATION: Zero warnings',
      'DYNAMICS: WebSockets integrations'
    ],
    stack: ['nuxt3', 'bun', 'tailwind', 'typescript'],
    githubUrl: 'https://github.com/stark-dev/telemetry-hud',
    previewUrl: 'https://telemetry.stark-dev.example.com',
    imageUrl: '/img/telemetry_hud_thumbnail.png'
  },
  {
    id: 'performance-optimizer',
    title: 'Workbench Bundler',
    tag: 'PERFORMANCE',
    metric: '100%',
    role: 'Core Specialist',
    desc: 'Re-engineered the compilation pipeline by swapping standard execution engines with Bun and custom treeshaking configurations.',
    metrics: [
      'BUNDLE_SIZE: Reduced by 48%',
      'HMR_TIMING: < 50ms hot reload',
      'LIGHTHOUSE_SCORE: 100% flat performance',
      'MEMORY_USAGE: < 80MB execution limit'
    ],
    stack: ['bun', 'postcss', 'esbuild', 'javascript'],
    githubUrl: 'https://github.com/stark-dev/workbench-bundler',
    previewUrl: 'https://bundler.stark-dev.example.com',
    imageUrl: '/img/workbench_bundler_thumbnail.png'
  },
  {
    id: 'dynamic-sandbox',
    title: 'GSAP Motion Engine',
    tag: 'DYNAMIC_UI',
    metric: '60 fps',
    role: 'Interactive Developer',
    desc: 'Created an animation testing workbench with live easing modifications, speed parameters sliders, and visual timeline debug maps.',
    metrics: [
      'TIMELINE_SAFETY: Memory leak-free mounts',
      'EASINGS: Snappy cubic-bezier curves',
      'FRAME_RATE: Lock 60fps rendering',
      'RELOADS: Hot update configurations'
    ],
    stack: ['gsap3', 'vue3', 'tailwind', 'html5'],
    githubUrl: 'https://github.com/stark-dev/gsap-motion-engine',
    previewUrl: 'https://motion.stark-dev.example.com',
    imageUrl: '/img/gsap_motion_engine_thumbnail.png'
  }
])

// Slice to show exactly 3 latest projects
const featuredProjects = computed(() => {
  return projects.value.slice(0, 3)
})

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(async () => {
  await nextTick()
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    // Sequenced GSAP animations
    tl.fromTo('.featured-header', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo('.featured-card-wrapper',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.5)' },
      '-=0.3'
    )
    .fromTo('.featured-cta',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.2'
    )
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>
