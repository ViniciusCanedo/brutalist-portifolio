<template>
  <nav class="sticky top-0 z-40 bg-white border-b-3 border-neoPrimary text-neoPrimary px-4 py-4 flex items-center justify-between transition-colors">
    <!-- Branding logo -->
    <div class="flex items-center gap-3 select-none">
      <span class="bg-neoAccent text-white p-2 border-3 border-neoPrimary font-bold text-lg shadow-brutal flex items-center justify-center w-10 h-10">
        S
      </span>
      <div>
        <span class="font-bold text-sm tracking-tight block uppercase leading-none">STARK_DEV</span>
        <span class="font-mono text-[9px] text-neoMuted leading-none uppercase font-bold">Workbench</span>
      </div>
    </div>

    <!-- Page navigation -->
    <div class="flex items-center gap-3">
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
        // CASE_STUDIES
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  currentPage: { type: String, default: 'landing' }
})
</script>
