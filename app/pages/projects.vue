<template>
  <div class="min-h-screen flex flex-col bg-neoBg transition-colors">
    <!-- Navbar -->
    <Navbar current-page="projects" />

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
      <!-- Filter Header -->
      <header class="border-3 border-neoPrimary bg-white text-neoPrimary p-6 shadow-brutal flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <span class="font-mono text-xs text-neoAccent font-bold">// SYSTEM_PORTFOLIO_ARCHIVE</span>
          <h2 class="text-2xl font-display font-black uppercase">Case Studies // Archive</h2>
        </div>
        
        <!-- Technology Category Filter Tabs -->
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="cat in ['ALL', 'SYSTEMS', 'PERFORMANCE', 'DYNAMIC_UI']" 
            :key="cat"
            @click="activeFilter = cat"
            :class="activeFilter === cat ? 'bg-neoAccent text-white' : 'bg-white text-neoPrimary hover:bg-neoBg'"
            class="px-4 py-2 border-3 border-neoPrimary font-mono text-xs font-bold transition-all duration-100 shadow-brutal active:shadow-none active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            {{ cat }}
          </button>
        </div>
      </header>

      <!-- Project Cards Grid -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard 
          v-for="proj in filteredProjects" 
          :key="proj.id" 
          :project="proj" 
        />
      </section>
    </main>

    <footer class="bg-neoDark text-neoBg border-t-3 border-neoPrimary p-8 font-mono text-xs text-center transition-colors">
      &copy; 2026 STARK_DEV // ALL TELEMETRY SECURED.
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('ALL')

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
    stack: ['nuxt3', 'bun', 'tailwind', 'typescript']
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
    stack: ['bun', 'postcss', 'esbuild', 'javascript']
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
    stack: ['gsap3', 'vue3', 'tailwind', 'html5']
  }
])

const filteredProjects = computed(() => {
  if (activeFilter.value === 'ALL') {
    return projects.value
  }
  return projects.value.filter(proj => proj.tag === activeFilter.value)
})
</script>
