<template>
  <div class="min-h-screen flex flex-col bg-transparent transition-colors">
    <div class="relative z-10 bg-neoBg flex flex-col w-full flex-1">
      <!-- Navbar -->
      <Navbar current-page="projects" />

      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
        <!-- Filter Header -->
        <header
          class="border-3 border-neoPrimary bg-neoSurface text-neoPrimary p-6 shadow-brutal flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
        >
          <div>
            <span class="font-mono text-xs text-neoAccent font-bold"
              >// SYSTEM_PORTFOLIO_ARCHIVE</span
            >
            <h2 class="text-2xl font-display font-black uppercase">
              Case Studies // Archive
            </h2>
          </div>

          <!-- Technology Category Filter Tabs -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in ['ALL', 'SYSTEMS', 'PERFORMANCE', 'DYNAMIC_UI']"
              :key="cat"
              @click="activeFilter = cat"
              :class="
                activeFilter === cat
                  ? 'bg-neoAccent text-white'
                  : 'bg-neoSurface text-neoPrimary hover:bg-neoBg'
              "
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
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const { activeFilter, filteredProjects } = useProjects();
</script>
