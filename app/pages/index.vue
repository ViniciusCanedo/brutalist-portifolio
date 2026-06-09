<template>
  <div class="min-h-screen flex flex-col bg-neoBg transition-colors">
    <!-- Navbar -->
    <Navbar current-page="landing" />

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-12">
      <!-- HERO SECTION -->
      <HeroSection />

      <!-- EXPERIENCE TIMELINE -->
      <ExperienceTimeline :items="timelineItems" />


    </main>

    <footer class="bg-neoDark text-neoBg border-t-3 border-neoPrimary p-8 font-mono text-xs text-center">
      &copy; 2026 STARK_DEV // ALL TELEMETRY SECURED.
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { TimelineItem } from '~/components/index/ExperienceTimeline.vue'

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    type: 'work',
    role: 'Software Engineer',
    organization: 'STARK_DEV',
    period: '2023 - Present',
    description: 'Led backend architecture development. Orchestrated high-performance API endpoints, optimized database queries, and automated dev telemetry integrations.'
  },
  {
    id: 2,
    type: 'work',
    role: 'Full Stack Developer',
    organization: 'STARK_CORP',
    period: '2021 - 2023',
    description: 'Maintained and enhanced core client dashboards, modernized monolithic legacy systems into highly responsive microservice architectures, and led front-end layout transitions.'
  },
  {
    id: 3,
    type: 'education',
    role: 'B.S. Computer Science',
    organization: 'STARK_UNIVERSITY',
    period: '2017 - 2021',
    description: 'Graduated with academic honors. Specialized in data structures, design patterns, systems analysis, and interactive animations.'
  },
  {
    id: 4,
    type: 'work',
    role: 'B.S. Computer Science',
    organization: 'STARK_UNIVERSITY',
    period: '2017 - 2021',
    description: 'Graduated with academic honors. Specialized in data structures, design patterns, systems analysis, and interactive animations.'
  }
]
</script>
