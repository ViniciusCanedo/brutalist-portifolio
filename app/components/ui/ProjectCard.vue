<template>
  <div class="border-3 border-neoPrimary bg-white text-neoPrimary shadow-brutal hover:shadow-brutal-accent hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150 flex flex-col h-full">
    <!-- Header Banner -->
    <div class="h-40 border-b-3 border-neoPrimary bg-neoDark p-4 flex flex-col justify-between relative overflow-hidden">
      <!-- Background Image if present -->
      <img 
        v-if="project.imageUrl" 
        :src="project.imageUrl" 
        alt="" 
        class="absolute inset-0 w-full h-full object-cover opacity-50 z-0 border-none pointer-events-none" 
      />
      <div class="flex justify-between items-start z-10">
        <span class="bg-white text-neoPrimary border-2 border-neoPrimary px-2 py-0.5 font-mono text-[9px] font-bold uppercase">
          {{ project.tag }}
        </span>
        <span class="text-white font-mono text-[10px] font-bold bg-neoAccent px-2 py-0.5 border-2 border-neoPrimary shadow-brutal">
          {{ project.metric }}
        </span>
      </div>
      <div class="z-10 bg-white border-2 border-neoPrimary p-2">
        <h4 class="text-base font-black uppercase text-neoPrimary tracking-tight truncate leading-none">{{ project.title }}</h4>
        <span class="font-mono text-[9px] text-neoMuted uppercase mt-1 block font-bold">{{ project.role }}</span>
      </div>
    </div>

    <!-- Body Information Tabs -->
    <div class="flex border-b-3 border-neoPrimary bg-neoBg text-[10px] font-mono font-bold">
      <button 
        @click="activeTab = 'summary'"
        :class="activeTab === 'summary' ? 'bg-white border-r-3 border-neoPrimary text-neoAccent' : 'text-neoDark border-r-3 border-neoPrimary hover:bg-white'"
        class="flex-1 py-2 text-center cursor-pointer"
      >
        SUMMARY
      </button>
      <button 
        @click="activeTab = 'telemetry'"
        :class="activeTab === 'telemetry' ? 'bg-white text-neoAccent' : 'text-neoDark hover:bg-white'"
        class="flex-1 py-2 text-center cursor-pointer"
      >
        TELEMETRY
      </button>
    </div>

    <!-- Description Area -->
    <div class="p-4 flex-1 flex flex-col justify-between space-y-4">
      <div class="min-h-[90px] font-mono text-xs text-neoPrimary leading-relaxed">
        <p v-if="activeTab === 'summary'">{{ project.desc }}</p>
        <div v-else class="space-y-1.5">
          <div v-for="metric in project.metrics" :key="metric" class="flex items-center gap-2">
            <span class="w-2 h-2 bg-neoAccent border border-neoPrimary"></span>
            <span class="font-bold text-[10px]">{{ metric }}</span>
          </div>
        </div>
      </div>

      <!-- Footer Tech Tags -->
      <div class="flex flex-wrap gap-1.5 pt-4 border-t-2 border-neoBg">
        <span 
          v-for="tech in project.stack" 
          :key="tech"
          class="bg-neoBg text-neoDark border border-neoMuted px-2 py-0.5 font-mono text-[9px] font-bold"
        >
          #{{ tech }}
        </span>
      </div>

      <!-- Action Buttons Row -->
      <div v-if="project.githubUrl || project.previewUrl" class="flex gap-3 pt-4 border-t-2 border-neoBg mt-auto">
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 text-center py-2 bg-white text-neoPrimary border-3 border-neoPrimary font-mono text-[10px] font-bold uppercase tracking-wider shadow-[3px_3px_0px_0px_#2E2E2E] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-100 ease-brutal-snappy cursor-pointer"
        >
          GITHUB
        </a>
        <a
          v-if="project.previewUrl"
          :href="project.previewUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 text-center py-2 bg-[var(--neo-accent)] text-white border-3 border-neoPrimary font-mono text-[10px] font-bold uppercase tracking-wider shadow-[3px_3px_0px_0px_#2E2E2E] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-100 ease-brutal-snappy cursor-pointer"
        >
          PREVIEW
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface Project {
  id: string
  title: string
  tag: string
  metric: string
  role: string
  desc: string
  metrics: string[]
  stack: string[]
  githubUrl?: string
  previewUrl?: string
  imageUrl?: string
}

defineProps<{
  project: Project
}>()

const activeTab = ref('summary')
</script>
