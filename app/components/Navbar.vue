<template>
  <nav class="sticky top-0 z-50 bg-white border-b-3 border-neoPrimary text-neoPrimary px-4 py-4 flex items-center justify-between transition-colors">
    <!-- Branding logo -->
    <div class="flex items-center gap-3 select-none">
      <span class="bg-neoAccent text-white p-2 border-3 border-neoPrimary font-bold text-lg shadow-brutal flex items-center justify-center w-10 h-10">
        VC
      </span>
      <div>
        <span class="font-bold text-sm tracking-tight block uppercase leading-none">VINICIUS CANEDO</span>
        <span class="font-mono text-[9px] text-neoMuted leading-none uppercase font-bold">Software Engineer</span>
      </div>
    </div>

    <!-- Desktop navigation -->
    <div class="hidden md:flex items-center gap-3">
      <NuxtLink 
        to="/" 
        :class="currentPage === 'landing' ? 'bg-neoAccent text-white' : 'bg-white text-neoPrimary hover:bg-neoBg'"
        class="px-4 py-2 border-3 border-neoPrimary font-bold text-xs tracking-wide shadow-brutal active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-100 ease-brutal-snappy"
      >
        // HOME
      </NuxtLink>
      <NuxtLink 
        to="/projects" 
        :class="currentPage === 'projects' ? 'bg-neoAccent text-white' : 'bg-white text-neoPrimary hover:bg-neoBg'"
        class="px-4 py-2 border-3 border-neoPrimary font-bold text-xs tracking-wide shadow-brutal active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-100 ease-brutal-snappy"
      >
        // PROJECTS
      </NuxtLink>
    </div>

    <!-- Mobile menu button -->
    <div class="flex md:hidden">
      <button 
        @click="isOpen = !isOpen"
        aria-label="Toggle Menu"
        class="p-2 border-3 border-neoPrimary bg-white text-neoPrimary shadow-brutal active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-100 ease-brutal-snappy flex items-center justify-center"
      >
        <!-- Custom Neo-Brutalist Hamburger/X Icon -->
        <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="square" stroke-linejoin="miter" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="square" stroke-linejoin="miter" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile navigation overlay / dropdown -->
    <transition name="menu-slide">
      <div 
        v-if="isOpen"
        class="absolute top-full left-0 right-0 bg-white border-b-3 border-neoPrimary p-4 flex flex-col gap-3 shadow-brutal-lg md:hidden z-40"
      >
        <NuxtLink 
          to="/" 
          @click="isOpen = false"
          :class="currentPage === 'landing' ? 'bg-neoAccent text-white' : 'bg-white text-neoPrimary hover:bg-neoBg'"
          class="w-full text-center px-4 py-3 border-3 border-neoPrimary font-bold text-sm tracking-wide shadow-brutal active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-100 ease-brutal-snappy"
        >
          // HOME
        </NuxtLink>
        <NuxtLink 
          to="/projects" 
          @click="isOpen = false"
          :class="currentPage === 'projects' ? 'bg-neoAccent text-white' : 'bg-white text-neoPrimary hover:bg-neoBg'"
          class="w-full text-center px-4 py-3 border-3 border-neoPrimary font-bold text-sm tracking-wide shadow-brutal active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-100 ease-brutal-snappy"
        >
          // CASE_STUDIES
        </NuxtLink>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  currentPage: { type: String, default: 'landing' }
})

const isOpen = ref(false)
</script>

<style scoped>
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
